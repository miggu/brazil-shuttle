import React from 'react';
import { PriceHistoryPoint } from '../services/flightData';

interface PriceChartProps {
    data: PriceHistoryPoint[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    const maxPrice = Math.max(...data.map(d => d.price));
    const minPrice = Math.min(...data.map(d => d.price));

    // Normalize heights for the chart (0 to 100)
    const getBarHeight = (price: number) => {
        return ((price - minPrice * 0.9) / (maxPrice - minPrice * 0.9)) * 100;
    };

    return (
        <div className="card flex-[2] min-w-[400px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Price Tracker</h3>
                    <p className="text-gray-500 text-sm">Madrid (MAD) - Sao Paulo (GRU)</p>
                </div>
                <select className="px-3 py-2 rounded-full border border-gray-200 text-gray-500 outline-none text-sm bg-white cursor-pointer hover:border-gray-300">
                    <option>Week</option>
                    <option>Month</option>
                </select>
            </div>

            <div className="flex items-end justify-between h-[200px] gap-4">
                {data.map((point, index) => {
                    // const isToday = index === 2; // Mock "Today"
                    return (
                        <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="relative w-12 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-end">
                                <div
                                    className={`w-full transition-all duration-500 hover:opacity-80 ${index === 4 ? 'bg-orange-500' : 'bg-gray-300'}`}
                                    style={{ height: `${(point.price / maxPrice) * 100}%` }}
                                ></div>

                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    €{point.price}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{point.month}</span>
                        </div>
                    )
                })}
            </div>


            <div className="mt-8">
                <h1 className="text-4xl font-semibold text-gray-900 m-0">+12%</h1>
                <p className="text-gray-500 mt-1">
                    Current price is higher than last week's average.
                </p>
            </div>
        </div>
    );
};

export default PriceChart;
