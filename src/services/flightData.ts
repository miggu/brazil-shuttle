export interface Offer {
    id: number;
    airline: string;
    price: number;
    time: string;
}

export interface FlightRoute {
    from: string;
    to: string;
    airline: string;
    duration: string;
    date: string;
}

export interface PriceHistoryPoint {
    day: string;
    price: number;
}

export interface FlightData {
    currentPrice: number;
    currency: string;
    trend: 'up' | 'down';
    percentage: number;
    history: PriceHistoryPoint[];
    route: FlightRoute;
    offers: Offer[];
}

export const getMockFlightData = (): FlightData => {
    return {
        currentPrice: 850,
        currency: 'EUR',
        trend: 'up', // 'up' or 'down'
        percentage: 12,
        history: [
            { day: 'Mon', price: 820 },
            { day: 'Tue', price: 810 },
            { day: 'Wed', price: 850 },
            { day: 'Thu', price: 900 },
            { day: 'Fri', price: 880 },
            { day: 'Sat', price: 920 },
            { day: 'Sun', price: 850 },
        ],
        route: {
            from: 'MAD',
            to: 'GRU',
            airline: 'Latam Airlines',
            duration: '10h 30m',
            date: '2024-04-12'
        },
        offers: [
            { id: 1, airline: 'Iberia', price: 920, time: '12:00 PM' },
            { id: 2, airline: 'Air Europa', price: 890, time: '3:00 PM' },
            { id: 3, airline: 'Latam', price: 850, time: '11:30 PM' },
        ]
    };
};
