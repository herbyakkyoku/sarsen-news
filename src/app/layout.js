import './globals.css';

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
        url: '/ogp.png',
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
  icons: {
    icon: '/favicon.ico', // ← ここが favicon 設定！
    apple: '/icon-512.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        {/* 追加のタグは不要。metadata に書いた内容が反映される */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
