export type TransportType = 'bus' | 'train' | 'flight';

export interface Station {
    id: string;
    name: string;
    code: string;
    city: string;
}

export interface Trip {
    id: string;
    type: TransportType;
    operatorName: string;
    number: string;
    from: Station;
    to: Station;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    priceUSD: number;
    availableSeats: string[]; // e.g., ['A1', 'A2', 'B1', 'B2', ...]
    totalSeats: number;
    class: string; // e.g., 'Economy', 'Business', 'AC_Chair', 'Sleeper'
}

export interface Passenger {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    passportOrNID: string;
}

export interface Booking {
    id: string;
    trip: Trip;
    seats: string[];
    passengers: Passenger[];
    totalPriceUSD: number;
    currency: string;
    exchangeRate: number;
    paymentStatus: 'pending' | 'completed' | 'cancelled';
    bookingDate: string;
    ticketPNR: string;
}

export interface Feedback {
    id: string;
    userName: string;
    email: string;
    rating: number;
    comment: string;
    date: string;
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'alert' | 'cancelled';
    date: string;
    read: boolean;
}

export interface Currency {
    code: string;
    symbol: string;
    rateToUSD: number;
    name: string;
}

export type Language = 'en' | 'bn';
