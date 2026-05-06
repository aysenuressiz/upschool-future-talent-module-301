interface ForgotPasswordScreenProps {
  email: string;
  password: string;
  passwordAgain: string;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordAgainChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({
  email,
  password,
  passwordAgain,
  error,
  onEmailChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  onBackToLogin,
}: ForgotPasswordScreenProps) {
  return (
    <section className='forgot-wrapper'>
      <div className='forgot-header'>
        <img
          alt='UNISHELF Logo'
          className='brand-logo-image'
          src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
        />
        <p className='brand-title'>UNISHELF</p>
        <p className='brand-subtitle'>Kisisel arsivinize yeniden erisin</p>
      </div>

      <form className='forgot-card' onSubmit={onSubmit}>
        <div className='step-row'>
          <div className='step-item'>
            <div className='step-icon'>
              <span className='material-symbols-outlined'>mail</span>
            </div>
            <span>Dogrulama</span>
          </div>
          <div className='step-line' />
          <div className='step-item'>
            <div className='step-icon'>
              <span className='material-symbols-outlined'>lock_reset</span>
            </div>
            <span>Yeni Sifre</span>
          </div>
        </div>

        {error && <p className='message error'>{error}</p>}
        <label className='wire-label' htmlFor='forgot-email'>
          E-posta
        </label>
        <div className='field-shell'>
          <input id='forgot-email' onChange={(event) => onEmailChange(event.target.value)} placeholder='ornek@kutuphane.com' required type='email' value={email} />
          <span className='material-symbols-outlined field-icon'>alternate_email</span>
        </div>

        <label className='wire-label' htmlFor='forgot-password'>
          Yeni Sifre
        </label>
        <div className='field-shell'>
          <input id='forgot-password' onChange={(event) => onPasswordChange(event.target.value)} placeholder='••••••••' required type='password' value={password} />
          <span className='material-symbols-outlined field-icon'>lock</span>
        </div>

        <label className='wire-label' htmlFor='forgot-password-again'>
          Yeni Sifre Tekrar
        </label>
        <div className='field-shell'>
          <input
            id='forgot-password-again'
            onChange={(event) => onPasswordAgainChange(event.target.value)}
            placeholder='••••••••'
            required
            type='password'
            value={passwordAgain}
          />
          <span className='material-symbols-outlined field-icon'>lock_reset</span>
        </div>

        <button className='forgot-primary-button' type='submit'>
          <span>Sifreyi Degistir</span>
          <span className='material-symbols-outlined'>key</span>
        </button>
      </form>

      <button className='back-to-login' onClick={onBackToLogin} type='button'>
        <span className='material-symbols-outlined'>arrow_back</span>
        Giris Ekranina Don
      </button>
    </section>
  );
}
