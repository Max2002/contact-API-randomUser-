import { useEffect, useState } from 'react';
import { throttle } from '../utils/throttle';

export const useDeviceWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowWidth = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    window.addEventListener('resize', handleWindowWidth);

    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, []);

  return windowWidth;
};
