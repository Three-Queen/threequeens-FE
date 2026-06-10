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
  {
    step: 1,
    title: 'Survei Lokasi',
    icon: 'survei',
    description: 'Tim kami melakukan kunjungan langsung ke lokasi untuk pengukuran akurat dan analisa kondisi ruang.'
  },
  {
    step: 2,
    title: 'Perhitungan Estimasi',
    icon: 'estimasi',
    description: 'Menghitung estimasi biaya berdasarkan dimensi, material pilihan, dan kompleksitas desain.'
  },
  {
    step: 3,
    title: 'Desain',
    icon: 'desain',
    description: 'Pembuatan desain 2D dan rendering 3D yang detail sehingga Anda bisa membayangkan hasil akhirnya.'
  },
  {
    step: 4,
    title: 'Penawaran',
    icon: 'penawaran',
    description: 'Penyampaian proposal lengkap berisi spesifikasi teknis, material, dan estimasi biaya keseluruhan.'
  },
  {
    step: 5,
    title: 'Negosiasi',
    icon: 'negosiasi',
    description: 'Diskusi terbuka mengenai harga, spesifikasi, dan detail lainnya hingga tercapai kesepakatan.'
  },
  {
    step: 6,
    title: 'Produksi',
    icon: 'produksi',
    description: 'Pengerjaan furniture dilakukan di workshop kami dengan standar kualitas tinggi dan penuh presisi.'
  },
  {
    step: 7,
    title: 'Instalasi',
    icon: 'instalasi',
    description: 'Tim installer profesional memasang furniture di lokasi dengan rapi, bersih, dan tepat waktu.'
  },
  {
    step: 8,
    title: 'Pelunasan',
    icon: 'pelunasan',
    description: 'Penyelesaian pembayaran dilakukan setelah Anda puas dengan hasil pemasangan dan pekerjaan.'
  }
];

export const CONTACT_INFO: ContactInfo[] = [
  { icon: 'alamat', label: 'Alamat', value: 'Jl. Contoh No. 123, Jakarta Selatan' },
  { icon: 'telepon', label: 'Telepon', value: '+62 812-3456-7890' },
  { icon: 'email', label: 'Email', value: 'info@threequeens.id' },
  { icon: 'jam_kerja', label: 'Jam Operasional', value: 'Senin - Sabtu, 08.00 - 17.00 WIB' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', href: '#', icon: 'instagram' },
  { platform: 'Facebook', href: '#', icon: 'facebook' },
  { platform: 'WhatsApp', href: '#', icon: 'whatsapp' },
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
