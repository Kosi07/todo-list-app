import './globals.css';
import { sfPro } from '@/fonts';

export const metadata = {
  title: 'Tackl',
  description: 'Take 7 steps each day towards your goal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <html lang='en'>
      <body
        className={`antialiased ${sfPro.className} `}
      >
        {children}
      </body>
    </html>
  );
}
