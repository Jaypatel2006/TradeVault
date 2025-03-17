
import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-2xl transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
