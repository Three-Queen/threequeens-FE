// ============================================================
// Constants & Static Data - Three Queens App
// ============================================================

import type { NavItem, Product, Project, OrderStep, ContactInfo, SocialLink } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Produk', href: '#produk' },
  { label: 'Portofolio', href: '#portfolio' },
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
  { id: 1, title: 'Apartemen Studio Modern - Winduhaji', location: 'Kuningan - 2026', image: welcomeImg, category: 'Living Room', description: 'Desain interior apartemen studio yang efisien dengan pemanfaatan ruang vertikal secara maksimal, bernuansa kayu hangat.', waktuPengerjaan: '2 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 2, title: 'Kitchen Set L - Shape Premium - Kuningan', location: 'Kuningan - 2026', image: welcomeImg, category: 'Kitchen Set', description: 'Kitchen set minimalis bentuk L dengan island table berlapis kuarsa putih mewah dan kabinet bertekstur kayu alami.', waktuPengerjaan: '1.5 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 3, title: 'Master Bedroom Scandinavian - Cirebon', location: 'Cirebon - 2026', image: welcomeImg, category: 'Bedroom', description: 'Desain kamar tidur utama bernuansa Scandinavian dengan paduan warna netral, kabinet wardrobe terintegrasi.', waktuPengerjaan: '2.5 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 4, title: 'Luxury Bathroom Marble - Bandung', location: 'Bandung - 2025', image: welcomeImg, category: 'Bathroom', description: 'Interior kamar mandi mewah yang dibalut dinding marmer Carrara, cermin LED pintar, dan saniter bernuansa hitam matte.', waktuPengerjaan: '1 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 5, title: 'Office Space Startup - Jakarta', location: 'Jakarta - 2026', image: welcomeImg, category: 'Office', description: 'Ruang kantor kerja bersama dengan konsep open-space, dipadukan dengan tanaman indoor.', waktuPengerjaan: '3 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 6, title: 'Coffee Shop Industrial - Kuningan', location: 'Kuningan - 2025', image: welcomeImg, category: 'Cafe & Restaurant', description: 'Desain cafe kopi industrial menggunakan ekspos bata merah, semen poles, dan furniture besi kustom.', waktuPengerjaan: '2 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 7, title: 'Butik Fashion Minimalis - Cirebon', location: 'Cirebon - 2026', image: welcomeImg, category: 'Retail & Store', description: 'Tata ruang butik pakaian premium dengan sistem gantungan kustom minimalis hitam, pencahayaan spotlight.', waktuPengerjaan: '1.5 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 8, title: 'Custom TV Cabinet - Winduhaji', location: 'Kuningan - 2026', image: welcomeImg, category: 'Custom Cabinet', description: 'Pengerjaan furniture custom kabinet TV minimalis melayang dengan panel kisi-kisi kayu di bagian belakang.', waktuPengerjaan: '1 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 9, title: 'Custom Wardrobe Walk-in Closet', location: 'Kuningan - 2026', image: welcomeImg, category: 'Custom Wardrobe', description: 'Pembuatan lemari pakaian custom pintu kaca tempered dengan frame aluminium hitam gelap.', waktuPengerjaan: '1.5 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 10, title: 'Living Room Cozy - Kuningan', location: 'Kuningan - 2025', image: welcomeImg, category: 'Living Room', description: 'Desain ruang keluarga hangat dengan sofa modular abu-abu besar dan dekorasi dinding rak kustom.', waktuPengerjaan: '2 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 11, title: 'Dapur Kitchen Set HPL - Cirebon', location: 'Cirebon - 2026', image: welcomeImg, category: 'Kitchen Set', description: 'Kitchen set kompak untuk rumah minimalis dengan finishing HPL motif serat kayu gelap.', waktuPengerjaan: '1 Bulan', googleMaps: 'https://maps.google.com' },
  { id: 12, title: 'Kantor Kerja Eksekutif - Bandung', location: 'Bandung - 2026', image: welcomeImg, category: 'Office', description: 'Desain meja kerja direksi custom berpola marmer, kursi ergonomis premium, dan rak berkas.', waktuPengerjaan: '2 Bulan', googleMaps: 'https://maps.google.com' },
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
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Produk', href: '#produk' },
  ],
  services: [
    { label: 'Portofolio', href: '#portfolio' },
    { label: 'Alur Pesanan', href: '#alur' },
    { label: 'Kontak', href: '#kontak' },
  ],
};
