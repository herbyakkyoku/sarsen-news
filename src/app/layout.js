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
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        {/* 👇ここがファビコン設定の決定版 */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* PWA/SEO 追加設定 */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-512.png" />
        <meta name="theme-color" content="#000000" />

        {/* SNSカード画像用 明示設定（上の metadata にもあるが念押し） */}
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body>{children}</body>
    </html>
  );
}
