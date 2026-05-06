import React from 'react';
import { LibraryDetailScreen } from './library-detail-screen';

interface LibraryFlowScreenProps {
  onBackHome: () => void;
  onOpenScan: () => void;
  onOpenAdd: () => void;
  onOpenProfile: () => void;
}

interface ShelfItem {
  id: string;
  name: string;
  count: number;
  covers: string[];
}

interface BookItem {
  id: string;
  title: string;
  author: string;
  pages: number;
  status: 'okundu' | 'okunmadi';
  liked: boolean;
  cover?: string;
}

const shelves: ShelfItem[] = [
  {
    id: 's1',
    name: 'Kurgu Favorileri',
    count: 24,
    covers: [
      'https://lh3.googleusercontent.com/aida/ADBb0ugtLvba-FQ4U8w_AxPz9HSRfgSjbJPGL9fRyXWcTz67X9KRvBLP7GU8vncaTyNx8QhVZCR9LA-6kfh0Ft_wzM9RJo5iFzR84ZrYT0yasY6oeLDnwS4uN3jTV4wAP1gIQD9MyN3VdxZCqLyeCnHoJn-LZEdjNnfzMM7lyeOoyMwuS0sQLTbJcwuchMjIv-FXS8V4PeykUsNyuauE0opKVLwq-Qfobf_KCVim06VEpKqLRs-_DLWJviXlejLxx9B8mnXnHBpdkS8SCQ',
      'https://lh3.googleusercontent.com/aida/ADBb0uhWoeWA6JS140rJ_UvDl-q0twzrL8GE70n3MvIUMiQ2dzuZYXBQ_ooWC1jFEbRoU6r_gQBptG_EiCQTr5P_FJHylrVISLVwIardjUdCjMo9A40p_5ClfjgFR0EgWON_0KKS7VF9AAJ1kRT8tZQpAsCC2Loph8_lVz_TPmFDrUcpdx01TFROck_QrtqcfM-HbMxtvb9lgxHzHDa7xgHf8W7_0_ds0jceWKIiumwYgn7m8Ncpuptvpkgqw0x-02bewdJ8OThNS_Rw_g',
    ],
  },
  {
    id: 's2',
    name: 'Bilim Kitapligi',
    count: 12,
    covers: ['https://lh3.googleusercontent.com/aida/ADBb0uh5t08mlc6NPf0cXwMgSNJneU5K-Etfa1hNJekl5N7t7Kg2gfVLUaYRf9AvTlRt0y86qnW3bLHBi_2K2ML-0V09YRRqqvk4KSiUD3qHIlobBplCBQez2NgDMknUTkV3zNUe4mwe-WdQZtmD6K2BvxSeORcmdHU3O7u9F-UYXBIJHQPRBew7cTDJkY2l0ZJ_GWj5iHT-ZXsTKuCHYM-u6dSJrGUCN178CkJNk3jjBKYYTIdvU6TN-WKaeBgfgA20g-Enw_HjCmOH6w'],
  },
  {
    id: 's3',
    name: 'Okunacaklar',
    count: 8,
    covers: [
      'https://lh3.googleusercontent.com/aida/ADBb0uitQMrI3bKQMr8M-B_PeFa2841RA-s4RmsPqjViSg0qO6pLxluEKxeuKaAng33x9qtfkIhduvxsZRz5Lfkp_quqheLuJFNXHZlj7Tgx3E_tLQFARmP186yFsPeZJae0ITZcub9v0ZLqDhL3lYDBTFX51SE6kqddG1gD2wPG1roxrC9vPtWCdOW6patR0I8l7G3XGmRV3aQE3pQb3n7TxA-ZS0WAGucKKzbIswy2zd3-FncRdw7mdrXPMyIZskHXdkkdQrUPTNNeFQ',
      'https://lh3.googleusercontent.com/aida/ADBb0uippQdikdnE7l9zKMUUSQ5N_5rYgaBcUxAkYX-ishpriLDNPuxZIzGMQnJuqjRV88sUKZXZCymcyh2DarxzoKRrk96iQ56YyabB8CUFg9layf-NIxurpvQ8wcgSij4jvZJH_0OeH2t-a8rx4Eb9KPTr09bXzp6GToYkoDrisP2Omqr4CpIjSERHpq2kO72Nh__MZGvVaD-jtlEhhORSGdJlZgOR-Q0Cq-wCof4RY7DDUMB14E2k57b5MxBgJ-3aqEgJo7WZ5YlBWA',
    ],
  },
];

