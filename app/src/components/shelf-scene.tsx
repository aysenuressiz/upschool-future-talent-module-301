import { useMemo, useState } from 'react';

import { ThreeDShelfManager } from '@/lib/3d-shelf-manager';
import type { ShelfBook } from '@/lib/types';

interface ShelfSceneProps {
  books: ShelfBook[];
}

export function ShelfScene({ books }: ShelfSceneProps) {
  const manager = useMemo(() => new ThreeDShelfManager(), []);
  const placed = useMemo(() => manager.placeBooks(books), [books, manager]);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className='shelf-scene'>
      {placed.map((book) => (
        <button
          key={book.id}
          type='button'
          className='book-card'
          onClick={() => setActiveId(book.id)}
          style={{
            width: `${Math.max(32, book.widthMm)}px`,
            transform: `translate(${book.worldX}px, ${book.worldY}px) rotateY(${manager.getTiltRotationDeg(
              activeId === book.id
            )}deg)`,
            background: book.dominantColor,
          }}
        >
          <strong>{book.title}</strong>
          <span>{book.status}</span>
          <span>{book.pageCount} sayfa</span>
        </button>
      ))}
    </section>
  );
}
