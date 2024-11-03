import React from 'react';

interface FormButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const FormButton: React.FC<FormButtonProps> = ({ text, onClick, disabled = false, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md';
  const variantClasses = variant === 'primary' ? 'bg-blue-500 text-white' : 'border border-red-600 text-red-600';
  const disabledClasses = disabled ? 'bg-gray-300 cursor-not-allowed' : '';

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses} ${disabledClasses}`}>
      {text}
    </button>
  );
};

export default FormButton;
