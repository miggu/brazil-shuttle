import React from 'react';

type RouteType = 'MAD-GRU' | 'GRU-MAD';

interface RouteSelectorProps {
  route: RouteType;
  onChange: (route: RouteType) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ route, onChange }) => {
  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-accent bg-orange-50 px-2 py-1 rounded border border-orange-100">
          One Way
        </span>
      </div>

      <div className="relative flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner w-[240px]">
        {/* Sliding Background */}
        <div
          className={`
                        absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm bg-white border border-gray-100
                        transition-all duration-300 ease-out
                        ${route === 'MAD-GRU' ? 'left-1' : 'left-[calc(50%+2px)]'}
                    `}
        ></div>

        {/* Buttons */}
        <button
          onClick={() => onChange('MAD-GRU')}
          className={`
                        relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200
                        ${route === 'MAD-GRU' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
                    `}
        >
          MAD → GRU
        </button>

        <button
          onClick={() => onChange('GRU-MAD')}
          className={`
                        relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200
                        ${route === 'GRU-MAD' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
                    `}
        >
          GRU → MAD
        </button>
      </div>
    </div>
  );
};

export default RouteSelector;
