'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'sokuho';
  const query = searchParams.get('q')?.toLowerCase() || '';
  const range = searchParams.get('range') || 'day';

  const [savedMap, setSavedMap] = useState({});
  const [searchText, setSearchText] = useState(query);
  const [likeCounts, setLikeCounts] = useState({});
  const [mehCounts, setMehCounts] = useState({});
  const [voteStatus, setVoteStatus] = useState({});
  const [showReport, setShowReport] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchText) {
      newParams.set('q', searchText);
    } else {
      newParams.delete('q');
    }
    router.push(`?${newParams.toString()}`);
  };

  const handleTabClick = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', value);
    router.push(`?${newParams.toString()}`);
  };

  const handleRangeClick = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('range', value);
    router.push(`?${newParams.toString()}`);
  };

  const articles = [
    {
      id: 1,
      title: '不適切発言について謝罪',
      channel: 'ガッシーTV',
      time: '2時間前',
      description: 'ライブ配信中の発言について謝罪',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: '暴言の件で謝罪',
      channel: '炎上芸人',
      time: '5時間前',
      description: 'ライブ中の暴言について謝罪と説明',
      videoId: '3JZ_D3ELwOQ',
    },
    {
      id: 3,
      title: '撮影ミスのお詫び',
      channel: '日常チャンネル',
      time: '10時間前',
      description: '動画に映ってはいけないものが映っていた件について謝罪',
      videoId: 'RgKAFK5djSk',
    },
    {
      id: 4,
      title: '事実と異なる内容について謝罪',
      channel: 'レビュー系YouTuber',
      time: '1日前',
      description: '誤解を与える発言について謝罪と訂正',
      videoId: 'l482T0yNkeo',
    },
  ];

  useEffect(() => {
    const initialMap = {};
    const likes = {};
    const mehs = {};
    const votes = {};
    articles.forEach((a) => {
      const key = `saved-${a.id}`;
      const voteKey = `vote-${a.id}`;
      initialMap[a.id] = localStorage.getItem(key) === 'true';
      likes[a.id] = parseInt(localStorage.getItem(`like-${a.id}`) || '0');
      mehs[a.id] = parseInt(localStorage.getItem(`meh-${a.id}`) || '0');
      votes[a.id] = localStorage.getItem(voteKey) || null;
    });
    setSavedMap(initialMap);
    setLikeCounts(likes);
    setMehCounts(mehs);
    setVoteStatus(votes);
  }, []);

  const handleVote = (id, type) => {
    const voteKey = `vote-${id}`;
    const currentVote = voteStatus[id];

    if (currentVote === type) {
      setVoteStatus((prev) => ({ ...prev, [id]: null }));
      localStorage.removeItem(voteKey);
      if (type === 'like') {
        setLikeCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
        localStorage.setItem(`like-${id}`, Math.max(0, (likeCounts[id] || 1) - 1));
      } else {
        setMehCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
        localStorage.setItem(`meh-${id}`, Math.max(0, (mehCounts[id] || 1) - 1));
      }
      return;
    }

    if (currentVote === 'like' && type === 'meh') {
      setLikeCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
      localStorage.setItem(`like-${id}`, Math.max(0, (likeCounts[id] || 1) - 1));
    }
    if (currentVote === 'meh' && type === 'like') {
      setMehCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
      localStorage.setItem(`meh-${id}`, Math.max(0, (mehCounts[id] || 1) - 1));
    }

    setVoteStatus((prev) => ({ ...prev, [id]: type }));
    localStorage.setItem(voteKey, type);
    if (type === 'like') {
      setLikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      localStorage.setItem(`like-${id}`, (likeCounts[id] || 0) + 1);
    } else {
      setMehCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      localStorage.setItem(`meh-${id}`, (mehCounts[id] || 0) + 1);
    }
  };

  const filtered = articles
    .filter((a) => {
      if (tab === 'saved') return savedMap[a.id];
      return true;
    })
    .filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <button
              onClick={() => handleTabClick('sokuho')}
              className="text-2xl font-bold text-gray-900 hover:underline"
            >
              サーセン速報
            </button>
            <p className="text-xs text-gray-500">YouTuberの謝罪動画をいち早くお届け！</p>
          </div>
          <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="検索"
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              🔍
            </button>
          </form>
          <nav className="flex gap-4 mt-3 sm:mt-0">
            {[{ label: '速報', value: 'sokuho' }, { label: 'ランキング', value: 'ranking' }, { label: '保存済み', value: 'saved' }].map((t) => (
              <button
                key={t.value}
                onClick={() => handleTabClick(t.value)}
                className={`font-semibold px-3 py-1 rounded-full ${tab === t.value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {tab === 'ranking' && (
        <div className="bg-white py-3 px-4 flex gap-3 justify-center border-b">
          {[{ label: '24時間', value: 'day' }, { label: '1週間', value: 'week' }, { label: '1ヶ月', value: 'month' }].map((r) => (
            <button
              key={r.value}
              onClick={() => handleRangeClick(r.value)}
              className={`text-sm px-3 py-1 rounded-full ${range === r.value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      <div className="bg-gray-100 text-center text-sm text-gray-600 py-2">
        <p>その謝罪は本音か　それともエンタメか</p>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col sm:flex-row items-start gap-4 relative"
          >
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setShowReport(a.id)}
                className="text-gray-400 hover:text-gray-700 px-2 py-1"
              >
                ⋮
              </button>
              {showReport === a.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-50 w-32">
                  <button className="text-sm text-red-500 w-full text-left">通報する</button>
                </div>
              )}
            </div>
            <div className="w-full sm:w-48 h-28 overflow-hidden rounded-md">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${a.videoId}?autoplay=1&mute=1&controls=1&playsinline=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-bold text-gray-900">{a.title}</h2>
              <p className="text-sm text-gray-500">
                {a.channel} ・ {a.time}
              </p>
              <p className="text-sm text-gray-700">{a.description}</p>
              <div className="flex gap-3 mt-3 items-center text-sm flex-wrap">
                <button
                  onClick={() => handleVote(a.id, 'like')}
                  className={`flex items-center gap-1 ${voteStatus[a.id] === 'like' ? 'bg-black text-white' : 'text-black bg-gray-200'} hover:bg-black hover:text-white px-3 py-1 rounded-full transition-all`}
                >
                  <ThumbsUp size={16} /> 誠意あり {likeCounts[a.id] || 0}
                </button>
                <button
                  onClick={() => handleVote(a.id, 'meh')}
                  className={`flex items-center gap-1 ${voteStatus[a.id] === 'meh' ? 'bg-black text-white' : 'text-black bg-gray-200'} hover:bg-black hover:text-white px-3 py-1 rounded-full transition-all`}
                >
                  <ThumbsDown size={16} /> うーん {mehCounts[a.id] || 0}
                </button>
                <button
                  onClick={() => {
                    const newSaved = !savedMap[a.id];
                    setSavedMap((prev) => ({ ...prev, [a.id]: newSaved }));
                    localStorage.setItem(`saved-${a.id}`, newSaved);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${savedMap[a.id] ? 'bg-black text-white' : 'text-black bg-gray-200 hover:bg-black hover:text-white'}`}
                >
                  <Bookmark size={16} /> {savedMap[a.id] ? '保存済み' : '保存'}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://www.youtube.com/watch?v=${a.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-black bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded-full transition-all"
                >
                  𝕏 共有
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}