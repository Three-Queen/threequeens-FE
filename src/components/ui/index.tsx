// ============================================================
// SectionHeader — Reusable section title + subtitle component
// ============================================================

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
}

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  align = 'center',
  titleClassName = 'text-stone-900',
}: SectionHeaderProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={`mb-12 ${alignClass}`}>
      {badge && (
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-3">
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${titleClassName}`}>{title}</h2>
      {subtitle && (
        <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

// ============================================================
// Button — Reusable button component
// ============================================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  const base = 'font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer';

  const variants = {
    primary: 'bg-amber-700 hover:bg-amber-800 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white',
    ghost: 'text-amber-700 hover:bg-amber-50',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export { Skeleton, ProductCardSkeleton, ProjectCardSkeleton } from './Skeleton';
export {
  MapIcon,
  CalculatorIcon,
  DesignIcon,
  DocumentIcon,
  HandshakeIcon,
  FactoryIcon,
  ToolsIcon,
  CreditCardIcon,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  ArrowLeftIcon,
} from './Icons';

