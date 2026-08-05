import { Container } from "@/components/container";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="md" className="py-16">
      {children}
    </Container>
  );
}
