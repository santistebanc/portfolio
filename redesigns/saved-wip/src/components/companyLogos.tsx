const logoClass = 'exp-logo'

export const companyLogos: Record<string, React.ReactElement> = {
  Quandoo: (
    <svg className={logoClass} viewBox="0 0 33 37" xmlns="http://www.w3.org/2000/svg" aria-label="Quandoo">
      <path d="M17.885 30.225c-1.064-1.362-2.309-3.659-2.81-5.224-4.055 0-8.973-3.272-8.973-9.736 0-5.447 3.212-9.675 8.953-9.675 5.46 0 8.992 4.634 8.992 9.797 0 5.244-3.252 8.517-5.6 8.517 0 0 1.786 4.471 5.7 7.703 1.707 1.403 5.942 4.452 9.896 5.366l.723-.975c-5.038-2.013-8.752-5.123-8.752-7.968 0-1.687.442-2.541 1.345-3.862a15.045 15.045 0 0 0 2.75-8.66C30.109 6.668 23.304 0 14.974 0 6.945 0 0 6.667 0 15.285c0 8.984 7.989 16.79 17.885 14.94Z" fill="#F8B333" fillRule="nonzero" />
    </svg>
  ),

  'Market Logic Software': (
    <svg className={logoClass} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Market Logic Software">
      <rect width="100" height="100" rx="18" fill="#0066FF" />
      {/* Arms */}
      <line x1="49" y1="49" x2="73" y2="21" stroke="white" strokeWidth="11" strokeLinecap="round" />
      <line x1="49" y1="49" x2="25" y2="28" stroke="white" strokeWidth="9" strokeLinecap="round" />
      <line x1="49" y1="49" x2="49" y2="72" stroke="white" strokeWidth="11" strokeLinecap="round" />
      {/* Top-right large circle */}
      <circle cx="73" cy="20" r="17" fill="white" />
      {/* Top-left smaller circle */}
      <circle cx="24" cy="27" r="12" fill="white" />
      {/* Bottom ring */}
      <circle cx="49" cy="73" r="13" fill="white" />
      <circle cx="49" cy="73" r="7" fill="#0066FF" />
    </svg>
  ),
}
