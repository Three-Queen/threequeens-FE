import { useState } from 'react';
import { useLandingData } from '../../context/LandingDataContext';
import {
  SectionHeader,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
} from '../ui';

// ============================================================
// Kontak Section
// ============================================================

const KontakSection = () => {
  const { data, submitMessage } = useLandingData();
  const { kontak } = data;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit message to backend REST API
    await submitMessage({
      name: form.name,
      email: '', // Not required by frontend UI
      phone: form.phone,
      message: form.message,
    });

    // Format WhatsApp number: strip non-digits and ensure it starts with 62
    let formattedWA = kontak.whatsapp.replace(/[^0-9]/g, '');
    if (formattedWA.startsWith('0')) {
      formattedWA = '62' + formattedWA.slice(1);
    }
    if (!formattedWA) {
      formattedWA = '6281234567890'; // Fallback
    }

    const wa = `https://wa.me/${formattedWA}?text=Halo%20Three%20Queens%2C%20saya%20${encodeURIComponent(form.name)}%20ingin%20konsultasi.%20${encodeURIComponent(form.message)}`;
    window.open(wa, '_blank');
  };

  const dynamicContactInfo = [
    { icon: <LocationIcon className="w-5 h-5 text-amber-700" />, label: 'Alamat', value: kontak.lokasi },
    { icon: <PhoneIcon className="w-5 h-5 text-amber-700" />, label: 'Telepon', value: kontak.whatsapp },
    { icon: <EmailIcon className="w-5 h-5 text-amber-700" />, label: 'Email', value: kontak.email },
    { icon: <ClockIcon className="w-5 h-5 text-amber-700" />, label: 'Jam Operasional', value: kontak.jam_kerja },
  ];

  const dynamicSocialLinks = [
    { platform: 'Instagram', href: kontak.instagram || '#', icon: <InstagramIcon className="w-5 h-5" /> },
    { platform: 'Facebook', href: kontak.facebook || '#', icon: <FacebookIcon className="w-5 h-5" /> },
    { platform: 'WhatsApp', href: `https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '')}`, icon: <WhatsAppIcon className="w-5 h-5" /> },
  ];

  return (
    <section id="kontak" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-20">

        {/* Section Header */}
        <SectionHeader
          badge="Hubungi Kami"
          title="Kontak"
          subtitle="Kami siap membantu mewujudkan ruangan impian Anda. Hubungi kami kapan saja!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {dynamicContactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">{info.label}</p>
                    <p className="text-stone-700 font-medium mt-0.5">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-3">Ikuti Kami</p>
              <div className="flex items-center gap-3">
                {dynamicSocialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.platform}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-full text-sm text-stone-600 hover:text-amber-700 transition-all duration-200"
                  >
                    <span>{social.icon}</span>
                    <span className="font-medium">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 bg-stone-200 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
              <span className="text-stone-400 text-sm">Google Maps Embed</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-stone-800 mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 0812-3456-7890"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Pesan / Kebutuhan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ceritakan kebutuhan furniture / interior Anda..."
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KontakSection;
