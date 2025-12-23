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
        className={`antialiased ${sfPro.className} items-center bg-gray-50 w-screen
                    flex flex-col gap-5 sm:gap-8 md:gap-11 lg:gap-13`}
      >
        {children}
      </body>
    </html>
  );
}
