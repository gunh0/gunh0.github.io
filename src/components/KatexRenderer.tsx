'use client';

import { useEffect } from 'react';

export default function KatexRenderer() {
  useEffect(() => {
    const renderMath = () => {
      // @ts-ignore
      if (window.renderMathInElement) {
        try {
          // @ts-ignore
          window.renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false,
            strict: false,
            trust: true
          });
          console.log('KaTeX rendering complete');
        } catch (e) {
          console.error('KaTeX rendering error:', e);
        }
      } else {
        // Retry after a short delay if script not loaded yet
        const retryCount = (window as any).katexRetryCount || 0;
        if (retryCount < 10) {
          (window as any).katexRetryCount = retryCount + 1;
          setTimeout(renderMath, 100);
        }
      }
    };

    // Small delay to ensure content is mounted
    setTimeout(renderMath, 100);
  }, []);

  return null;
}
