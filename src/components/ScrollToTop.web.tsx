import React, {ReactElement, ReactNode, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export function ScrollToTop({children}: {children: ReactNode}): ReactElement {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
}
