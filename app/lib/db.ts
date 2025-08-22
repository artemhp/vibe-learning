import { kv } from "@vercel/kv";

export interface Introduction {
  id: string;
  messageId: number;
  name: string;
  username?: string;
  text: string;
  industry: string;
  expertise: string[];
  timestamp: string;
}

export async function saveIntroduction(introduction: Introduction) {
  await kv.set(`intro:${introduction.id}`, introduction);
  await kv.sadd("intros", `intro:${introduction.id}`);
}

export async function getAllIntroductions(): Promise<Introduction[]> {
  const introIds = await kv.smembers("intros");
  if (!introIds.length) return [];

  const intros = await kv.mget<Introduction[]>(...introIds);
  return intros.filter(Boolean);
}

export async function getITProfessionals(): Promise<Introduction[]> {
  const allIntros = await getAllIntroductions();
  return allIntros.filter(
    (intro) => intro.expertise && intro.expertise.length > 0
  );
}
