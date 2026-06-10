// ============================================================
// Constants & Static Data - Three Queens App
// ============================================================

import type { NavItem, Product, Project, OrderStep, ContactInfo, SocialLink } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Produk', href: '#produk' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Alur Pesanan', href: '#alur' },
  { label: 'Kontak', href: '#kontak' },
];

import welcomeImg from '../assets/images/welcome-screen.png';

export const PRODUCTS: Product[] = [
  { id: 1, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
  { id: 2, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
  { id: 3, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
  { id: 4, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
  { id: 5, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
  { id: 6, title: 'Kitchen Set L - Shape Premium', category: 'KITCHEN SET', image: welcomeImg, price: 'Rp. 10.000.000', description: 'Kitchen set L-shape dengan kabinet bawah dan atas, dilengkapi island table, finishing cat duco atau HPL premium.' },
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'Apartemen Modern', location: 'Jakarta Selatan', image: '' },
  { id: 2, title: 'Rumah Minimalis', location: 'Bandung', image: '' },
  { id: 3, title: 'Kantor Kreatif', location: 'Jakarta Pusat', image: '' },
  { id: 4, title: 'Café Interior', location: 'Yogyakarta', image: '' },
];

export const ORDER_STEPS: OrderStep[] = [
  { step: 1, title: 'Survey Lokasi', description: 'Tim kami melakukan survei ke lokasi Anda untuk pengukuran dan konsultasi desain.' },
  { step: 2, title: 'Desain', description: 'Kami membuat desain 3D sesuai kebutuhan dan selera Anda.' },
  { step: 3, title: 'Persetujuan', description: 'Anda mereview dan menyetujui desain yang telah dibuat.' },
  { step: 4, title: 'Produksi', description: 'Proses produksi menggunakan material berkualitas tinggi.' },
  { step: 5, title: 'Instalasi', description: 'Tim profesional kami melakukan instalasi di lokasi Anda.' },
  { step: 6, title: 'Finishing', description: 'Pengecekan akhir dan serah terima hasil pekerjaan.' },
  { step: 7, title: 'Purna Jual', description: 'Garansi dan layanan purna jual untuk kepuasan Anda.' },
];

export const CONTACT_INFO: ContactInfo[] = [
  { icon: '📍', label: 'Alamat', value: 'Jl. Contoh No. 123, Jakarta Selatan' },
  { icon: '📞', label: 'Telepon', value: '+62 812-3456-7890' },
  { icon: '✉️', label: 'Email', value: 'info@threequeens.id' },
  { icon: '🕐', label: 'Jam Operasional', value: 'Senin - Sabtu, 08.00 - 17.00 WIB' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', href: '#', icon: '📸' },
  { platform: 'Facebook', href: '#', icon: '👤' },
  { platform: 'WhatsApp', href: '#', icon: '💬' },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Karir', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  services: [
    { label: 'Furniture Custom', href: '#' },
    { label: 'Interior Design', href: '#' },
    { label: 'Kitchen Set', href: '#' },
    { label: 'Renovasi', href: '#' },
  ],
};
