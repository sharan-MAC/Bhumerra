
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-500 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transform-gpu";
  
  const variants = {
    primary: "bg-luxury-black text-soft-white hover:bg-champagne-gold hover:text-luxury-black",
    secondary: "bg-champagne text-luxury-black hover:bg-soft-white",
    outline: "border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white",
    ghost: "text-luxury-black hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-6 py-3 text-[9px] uppercase tracking-[0.3em]",
    md: "px-10 py-5 text-[10px] uppercase tracking-[0.3em]",
    lg: "px-14 py-6 text-[12px] uppercase tracking-[0.4em]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
