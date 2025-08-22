"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface Member {
  id: string;
  name: string;
  introduction: string;
  industry: string;
  timestamp: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    // TODO: Implement Telegram API integration and OpenAI analysis
    const fetchMembers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/members");
        const data = await response.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>Our Members</Title>
          <Text c="dimmed" mt="md">
            Meet our community members and their stories
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {members.map((member) => (
            <Card
              key={member.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Stack gap="sm">
                <Title order={3} size="h4">
                  {member.name}
                </Title>
                <Badge variant="light" color="blue">
                  {member.industry}
                </Badge>
                <Text size="sm">{member.introduction}</Text>
                <Text size="xs" c="dimmed">
                  Joined: {new Date(member.timestamp).toLocaleDateString()}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
