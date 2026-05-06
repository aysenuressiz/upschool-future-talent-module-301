import React from 'react';

interface ShelfItem {
  id: string;
  name: string;
  count: number;
  covers: string[];
}

interface LibraryDetailScreenProps {
  selectedShelf: ShelfItem;
  shelfRows: number;
  shelfCols: number;
  onBack: () => void;
  onBackHome: () => void;
  onOpenScan: () => void;
  onOpenAdd: () => void;
  onOpenProfile: () => void;
}

export function LibraryDetailScreen({
  selectedShelf,
  shelfRows,
  shelfCols,
  onBack,
  onBackHome,
  onOpenScan,
  onOpenAdd,
  onOpenProfile,
}: LibraryDetailScreenProps) {
  return (
    <section className='library-page'>
      <header className='add-topbar'>
        <button className='home-icon-btn' onClick={onBack} type='button'>
          <span className='material-symbols-outlined'>arrow_back</span>
        </button>
        <h1>KUTUPHANE {selectedShelf.name.toUpperCase()}</h1>
        <div className='topbar-spacer' />
      </header>

      <main className='library-main library-detail'>
        <section className='library-controls'>
          <div>
            <p>Total Books</p>
            <h3>{selectedShelf.count}</h3>
            <p className='library-meta'>Raf: {shelfRows} satir × {shelfCols} sutun</p>
          </div>
          <div className='control-actions'>
            <button type='button'>
              <span className='material-symbols-outlined'>filter_list</span> Filter
            </button>
            <button type='button'>
              <span className='material-symbols-outlined'>search</span> Search
            </button>
          </div>
        </section>

        <section className='shelf-3d'>
          <div className='shelf-frame'>
            <div className='shelf-grid shelf-grid--detail'>
              {Array.from({ length: shelfCols * shelfRows }).map((_, idx) => (
                <div className='shelf-cell' key={idx}>
                  {Math.random() > 0.35 && <span style={{ height: `${44 + (idx % 5) * 10}px` }} />}
                  {Math.random() > 0.65 && <span style={{ height: `${34 + (idx % 4) * 12}px`, opacity: 0.85, marginLeft: 6 }} />}
                </div>
              ))}
            </div>
            <div className='shelf-zoom'>
              <button type='button'>
                <span className='material-symbols-outlined'>add</span>
              </button>
              <button type='button'>
                <span className='material-symbols-outlined'>remove</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <nav className='library-bottom-nav'>
        <button onClick={onBackHome} type='button'>
          <span className='material-symbols-outlined'>home</span>
          <span>Home</span>
        </button>
        <button className='active' type='button'>
          <span className='material-symbols-outlined filled-icon'>library_books</span>
          <span>Library</span>
        </button>
        <button className='scan' onClick={onOpenScan} type='button'>
          <span className='material-symbols-outlined'>qr_code_scanner</span>
          <span>Scan</span>
        </button>
        <button onClick={onOpenAdd} type='button'>
          <span className='material-symbols-outlined'>add_circle</span>
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

