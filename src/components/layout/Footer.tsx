import { NAV_ITEMS } from '../../constants';
import { useSmoothScroll } from '../../hooks';
import { useLandingData } from '../../context/LandingDataContext';
import logoImg from '../../assets/images/Logo.png';
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
} from '../ui';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09z" />
  </svg>
);

const Footer = () => {
  const { scrollTo } = useSmoothScroll();
  const { data } = useLandingData();
  const { kontak } = data;

  const contactInfo = [
    { icon: <LocationIcon className="w-4 h-4 text-[#7a5c3a]" />, value: kontak.lokasi },
    { icon: <PhoneIcon className="w-4 h-4 text-[#7a5c3a]" />, value: kontak.whatsapp },
    { icon: <EmailIcon className="w-4 h-4 text-[#7a5c3a]" />, value: kontak.email },
    { icon: <ClockIcon className="w-4 h-4 text-[#7a5c3a]" />, value: kontak.jam_kerja },
  ];



  const socialLinks = [
    {
      label: 'Facebook',
      href: kontak.facebook || '#',
      icon: <FacebookIcon className="w-4 h-4" />,
    },
    {
      label: 'Instagram',
      href: kontak.instagram || '#',
      icon: <InstagramIcon className="w-4 h-4" />,
    },
    {
      label: 'TikTok',
      href: '#',
      icon: <TikTokIcon className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-[#faf9f7] text-[#1a1a1a] border-t border-[#472404]">


      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_2fr_1fr_2fr] gap-10">

          <div className="flex flex-col items-center justify-center gap-1 min-w-[110px]">
            <img
              src={logoImg}
              alt="Three Queens Logo"
              className="h-28 w-auto object-contain"
            />
            {/* <span className="text-xs font-bold tracking-[0.2em] text-[#472404] uppercase text-center">
              THREE QUEENS
            </span> */}
          </div>


          <div className="flex flex-col justify-center gap-1.5">
            <h3 className="text-base font-bold text-[#1a1a1a] leading-snug">
              Kami Menciptakan<br />Ruangan Impian Anda!
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed mt-1">
              "Kami adalah perusahaan Desain dan Workshop Interior yang mengutamakan kreativitas dan fungsionalitas untuk menciptakan ruang impian anda"
            </p>
          </div>


          <div className="flex flex-col gap-2.5">
            <h4 className="text-base font-bold text-[#1a1a1a]">Link</h4>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm text-stone-600 hover:text-[#7a5c3a] transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex flex-col gap-2.5">
            <h4 className="text-base font-bold text-[#1a1a1a]">Hubungi Kami</h4>
            <ul className="space-y-1.5">
              {contactInfo.map((info, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                  <span className="mt-0.5 shrink-0">{info.icon}</span>
                  <span className="leading-snug whitespace-pre-line">{info.value}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-[#1a1a1a] hover:bg-[#472404] hover:text-white hover:border-[#472404] transition-all duration-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-6 border-t border-stone-200/60 mt-4 flex flex-col items-center justify-center text-center">
        <p className="text-xs sm:text-[13px] text-stone-500 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} Three Queens Interior. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
