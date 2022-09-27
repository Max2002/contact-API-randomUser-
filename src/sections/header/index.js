import clsx from 'clsx';
import { useState } from 'react';
import Button from '../../components/button';
import SignIn from '../signIn';
import LogoSvg, { SignInSvg } from '../../assets/icons/index';
import st from './header.module.scss';

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignIn = () => setIsSignIn(!isSignIn);

  return (
    <header className={st.header}>
      <LogoSvg />
      <div className={st.menu}>
        <ul className={st.menuNav}>
          <li className={st.menuNavItem}>Home</li>
        </ul>
        <div className={st.signIn}>
          <Button type="button" className={st.signInBtn} onClick={handleSignIn}>
            <SignInSvg />
            <span>Sign In</span>
          </Button>
        </div>
      </div>
      <div
        className={clsx(st.blurBlock, { [st.isBlur]: isSignIn })}
        onClick={handleSignIn}
      />
      {isSignIn && <SignIn />}
    </header>
  );
}
