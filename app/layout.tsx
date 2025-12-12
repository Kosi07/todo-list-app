import './globals.css';
import { sfPro } from '@/fonts';

export const metadata = {
  title: 'todo-list',
  description: 'Take bite-sized steps towards your goals.',
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
                    flex flex-col gap-10 sm:gap-16 md:gap-22 lg:gap-25`}
      >
        {children}
      </body>
    </html>
  );
}
