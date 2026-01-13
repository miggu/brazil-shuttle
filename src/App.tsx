import { useState, useEffect } from "react";
import Layout from "./components/Layout";

import CalendarPicker from "./components/CalendarPicker";
import RouteSelector from "./components/RouteSelector";
import D3PriceChart from "./components/D3PriceChart";
import AirlineSelector from "./components/AirlineSelector";
import { getMonthlyData } from "./services/flightData";

function App() {
  const [route, setRoute] = useState<"MAD-GRU" | "GRU-MAD">("MAD-GRU");
  const [selectedAirline, setSelectedAirline] = useState<string | null>(
    "LATAM",
  );

  const [dailyData, setDailyData] = useState<{ date: Date; price: number }[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch April 2026 daily data (Month is 0-indexed, so 3 is April)
    const aprilData = getMonthlyData(2026, 3);
    setDailyData(aprilData);
  }, []);

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Brazil Shuttle
          </h2>
          <p className="text-gray-500">Track flight prices to Brazil.</p>
        </div>
        <RouteSelector route={route} onChange={setRoute} />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Filter by Airline
        </label>
        <AirlineSelector
          selectedAirline={selectedAirline}
          onSelect={setSelectedAirline}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
        <D3PriceChart data={dailyData} />
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    </Layout>
  );
}

export default App;
