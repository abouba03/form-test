import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="w-full  p-6 bg-white rounded-md shadow-md">
      {children}
    </div>
  );
};

export default FormContainer;
