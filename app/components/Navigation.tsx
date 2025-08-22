"use client";

import { AppShell, Burger, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Members", path: "/members" },
  { label: "Professionals", path: "/professionals" },
];

export function Navigation() {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text size="lg" fw={700}>
            Community Hub
          </Text>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={20} visibleFrom="sm">
            {navigation.map((item) => (
              <UnstyledButton
                key={item.path}
                component={Link}
                href={item.path}
                fw={pathname === item.path ? 700 : 400}
              >
                {item.label}
              </UnstyledButton>
            ))}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {navigation.map((item) => (
          <UnstyledButton
            key={item.path}
            component={Link}
            href={item.path}
            w="100%"
            py="xs"
            px="md"
            fw={pathname === item.path ? 700 : 400}
          >
            {item.label}
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{/* Content will be rendered here */}</AppShell.Main>
    </AppShell>
  );
}
