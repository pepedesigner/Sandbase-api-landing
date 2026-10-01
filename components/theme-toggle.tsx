'use client'

import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'sandbase-theme'

/**
 * Runs before first paint to stamp `data-theme` on <html>, so the page never
 * flashes the wrong theme. Kept as a string because it must be inlined into
 * <head> and executed synchronously — a React effect would run too late.
 *
 * Default is LIGHT, matching sandbase.ai, which ships `data-theme="light"`.
 * A stored choice wins; otherwise we honour the OS preference.
 */
export const themeInitScript = `(function(){try{
var s=localStorage.getItem('${THEME_STORAGE_KEY}');
var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.documentElement.setAttribute('data-theme',t);
document.documentElement.style.colorScheme=t;
}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light'
}

export function useTheme() {
  // Seeded from the attribute the init script already set, so the first client
  // render agrees with the server-rendered markup.
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  const apply = useCallback((next: Theme) => {
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Private browsing can reject writes; the session still switches.
    }
  }, [])

  const toggle = useCallback(() => {
    apply(readTheme() === 'dark' ? 'light' : 'dark')
  }, [apply])

  return { theme, toggle }
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`grid size-9 place-items-center text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-overlay)] hover:text-[var(--text-primary)] ${className}`}
    >
      {isDark ? (
        // Sun — shown when dark, offering the light theme.
        <svg
          viewBox='0 0 24 24'
          className='size-[17px]'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
        >
          <circle cx='12' cy='12' r='4.2' />
          <path d='M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M6.4 6.4 4.9 4.9M19.1 19.1l-1.5-1.5M17.6 6.4l1.5-1.5M4.9 19.1l1.5-1.5' />
        </svg>
      ) : (
        // Moon — shown when light, offering the dark theme.
        <svg
          viewBox='0 0 24 24'
          className='size-[17px]'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z' />
        </svg>
      )}
    </button>
  )
}
