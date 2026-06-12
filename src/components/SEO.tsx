import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  robots?: string;
  author?: string;
}

const SITE_URL = 'https://threequeensinterior.com';

const DEFAULT_SEO = {
  title: "Three Queen's Interior | Jasa Desain Interior & Furniture Custom Kuningan",
  description: "Jasa desain interior profesional dan pembuatan furniture custom berkualitas di Kuningan, Cirebon & Jawa Barat. Hubungi Three Queen's Interior untuk kitchen set, wardrobe, living room, dan ruang komersial impian Anda.",
  keywords: "three queens interior, desain interior kuningan, furniture custom kuningan, kitchen set kuningan, jasa interior cirebon, backdrop tv custom, wardrobe kuningan, interior jawa barat",
  image: `${SITE_URL}/Logo.png`,
  url: SITE_URL,
  type: 'website',
  robots: 'index, follow',
  author: "Three Queen's Interior"
};

/**
 * SEO Component to dynamically update page metadata (premium SEO practice)
 */
export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  robots = 'index, follow',
  author = "Three Queen's Interior"
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Determine values, falling back to defaults
    const currentTitle = title 
      ? `${title} | Three Queen's Interior` 
      : DEFAULT_SEO.title;
    const currentDescription = description || DEFAULT_SEO.description;
    const currentKeywords = keywords || DEFAULT_SEO.keywords;
    
    // Process image URL (ensure absolute URL)
    let currentImage = image || DEFAULT_SEO.image;
    if (currentImage.startsWith('/')) {
      currentImage = `${SITE_URL}${currentImage}`;
    }

    // Process canonical URL
    const currentUrl = url || `${SITE_URL}${location.pathname}${location.search}`;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Update Document Title
    document.title = currentTitle;

    // 3. Update Primary Meta Tags
    setMetaTag('name', 'title', currentTitle);
    setMetaTag('name', 'description', currentDescription);
    setMetaTag('name', 'keywords', currentKeywords);
    setMetaTag('name', 'robots', robots);
    setMetaTag('name', 'author', author);
    setMetaTag('name', 'language', 'Indonesian');

    // 4. Update Open Graph / Facebook Tags
    setMetaTag('property', 'og:title', currentTitle);
    setMetaTag('property', 'og:description', currentDescription);
    setMetaTag('property', 'og:image', currentImage);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', "Three Queen's Interior");

    // 5. Update Twitter Tags
    setMetaTag('property', 'twitter:title', currentTitle);
    setMetaTag('property', 'twitter:description', currentDescription);
    setMetaTag('property', 'twitter:image', currentImage);
    setMetaTag('property', 'twitter:url', currentUrl);
    setMetaTag('property', 'twitter:card', 'summary_large_image');

    // 6. Set Canonical Link
    setLinkTag('canonical', currentUrl);

  }, [title, description, keywords, image, url, type, robots, author, location]);

  return null; // This component changes head state, so it doesn't render any UI elements
};

export default SEO;
