// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'サーセン速報',
  description: 'YouTuberの謝罪動画をいち早くチェック！',
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
