import { useState, useEffect } from 'react';
import Layout from './components/Layout';

import CalendarPicker from './components/CalendarPicker';
import RouteSelector from './components/RouteSelector';
import D3PriceChart from './components/D3PriceChart';
import AirlineSelector from './components/AirlineSelector';
import { getMockFlightData, getApril2026Data, FlightData } from './services/flightData';

function App() {
    const [route, setRoute] = useState<'MAD-GRU' | 'GRU-MAD'>('MAD-GRU');
    const [selectedAirline, setSelectedAirline] = useState<string | null>(null);
    const [data, setData] = useState<FlightData | null>(null);
    const [dailyData, setDailyData] = useState<{ date: Date; price: number }[]>([]);
    const [travelDate, setTravelDate] = useState<Date | null>(null);

    useEffect(() => {
        // Fetch mock flight data
        setData(getMockFlightData(travelDate || undefined));

        // Fetch April 2026 daily data
        const aprilData = getApril2026Data();
        setDailyData(aprilData);
    }, [travelDate]);

    if (!data) return <Layout><div className="flex items-center justify-center h-full text-gray-400">Loading...</div></Layout>;

    // Filter offers based on selection


    return (
        <Layout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Recent Projects</h2>
                    <p className="text-gray-500">Track changes in income over time.</p>
                </div>
                <RouteSelector route={route} onChange={setRoute} />
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Airline</label>
                <AirlineSelector selectedAirline={selectedAirline} onSelect={setSelectedAirline} />
            </div>

            <div className="flex gap-8">
                <div className="flex-1">
                    <D3PriceChart data={dailyData} />
                </div>

                <div className="flex-1 min-w-[350px]">


                    {/* Calendar Integration */}
                    <div className="mt-6">
                        <CalendarPicker onDateSelect={setTravelDate} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default App;
