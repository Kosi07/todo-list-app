import localFont from "next/font/local";

export const sfPro = localFont(
  {
    src: [
    {
      path: './public/font/SFPRODISPLAYREGULAR.woff2',
      weight: '400',
      style: 'normal',
    },
    
    {
      path: './public/font/SFPRODISPLAYMEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './public/font/SFPRODISPLAYBOLD.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-sf-pro',
  display: 'swap'
  }
);

export const cookie = localFont({
  src: './public/font/Cookie-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
})