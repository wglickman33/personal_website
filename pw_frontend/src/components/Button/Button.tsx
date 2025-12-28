import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gradient' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  target?: string;
  download?: boolean | string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  loading = false,
  target,
  download,
  ...rest
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    loading ? 'button--loading' : '',
    className
  ].filter(Boolean).join(' ');

  const buttonContent = (
    <>
      {loading && (
        <span className="button__loader"></span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="button__icon button__icon--left">
          {icon}
        </span>
      )}
      
      <span className="button__label">{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="button__icon button__icon--right">
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
        {...rest}
      >
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
        target={target || '_blank'}
        rel="noopener noreferrer"
        download={download}
        {...rest}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};

export default Button;