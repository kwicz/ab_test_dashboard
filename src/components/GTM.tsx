'use client';
import { useEffect } from 'react';

export default function GTM() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const GTM_ID = 'GTM-W6VFGK97';
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
      });
    }
  }, []);

  return null;
}
