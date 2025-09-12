import './globals.css';
import localFont from 'next/font/local';

const sfPro = localFont(
  {
    src: [
    {
      path: '../public/font/SFPRODISPLAYREGULAR.woff2',
      weight: '400',
      style: 'normal',
    },
    
    {
      path: '../public/font/SFPRODISPLAYMEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/SFPRODISPLAYBOLD.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-sf-pro',
  display: 'swap'
  }
);

export const metadata = {
  title: 'todo-list',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={sfPro.variable}>
      <body
        className={`antialiased ${sfPro.className} items-center bg-gray-50 w-screen
                    flex flex-col gap-15 sm:gap-16 md:gap-25 lg:gap-35`}
      >
        {children}
      </body>
    </html>
  );
}
