export default function Card({ children, className = '' }) {
  return (
    <div 
      className={`
        relative 
        bg-white
        border border-slate-200 
        shadow-sm
        rounded-2xl 
        overflow-hidden 
        transition-all duration-500 
        hover:shadow-xl hover:shadow-brand-pink/10
        hover:border-brand-pink/30 
        ${className}
      `}
    >
      {/* Subtle Top Gradient Line for polish */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-brand-pink/40 transition-all duration-500" />
      
      {children}
    </div>
  );
}
