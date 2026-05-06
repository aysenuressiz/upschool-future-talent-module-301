import React from 'react';

interface ProfileScreenProps {
  onBackHome: () => void;
  onOpenLibrary: () => void;
  onOpenScan: () => void;
  onOpenAdd: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onBackHome, onOpenLibrary, onOpenScan, onOpenAdd, onLogout }: ProfileScreenProps) {
  return (
    <section className='home-page'>
      <header className='home-topbar'>
        <button className='home-icon-btn' type='button'>
          <span className='material-symbols-outlined'>menu</span>
        </button>
        <h1>UNISHELF</h1>
        <button className='home-avatar-btn' onClick={onLogout} type='button'>
          <img
            alt='User avatar'
            src='https://lh3.googleusercontent.com/aida/ADBb0ugwSPgOIcpD-EzkOja75ID88eI2hKECrF2YkAJOpTT2NB4w6RDlNNEquBGAouP-EXjv8_eSjRAjAqgBp7HcdTL-kRJUZP4CJkyrxw5-f0hDDymawgVKPm-3pgDXOMigullZA1zJxl_Kt3GCkRgMvZY0STR04GzdS9o7j7nR74nVImdJYKv7ffAuTBUhE2JWmQ2Dvm3DA0pBtiufa-9EmziQPfwpwU1YMMtPAB8sZL1LLEKiBJpi75dRRA'
          />
        </button>
      </header>

      <main className='profile-main'>
        <section className='profile-card'>
          <img
            alt='Profile'
            className='profile-cover'
            src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
          />
          <h2>Ayse Yilmaz</h2>
          <p>@ayseyilmaz</p>
          <div className='profile-stats'>
            <span>42 Kitap</span>
            <span>18 Raf</span>
            <span>126 Gonderi</span>
          </div>
          <button className='scan-primary' onClick={onLogout} type='button'>Cikis Yap</button>
        </section>
      </main>

      <nav className='home-bottom-nav'>
        <button onClick={onBackHome} type='button'>
          <span className='material-symbols-outlined'>home</span>
          <span>Home</span>
        </button>
        <button onClick={onOpenLibrary} type='button'>
          <span className='material-symbols-outlined'>library_books</span>
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
        <button className='active' type='button'>
          <span className='material-symbols-outlined filled-icon'>person</span>
          <span>Profile</span>
        </button>
      </nav>
    </section>
  );
}

