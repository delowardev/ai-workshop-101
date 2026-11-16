import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickCart',
  description: 'Sample shop for the Claude Code workshop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
