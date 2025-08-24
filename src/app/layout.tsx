import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './css/app.scss';

const montserrat = Montserrat({
  variable: '--font-family-base',
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'My trip',
  description: 'A page displaying my current trip information'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable}`}>{children}</body>
    </html>
  );
}
