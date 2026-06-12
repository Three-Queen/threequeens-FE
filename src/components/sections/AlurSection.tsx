import { ORDER_STEPS } from '../../constants';
import {
  SectionHeader,
  MapIcon,
  CalculatorIcon,
  DesignIcon,
  DocumentIcon,
  HandshakeIcon,
  FactoryIcon,
  ToolsIcon,
  CreditCardIcon,
} from '../ui';

// ============================================================
// Alur Pesanan Section
// ============================================================

const getStepIcon = (stepNumber: number) => {
  const iconClass = "w-5 h-5 text-[#472404] flex-shrink-0";
  switch (stepNumber) {
    case 1: return <MapIcon className={iconClass} />;
    case 2: return <CalculatorIcon className={iconClass} />;
    case 3: return <DesignIcon className={iconClass} />;
    case 4: return <DocumentIcon className={iconClass} />;
    case 5: return <HandshakeIcon className={iconClass} />;
    case 6: return <FactoryIcon className={iconClass} />;
    case 7: return <ToolsIcon className={iconClass} />;
    case 8: return <CreditCardIcon className={iconClass} />;
    default: return null;
  }
};

const AlurSection = () => {
  return (
    <section id="alur" className="py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Section Header */}
        <SectionHeader
          title="Alur Pesanan"
          subtitle="Proses yang transparan dan profesional dari awal hingga akhir."
        />

        {/* Timeline Container */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* Central Vertical Line (Desktop) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-stone-200 transform -translate-x-1/2 z-0 hidden lg:block" />
          
          {/* Left Vertical Line (Mobile) */}
          <div className="absolute left-[30px] top-4 bottom-4 w-0.5 bg-stone-200 z-0 block lg:hidden" />
          
          {/* Step Rows */}
          <div className="space-y-12 lg:space-y-8">
            {ORDER_STEPS.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <div 
                  key={step.step} 
                  className="relative flex flex-col lg:flex-row items-start lg:items-center w-full min-h-[90px]"
                >
                  {/* Step Circle Badge */}
                  <div className="absolute left-[12px] lg:left-1/2 transform lg:-translate-x-1/2 top-1.5 lg:top-1/2 lg:-translate-y-1/2 z-10 w-9 h-9 bg-[#472404] text-[#FCEEE3] text-[13px] font-bold rounded-full flex items-center justify-center border-[3px] border-[#F5E5D9] shadow-sm">
                    {step.step}
                  </div>

                  {/* Dotted Connecting Line (Desktop) */}
                  {!isEven ? (
                    <div className="hidden lg:block absolute right-[calc(50%+18px)] top-1/2 w-[60px] h-0 border-t-2 border-dashed border-[#472404] -translate-y-1/2 z-0" />
                  ) : (
                    <div className="hidden lg:block absolute left-[calc(50%+18px)] top-1/2 w-[60px] h-0 border-t-2 border-dashed border-[#472404] -translate-y-1/2 z-0" />
                  )}

                  {/* Content Block */}
                  <div className={`w-full pl-16 pr-4 lg:px-0 lg:w-1/2 ${!isEven ? 'lg:pr-24 lg:text-right' : 'lg:pl-24 lg:text-left lg:ml-auto'}`}>
                    <h3 className={`font-bold text-[#472404] text-lg flex items-center gap-2 mb-1.5 ${!isEven ? 'lg:justify-end lg:flex-row-reverse' : 'lg:justify-start'}`}>
                      {getStepIcon(step.step)}
                      <span>{step.title}</span>
                    </h3>
                    <p className="text-stone-500 text-[13.5px] leading-relaxed max-w-[420px] lg:max-w-none mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AlurSection;
