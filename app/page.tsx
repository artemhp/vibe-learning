"use client";

import { Container, Title, Text, Stack, Card, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  // Add more fields as per lu.ma API response
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // TODO: Implement lu.ma API integration
    const fetchEvents = async () => {
      try {
        // Replace with actual lu.ma API endpoint and your API key
        const response = await fetch("YOUR_LUMA_API_ENDPOINT", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LUMA_API_KEY}`,
          },
        });
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>Welcome to Our Community</Title>
          <Text c="dimmed" mt="md">
            Stay updated with our latest events and connect with fellow members
          </Text>
        </div>

        <div>
          <Title order={2} mb="md">
            Upcoming Events
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {events.map((event) => (
              <Card
                key={event.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Title order={3} size="h4">
                  {event.name}
                </Title>
                <Text c="dimmed" size="sm" mt="xs">
                  {new Date(event.startTime).toLocaleDateString()}
                </Text>
                <Text mt="sm">{event.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
}
