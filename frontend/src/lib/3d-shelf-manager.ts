import type { RenderedBook, ShelfBook } from '@/lib/types';

const COVER_THICKNESS_MM = 2;

export class ThreeDShelfManager {
  private readonly shelfY = {
    finished: 220,
    reading: 120,
    wishlist: 20,
  };

  placeBooks(books: ShelfBook[]): RenderedBook[] {
    const counters = { finished: 0, reading: 0, wishlist: 0 };
    return books.map((book) => {
      const widthMm = this.calculateBookWidth(book.pageCount);
      const statusOffset = counters[book.status];
      counters[book.status] += 1;
      return {
        ...book,
        widthMm,
        shelfNo: this.getShelfNo(book.status),
        worldX: statusOffset * 22,
        worldY: this.shelfY[book.status],
      };
    });
  }

  calculateBookWidth(pageCount: number): number {
    return Number((pageCount * 0.05 + COVER_THICKNESS_MM).toFixed(2));
  }

  getShelfNo(status: ShelfBook['status']): number {
    if (status === 'finished') return 1;
    if (status === 'reading') return 2;
    return 3;
  }

  getTiltRotationDeg(isActive: boolean): number {
    return isActive ? 5 : 0;
  }
}
