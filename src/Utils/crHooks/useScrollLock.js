import React from 'react';

export const useScrollLock = () => { 

    const lockScroll = React.useCallback((arg) => {
        if (arg) {
            arg.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'hidden';
        }
      }, []);
      
      const unlockScroll = React.useCallback((arg) => {
        if (arg) {
            arg.style.overflow = '';
        } else {
            document.body.style.overflow = '';
        }
      }, []);

  return {
    lockScroll,
    unlockScroll
  };  
}