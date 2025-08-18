import React from 'react';

interface ToolButtonProps {
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({ label, onClick, selected }) => {
  return (
    <button
      className={`tool-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToolButton;