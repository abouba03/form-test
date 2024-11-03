import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  isTextarea?: boolean;
  isSelect?: boolean;
  options?: string[];
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', placeholder, value, onChange, required = false, isTextarea = false, isSelect = false, options = [], error }) => {
  return (
    <div className="form-field max-w-full relative">
      <label className="block">{label}</label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
           
        />
      ) : (
        <div className="relative flex items-center"> 
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md pr-10`} 
          />
          {error && (
            <span className="absolute right-2 text-red-500 text-sm flex items-center">{error}</span> 
          )}
        </div>
      )}
    </div>
  );
};

export default FormField;
