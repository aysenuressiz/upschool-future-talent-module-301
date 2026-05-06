import React from 'react';

interface LoginScreenProps {
  email: string;
  password: string;
  notice: string;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export function LoginScreen({
  email,
  password,
  notice,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <section className='login-hero'>
      <div className='login-brand'>
        <img
          alt='UNISHELF Premium Logo'
          className='brand-logo-image'
          src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
        />
        <p className='brand-title'>UNISHELF</p>
        <p className='brand-subtitle'>Dijital mabedinize hos geldiniz</p>
      </div>

      <form className='login-glass-card' onSubmit={onSubmit}>
        {notice && <p className='message success'>{notice}</p>}
        {error && <p className='message error'>{error}</p>}

        <label className='wire-label' htmlFor='login-email'>
          E-posta
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon' aria-hidden='true'>
            mail
          </span>
          <input
            autoComplete='email'
            id='login-email'
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder='kutuphane@unishelf.com'
            type='email'
            value={email}
          />
        </div>

        <label className='wire-label' htmlFor='login-password'>
          Sifre
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon' aria-hidden='true'>
            lock
          </span>
          <input
            autoComplete='current-password'
            id='login-password'
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder='••••••••'
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <button
            aria-label={showPassword ? 'Sifreyi gizle' : 'Sifreyi goster'}
            className='password-toggle'
            onClick={() => setShowPassword((prev) => !prev)}
            type='button'
          >
            <span className='material-symbols-outlined'>{showPassword ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>

        <button className='wire-link forgot-link' onClick={onForgotPassword} type='button'>
          Sifremi Unuttum
        </button>

        <button className='login-primary-button' type='submit'>
          <span>Giris Yap</span>
          <span className='material-symbols-outlined'>arrow_forward</span>
        </button>

        <p className='register-helper'>Henuz bir koleksiyonunuz yok mu?</p>
        <button className='login-secondary-button' onClick={onRegister} type='button'>
          Kayit Ol
        </button>
      </form>

      <footer className='login-footer'>
        <div className='social-divider'>
          <span />
          <p>Ya da sununla kesfet</p>
          <span />
        </div>
        <div className='social-buttons'>
          <button aria-label='Google ile giris' className='social-button' type='button'>
            <img
              alt='Google'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuBanBU3ZiUWp4K9BPgMWW6VhXv5hIpJHNyYFTmSlfrsCj7VoF-vcchDRNy9tbfNHvLiEDOvIEaIETTCVmQyeyr_yy8xpU5BQFT8DfiG4JvnyJf_W8AHIVwdA3XvVx4ZAWXF_ITnrn2ls8y_QrzRIpc7po_D8jTy8Bj3uAjXqkge0_uHQXF5ofQdU_3iQokAf3QcSLZeUloxFIVRI5GpCCo1kjR2fWgv6c9jP7jdIXw2siH14dLTD4XOR1nOTF2rZtIJwy04hzi6Pnc'
            />
          </button>
          <button aria-label='Apple ile giris' className='social-button' type='button'>
            <span className='material-symbols-outlined'>logo_dev</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
