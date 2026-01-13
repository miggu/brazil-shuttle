import React from 'react';

interface AirlineSelectorProps {
  selectedAirline: string | null;
  onSelect: (airline: string | null) => void;
}

const airlines = [
  { name: 'LATAM', domain: 'latamairlines.com' },
  { name: 'Iberia', domain: 'iberia.com' },
  { name: 'Air Europa', domain: 'aireuropa.com' },
  { name: 'Air China', domain: 'airchina.com.cn' },
];

const AirlineSelector: React.FC<AirlineSelectorProps> = ({ selectedAirline, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {airlines.map((airline) => {
        const isSelected = selectedAirline === airline.name;
        return (
          <button
            key={airline.name}
            onClick={() => onSelect(isSelected ? null : airline.name)}
            className={`
                            relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 border-2
                            ${isSelected
                ? 'bg-orange-50 border-orange-500 shadow-md transform scale-105'
                : 'bg-white border-transparent hover:border-gray-200 hover:shadow-sm'
              }
                        `}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center mb-2 p-1">
              <img
                src={`https://img.logo.dev/${airline.domain}?token=pk_QFOCjYseTyOzmrdy8_X9cA`}
                alt={`${airline.name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerText = airline.name[0];
                }}
              />
            </div>
            <span className={`text-xs font-semibold ${isSelected ? 'text-orange-700' : 'text-gray-500'}`}>
              {airline.name}
            </span>

            {/* Checkmark indicator for selected state */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AirlineSelector;
