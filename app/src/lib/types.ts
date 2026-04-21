export type LibraryStatus = 'reading' | 'finished' | 'wishlist';
export type ViewState = 'empty' | 'loading' | 'success' | 'error';

export interface ShelfBook {
  id: string;
  title: string;
  pageCount: number;
  status: LibraryStatus;
  dominantColor: string;
}

export interface RenderedBook extends ShelfBook {
  shelfNo: number;
  widthMm: number;
  worldX: number;
  worldY: number;
}
