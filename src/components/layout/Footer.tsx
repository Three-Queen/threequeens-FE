import { FOOTER_LINKS, NAV_ITEMS } from '../../constants';
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
  WhatsAppIcon,
} from '../ui';

// ============================================================
// Footer Component
// ============================================================

const Footer = () => {
  const { scrollTo } = useSmoothScroll();
  const { data } = useLandingData();
  const { kontak } = data;

  const dynamicContactInfo = [
    { icon: <LocationIcon className="w-5 h-5 text-amber-500" />, label: 'Alamat', value: kontak.lokasi },
    { icon: <PhoneIcon className="w-5 h-5 text-amber-500" />, label: 'Telepon', value: kontak.whatsapp },
    { icon: <EmailIcon className="w-5 h-5 text-amber-500" />, label: 'Email', value: kontak.email },
    { icon: <ClockIcon className="w-5 h-5 text-amber-500" />, label: 'Jam Operasional', value: kontak.jam_kerja },
  ];

  const dynamicSocialLinks = [
    { platform: 'Instagram', href: kontak.instagram || '#', icon: <InstagramIcon className="w-5 h-5" /> },
    { platform: 'Facebook', href: kontak.facebook || '#', icon: <FacebookIcon className="w-5 h-5" /> },
    { platform: 'WhatsApp', href: `https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '')}`, icon: <WhatsAppIcon className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-20 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img
                src={logoImg}
                alt="Three Queens Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Solusi furniture dan interior custom berkualitas tinggi untuk hunian dan ruang kerja impian Anda.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {dynamicSocialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="w-9 h-9 rounded-full bg-stone-700 hover:bg-amber-700 flex items-center justify-center transition-colors duration-200 text-stone-300 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Layanan
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              {dynamicContactInfo.map((info) => (
                <li key={info.label} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-1">{info.icon}</span>
                  <div>
                    <p className="text-xs text-stone-500">{info.label}</p>
                    <p className="text-sm text-stone-300">{info.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-700">
        <div className="max-w-7xl mx-auto px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Three Queens. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.company.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-stone-500 hover:text-amber-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
