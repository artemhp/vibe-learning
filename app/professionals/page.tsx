"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Badge,
  SimpleGrid,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface Professional {
  id: string;
  name: string;
  expertise: string[];
  introduction: string;
  timestamp: string;
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    // TODO: Implement Telegram API integration with #intro tag filtering
    const fetchProfessionals = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/professionals");
        const data = await response.json();
        setProfessionals(data.professionals || []);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>IT Professionals</Title>
          <Text c="dimmed" mt="md">
            Connect with our community&apos;s IT experts
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {professionals.map((professional) => (
            <Card
              key={professional.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Stack gap="sm">
                <Title order={3} size="h4">
                  {professional.name}
                </Title>
                <Group gap="xs">
                  {professional.expertise.map((skill) => (
                    <Badge key={skill} variant="light">
                      {skill}
                    </Badge>
                  ))}
                </Group>
                <Text size="sm">{professional.introduction}</Text>
                <Text size="xs" c="dimmed">
                  Joined:{" "}
                  {new Date(professional.timestamp).toLocaleDateString()}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
