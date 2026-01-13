import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import FlightCard from './components/FlightCard';
import CalendarPicker from './components/CalendarPicker';
import RouteSelector from './components/RouteSelector';
import D3PriceChart from './components/D3PriceChart';
import { getMockFlightData, getApril2026Data, FlightData } from './services/flightData';

function App() {
    const [route, setRoute] = useState<'MAD-GRU' | 'GRU-MAD'>('MAD-GRU');
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
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Recent Projects</h2>
                    <p className="text-gray-500">Track changes in income over time.</p>
                </div>
                <RouteSelector route={route} onChange={setRoute} />
            </div>

            <div className="mb-8">
                <div className="airlines grid grid-cols-4 gap-6">
                    <div className="card bg-accent text-white">
                        <p className="m-0 opacity-90 text-sm">Best Price ({route === 'MAD-GRU' ? 'MAD' : 'GRU'})</p>
                        <h3 className="text-3xl font-bold mt-2">€{data.currentPrice}</h3>
                    </div>
                    <div className="card">
                        <p className="m-0 text-gray-500 text-sm">Average (Week)</p>
                        <h3 className="text-3xl font-bold mt-2 text-gray-800">€890</h3>
                    </div>
                    {/* More stats placeholder */}
                </div>
            </div>

            <div className="flex gap-8">
                <div className="flex-1">
                    <D3PriceChart data={dailyData} />
                </div>

                <div className="flex-1 min-w-[350px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Recent Offers</h3>
                        <a href="#" className="text-gray-500 text-sm hover:text-accent">See all</a>
                    </div>

                    {data.offers.map(offer => (
                        <FlightCard key={offer.id} offer={offer} />
                    ))}

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
