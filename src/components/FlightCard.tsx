import React from 'react';
import { Offer } from '../services/flightData';

interface FlightCardProps {
  offer: Offer;
}

const FlightCard: React.FC<FlightCardProps> = ({ offer }) => {
  return (
    <div className="card flex items-center justify-between mb-4 p-5 hover:shadow-md transition-shadow cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 text-2xl">
          ✈️
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-1">{offer.airline}</h4>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
              Direct
            </span>
            <span className="text-xs text-gray-500">
              {offer.time}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <span className="text-xl font-bold text-gray-900">€{offer.price}</span>
      </div>
    </div>
  );
};

export default FlightCard;
