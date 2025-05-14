'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Home from './_components/Home';

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <Home />
    </Suspense>
  );
}
