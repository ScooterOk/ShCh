import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import MainProvider from '@/providers/MainProvider';
import Script from 'next/script';

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://dev-serhii-churilov.vercel.app/'),
  title: 'Serhii Churilov',
  description:
    'Serhii Churilov is an award-winning Digital Art Director and Designer, Awwwards Judge (2020-2025), specializing in web design, branding, and motion design to craft innovative brand stories.',
  charset: 'UTF-8',
  lang: 'en',
  openGraph: {
    title: 'Serhii Churilov',
    description:
      'Serhii Churilov is an award-winning Digital Art Director and Designer, Awwwards Judge (2020-2025), specializing in web design, branding, and motion design to craft innovative brand stories.',
    url: 'https://serhiichurilov.com/',
    siteName: 'Next.js',
    images: [
      {
        url: '/img/opengraph1200x630.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    // videos: [
    //   {
    //     url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <MainProvider>{children}</MainProvider>
      <Script
        id="scrollRestoration"
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"; console.log(history.scrollRestoration);`,
        }}
      />
    </html>
  );
}
