'use client';
import { useEffect } from 'react';

export default function GTM() {
  useEffect(() => {
    const GTM_ID = 'GTM-W6VFGK97';
    if (
      typeof window !== 'undefined' &&
      !document.getElementById('gtm-script')
    ) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
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