const allBooks: BookItem[] = [
  {
    id: 'b1',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    pages: 662,
    status: 'okunmadi',
    liked: true,
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGW07X_VmO8W-uH2l5HqHbe_Fg_IYImONKT5HGy_DlIDt96MKHyjBCNmicBUcFA0BCf7TwQmAzI7t7BdAQj1IIoVVOk65yY-873Dw74okrM_l-ZRLdyoJXV6pzXLjYgfo6v4d2JHbJeTvuotRSpaCXcKeTAJiQjVNkroq4Cdqf_F2pE9cvbPe8rs6oUInrxN7S6pXcgrZZhVh4jxjGZ2uAa2uXmYCLVzmXdbAqtOXqEcvyuvGpIetDslanKHqg9Fo-IwNX5FZ5X5E',
  },
  {
    id: 'b2',
    title: 'Dune',
    author: 'Frank Herbert',
    pages: 544,
    status: 'okundu',
    liked: true,
    cover:
      'https://lh3.googleusercontent.com/aida/ADBb0uhWoeWA6JS140rJ_UvDl-q0twzrL8GE70n3MvIUMiQ2dzuZYXBQ_ooWC1jFEbRoU6r_gQBptG_EiCQTr5P_FJHylrVISLVwIardjUdCjMo9A40p_5ClfjgFR0EgWON_0KKS7VF9AAJ1kRT8tZQpAsCC2Loph8_lVz_TPmFDrUcpdx01TFROck_QrtqcfM-HbMxtvb9lgxHzHDa7xgHf8W7_0_ds0jceWKIiumwYgn7m8Ncpuptvpkgqw0x-02bewdJ8OThNS_Rw_g',
  },
  {
    id: 'b3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    pages: 496,
    status: 'okunmadi',
    liked: false,
    cover:
      'https://lh3.googleusercontent.com/aida/ADBb0ugxZgKmy3NST0ngfIdKhAgG9vh2xAG84Xb_b6pfWqjoltfJp1RdYJ6vFxbgHo3xF_Dn5lDjBFPgIAYB5Ih6pH_1LSNxq8ZJKKTwnk9psuMZdOYFQkB1W2H9gU0CqpfYWi5Xxn9dSJPOC9dVDFHuWAqSzJ0ALsbsr1nwM96TC4jaN6sl8jk5q-UwVgdi6PhfkjRZOHenalf6YFGArGYpa7CZhz9NmhLvDZPZrAXaivOJdL_1jln8Ya7JlfCZAsME0-Tfuz9n5wCP0Q',
  },
  {
    id: 'b4',
    title: 'Foundation',
    author: 'Isaac Asimov',
    pages: 296,
    status: 'okundu',
    liked: false,
    cover:
      'https://lh3.googleusercontent.com/aida/ADBb0ugtLvba-FQ4U8w_AxPz9HSRfgSjbJPGL9fRyXWcTz67X9KRvBLP7GU8vncaTyNx8QhVZCR9LA-6kfh0Ft_wzM9RJo5iFzR84ZrYT0yasY6oeLDnwS4uN3jTV4wAP1gIQD9MyN3VdxZCqLyeCnHoJn-LZEdjNnfzMM7lyeOoyMwuS0sQLTbJcwuchMjIv-FXS8V4PeykUsNyuauE0opKVLwq-Qfobf_KCVim06VEpKqLRs-_DLWJviXlejLxx9B8mnXnHBpdkS8SCQ',
  },
];

type Tab = 'kutuphane' | 'kitaplar';
type SortType = 'ad' | 'yazar' | 'sayfa';
type FilterType = 'tum' | 'okunanlar' | 'okunmayanlar' | 'begenilenler';

