import React from 'react';

interface WishlistBook {
  id: string;
  title: string;
  author: string;
  cover: string;
}

interface WishlistAddFormScreenProps {
  wishlistBooks: WishlistBook[];
  wishlistTab: 'arama' | 'onerilen' | 'liste';
  wishlistResult: string;
  onOpenList: () => void;
  onAddBook: (title: string) => void;
  onSetResult: (value: string) => void;
}

export function WishlistAddFormScreen({
  wishlistBooks,
  wishlistTab,
  wishlistResult,
  onOpenList,
  onAddBook,
  onSetResult,
}: WishlistAddFormScreenProps) {
  return (
    <section className='add-form'>
      <div className='wish-search-row'>
        <div className='input-with-icon wish-search-input'>
          <input placeholder='KITAP ARA' />
          <span className='material-symbols-outlined'>search</span>
        </div>
        <button aria-label='Istek listesi' className='scan-secondary wish-icon-btn' onClick={onOpenList} type='button'>
          <span className='material-symbols-outlined'>bookmark</span>
        </button>
      </div>

      <div className='books-grid'>
        {wishlistBooks.map((book) => (
          <article className='book-card' key={`wish-${book.id}`}>
            <div className='book-cover'>{book.cover ? <img alt={book.title} src={book.cover} /> : <div className='book-cover-empty' />}</div>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button
              className='wishlist-add-btn'
              onClick={() => onAddBook(book.title)}
              type='button'
            >
              <span className='material-symbols-outlined'>add</span>
              istek listesine ekle
            </button>
          </article>
        ))}
      </div>
      {wishlistTab === 'arama' && (
        <button className='scan-primary' onClick={() => onSetResult('Arama sonucundan kitap istek listesine eklendi.')} type='button'>Arama sonucu ekle</button>
      )}
      {wishlistTab === 'onerilen' && (
        <button className='scan-primary' onClick={() => onSetResult('Onerilen kitap istek listesine eklendi.')} type='button'>Onerilen kitap ekle</button>
      )}
      {wishlistTab === 'liste' && <p className='chip'>Istek listesi goruntuleniyor.</p>}
      {wishlistResult && <p className='scan-notice'>{wishlistResult}</p>}
    </section>
  );
}

