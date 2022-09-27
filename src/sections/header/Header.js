import clsx from 'clsx';
import { useState } from 'react';
import Button from '../../components/button/Button';
import SignIn from '../signIn/SignIn';
import LogoSvg, { SignInSvg } from '../../assets/icons/index';
import './header.scss';

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignIn = () => setIsSignIn(!isSignIn);

  return (
    <header className="header">
      <div className="logo">
        <LogoSvg />
      </div>
      <div className="menu">
        <ul className="menu_nav">
          <li className="menu-nav_item">Home</li>
        </ul>
        <div className="signIn">
          <Button type="button" className="signIn_btn" onClick={handleSignIn}>
            <SignInSvg />
            <span>Sign In</span>
          </Button>
        </div>
      </div>
      <div
        className={clsx('blur-block', { isBlur: isSignIn })}
        onClick={handleSignIn}
      />
      {isSignIn && <SignIn />}
    </header>
  );
}
