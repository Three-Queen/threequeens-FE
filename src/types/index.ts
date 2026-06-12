// ============================================================
// Global Types - Three Queens App
// ============================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  price?: string;
  description?: string;
  desain2d?: string | null;
  desain3d?: string | null;
  pengerjaan?: string | null;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  description?: string;
  category?: string;
  waktuPengerjaan?: string | null;
  googleMaps?: string | null;
}

export interface OrderStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}
