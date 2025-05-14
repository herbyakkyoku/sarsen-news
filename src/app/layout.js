// src/app/layout.js
import './globals.css';

// src/app/layout.js

export const metadata = {
  title: 'サーセン速報',
  description: 'YouTuberの謝罪動画をいち早くお届け！その謝罪は本音か、それともエンタメか。',
  openGraph: {
    title: 'サーセン速報',
    description: 'YouTuberの謝罪動画をいち早くお届け！その謝罪は本音か、それともエンタメか。',
    url: 'https://sarsen-news-dev.vercel.app',
    siteName: 'サーセン速報',
    images: [
      {
        url: '/ogp.png', // 後ほど画像を追加
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'サーセン速報',
    description: 'YouTuberの謝罪動画をいち早くお届け！',
    images: ['/ogp.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-512.png" />

        <meta name="theme-color" content="#000000" />
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />


        {/* 以下はSEOやSNS向けに拡張したい場合に追加してもOK */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
