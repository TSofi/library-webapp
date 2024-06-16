import React, { useState, useEffect } from 'react';
import axios from 'axios';

type AutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: any) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  onSelect,
}) => {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (value.length > 2) {
      const fetchBookOptions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/addBook/autocomplete?query=${value}`,
          );
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching book options:', error);
        }
      };

      fetchBookOptions();
    } else {
      setOptions([]);
    }
  }, [value]);

  const handleSelectOption = (option: any) => {
    onSelect(option);
    onChange(option.title);
    setOptions([]);
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
      {options.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelectOption(option)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                borderBottom: '1px solid #ccc',
              }}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
