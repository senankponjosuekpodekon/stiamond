export const runtime = "nodejs";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen items-center justify-center bg-surface-1">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
