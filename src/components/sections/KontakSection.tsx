import { useState } from 'react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

// ============================================================
// Kontak Section
// ============================================================

const KontakSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wa = `https://wa.me/6281234567890?text=Halo%20Three%20Queens%2C%20saya%20${encodeURIComponent(form.name)}%20ingin%20konsultasi.%20${encodeURIComponent(form.message)}`;
    window.open(wa, '_blank');
  };

  return (
    <section id="kontak" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-20">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-3">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Kontak
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-base">
            Kami siap membantu mewujudkan ruangan impian Anda. Hubungi kami kapan saja!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
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
                {SOCIAL_LINKS.map((social) => (
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
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                💬 Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KontakSection;
