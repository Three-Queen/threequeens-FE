/**
 * Helper to convert absolute backend URLs to relative proxy paths
 * so that assets go through Vite's dev proxy (which appends Ngrok bypass headers).
 */
export const getProxyUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  
  // Only convert to relative proxy path in development mode
  if (import.meta.env.DEV) {
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
  } else {
    // In production, ensure backend asset URLs remain absolute and use VITE_API_URL
    const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    
    // If it's a relative path (e.g., /storage/...), prefix it with the API URL
    if (url.startsWith('/storage')) {
      return `${apiBase}${url}`;
    }
    
    // If the URL already starts with VITE_API_URL, keep it as is (don't strip it)
    if (url.startsWith(apiBase)) {
      return url;
    }
  }
  
  return url;
};
