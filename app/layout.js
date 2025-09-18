import './globals.css';
import { sfPro } from '@/hooks/useSpecialFonts';

export const metadata = {
  title: 'todo-list',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`antialiased ${sfPro.className} items-center bg-gray-50 w-screen
                    flex flex-col gap-14 sm:gap-16 md:gap-22 lg:gap-25`}
      >
        {children}
      </body>
    </html>
  );
}
