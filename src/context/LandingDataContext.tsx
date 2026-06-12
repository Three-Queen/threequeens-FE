/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, PROJECTS } from '../constants';
import type { Product, Project } from '../types';

interface LandingData {
  beranda: {
    title: string;
    deskripsi: string;
    background: string | null;
  };
  tentang: {
    title: string;
    deskripsi: string;
    gambar1: string | null;
    gambar2: string | null;
  };
  kontak: {
    lokasi: string;
    whatsapp: string;
    email: string;
    facebook: string | null;
    tiktok: string | null;
    instagram: string | null;
    jam_kerja: string;
  };
  categories: { id: number; nama_kategori: string; tipe_layanan?: string }[];
  products: Product[];
  portfolios: Project[];
}

interface LandingDataContextProps {
  loading: boolean;
  error: string | null;
  data: LandingData;
  submitMessage: (form: { name: string; email: string; phone: string; message: string }) => Promise<{ success: boolean; message: string }>;
}

const LandingDataContext = createContext<LandingDataContextProps | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const LandingDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with fallback/mock data
  const [data, setData] = useState<LandingData>({
    beranda: {
      title: "Three Queen's Interior",
      deskripsi: 'Mewujudkan Ruang Impian dengan Sentuhan Elegan dan Berkualitas.',
      background: null,
    },
    tentang: {
      title: 'Tentang Three Queen Interior',
      deskripsi: 'Three Queen’s adalah perusahaan yang bergerak di bidang desain interior dan pembuatan furniture custom yang berdiri pada 11 Januari 2023. Kami hadir untuk memberikan solusi interior yang fungsional, estetik, dan sesuai kebutuhan setiap klien, baik untuk hunian, perkantoran, maupun ruang komersial.\n\nDengan mengutamakan kualitas material, ketelitian pengerjaan, serta desain yang menyesuaikan karakter dan kebutuhan pelanggan, Three Queen’s berkomitmen menghadirkan hasil terbaik yang menggabungkan keindahan dan kenyamanan dalam setiap proyek.',
      gambar1: null,
      gambar2: null,
    },
    kontak: {
      lokasi: 'Jl. Karangtawang, Karangtawang, Jatinunggal,\nKabupaten Kuningan, Jawa Barat 45515',
      whatsapp: '081234567890',
      email: 'info@threequeen.com',
      facebook: null,
      tiktok: null,
      instagram: null,
      jam_kerja: 'Senin - Jumat: 09.00 - 17.00',
    },
    categories: [
      { id: 0, nama_kategori: 'Semua', tipe_layanan: 'Semua' },
      { id: 1, nama_kategori: 'Kitchen Set', tipe_layanan: 'Residential' },
      { id: 2, nama_kategori: 'Living Room', tipe_layanan: 'Residential' },
      { id: 3, nama_kategori: 'Bedroom', tipe_layanan: 'Residential' },
      { id: 5, nama_kategori: 'Bathroom', tipe_layanan: 'Residential' },
      { id: 4, nama_kategori: 'Office', tipe_layanan: 'Komersial' },
      { id: 6, nama_kategori: 'Cafe & Restaurant', tipe_layanan: 'Komersial' },
      { id: 7, nama_kategori: 'Retail & Store', tipe_layanan: 'Komersial' },
      { id: 8, nama_kategori: 'Custom Cabinet', tipe_layanan: 'Kustom' },
      { id: 9, nama_kategori: 'Custom Wardrobe', tipe_layanan: 'Kustom' },
    ],
    products: PRODUCTS,
    portfolios: PROJECTS,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/landing`);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data dari API: ${response.statusText}`);
        }
        const resJson = await response.json();
        if (resJson.success && resJson.data) {
          const apiData = resJson.data;

          // Map products
          const mappedProducts: Product[] = apiData.products.map((item: any) => ({
            id: item.id,
            title: item.nama_produk,
            category: item.kategori || 'Lainnya',
            image: item.gambar_url || '',
            price: item.harga_format || undefined,
            description: item.deskripsi_produk || undefined,
            desain2d: item.desain_2d_url || null,
            desain3d: item.desain_3d_url || null,
            pengerjaan: item.pengerjaan_produk || null,
          }));

          // Map portfolios
          const mappedPortfolios: Project[] = apiData.portfolios.map((item: any) => {
            const titleLower = (item.nama_proyek || '').toLowerCase();
            let category = 'LIVING ROOM';
            if (titleLower.includes('kitchen') || titleLower.includes('studio band')) {
              category = 'KITCHEN SET';
            }
            return {
              id: item.id,
              title: item.nama_proyek,
              description: item.deskripsi || undefined,
              location: item.lokasi,
              image: item.dokumentasi_url || '',
              category: category,
            };
          });

          // Map categories
          const mappedCategories = [
            { id: 0, nama_kategori: 'Semua', tipe_layanan: 'Semua' },
            ...apiData.categories.map((c: any) => ({
              id: c.id,
              nama_kategori: c.nama_kategori,
              tipe_layanan: c.tipe_layanan || 'Residential',
            })),
          ];

          setData({
            beranda: {
              title: apiData.beranda.title ? apiData.beranda.title.replace('Three Queen', "Three Queen's") : "Three Queen's Interior",
              deskripsi: apiData.beranda.deskripsi || '',
              background: apiData.beranda.background,
            },
            tentang: {
              title: apiData.tentang.title || 'Tentang Three Queen Interior',
              deskripsi: 'Three Queen’s adalah perusahaan yang bergerak di bidang desain interior dan pembuatan furniture custom yang berdiri pada 11 Januari 2023. Kami hadir untuk memberikan solusi interior yang fungsional, estetik, dan sesuai kebutuhan setiap klien, baik untuk hunian, perkantoran, maupun ruang komersial.\n\nDengan mengutamakan kualitas material, ketelitian pengerjaan, serta desain yang menyesuaikan karakter dan kebutuhan pelanggan, Three Queen’s berkomitmen menghadirkan hasil terbaik yang menggabungkan keindahan dan kenyamanan dalam setiap proyek.',
              gambar1: apiData.tentang.gambar1,
              gambar2: apiData.tentang.gambar2,
            },
            kontak: {
              lokasi: 'Jl. Karangtawang, Karangtawang, Jatinunggal,\nKabupaten Kuningan, Jawa Barat 45515',
              whatsapp: apiData.kontak.whatsapp || '081234567890',
              email: apiData.kontak.email || 'info@threequeen.com',
              facebook: apiData.kontak.facebook || null,
              tiktok: apiData.kontak.tiktok || null,
              instagram: apiData.kontak.instagram || null,
              jam_kerja: 'Senin - Jumat: 09.00 - 17.00',
            },
            categories: mappedCategories,
            products: mappedProducts.length > 0 ? mappedProducts : PRODUCTS,
            portfolios: mappedPortfolios.length > 0 ? mappedPortfolios : PROJECTS,
          });
          setError(null);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Gagal memuat data dari API.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitMessage = async (form: { name: string; email: string; phone: string; message: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pesan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.message || 'Gagal menyimpan pesan ke database.');
      }

      const resJson = await response.json();
      return { success: true, message: resJson.message || 'Pesan berhasil disimpan!' };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err.message || 'Terjadi kesalahan saat menyimpan pesan.' };
    }
  };

  return (
    <LandingDataContext.Provider value={{ loading, error, data, submitMessage }}>
      {children}
    </LandingDataContext.Provider>
  );
};

export const useLandingData = () => {
  const context = useContext(LandingDataContext);
  if (context === undefined) {
    throw new Error('useLandingData harus digunakan di dalam LandingDataProvider');
  }
  return context;
};
