export interface Offer {
    id: number;
    airline: string;
    price: number;
}
export interface FlightRoute {
    from: string;
    to: string;
    airline: string;
    duration: string;
    date: string;
}

export interface PriceHistoryPoint {
    month: string;
    price: number;
}

export interface FlightOffer {
    id: number;
    airline: string;
    price: number;
    time: string;
    duration: string;
    route: string;
}

export interface FlightData {
    currentPrice: number;
    currency: string;
    trend: 'up' | 'down';
    percentage: number;
    history: PriceHistoryPoint[];
    route: {
        from: string;
        to: string;
        airline: string;
        flightNumber: string;
        date: string;
    };
    offers: FlightOffer[];
}

// Helper to generate daily prices for April 2026
export const getApril2026Data = () => {
    const daysInMonth = 30; // April has 30 days
    const basePrice = 800;
    const dailyData: { date: Date; price: number }[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(2026, 3, day); // Month is 0-indexed (3 = April)
        const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
        
        let price = basePrice + (Math.random() * 300 - 150); // +/- 150 variation

        // Weekend spike (Friday, Saturday, Sunday)
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
            price += 150 + (Math.random() * 100);
        }

        dailyData.push({
            date: date,
            price: Math.round(price)
        });
    }
    return dailyData;
};

// Simulates "Best Day to Buy" analysis based on historical trends for the selected travel date
export const getMockFlightData = (travelDate: Date = new Date()): FlightData => {
    console.log('Generating insights for:', travelDate);
    return {
        currentPrice: 845,
        currency: 'EUR', // Keeping currency as it's not explicitly removed
        trend: 'down', // Assuming a default trend based on new data
        percentage: 5, // Assuming a default percentage
        history: [
            { month: '90 days out', price: 920 },
            { month: '60 days out', price: 750 }, // Best time
            { month: '30 days out', price: 890 },
            { month: '14 days out', price: 1100 },
            { month: '7 days out', price: 1350 },
        ],
        route: { // Keeping route as it's not explicitly removed
            from: 'MAD',
            to: 'GRU',
            airline: 'Latam Airlines',
            flightNumber: 'LA8065',
            date: '2026-04-15' // Updated availability date
        },
        offers: [
            { id: 1, airline: 'Iberia', price: 845, time: '21:30', duration: '11h 10m', route: 'Direct' },
            { id: 2, airline: 'LATAM', price: 890, time: '10:45', duration: '11h 05m', route: 'Direct' },
            { id: 3, airline: 'Air France', price: 780, time: '14:20', duration: '14h 30m', route: '1 Stop' },
        ]
    };
};
