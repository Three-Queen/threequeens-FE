/**
 * Helper to convert absolute backend URLs to relative proxy paths
 * so that assets go through Vite's dev proxy (which appends Ngrok bypass headers).
 */
export const getProxyUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  
  // Handle local development backend hosts
  if (url.startsWith('http://127.0.0.1:8000') || url.startsWith('http://localhost:8000')) {
    const matches = url.match(/(?:127\.0\.0\.1|localhost):8000(\/.*)/i);
    if (matches && matches[1]) {
      return matches[1];
    }
  }
  
  // Handle custom API URLs (like dynamic Ngrok URLs)
  const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
  if (url.startsWith(apiBase)) {
    return url.substring(apiBase.length);
  }
  
  return url;
};
