import React, { useState, useEffect } from 'react';
import axios from 'axios';

type AutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  onSelect,
}) => {
  const [options] = useState<string[]>([
    'Ash and Blood: Book 1 - The Awakening',
    'The Bone Season',
    'The Wrath and the Dawn',
    'The Lunar Chronicles: Cinder',
  ]);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    onChange(option);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        style={{ fontSize: '1.5rem', padding: '10px', width: '50%' }}
      />
      {options.length > 0 && value.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {options
            .filter((option) =>
              option.toLowerCase().includes(value.toLowerCase()),
            )
            .map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
