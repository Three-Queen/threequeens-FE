import { useLandingData } from '../../context/LandingDataContext';
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
} from '../ui';

const KontakSection = () => {
  const { data } = useLandingData();
  const { kontak } = data;


  const formatWA = (num: string) => {
    let n = num.replace(/[^0-9]/g, '');
    if (n.startsWith('0')) n = '62' + n.slice(1);
    return n || '6281234567890';
  };

  const waLink = `https://wa.me/${formatWA(kontak.whatsapp)}?text=Halo%20Three%20Queens%2C%20saya%20ingin%20konsultasi%20furniture%20%26%20interior.`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kontak.lokasi)}`;
  const emailLink = `mailto:${kontak.email}`;

  const contactInfo = [
    {
      icon: <LocationIcon className="w-4 h-4 text-[#472404]" />,
      value: kontak.lokasi,
      href: mapsLink,
    },
    {
      icon: <PhoneIcon className="w-4 h-4 text-[#472404]" />,
      value: kontak.whatsapp,
      href: waLink,
    },
    {
      icon: <EmailIcon className="w-4 h-4 text-[#472404]" />,
      value: kontak.email,
      href: emailLink,
    },
    {
      icon: <ClockIcon className="w-4 h-4 text-[#472404]" />,
      value: kontak.jam_kerja,
    },
  ];

  return (
    <section
      id="kontak"
      className="relative w-full overflow-hidden min-h-[calc(100vh-60px)] flex flex-col justify-center"
      style={{
        backgroundColor: '#f9f7f4',
        backgroundImage: `
          linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 8%, rgba(249,247,244,0.85) 25%, rgba(249,247,244,0.4) 50%, rgba(249,247,244,0.3) 100%),
          url('/src/assets/images/contact-screen.png')
        `,
        backgroundSize: 'auto, cover',
        backgroundPosition: 'top, center 30%',
        backgroundRepeat: 'no-repeat, no-repeat',
      }}
    >


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-10 pb-12">


        <h2 
          data-aos="fade-down"
          className="text-3xl font-bold text-[#1a1a1a] text-center mb-6 md:mb-10 tracking-tight"
        >
          Kontak Kami
        </h2>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          <div className="space-y-6" data-aos="fade-right">

            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-[#1a1a1a] leading-snug">
                Siap Mewujudkan Furniture &amp; <br />
                Interior Impian Anda?
              </h3>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                id="kontak-wa-btn"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
              
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L.057 23.522a.5.5 0 0 0 .622.601l5.851-1.533A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.003-1.369l-.358-.213-3.713.974.991-3.628-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                </svg>
                Hubungi Sekarang
              </a>
            </div>

          
            <div className="border-t border-[#472404] w-2/3" />
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#1a1a1a] mb-4">Hubungi Kami</h4>
              {contactInfo.map((info, i) => {
                const content = (
                  <span className="leading-snug whitespace-pre-line">{info.value}</span>
                );
                return (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#472404]">
                    <span className="mt-0.5 shrink-0">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-[#6A3607] transition-colors duration-200"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>
          </div>

         
          <div className="flex items-start justify-center lg:justify-end" data-aos="fade-left">
            <div className="w-full max-w-full lg:max-w-[420px] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-stone-200">
              <iframe
                title="Three Queens Interior Location"
                src="https://maps.google.com/maps?q=Three+Queens+Interior+Karangtawang+Kuningan&output=embed&z=15"
                className="w-full h-[240px] md:h-[260px] lg:h-[240px]"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KontakSection;
