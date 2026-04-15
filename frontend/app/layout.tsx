import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

type Props = Readonly<{
  children: React.ReactNode
}>
const swirlyCanalopeFont = localFont({
  src: '../public/shared/fonts/SwirlyCanalope_PERSONAL_USE_ONLY.otf',
  variable: '--font-font-swirly'
})

const poppins = Poppins({
  variable: '--font-font-poppins',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})
export const metadata: Metadata = {
  title: {
    template: '%s | Tejipaz',
    default: 'Home | Tejipaz'
  }
};

export default function RootLayout({ children, }: Props) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${swirlyCanalopeFont.variable} antialiased min-h-screen`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
