import { useState, useEffect } from "react";
import moment from "moment";
import Layout from "./components/Layout";
import { DATE_FORMATS } from "./constants/theme";

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

  // State for the "Day of Purchase" chart month (default Jan 2026)
  const [purchaseMonth, setPurchaseMonth] = useState(moment("2026-01-01"));

  useEffect(() => {
    // Fetch data for the currently selected purchase month
    const year = purchaseMonth.year();
    const month = purchaseMonth.month(); // 0-11
    const data = getMonthlyData(year, month);
    setDailyData(data);
  }, [purchaseMonth]);

  const handlePrevMonth = () => {
    setPurchaseMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setPurchaseMonth((prev) => prev.clone().add(1, "month"));
  };

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-title mb-2 text-gray-800">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 h-[400px]">
        <D3PriceChart
          data={dailyData}
          monthLabel={purchaseMonth.format(DATE_FORMATS.display)}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    </Layout>
  );
}

export default App;
