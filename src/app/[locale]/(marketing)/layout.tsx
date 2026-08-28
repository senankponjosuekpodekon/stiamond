export const runtime = "nodejs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat-widget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