export function LibraryFlowScreen({ onBackHome, onOpenScan, onOpenAdd, onOpenProfile }: LibraryFlowScreenProps) {
  const [tab, setTab] = React.useState<Tab>('kutuphane');
  const [selectedShelf, setSelectedShelf] = React.useState<ShelfItem | null>(null);
  const [sortBy, setSortBy] = React.useState<SortType>('ad');
  const [filterBy, setFilterBy] = React.useState<FilterType>('tum');
  const [showSort, setShowSort] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const shelfCols = 3;
  const shelfRows = 5;

  const books = React.useMemo(() => {
    let list = [...allBooks];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((book) => `${book.title} ${book.author}`.toLowerCase().includes(q));
    if (filterBy === 'okunanlar') list = list.filter((book) => book.status === 'okundu');
    if (filterBy === 'okunmayanlar') list = list.filter((book) => book.status === 'okunmadi');
    if (filterBy === 'begenilenler') list = list.filter((book) => book.liked);

    if (sortBy === 'ad') list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'yazar') list.sort((a, b) => a.author.localeCompare(b.author));
    if (sortBy === 'sayfa') list.sort((a, b) => a.pages - b.pages);
    return list;
  }, [filterBy, sortBy, query]);

  if (selectedShelf) {
    return (
      <LibraryDetailScreen
        onBack={() => setSelectedShelf(null)}
        onBackHome={onBackHome}
        onOpenAdd={onOpenAdd}
        onOpenProfile={onOpenProfile}
        onOpenScan={onOpenScan}
        selectedShelf={selectedShelf}
        shelfCols={shelfCols}
        shelfRows={shelfRows}
      />
    );
  }

  return (
    <section className='library-page'>
      <header className='home-topbar'>
        <button className='home-icon-btn' type='button'>
          <span className='material-symbols-outlined'>menu</span>
        </button>
        <h1>UNISHELF</h1>
        <button className='home-avatar-btn' onClick={onOpenProfile} type='button'>
          <img
            alt='User'
            src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
          />
        </button>
      </header>

      <main className='library-main'>
        <div className='library-segmented'>
          <button className={tab === 'kutuphane' ? 'active' : ''} onClick={() => setTab('kutuphane')} type='button'>
            Kutuphane
          </button>
          <button className={tab === 'kitaplar' ? 'active' : ''} onClick={() => setTab('kitaplar')} type='button'>
            Kitaplar
          </button>
        </div>

        {tab === 'kutuphane' && (
          <section className='shelves-grid shelves-grid--mobile'>
            {shelves.map((shelf) => (
              <article className='shelf-card' key={shelf.id} onClick={() => setSelectedShelf(shelf)}>
                <div className='shelf-head'>
                  <div>
                    <h3>{shelf.name}</h3>
                    <span>{shelf.count} Kitap</span>
                  </div>
                  <button className='home-icon-btn' type='button'>
                    <span className='material-symbols-outlined'>more_vert</span>
                  </button>
                </div>
                <div className='shelf-covers'>
                  {shelf.covers.slice(0, 2).map((cover) => (
                    <img alt='Book cover' key={cover} src={cover} />
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {tab === 'kitaplar' && (
          <section className='books-section'>
            <div className='books-toolbar books-toolbar--mobile'>
              <div className='search-pill'>
                <span className='material-symbols-outlined'>search</span>
                <input onChange={(e) => setQuery(e.target.value)} placeholder='Kitap ara...' value={query} />
              </div>
              <div className='toolbar-icons'>
                <button onClick={() => setShowSort((prev) => !prev)} type='button' aria-label='Sirala'>
                  <span className='material-symbols-outlined'>sort</span>
                </button>
                <button onClick={() => setShowFilter((prev) => !prev)} type='button' aria-label='Filtrele'>
                  <span className='material-symbols-outlined'>filter_list</span>
                </button>
              </div>
              {showSort && (
                <div className='toolbar-pop'>
                  <button
                    className={sortBy === 'ad' ? 'is-active' : ''}
                    onClick={() => {
                      setSortBy('ad');
                      setShowSort(false);
                    }}
                    type='button'
                  >
                    Ada gore A-Z sirala
                  </button>
                  <button
                    className={sortBy === 'yazar' ? 'is-active' : ''}
                    onClick={() => {
                      setSortBy('yazar');
                      setShowSort(false);
                    }}
                    type='button'
                  >
                    Yazara gore A-Z sirala
                  </button>
                  <button
                    className={sortBy === 'sayfa' ? 'is-active' : ''}
                    onClick={() => {
                      setSortBy('sayfa');
                      setShowSort(false);
                    }}
                    type='button'
                  >
                    Sayfa sayisina gore azdan coka sirala
                  </button>
                </div>
              )}
              {showFilter && (
                <div className='toolbar-pop'>
                  <button
                    className={filterBy === 'okunanlar' ? 'is-active' : ''}
                    onClick={() => {
                      setFilterBy('okunanlar');
                      setShowFilter(false);
                    }}
                    type='button'
                  >
                    Okunanlar
                  </button>
                  <button
                    className={filterBy === 'okunmayanlar' ? 'is-active' : ''}
                    onClick={() => {
                      setFilterBy('okunmayanlar');
                      setShowFilter(false);
                    }}
                    type='button'
                  >
                    Okunmayanlar
                  </button>
                  <button
                    className={filterBy === 'begenilenler' ? 'is-active' : ''}
                    onClick={() => {
                      setFilterBy('begenilenler');
                      setShowFilter(false);
                    }}
                    type='button'
                  >
                    Begenilenler
                  </button>
                  <button
                    className={filterBy === 'tum' ? 'is-active' : ''}
                    onClick={() => {
                      setFilterBy('tum');
                      setShowFilter(false);
                    }}
                    type='button'
                  >
                    Tum kitaplar
                  </button>
                </div>
              )}
            </div>

            <div className='books-chips'>
              <span className='chip'>Sirala: {sortBy === 'ad' ? 'Ad (A-Z)' : sortBy === 'yazar' ? 'Yazar (A-Z)' : 'Sayfa (Az→Cok)'}</span>
              <span className='chip'>
                Filtre: {filterBy === 'tum' ? 'Tum kitaplar' : filterBy === 'okunanlar' ? 'Okunanlar' : filterBy === 'okunmayanlar' ? 'Okunmayanlar' : 'Begenilenler'}
              </span>
            </div>

            <div className='books-grid'>
              {books.map((book) => (
                <article className='book-card' key={book.id}>
                  <div className='book-cover'>
                    {book.cover ? <img alt={book.title} src={book.cover} /> : <div className='book-cover-empty' />}
                    <span className={`status-chip ${book.status === 'okundu' ? 'okundu' : 'okunuyor'}`}>
                      {book.status === 'okundu' ? 'Okundu' : 'Okunuyor'}
                    </span>
                  </div>
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </article>
              ))}
            </div>
          </section>
        )}
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
