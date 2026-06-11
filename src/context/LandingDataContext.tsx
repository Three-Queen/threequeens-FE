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
  categories: { id: number; nama_kategori: string }[];
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
      title: 'Three Queen Interior',
      deskripsi: 'Hadirkan keindahan dan kenyamanan ke dalam setiap ruangan bersama Three Queen Interior. Kami menghadirkan solusi desain interior premium untuk hunian dan bisnis Anda.',
      background: null,
    },
    tentang: {
      title: 'Tentang Three Queen Interior',
      deskripsi: 'Three Queen Interior adalah perusahaan desain interior terpercaya yang telah berpengalaman dalam menciptakan ruangan indah dan fungsional. Kami berkomitmen untuk memberikan solusi terbaik bagi setiap klien kami dengan mengutamakan kualitas, estetika, dan kepuasan pelanggan.',
      gambar1: null,
      gambar2: null,
    },
    kontak: {
      lokasi: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345',
      whatsapp: '081234567890',
      email: 'info@threequeen.com',
      facebook: null,
      tiktok: null,
      instagram: null,
      jam_kerja: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    },
    categories: [
      { id: 0, nama_kategori: 'Semua' },
      { id: 1, nama_kategori: 'Kitchen Set' },
      { id: 2, nama_kategori: 'Lemari' },
      { id: 3, nama_kategori: 'Meja' },
      { id: 4, nama_kategori: 'Kursi' },
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
            { id: 0, nama_kategori: 'Semua' },
            ...apiData.categories.map((c: any) => ({
              id: c.id,
              nama_kategori: c.nama_kategori,
            })),
          ];

          setData({
            beranda: {
              title: apiData.beranda.title || 'Three Queen Interior',
              deskripsi: apiData.beranda.deskripsi || '',
              background: apiData.beranda.background,
            },
            tentang: {
              title: apiData.tentang.title || 'Tentang Three Queen Interior',
              deskripsi: apiData.tentang.deskripsi || '',
              gambar1: apiData.tentang.gambar1,
              gambar2: apiData.tentang.gambar2,
            },
            kontak: {
              lokasi: apiData.kontak.lokasi || 'Jl. Contoh No. 123, Jakarta Selatan',
              whatsapp: apiData.kontak.whatsapp || '081234567890',
              email: apiData.kontak.email || 'info@threequeen.com',
              facebook: apiData.kontak.facebook || null,
              tiktok: apiData.kontak.tiktok || null,
              instagram: apiData.kontak.instagram || null,
              jam_kerja: apiData.kontak.jam_kerja || 'Senin - Sabtu: 08.00 - 17.00 WIB',
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
