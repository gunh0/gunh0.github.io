'use client';

import { useEffect } from 'react';

export default function MathRenderer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const katex = window.katex;
      if (!katex) return;

      // Render inline math
      const inlineMaths = document.querySelectorAll('.math.inline');
      inlineMaths.forEach((elem) => {
        const text = elem.textContent || '';
        try {
          katex.render(text, elem as HTMLElement, {
            throwOnError: false,
            displayMode: false,
          });
        } catch (e) {
          console.error('KaTeX render error:', e);
        }
      });

      // Render display math
      const displayMaths = document.querySelectorAll('.math.display');
      displayMaths.forEach((elem) => {
        const text = elem.textContent || '';
        try {
          katex.render(text, elem as HTMLElement, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (e) {
          console.error('KaTeX render error:', e);
        }
      });
    }
  }, []);

  return null;
}
