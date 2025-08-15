import { writable } from 'svelte/store';

function getPreferredTheme() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const theme = writable(getPreferredTheme());

theme.subscribe((value) => {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    if (value === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', value);
  }
});
