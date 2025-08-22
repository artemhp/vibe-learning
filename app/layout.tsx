import "@mantine/core/styles.css";
import { Navigation } from "./components/Navigation";
import { Providers } from "./providers";

export const metadata = {
  title: "Community Hub",
  description: "A platform for our community members and professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
