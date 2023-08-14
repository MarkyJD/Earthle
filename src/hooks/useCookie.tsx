import { useState, useEffect } from 'react';
import { TUser } from '../../typings';

export default function useCookie(): [TUser | null, (value: TUser) => void] {
  const [cookie, setCookie] = useState<TUser | null>(null);

  function updateCookie(value: TUser) {
    setCookie(value);
    localStorage.setItem('userCookie', JSON.stringify(value));
  }

  useEffect(() => {
    const c = localStorage.getItem('userCookie');
    if (c) {
      const userCookie = JSON.parse(c);
      setCookie(userCookie);
    }
  }, []);

  return [cookie, updateCookie];
}
