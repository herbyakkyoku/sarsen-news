'use client';

import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VideoDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState('動画読み込み中...');
  const [author, setAuthor] = useState('');

  const videoMeta = {
    image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    url: `https://sarsen.news/video/${id}`,
  };

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
        const res = await fetch(oEmbedUrl);
        const data = await res.json();
        setTitle(data.title);
        setAuthor(data.author_name);
      } catch (err) {
        console.error('oEmbed取得失敗:', err);
        setTitle('動画タイトルの取得に失敗しました');
      }
    };
    if (id) fetchMeta();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(videoMeta.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title} | サーセン速報</title>
        <meta name="description" content={`${author}による動画`} />
        <meta property="og:title" content={`${title} | サーセン速報`} />
        <meta property="og:description" content={`${author}による動画`} />
        <meta property="og:image" content={videoMeta.image} />
        <meta property="og:url" content={videoMeta.url} />
        <meta property="og:type" content="video.other" />
        <meta property="og:site_name" content="サーセン速報" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | サーセン速報`} />
        <meta name="twitter:description" content={`${author}による動画`} />
        <meta name="twitter:image" content={videoMeta.image} />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline block mb-4">
          ← トップに戻る
        </Link>

        <h1 className="text-xl font-bold mb-4">動画詳細ページ</h1>

        <div className="aspect-video w-full rounded overflow-hidden shadow mb-4">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        <div className="flex gap-3 mt-2 flex-wrap">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoMeta.url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
          >
            𝕏で共有
          </a>

          <button
            onClick={handleCopy}
            className="text-sm bg-gray-200 text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            {copied ? 'コピー済み！' : 'URLをコピー'}
          </button>
        </div>
      </div>
    </div>
  );
}
