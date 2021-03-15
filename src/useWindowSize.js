import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.documentElement.clientWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
