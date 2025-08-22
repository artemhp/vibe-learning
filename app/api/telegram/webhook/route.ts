import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { kv } from "@vercel/kv"; // We'll use Vercel KV for storage

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TelegramUpdate {
  message: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    forward_from?: {
      id: number;
      first_name: string;
      username?: string;
    };
    text: string;
    date: number;
  };
}

async function analyzeMessage(text: string) {
  try {
    const [industryResponse, expertiseResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at analyzing professional introductions and categorizing them into industries. Respond with just the industry name.",
          },
          {
            role: "user",
            content: `Based on this introduction, what industry does this person work in? "${text}"`,
          },
        ],
      }),
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at analyzing IT professional introductions and identifying their areas of expertise. Respond with a comma-separated list of their key skills and expertise areas. If the person is not in IT, respond with 'non-IT'.",
          },
          {
            role: "user",
            content: `Based on this introduction, what are this person's IT-related skills and expertise areas? "${text}"`,
          },
        ],
      }),
    ]);

    const industry = industryResponse.choices[0].message.content || "Unknown";
    const expertise = expertiseResponse.choices[0].message.content || "non-IT";

    return {
      industry,
      expertise:
        expertise === "non-IT" ? [] : expertise.split(",").map((s) => s.trim()),
    };
  } catch (error) {
    console.error("Error analyzing message:", error);
    return { industry: "Unknown", expertise: [] };
  }
}

export async function POST(request: Request) {
  try {
    const update: TelegramUpdate = await request.json();
    const adminUserId = process.env.TELEGRAM_ADMIN_USER_ID;

    // Security check: only accept messages from admin
    if (update.message.from.id.toString() !== adminUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = update;

    // Only process messages that were forwarded
    if (!message.forward_from) {
      return NextResponse.json(
        { error: "Not a forwarded message" },
        { status: 400 }
      );
    }

    // Process the message
    const { industry, expertise } = await analyzeMessage(message.text);

    // Store the processed introduction
    const introData = {
      id: `intro:${message.forward_from.id}`,
      messageId: message.message_id,
      name: message.forward_from.first_name,
      username: message.forward_from.username,
      text: message.text,
      industry,
      expertise,
      timestamp: new Date(message.date * 1000).toISOString(),
    };

    // Store in Vercel KV (you can replace this with your preferred database)
    await kv.set(introData.id, introData);
    await kv.sadd("intros", introData.id);

    // Send confirmation response
    return NextResponse.json({
      status: "success",
      data: introData,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
