import React from 'react';

interface HomeScreenProps {
  onBackToLogin: () => void;
  onOpenLibrary: () => void;
  onOpenScan: () => void;
  onOpenAdd: () => void;
  onOpenProfile: () => void;
}

interface FeedItem {
  id: string;
  user: string;
  time: string;
  avatar: string;
  quote: string;
  author: string;
  image: string;
  likes: number;
}

const initialFeed: FeedItem[] = [
  {
    id: '1',
    user: 'Ayse Yilmaz',
    time: '2 saat once',
    avatar:
      'https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ',
    quote: '"Okumak, iki ruh arasinda, kalabaliklar icinde gizlice varilan bir sessizlik anlasmasidir."',
    author: 'Ahmet Hamdi Tanpinar',
    image:
      'https://lh3.googleusercontent.com/aida/ADBb0ugxZgKmy3NST0ngfIdKhAgG9vh2xAG84Xb_b6pfWqjoltfJp1RdYJ6vFxbgHo3xF_Dn5lDjBFPgIAYB5Ih6pH_1LSNxq8ZJKKTwnk9psuMZdOYFQkB1W2H9gU0CqpfYWi5Xxn9dSJPOC9dVDFHuWAqSzJ0ALsbsr1nwM96TC4jaN6sl8jk5q-UwVgdi6PhfkjRZOHenalf6YFGArGYpa7CZhz9NmhLvDZPZrAXaivOJdL_1jln8Ya7JlfCZAsME0-Tfuz9n5wCP0Q',
    likes: 24,
  },
  {
    id: '2',
    user: 'Caner Kaya',
    time: '5 saat once',
    avatar:
      'https://lh3.googleusercontent.com/aida/ADBb0ugtLvba-FQ4U8w_AxPz9HSRfgSjbJPGL9fRyXWcTz67X9KRvBLP7GU8vncaTyNx8QhVZCR9LA-6kfh0Ft_wzM9RJo5iFzR84ZrYT0yasY6oeLDnwS4uN3jTV4wAP1gIQD9MyN3VdxZCqLyeCnHoJn-LZEdjNnfzMM7lyeOoyMwuS0sQLTbJcwuchMjIv-FXS8V4PeykUsNyuauE0opKVLwq-Qfobf_KCVim06VEpKqLRs-_DLWJviXlejLxx9B8mnXnHBpdkS8SCQ',
    quote: 'Doga ve insan iliskisi uzerine muazzam bir inceleme. Her sayfasinda topragin kokusunu hissediyorsunuz.',
    author: 'Topragin Uyanisi',
    image:
      'https://lh3.googleusercontent.com/aida/ADBb0uhWoeWA6JS140rJ_UvDl-q0twzrL8GE70n3MvIUMiQ2dzuZYXBQ_ooWC1jFEbRoU6r_gQBptG_EiCQTr5P_FJHylrVISLVwIardjUdCjMo9A40p_5ClfjgFR0EgWON_0KKS7VF9AAJ1kRT8tZQpAsCC2Loph8_lVz_TPmFDrUcpdx01TFROck_QrtqcfM-HbMxtvb9lgxHzHDa7xgHf8W7_0_ds0jceWKIiumwYgn7m8Ncpuptvpkgqw0x-02bewdJ8OThNS_Rw_g',
    likes: 112,
  },
];

export function HomeScreen({ onBackToLogin, onOpenLibrary, onOpenScan, onOpenAdd, onOpenProfile }: HomeScreenProps) {
  const [liked, setLiked] = React.useState<Record<string, boolean>>({});
  const [saved, setSaved] = React.useState<Record<string, boolean>>({});
  const [shareMenu, setShareMenu] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState('');

  const handleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setNotice('Begenilenlere eklendi.');
  };

  const handleSave = (id: string) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
    setNotice('Kaydedilenlere eklendi.');
  };

  const handleShare = (id: string) => {
    setShareMenu(null);
    setNotice(`Alinti paylasima hazirlandi (#${id}).`);
  };

  return (
    <section className='home-page'>
      <header className='home-topbar'>
        <button className='home-icon-btn' type='button'>
          <span className='material-symbols-outlined'>menu</span>
        </button>
        <h1>UNISHELF</h1>
        <button className='home-avatar-btn' onClick={onBackToLogin} type='button'>
          <img
            alt='User avatar'
            src='https://lh3.googleusercontent.com/aida/ADBb0ugwSPgOIcpD-EzkOja75ID88eI2hKECrF2YkAJOpTT2NB4w6RDlNNEquBGAouP-EXjv8_eSjRAjAqgBp7HcdTL-kRJUZP4CJkyrxw5-f0hDDymawgVKPm-3pgDXOMigullZA1zJxl_Kt3GCkRgMvZY0STR04GzdS9o7j7nR74nVImdJYKv7ffAuTBUhE2JWmQ2Dvm3DA0pBtiufa-9EmziQPfwpwU1YMMtPAB8sZL1LLEKiBJpi75dRRA'
          />
        </button>
      </header>

      {notice && <p className='home-notice'>{notice}</p>}

      <main className='home-feed'>
        {initialFeed.map((item) => (
          <article className='post-card' key={item.id}>
            <div className='post-head'>
              <div className='post-user'>
                <img alt={item.user} src={item.avatar} />
                <div>
                  <h3>{item.user}</h3>
                  <p>{item.time}</p>
                </div>
              </div>
              <div className='post-menu-wrap'>
                <button className='home-icon-btn' onClick={() => setShareMenu(shareMenu === item.id ? null : item.id)} type='button'>
                  <span className='material-symbols-outlined'>more_vert</span>
                </button>
                {shareMenu === item.id && (
                  <div className='share-pop'>
                    <button className='share-action' onClick={() => handleShare(item.id)} type='button'>
                      <span className='material-symbols-outlined'>share</span>
                      <span>Paylas</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='post-content'>
              <p className='quote'>{item.quote}</p>
              <p className='author'>- {item.author}</p>
            </div>
            <img alt='Post image' className='post-image' src={item.image} />

            <div className='post-actions'>
              <button className={liked[item.id] ? 'active-like' : ''} onClick={() => handleLike(item.id)} type='button'>
                <span className={`material-symbols-outlined ${liked[item.id] ? 'filled-icon' : ''}`}>{liked[item.id] ? 'favorite' : 'favorite_border'}</span>
                <span>{item.likes + (liked[item.id] ? 1 : 0)}</span>
              </button>
              <button className={saved[item.id] ? 'active-save' : ''} onClick={() => handleSave(item.id)} type='button'>
                <span className={`material-symbols-outlined ${saved[item.id] ? 'filled-icon' : ''}`}>{saved[item.id] ? 'bookmark' : 'bookmark_border'}</span>
              </button>
            </div>
          </article>
        ))}
      </main>

      <nav className='home-bottom-nav'>
        <button className='active' type='button'>
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
