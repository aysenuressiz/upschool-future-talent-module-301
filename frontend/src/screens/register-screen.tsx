interface RegisterScreenProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordAgain: string;
  error: string;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordAgainChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({
  name,
  surname,
  email,
  password,
  passwordAgain,
  error,
  onNameChange,
  onSurnameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  onBackToLogin,
}: RegisterScreenProps) {
  return (
    <section className='login-hero'>
      <div className='login-brand'>
        <img
          alt='UNISHELF Premium Logo'
          className='brand-logo-image'
          src='https://lh3.googleusercontent.com/aida/ADBb0ujRpvFXkN1GeA5_PgsuoKpvKaZ4gBkEtfxQ7sThKiF77fZewMixAtUVMBoXvbtPExN_JMEdtl5q6-vDwGPqiWd9afO3wTUdTOW-ipmA4oEQExbESErzTiyh4TT3hL2YJsUzWLtAXKqalSKMfiZVmCyx9E_Q-56aHD6FVM3rp40x9i9Z6oaWu4X9CQEzAWnHXN_hHIdVKhOfdjQeMA4YTqeTIRBAvReEwPxk48go1tYfSDLTHshTTcaADQ'
        />
        <p className='brand-title'>UNISHELF</p>
        <p className='brand-subtitle'>Dijital kutuphanenizi olusturun</p>
      </div>

      <form className='login-glass-card' onSubmit={onSubmit}>
        {error && <p className='message error'>{error}</p>}

        <label className='wire-label' htmlFor='register-name'>
          Ad
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon'>person</span>
          <input id='register-name' onChange={(event) => onNameChange(event.target.value)} placeholder='Adiniz' required type='text' value={name} />
        </div>

        <label className='wire-label' htmlFor='register-surname'>
          Soyad
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon'>badge</span>
          <input id='register-surname' onChange={(event) => onSurnameChange(event.target.value)} placeholder='Soyadiniz' required type='text' value={surname} />
        </div>

        <label className='wire-label' htmlFor='register-email'>
          E-posta
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon'>mail</span>
          <input id='register-email' onChange={(event) => onEmailChange(event.target.value)} placeholder='youremail@domain.com' required type='email' value={email} />
        </div>

        <label className='wire-label' htmlFor='register-password'>
          Sifre
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon'>lock</span>
          <input id='register-password' onChange={(event) => onPasswordChange(event.target.value)} placeholder='••••••••' required type='password' value={password} />
        </div>

        <label className='wire-label' htmlFor='register-password-again'>
          Sifre Tekrar
        </label>
        <div className='field-shell'>
          <span className='material-symbols-outlined field-icon'>lock_reset</span>
          <input
            id='register-password-again'
            onChange={(event) => onPasswordAgainChange(event.target.value)}
            placeholder='••••••••'
            required
            type='password'
            value={passwordAgain}
          />
        </div>

        <button className='login-primary-button' type='submit'>
          <span>Kayit Ol</span>
          <span className='material-symbols-outlined'>arrow_forward</span>
        </button>
        <button className='login-secondary-button' onClick={onBackToLogin} type='button'>
          Giris Ekranina Don
        </button>
      </form>
    </section>
  );
}
