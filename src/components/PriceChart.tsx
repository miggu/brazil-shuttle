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
                    const isToday = index === 2; // Mock "Today"
                    return (
                        <div key={point.day} className="flex flex-col items-center flex-1 gap-3">
                            {isToday && (
                                <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold -mb-2 z-10">
                                    ${point.price}
                                </div>
                            )}
                            <div
                                className={`w-full max-w-[40px] rounded-full transition-all duration-500 relative ${isToday ? 'bg-gray-800' : 'bg-gray-200'}`}
                                style={{ height: `${getBarHeight(point.price)}%` }}
                            >
                            </div>
                            <span className={`text-sm w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-gray-200 font-bold text-gray-800' : 'text-gray-400 font-normal'}`}>
                                {point.day.charAt(0)}
                            </span>
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
