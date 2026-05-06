import React from 'react';

import { AddScreen } from '@/screens/add-screen';
import { ForgotPasswordScreen } from '@/screens/forgot-password-screen';
import { HomeScreen } from '@/screens/home-screen';
import { LibraryFlowScreen } from '@/screens/library-flow-screen';
import { ScanScreen } from '@/screens/scan-screen';
import { LoginScreen } from '@/screens/login-screen';
import { RegisterScreen } from '@/screens/register-screen';
import { ProfileScreen } from '@/screens/profile-screen';

export default function App() {
  const [screen, setScreen] = React.useState<'login' | 'register' | 'forgot' | 'home' | 'library' | 'scan' | 'add' | 'profile'>('login');
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [notice, setNotice] = React.useState('');
  const [registerName, setRegisterName] = React.useState('');
  const [registerSurname, setRegisterSurname] = React.useState('');
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [registerPasswordAgain, setRegisterPasswordAgain] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [forgotEmail, setForgotEmail] = React.useState('');
  const [forgotPassword, setForgotPassword] = React.useState('');
  const [forgotPasswordAgain, setForgotPasswordAgain] = React.useState('');
  const [forgotError, setForgotError] = React.useState('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = loginEmail.trim().toLowerCase();
    const normalizedPassword = loginPassword.trim();

    if (normalizedEmail === 'demo@unishelf.app' && normalizedPassword === '123456') {
      setLoginError('');
      setNotice('');
      setScreen('home');
      return;
    }
    setLoginError('E-posta veya sifre yanlis, lutfen tekrar deneyiniz.');
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerPassword !== registerPasswordAgain) {
      setRegisterError('Sifreler ayni olmali.');
      return;
    }
    setRegisterError('');
    setRegisterName('');
    setRegisterSurname('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterPasswordAgain('');
    setScreen('login');
    setNotice('Kayit basarili. Giris yapabilirsiniz.');
  };

  const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (forgotPassword !== forgotPasswordAgain) {
      setForgotError('Sifreler ayni olmali.');
      return;
    }
    setForgotError('');
    setForgotEmail('');
    setForgotPassword('');
    setForgotPasswordAgain('');
    setScreen('login');
    setNotice('Sifreniz degistirildi. Yeni sifreniz ile giris yapabilirsiniz.');
  };

  return (
    <main className='page'>
      <section className={screen === 'home' || screen === 'library' || screen === 'scan' || screen === 'add' || screen === 'profile' ? 'home-shell' : 'auth-shell'}>
        {screen === 'login' && (
          <LoginScreen
            email={loginEmail}
            error={loginError}
            notice={notice}
            onEmailChange={setLoginEmail}
            onForgotPassword={() => {
              setNotice('');
              setScreen('forgot');
            }}
            onPasswordChange={setLoginPassword}
            onRegister={() => {
              setNotice('');
              setScreen('register');
            }}
            onSubmit={handleLogin}
            password={loginPassword}
          />
        )}
        {screen === 'register' && (
          <RegisterScreen
            email={registerEmail}
            error={registerError}
            name={registerName}
            onBackToLogin={() => setScreen('login')}
            onEmailChange={setRegisterEmail}
            onNameChange={setRegisterName}
            onPasswordAgainChange={setRegisterPasswordAgain}
            onPasswordChange={setRegisterPassword}
            onSubmit={handleRegister}
            onSurnameChange={setRegisterSurname}
            password={registerPassword}
            passwordAgain={registerPasswordAgain}
            surname={registerSurname}
          />
        )}
        {screen === 'forgot' && (
          <ForgotPasswordScreen
            email={forgotEmail}
            error={forgotError}
            onBackToLogin={() => setScreen('login')}
            onEmailChange={setForgotEmail}
            onPasswordAgainChange={setForgotPasswordAgain}
            onPasswordChange={setForgotPassword}
            onSubmit={handleForgotPassword}
            password={forgotPassword}
            passwordAgain={forgotPasswordAgain}
          />
        )}
        {screen === 'home' && (
          <HomeScreen
            onBackToLogin={() => setScreen('login')}
            onOpenLibrary={() => setScreen('library')}
            onOpenScan={() => setScreen('scan')}
            onOpenAdd={() => setScreen('add')}
            onOpenProfile={() => setScreen('profile')}
          />
        )}
        {screen === 'library' && (
          <LibraryFlowScreen
            onBackHome={() => setScreen('home')}
            onOpenAdd={() => setScreen('add')}
            onOpenProfile={() => setScreen('profile')}
            onOpenScan={() => setScreen('scan')}
          />
        )}
        {screen === 'scan' && (
          <ScanScreen
            onBackHome={() => setScreen('home')}
            onOpenAdd={() => setScreen('add')}
            onOpenLibrary={() => setScreen('library')}
            onOpenProfile={() => setScreen('profile')}
          />
        )}
        {screen === 'add' && (
          <AddScreen
            onBackHome={() => setScreen('home')}
            onOpenLibrary={() => setScreen('library')}
            onOpenProfile={() => setScreen('profile')}
            onOpenScan={() => setScreen('scan')}
          />
        )}
        {screen === 'profile' && (
          <ProfileScreen
            onBackHome={() => setScreen('home')}
            onLogout={() => setScreen('login')}
            onOpenAdd={() => setScreen('add')}
            onOpenLibrary={() => setScreen('library')}
            onOpenScan={() => setScreen('scan')}
          />
        )}
      </section>
    </main>
  );
}
