import React from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-sans font-extrabold text-[2rem] tracking-tight select-none text-[#14532d] ${className}`}
      style={{ fontFamily: 'Noto Sans TC, Inter, Poppins, Arial, sans-serif' }}
      aria-label="Plantie Logo"
    >
      Plantie
    </span>
  )
}

export default Logo 