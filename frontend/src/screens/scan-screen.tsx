import React from 'react';

interface ScanScreenProps {
  onBackHome: () => void;
  onOpenLibrary: () => void;
  onOpenAdd: () => void;
  onOpenProfile: () => void;
}

type ScanStep = 'cameraOpen' | 'kameraIsbn' | 'galeriIsbn' | 'isbnBul' | 'ekliIse' | 'ekliDegilse';

export function ScanScreen({ onBackHome, onOpenLibrary, onOpenAdd, onOpenProfile }: ScanScreenProps) {
  const [flash, setFlash] = React.useState(false);
  const [step, setStep] = React.useState<ScanStep>('cameraOpen');
  const [notice, setNotice] = React.useState('');

  const runFlow = (source: 'camera' | 'gallery') => {
    setNotice('');
    setStep(source === 'camera' ? 'kameraIsbn' : 'galeriIsbn');
    setStep('isbnBul');
    const exists = Math.random() > 0.5;
    setStep(exists ? 'ekliIse' : 'ekliDegilse');
    setNotice(exists ? 'Kitap ekli. Oldugu rafa gidilebilir.' : 'Kitap ekli degil. Bilgiler cekilip ekleme ekranina yonlendirilebilir.');
  };

  return (
    <section className='scan-page'>
      <header className='home-topbar'>
        <button className='home-icon-btn' type='button'>
          <span className='material-symbols-outlined'>menu</span>
        </button>
        <h1>UNISHELF</h1>
        <button className='home-avatar-btn' onClick={onOpenProfile} type='button'>
          <img
            alt='User profile'
            src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
          />
        </button>
      </header>

      <main className='scan-main'>
        <div className='scan-header'>
          <h2>ISBN Tarama</h2>
          <p>Position the barcode inside the frame to scan automatically.</p>
        </div>

        <div className='scan-viewfinder'>
          <div className='scan-feed'>
            <img
              alt='Simulated camera feed'
              src='https://lh3.googleusercontent.com/aida/ADBb0ugG11trRYChMXQjSRn5UZ5NGV90RZY0_llJk9EjzH6Jb1adlKBSHJXcLY1jyaK4Cl9kuzPDDSMWc6ExXYu-8Q3bsfpRwUpwIEFkT5rw9aKVu2-AaY8K-2L0nheFhFCrVlNHb0LVCx8CjjokKIGGXGHB9u4aKt8sZ0e0M7Ub3_3QhKKwQIPwZP6HhBYR8UDh0zjN395uSA9X--P9XoY45mJJHgfq7O8auva544i2Xq5M8q_G-OW-IhILdEy5OPvz_mez3MHJWrXzvw'
            />
          </div>
          <div className='scan-mask' aria-hidden='true' />
          <div className='scan-frame' aria-hidden='true'>
            <div className='scan-cutout'>
              <span className='scan-line' />
              <span className='corner tl' />
              <span className='corner tr' />
              <span className='corner bl' />
              <span className='corner br' />
            </div>
          </div>
          <div className='scan-controls'>
            <button onClick={() => setFlash((v) => !v)} type='button' aria-label='Flash'>
              <span className='material-symbols-outlined'>{flash ? 'flash_on' : 'flash_off'}</span>
            </button>
          </div>
        </div>

        {notice && <p className='scan-notice'>{notice}</p>}
        <p className='scan-step'>Adim: {step}</p>

        <div className='scan-actions'>
          <button className='scan-primary' onClick={() => runFlow('camera')} type='button'>
            <span className='material-symbols-outlined'>barcode_scanner</span>
            TARA
          </button>
          <button className='scan-secondary' onClick={() => runFlow('gallery')} type='button'>
            <span className='material-symbols-outlined'>photo_library</span>
            FOTOGRAFTAN TARA
          </button>
        </div>
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
        <button className='scan active' type='button'>
          <span className='material-symbols-outlined filled-icon'>qr_code_scanner</span>
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

