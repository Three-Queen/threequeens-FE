import React from 'react';
import { useLandingData } from '../../context/LandingDataContext';
import layananImg from '../../assets/images/layanan-section.png';

const LayananSection = () => {
  const { data } = useLandingData();
  const whatsappNumber = data.kontak.whatsapp.replace(/\D/g, '');

  const services = [
    {
      title: 'Interior Residential',
      image: layananImg,
      features: [
        { icon: 'kitchen', text: 'Kitchen Set' },
        { icon: 'wardrobe', text: 'Wardrobe / Lemari Pakaian' },
        { icon: 'tv', text: 'TV Cabinet' },
        { icon: 'bed', text: 'Bedroom Set' },
        { icon: 'partition', text: 'Partisi Ruangan' },
        { icon: 'vanity', text: 'Vanity & Meja Rias' },
        { icon: 'laundry', text: 'Area Laundry' }
      ]
    },
    {
      title: 'Interior Komersial',
      image: layananImg,
      features: [
        { icon: 'office', text: 'Kantor / Office Set' },
        { icon: 'cafe', text: 'Cafe & Restoran' },
        { icon: 'shop', text: 'Toko & Showroom' },
        { icon: 'clinic', text: 'Klinik / Ruang Medis' },
        { icon: 'hotel', text: 'Hotel & Penginapan' }
      ]
    },
    {
      title: 'Furniture Custom',
      image: layananImg,
      features: [
        { icon: 'desk', text: 'Meja Kerja' },
        { icon: 'reception', text: 'Meja Resepsionis' },
        { icon: 'wardrobe', text: 'Lemari Penyimpanan' },
        { icon: 'shelf', text: 'Rak Display' },
        { icon: 'multi', text: 'Furniture Multifungsi' },
        { icon: 'custom', text: 'Sesuai Desain Klien' }
      ]
    }
  ];

  const getIcon = (iconType: string): React.ReactElement => {
    const icons: Record<string, React.ReactElement> = {
      kitchen: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h18M3 15h18M3 19h18M4 3h16a2 2 0 012 2v6H2V5a2 2 0 012-2z" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
        </svg>
      ),
      wardrobe: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <circle cx="9" cy="12" r="0.8" fill="currentColor" />
          <circle cx="15" cy="12" r="0.8" fill="currentColor" />
        </svg>
      ),
      tv: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="12" rx="2" />
          <path d="M12 15v4M8 21h8" />
        </svg>
      ),
      bed: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4v16M22 4v16M2 8h20M2 14h20" />
          <path d="M6 11v3M10 11v3" />
        </svg>
      ),
      partition: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h6v18H3zm12 0h6v18h-6z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      vanity: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M4 17h16v4H4z" />
        </svg>
      ),
      laundry: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 15h.01" />
        </svg>
      ),
      office: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="10" rx="1" />
          <path d="M3 10h18M10 14h4" />
        </svg>
      ),
      cafe: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v3M10 2v3M14 2v3" />
        </svg>
      ),
      shop: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10" />
        </svg>
      ),
      clinic: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
      hotel: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3M13 10l3-3" />
        </svg>
      ),
      desk: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="2" fill="currentColor" />
          <rect x="3" y="9" width="18" height="2" rx="1" fill="currentColor" />
          <line x1="5" y1="13" x2="5" y2="19" strokeLinecap="round" />
          <line x1="19" y1="13" x2="19" y2="19" strokeLinecap="round" />
        </svg>
      ),
      reception: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 12h4v8H2zm7-8h4v16H9zm7 4h4v12h-4z" />
        </svg>
      ),
      shelf: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="4" width="18" height="2" />
          <rect x="3" y="10" width="18" height="2" />
          <rect x="3" y="16" width="18" height="2" />
          <line x1="5" y1="4" x2="5" y2="18" stroke="currentColor" strokeWidth="1.5" />
          <line x1="19" y1="4" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      multi: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
          <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
          <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
          <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
        </svg>
      ),
      custom: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="6" width="16" height="12" rx="1" />
          <rect x="7" y="9" width="4" height="3" fill="white" />
          <rect x="13" y="9" width="4" height="3" fill="white" />
          <rect x="7" y="13" width="10" height="2" fill="white" />
        </svg>
      )
    };
    return icons[iconType] || icons.desk;
  };

  const handleWhatsAppClick = (serviceTitle: string) => {
    const message = encodeURIComponent(`Halo Three Queens, saya ingin berkonsultasi mengenai Layanan ${serviceTitle}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="layanan" className="relative w-full min-h-screen pt-16 pb-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${layananImg})` }}
      />

      {/* Top Brown Gradient Overlay - Full Coverage */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5C3A1E] via-[#5C3A1E]/50 via-95% to-transparent z-10 pointer-events-none" />

      {/* Bottom White Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-4 pb-12">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Layanan Kami
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Sesuaikan layanan kami dengan kebutuhan ruangan impian anda!
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="h-full"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-2xl hover:ring-2 hover:ring-[#5C3A1E] flex flex-col h-full">
                {/* Image Container with Label */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Service Label */}
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-xl shadow-lg">
                    <span className="text-[#5C3A1E] font-bold text-sm">{service.title}</span>
                  </div>
                </div>

              {/* Features List */}
              <div className="p-5 pb-3 space-y-2.5 flex-grow">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#3D2817]">
                      {getIcon(feature.icon)}
                    </div>
                    <span className="text-gray-900 text-sm leading-relaxed font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="px-5 pt-1 flex-shrink-0">
                <div className="border-t border-gray-900"></div>
              </div>

              {/* WhatsApp Button */}
              <div className="px-5 pb-5 pt-3 flex-shrink-0">
                <button
                  onClick={() => handleWhatsAppClick(service.title)}
                  className="w-full bg-white hover:bg-gray-50 text-[#5C3A1E] font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6 text-[#5C3A1E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Konsultasi Gratis Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Bottom Text */}
        <div className="text-center">
          <p className="text-gray-900 text-lg md:text-xl font-light">
            Proses yang transparan dan profesional dari awal hingga akhir
          </p>
        </div>
      </div>
    </section>
  );
};

export default LayananSection;
