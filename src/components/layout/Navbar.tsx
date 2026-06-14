import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrolled, useSmoothScroll } from '../../hooks';
import logoImg from '../../assets/images/Logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#beranda');
  const [isMobileTentangOpen, setIsMobileTentangOpen] = useState(false);
  const [isMobileLayananOpen, setIsMobileLayananOpen] = useState(false);
  const isScrolled = useScrolled(60);
  const { scrollTo } = useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    if (['#tentang', '#kontak'].includes(activeSection)) {
      setIsMobileTentangOpen(true);
    }
    if (['#layanan', '#produk', '#alur'].includes(activeSection)) {
      setIsMobileLayananOpen(true);
    }
  }, [activeSection]);

  useEffect(() => {
    // If not on the homepage, highlight the appropriate section active
    if (location.pathname !== '/') {
      const timer = setTimeout(() => {
        if (location.pathname.startsWith('/portofolio')) {
          setActiveSection('#portfolio');
        } else {
          setActiveSection('#produk');
        }
      }, 0);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. If at the very top, highlight Beranda
      if (scrollPosition < 100) {
        setActiveSection('#beranda');
        return;
      }

      // 2. If at the very bottom, highlight Kontak
      if (scrollPosition + windowHeight >= docHeight - 100) {
        setActiveSection('#kontak');
        return;
      }

      // 3. Check which section is currently in view
      const sectionIds = ['beranda', 'tentang', 'layanan', 'produk', 'portfolio', 'alur', 'kontak'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Consider active if the section spans across the 30% trigger line from screen top
          const triggerPoint = windowHeight * 0.3;
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to set the correct active section on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    scrollTo(href);
    setIsMenuOpen(false);
    setActiveSection(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/75 backdrop-blur-md shadow-sm border-b border-stone-200/50'
          : 'bg-white'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-[60px]">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNavClick('#beranda')}
            className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0 flex-shrink-0"
            aria-label="Three Queens - Beranda"
          >
            <img
              src={logoImg}
              alt="Three Queens Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-extrabold text-[1.2rem] text-[#472404] tracking-tight">
              ThreeQueen's
            </span>
          </button>


          <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
            {/* Beranda */}
            <button
              onClick={() => handleNavClick('#beranda')}
              className={`text-[15px] cursor-pointer whitespace-nowrap pb-1 transition-all duration-200 border-b-2 ${
                activeSection === '#beranda'
                  ? 'font-bold text-[#472404] border-[#472404]'
                  : 'font-medium text-[#472404] border-transparent hover:text-[#472404]'
              }`}
            >
              Beranda
            </button>

            {/* Tentang Dropdown */}
            <div className="relative group py-2">
              <button
                className={`text-[15px] cursor-pointer whitespace-nowrap pb-1 transition-all duration-200 border-b-2 flex items-center gap-1.5 ${
                  ['#tentang', '#kontak'].includes(activeSection)
                    ? 'font-bold text-[#472404] border-[#472404]'
                    : 'font-medium text-[#472404] border-transparent hover:text-[#472404]'
                }`}
              >
                <span>Tentang</span>
                <svg 
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-[#472404]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Box */}
              <div className="absolute left-0 mt-1.5 w-52 bg-white border border-stone-100 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 py-2">
                <button
                  onClick={() => handleNavClick('#tentang')}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    activeSection === '#tentang' ? 'text-[#472404] bg-stone-50 font-semibold' : 'text-stone-600 hover:text-[#472404] hover:bg-stone-50'
                  }`}
                >
                  Tentang Kami
                </button>
                <button
                  onClick={() => handleNavClick('#kontak')}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    activeSection === '#kontak' ? 'text-[#472404] bg-stone-50 font-semibold' : 'text-stone-600 hover:text-[#472404] hover:bg-stone-50'
                  }`}
                >
                  Hubungi Kami (Kontak)
                </button>
              </div>
            </div>

            {/* Layanan Dropdown */}
            <div className="relative group py-2">
              <button
                className={`text-[15px] cursor-pointer whitespace-nowrap pb-1 transition-all duration-200 border-b-2 flex items-center gap-1.5 ${
                  ['#layanan', '#produk', '#alur'].includes(activeSection)
                    ? 'font-bold text-[#472404] border-[#472404]'
                    : 'font-medium text-[#472404] border-transparent hover:text-[#472404]'
                }`}
              >
                <span>Layanan</span>
                <svg 
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-[#472404]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Box */}
              <div className="absolute left-0 mt-1.5 w-52 bg-white border border-stone-100 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 py-2">
                <button
                  onClick={() => handleNavClick('#layanan')}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    activeSection === '#layanan' ? 'text-[#472404] bg-stone-50 font-semibold' : 'text-stone-600 hover:text-[#472404] hover:bg-stone-50'
                  }`}
                >
                  Layanan Kami
                </button>
                <button
                  onClick={() => handleNavClick('#produk')}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    activeSection === '#produk' ? 'text-[#472404] bg-stone-50 font-semibold' : 'text-stone-600 hover:text-[#472404] hover:bg-stone-50'
                  }`}
                >
                  Produk Kami
                </button>
                <button
                  onClick={() => handleNavClick('#alur')}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    activeSection === '#alur' ? 'text-[#472404] bg-stone-50 font-semibold' : 'text-stone-600 hover:text-[#472404] hover:bg-stone-50'
                  }`}
                >
                  Alur Pesanan
                </button>
              </div>
            </div>

            {/* Portofolio */}
            <button
              onClick={() => handleNavClick('#portfolio')}
              className={`text-[15px] cursor-pointer whitespace-nowrap pb-1 transition-all duration-200 border-b-2 ${
                activeSection === '#portfolio'
                  ? 'font-bold text-[#472404] border-[#472404]'
                  : 'font-medium text-[#472404] border-transparent hover:text-[#472404]'
              }`}
            >
              Portofolio
            </button>
          </div>


          <div className="hidden md:block flex-shrink-0">
            <button
              onClick={() => handleNavClick('#kontak')}
              className="flex items-center gap-2 bg-[#472404] hover:bg-[#472404] text-white text-[15px] font-medium px-6 py-2.5 rounded-md transition-all duration-200 shadow-sm"
            >

              <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi
            </button>
          </div>


          <button
            className="md:hidden p-2 rounded-lg text-stone-600 hover:text-[#472404] hover:bg-amber-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Dropdown Menu ── */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-100 bg-white pb-4 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col py-3 px-3 gap-1">
              
              {/* Beranda */}
              <button
                onClick={() => handleNavClick('#beranda')}
                className={`text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-[15px] ${
                  activeSection === '#beranda'
                    ? 'font-bold text-[#472404] bg-amber-50'
                    : 'font-medium text-[#472404] hover:bg-amber-50/20'
                }`}
              >
                Beranda
              </button>

              {/* Tentang Group */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsMobileTentangOpen(!isMobileTentangOpen)}
                  className={`w-full text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-[15px] flex items-center justify-between ${
                    ['#tentang', '#kontak'].includes(activeSection)
                      ? 'font-bold text-[#472404]'
                      : 'font-medium text-[#472404]'
                  }`}
                >
                  <span>Tentang</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 text-[#472404] ${isMobileTentangOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileTentangOpen && (
                  <div className="pl-4 space-y-1 border-l border-stone-200 ml-4 py-1">
                    <button
                      onClick={() => handleNavClick('#tentang')}
                      className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-[14px] ${
                        activeSection === '#tentang'
                          ? 'font-bold text-[#472404] bg-amber-50/50'
                          : 'font-medium text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Tentang Kami
                    </button>
                    <button
                      onClick={() => handleNavClick('#kontak')}
                      className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-[14px] ${
                        activeSection === '#kontak'
                          ? 'font-bold text-[#472404] bg-amber-50/50'
                          : 'font-medium text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Hubungi Kami (Kontak)
                    </button>
                  </div>
                )}
              </div>

              {/* Layanan Group */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsMobileLayananOpen(!isMobileLayananOpen)}
                  className={`w-full text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-[15px] flex items-center justify-between ${
                    ['#layanan', '#produk', '#alur'].includes(activeSection)
                      ? 'font-bold text-[#472404]'
                      : 'font-medium text-[#472404]'
                  }`}
                >
                  <span>Layanan</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 text-[#472404] ${isMobileLayananOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileLayananOpen && (
                  <div className="pl-4 space-y-1 border-l border-stone-200 ml-4 py-1">
                    <button
                      onClick={() => handleNavClick('#layanan')}
                      className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-[14px] ${
                        activeSection === '#layanan'
                          ? 'font-bold text-[#472404] bg-amber-50/50'
                          : 'font-medium text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Layanan Kami
                    </button>
                    <button
                      onClick={() => handleNavClick('#produk')}
                      className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-[14px] ${
                        activeSection === '#produk'
                          ? 'font-bold text-[#472404] bg-amber-50/50'
                          : 'font-medium text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Produk Kami
                    </button>
                    <button
                      onClick={() => handleNavClick('#alur')}
                      className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-[14px] ${
                        activeSection === '#alur'
                          ? 'font-bold text-[#472404] bg-amber-50/50'
                          : 'font-medium text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Alur Pesanan
                    </button>
                  </div>
                )}
              </div>

              {/* Portofolio */}
              <button
                onClick={() => handleNavClick('#portfolio')}
                className={`text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-[15px] ${
                  activeSection === '#portfolio'
                    ? 'font-bold text-[#472404] bg-amber-50'
                    : 'font-medium text-[#472404] hover:bg-amber-50/20'
                }`}
              >
                Portofolio
              </button>

              <button
                onClick={() => handleNavClick('#kontak')}
                className="mt-3 flex items-center justify-center gap-2 bg-[#472404] text-white py-2.5 px-5 rounded-md text-[15px] font-medium"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
