import React from 'react';
import ReactDOM from 'react-dom/client';

import { ShelfScene } from '@/components/shelf-scene';
import { ShelfStateView } from '@/components/shelf-state-view';
import type { ShelfBook } from '@/lib/types';
import '@/styles/app.css';

const books: ShelfBook[] = [
  { id: '1', title: 'Deep Work', pageCount: 304, status: 'reading', dominantColor: 'warm' },
  { id: '2', title: 'Atomic Habits', pageCount: 320, status: 'finished', dominantColor: 'cool' },
  { id: '3', title: 'Clean Code', pageCount: 464, status: 'wishlist', dominantColor: 'surface' },
];

function App() {
  const state = books.length === 0 ? 'empty' : 'success';
  return (
    <main className='page'>
      <ShelfStateView state={state} />
      <ShelfScene books={books} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
