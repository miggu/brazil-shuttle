import { useState, useEffect } from 'react';
import Layout from './components/Layout';

import CalendarPicker from './components/CalendarPicker';
import RouteSelector from './components/RouteSelector';
import D3PriceChart from './components/D3PriceChart';
import AirlineSelector from './components/AirlineSelector';
import { getApril2026Data } from './services/flightData';

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

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Next Adventure</h2>
                    <p className="text-gray-500">Track changes in income over time.</p>
                </div>
                <RouteSelector route={route} onChange={setRoute} />
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Airline</label>
                <AirlineSelector selectedAirline={selectedAirline} onSelect={setSelectedAirline} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                <D3PriceChart data={dailyData} />
                <CalendarPicker onDateSelect={setTravelDate} />
            </div>
        </Layout>
    );
}

export default App;
