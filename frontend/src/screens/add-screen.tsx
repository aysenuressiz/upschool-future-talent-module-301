import React from 'react';
import { BookAddFormScreen } from './add/book-add-form-screen';
import { LibraryAddFormScreen } from './add/library-add-form-screen';
import { LoanAddFormScreen } from './add/loan-add-form-screen';
import { PostAddFormScreen } from './add/post-add-form-screen';
import { WishlistAddFormScreen } from './add/wishlist-add-form-screen';

interface AddScreenProps {
  onBackHome: () => void;
  onOpenLibrary: () => void;
  onOpenScan: () => void;
  onOpenProfile: () => void;
}

type AddMode = 'menu' | 'library' | 'book' | 'loan' | 'wishlist' | 'post';

export function AddScreen({ onBackHome, onOpenLibrary, onOpenScan, onOpenProfile }: AddScreenProps) {
  const wishlistBooks = [
    { id: 'w1', title: 'Dune', author: 'Frank Herbert', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=420&fit=crop' },
    { id: 'w2', title: '1984', author: 'George Orwell', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=420&fit=crop' },
    { id: 'w3', title: 'Sapiens', author: 'Yuval Noah Harari', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=420&fit=crop' },
    { id: 'w4', title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=420&fit=crop' },
  ];

  const [mode, setMode] = React.useState<AddMode>('menu');
  const [notice, setNotice] = React.useState('');

  const [shelfName, setShelfName] = React.useState('');
  const [shelfRow, setShelfRow] = React.useState('');
  const [shelfCol, setShelfCol] = React.useState('');

  const [bookName, setBookName] = React.useState('');
  const [bookAuthor, setBookAuthor] = React.useState('');
  const [bookPages, setBookPages] = React.useState('');
  const [bookReadPages, setBookReadPages] = React.useState('');
  const [bookStatus, setBookStatus] = React.useState('');

  const [loanBook, setLoanBook] = React.useState('');
  const [loanPerson, setLoanPerson] = React.useState('');
  const [loanDate, setLoanDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');

  const [wishlistTab, setWishlistTab] = React.useState<'arama' | 'onerilen' | 'liste'>('arama');
  const [wishlistResult, setWishlistResult] = React.useState('');

  const [postType, setPostType] = React.useState<'inceleme' | 'alinti' | 'paylasim'>('inceleme');
  const [postText, setPostText] = React.useState('');

  const topbarTitle =
    mode === 'menu'
      ? 'UNISHELF'
      : mode === 'library'
        ? 'KITAPLIK EKLE'
        : mode === 'book'
          ? 'KITAP EKLE'
          : mode === 'loan'
            ? 'ODUNC EKLE'
            : mode === 'wishlist'
              ? 'ISTEK LISTESINE EKLE'
              : 'GONDERI EKLE';

  const handleBookStatus = () => {
    const total = Number(bookPages);
    const read = Number(bookReadPages);
    if (!Number.isFinite(total) || !Number.isFinite(read) || total <= 0 || read < 0) {
      setBookStatus('Gecerli sayfa degeri girin.');
      return;
    }
    if (read === total) setBookStatus('kitap okunmustur');
    else if (read === 0) setBookStatus('kitap okunmamistir');
    else if (read < total) setBookStatus('kitap okunuyordur');
    else setBookStatus('okunan sayfa toplamdan buyuk olamaz');
  };

  return (
    <section className='add-page'>
      {mode === 'menu' ? (
        <header className='home-topbar'>
          <button className='home-icon-btn' type='button'>
            <span className='material-symbols-outlined'>menu</span>
          </button>
          <h1>UNISHELF</h1>
          <button className='home-avatar-btn' onClick={onOpenProfile} type='button'>
            <img
              alt='User avatar'
              src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
            />
          </button>
        </header>
      ) : (
        <header className='add-topbar'>
          <button className='home-icon-btn' onClick={() => setMode('menu')} type='button'>
            <span className='material-symbols-outlined'>arrow_back</span>
          </button>
          <h1>{topbarTitle}</h1>
          <div className='topbar-spacer' />
        </header>
      )}

      <main className='add-main'>
        <div className='add-header'>
          {mode === 'menu' && <h2>Yeni Ekle</h2>}
          <p>
            {mode === 'menu' && 'Ne eklemek istersiniz?'}
            {mode === 'library' && 'Kitaplik adi, satir ve sutun bilgilerini girin.'}
            {mode === 'book' && 'Kitap bilgilerini doldurun ve durumu hesaplayin.'}
            {mode === 'loan' && 'Odunc bilgilerini doldurarak listeye ekleyin.'}
            {mode === 'wishlist' && 'Arama, onerilen veya liste ikonu ile ilerleyin.'}
            {mode === 'post' && 'Inceleme, alinti veya paylasim turu secin.'}
          </p>
        </div>

        {notice && <p className='scan-notice'>{notice}</p>}

        {mode === 'menu' && (
          <section className='add-grid'>
            <button className='add-card add-card--hero' onClick={() => setMode('library')} type='button'>
              <div className='add-card-bg' aria-hidden='true' />
              <div className='add-icon add-icon--primary'>
                <span className='material-symbols-outlined'>view_in_ar</span>
              </div>
              <h3>3D Kitaplik ekle</h3>
              <p>Fiziksel kitapliginizi dijitale tasiyin</p>
            </button>

            <button className='add-card add-card--square' onClick={() => setMode('book')} type='button'>
              <div className='add-icon add-icon--amber'>
                <span className='material-symbols-outlined'>book</span>
              </div>
              <h3>kitap ekle</h3>
            </button>

            <button className='add-card add-card--square' onClick={() => setMode('post')} type='button'>
              <div className='add-icon add-icon--mint'>
                <span className='material-symbols-outlined'>post_add</span>
              </div>
              <h3>gonderi ekle</h3>
            </button>

            <button className='add-card add-card--wide' onClick={() => setMode('wishlist')} type='button'>
              <div className='add-icon add-icon--sand'>
                <span className='material-symbols-outlined'>bookmark_add</span>
              </div>
              <h3>istek listesine kitap ekle</h3>
            </button>

            <button className='add-card add-card--wide' onClick={() => setMode('loan')} type='button'>
              <div className='add-icon add-icon--outline'>
                <span className='material-symbols-outlined'>sync_alt</span>
              </div>
              <h3>odunc ekle</h3>
            </button>
          </section>
        )}

        {mode === 'library' && (
          <LibraryAddFormScreen
            onShelfColChange={setShelfCol}
            onShelfNameChange={setShelfName}
            onShelfRowChange={setShelfRow}
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(`"${shelfName}" kitapligi (${shelfRow}x${shelfCol}) kutuphane alanina eklendi.`);
              setMode('menu');
            }}
            shelfCol={shelfCol}
            shelfName={shelfName}
            shelfRow={shelfRow}
          />
        )}

        {mode === 'book' && (
          <BookAddFormScreen
            bookAuthor={bookAuthor}
            bookName={bookName}
            bookPages={bookPages}
            bookReadPages={bookReadPages}
            bookStatus={bookStatus}
            onBookAuthorChange={setBookAuthor}
            onBookNameChange={setBookName}
            onBookPagesChange={setBookPages}
            onBookReadPagesChange={setBookReadPages}
            onSubmit={(e) => {
              e.preventDefault();
              handleBookStatus();
              setNotice(`"${bookName}" kitaplar alanina eklendi.`);
            }}
          />
        )}

        {mode === 'loan' && (
          <LoanAddFormScreen
            loanBook={loanBook}
            loanDate={loanDate}
            loanPerson={loanPerson}
            onLoanBookChange={setLoanBook}
            onLoanDateChange={setLoanDate}
            onLoanPersonChange={setLoanPerson}
            onReturnDateChange={setReturnDate}
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(`"${loanBook}" odunc listesine eklendi. Kisi: ${loanPerson}`);
              setMode('menu');
            }}
            returnDate={returnDate}
          />
        )}

        {mode === 'wishlist' && (
          <WishlistAddFormScreen
            onAddBook={(title) => setWishlistResult(`"${title}" istek listesine eklendi.`)}
            onOpenList={() => setWishlistTab('liste')}
            onSetResult={setWishlistResult}
            wishlistBooks={wishlistBooks}
            wishlistResult={wishlistResult}
            wishlistTab={wishlistTab}
          />
        )}

        {mode === 'post' && (
          <PostAddFormScreen
            onPostTextChange={setPostText}
            onPostTypeChange={setPostType}
            onShare={() => setNotice(`Gonderi paylasildi (${postType}).`)}
            postText={postText}
            postType={postType}
          />
        )}
      </main>

      <nav className='home-bottom-nav'>
        <button onClick={onBackHome} type='button'>
          <span className='material-symbols-outlined'>home</span>
          <span>Home</span>
        </button>
        <button onClick={onOpenLibrary} type='button'>
          <span className='material-symbols-outlined filled-icon'>library_books</span>
          <span>Library</span>
        </button>
        <button className='scan' onClick={onOpenScan} type='button'>
          <span className='material-symbols-outlined'>qr_code_scanner</span>
          <span>Scan</span>
        </button>
        <button className='active' type='button'>
          <span className='material-symbols-outlined filled-icon'>add_circle</span>
          <span>Add</span>
        </button>
        <button onClick={onOpenProfile} type='button'>
          <span className='material-symbols-outlined'>person</span>
          <span>Profile</span>
        </button>
      </nav>
    </section>
  );
}

