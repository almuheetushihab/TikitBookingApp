import {Currency, Station, Trip} from "../types/types.ts";

export const STATIONS: Record<'bus' | 'train' | 'flight', Station[]> = {
    bus: [
        { id: 'b1', name: 'Gabtoli Terminal', code: 'GAB', city: 'Dhaka' },
        { id: 'b2', name: 'Dampara Terminal', code: 'DAM', city: 'Chittagong' },
        { id: 'b3', name: 'Kadirganj Terminal', code: 'KAD', city: 'Rajshahi' },
        { id: 'b4', name: 'Subhanighat Terminal', code: 'SUB', city: 'Sylhet' },
        { id: 'b5', name: 'Kolatoli Terminal', code: 'KOL', city: 'Cox\'s Bazar' },
    ],
    train: [
        { id: 't1', name: 'Kamalapur Railway Station', code: 'KMR', city: 'Dhaka' },
        { id: 't2', name: 'Chittagong Railway Station', code: 'CGP', city: 'Chittagong' },
        { id: 't3', name: 'Sylhet Railway Station', code: 'SYL', city: 'Sylhet' },
        { id: 't4', name: 'Rajshahi Railway Station', code: 'RJS', city: 'Rajshahi' },
        { id: 't5', name: 'Sreemangal Railway Station', code: 'SRM', city: 'Sreemangal' },
    ],
    flight: [
        { id: 'f1', name: 'Hazrat Shahjalal Intl Airport', code: 'DAC', city: 'Dhaka' },
        { id: 'f2', name: 'Shah Amanat Intl Airport', code: 'CGP', city: 'Chittagong' },
        { id: 'f3', name: 'Cox\'s Bazar Airport', code: 'CXB', city: 'Cox\'s Bazar' },
        { id: 'f4', name: 'Osmani Intl Airport', code: 'ZYL', city: 'Sylhet' },
        { id: 'f5', name: 'Saidpur Airport', code: 'SPD', city: 'Saidpur' },
    ],
};

export const CURRENCIES: Currency[] = [
    { code: 'BDT', symbol: '৳', rateToUSD: 118.5, name: 'Bangladeshi Taka' },
    { code: 'USD', symbol: '$', rateToUSD: 1.0, name: 'US Dollar' },
    { code: 'EUR', symbol: '€', rateToUSD: 0.92, name: 'Euro' },
    { code: 'INR', symbol: '₹', rateToUSD: 83.4, name: 'Indian Rupee' },
];

export const SAMPLE_TRIPS: Trip[] = [
    // BUS TRIPS
    {
        id: 'trip-b1',
        type: 'bus',
        operatorName: 'Green Line Paribahan',
        number: 'GL-104',
        from: STATIONS.bus[0], // Dhaka
        to: STATIONS.bus[4], // Cox's Bazar
        departureTime: '08:30 AM',
        arrivalTime: '05:30 PM',
        duration: '9h 00m',
        priceUSD: 15,
        availableSeats: ['A1', 'A2', 'A3', 'B1', 'B2', 'B4', 'C1', 'C2', 'D1', 'D2', 'E3', 'E4'],
        totalSeats: 32,
        class: 'Scania Multi-Axle Sleeper',
    },
    {
        id: 'trip-b2',
        type: 'bus',
        operatorName: 'Hanif Enterprise',
        number: 'HN-890',
        from: STATIONS.bus[0], // Dhaka
        to: STATIONS.bus[1], // Chittagong
        departureTime: '10:00 AM',
        arrivalTime: '03:30 PM',
        duration: '5h 30m',
        priceUSD: 8,
        availableSeats: ['B1', 'B2', 'C3', 'C4', 'E1', 'E2', 'F3', 'F4'],
        totalSeats: 40,
        class: 'Hino 1J Non-AC',
    },
    {
        id: 'trip-b3',
        type: 'bus',
        operatorName: 'Desh Travels',
        number: 'DT-442',
        from: STATIONS.bus[0], // Dhaka
        to: STATIONS.bus[2], // Rajshahi
        departureTime: '02:15 PM',
        arrivalTime: '07:45 PM',
        duration: '5h 30m',
        priceUSD: 11,
        availableSeats: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'H1', 'H2'],
        totalSeats: 36,
        class: 'Hyundai Universe AC Luxury',
    },
    {
        id: 'trip-b4',
        type: 'bus',
        operatorName: 'Ena Transport',
        number: 'EN-202',
        from: STATIONS.bus[0], // Dhaka
        to: STATIONS.bus[3], // Sylhet
        departureTime: '04:00 PM',
        arrivalTime: '09:30 PM',
        duration: '5h 30m',
        priceUSD: 9,
        availableSeats: ['A3', 'A4', 'B3', 'B4', 'E3', 'E4', 'G3', 'G4'],
        totalSeats: 40,
        class: 'Hyundai Business Class AC',
    },

    // TRAIN TRIPS
    {
        id: 'trip-t1',
        type: 'train',
        operatorName: 'Subarna Express',
        number: '701',
        from: STATIONS.train[0], // Dhaka
        to: STATIONS.train[1], // Chittagong
        departureTime: '04:30 PM',
        arrivalTime: '09:40 PM',
        duration: '5h 10m',
        priceUSD: 7,
        availableSeats: ['S-12', 'S-13', 'S-14', 'S-25', 'S-26', 'S-40', 'S-41', 'S-42'],
        totalSeats: 60,
        class: 'Snigdha (AC Chair)',
    },
    {
        id: 'trip-t2',
        type: 'train',
        operatorName: 'Parabat Express',
        number: '709',
        from: STATIONS.train[0], // Dhaka
        to: STATIONS.train[2], // Sylhet
        departureTime: '06:20 AM',
        arrivalTime: '12:40 PM',
        duration: '6h 20m',
        priceUSD: 6,
        availableSeats: ['W-02', 'W-03', 'W-10', 'W-11', 'W-15', 'W-22', 'W-23'],
        totalSeats: 80,
        class: 'Shovon Chair',
    },
    {
        id: 'trip-t3',
        type: 'train',
        operatorName: 'Silkcity Express',
        number: '753',
        from: STATIONS.train[0], // Dhaka
        to: STATIONS.train[3], // Rajshahi
        departureTime: '02:40 PM',
        arrivalTime: '08:30 PM',
        duration: '5h 50m',
        priceUSD: 9,
        availableSeats: ['A-05', 'A-06', 'A-07', 'A-12', 'A-15', 'A-16', 'A-20'],
        totalSeats: 50,
        class: 'AC Sleeper Berth',
    },

    // FLIGHT TRIPS
    {
        id: 'trip-f1',
        type: 'flight',
        operatorName: 'Biman Bangladesh Airlines',
        number: 'BG-433',
        from: STATIONS.flight[0], // Dhaka
        to: STATIONS.flight[2], // Cox\'s Bazar
        departureTime: '11:15 AM',
        arrivalTime: '12:15 PM',
        duration: '1h 00m',
        priceUSD: 65,
        availableSeats: ['12A', '12B', '14C', '14D', '18E', '18F', '21A', '21B'],
        totalSeats: 120,
        class: 'Economy Class',
    },
    {
        id: 'trip-f2',
        type: 'flight',
        operatorName: 'US-Bangla Airlines',
        number: 'BS-141',
        from: STATIONS.flight[0], // Dhaka
        to: STATIONS.flight[1], // Chittagong
        departureTime: '08:00 AM',
        arrivalTime: '08:45 AM',
        duration: '0h 45m',
        priceUSD: 45,
        availableSeats: ['04A', '04C', '06D', '08A', '08B', '10F'],
        totalSeats: 72,
        class: 'Economy Regular',
    },
    {
        id: 'trip-f3',
        type: 'flight',
        operatorName: 'Novoair',
        number: 'VQ-905',
        from: STATIONS.flight[0], // Dhaka
        to: STATIONS.flight[3], // Sylhet
        departureTime: '03:15 PM',
        arrivalTime: '04:00 PM',
        duration: '0h 45m',
        priceUSD: 50,
        availableSeats: ['03A', '03B', '05C', '05D', '07E', '07F'],
        totalSeats: 68,
        class: 'Promo Economy',
    },
];

export const TRANSLATIONS = {
    en: {
        appName: 'Ticket Booking App',
        tagline: 'Professional multi-modal ticket reservation system',
        bus: 'Bus',
        train: 'Train',
        flight: 'Air',
        searchTitle: 'Find Your Tickets',
        from: 'From',
        to: 'To',
        date: 'Date of Journey',
        passengers: 'Passengers',
        searchBtn: 'Search Trips',
        selectSeat: 'Select Seats',
        available: 'Available',
        selected: 'Selected',
        sold: 'Booked',
        paymentGateway: 'Integrated Payment Gateway',
        payNow: 'Pay & Confirm',
        bookingHistory: 'My Bookings',
        savedPassengers: 'Saved Passengers',
        profile: 'Profile',
        notification: 'Notifications',
        feedback: 'Feedback & Ratings',
        rnGuide: 'React Native MVVM Guide',
        offlineBanner: 'Currently in Offline Mode. Showing saved trips from offline cache.',
        seatAlert: 'Please select at least one seat',
        successBooking: 'Ticket Booked Successfully!',
        addPassenger: 'Add Passenger',
        passengerDetails: 'Passenger Details',
        fullName: 'Full Name',
        age: 'Age',
        gender: 'Gender',
        idDoc: 'Passport / NID Number',
        allRightsReserved: 'All rights reserved.',
        currency: 'Currency',
        language: 'Language',
        networkStatus: 'Network Status',
        darkTheme: 'Dark Mode',
        noBookings: 'No booking history found.',
        savedSuccessfully: 'Saved successfully!',
        submitFeedback: 'Submit Feedback',
        yourRating: 'Your Rating',
        commentPlaceholder: 'Write your comments here...',
        offlineTripNotice: '✈️ You can view this ticket without an active internet connection.',
    },
    bn: {
        appName: 'টিকিট বুকিং অ্যাপ',
        tagline: 'বাস, ট্রেন এবং বিমান ভ্রমণের জন্য পেশাদার টিকিট রিজার্ভেশন সিস্টেম',
        bus: 'বাস',
        train: 'ট্রেন',
        flight: 'বিমান',
        searchTitle: 'আপনার টিকিট খুঁজুন',
        from: 'কোথা থেকে',
        to: 'কোথায় যাবেন',
        date: 'ভ্রমণের তারিখ',
        passengers: 'যাত্রী সংখ্যা',
        searchBtn: 'ট্রিপ খুঁজুন',
        selectSeat: 'আসন নির্বাচন করুন',
        available: 'খালি আছে',
        selected: 'নির্বাচিত',
        sold: 'বুকড',
        paymentGateway: 'পেমেন্ট গেটওয়ে',
        payNow: 'পেমেন্ট সম্পন্ন করুন',
        bookingHistory: 'আমার বুকিং সমূহ',
        savedPassengers: 'সংরক্ষিত যাত্রীগণ',
        profile: 'প্রোফাইল',
        notification: 'নোটিফিকেশন',
        feedback: 'মতামত ও রেটিং',
        rnGuide: 'রিয়্যাক্ট নেটিভ MVVM গাইড',
        offlineBanner: 'বর্তমানে অফলাইন মুডে আছেন। অফলাইন ক্যাশ থেকে টিকিট তথ্য প্রদর্শিত হচ্ছে।',
        seatAlert: 'অনুগ্রহ করে অন্তত একটি আসন নির্বাচন করুন',
        successBooking: 'টিকিট সফলভাবে বুক করা হয়েছে!',
        addPassenger: 'যাত্রী যোগ করুন',
        passengerDetails: 'যাত্রীর বিবরণ',
        fullName: 'পূর্ণ নাম',
        age: 'বয়স',
        gender: 'লিঙ্গ',
        idDoc: 'পাসপোর্ট / এনআইডি নম্বর',
        allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
        currency: 'মুদ্রা',
        language: 'ভাষা',
        networkStatus: 'নেটওয়ার্ক স্ট্যাটাস',
        darkTheme: 'ডার্ক মোড',
        noBookings: 'কোনো বুকিংয়ের ইতিহাস পাওয়া যায়নি।',
        savedSuccessfully: 'সফলভাবে সংরক্ষিত হয়েছে!',
        submitFeedback: 'মতামত পাঠান',
        yourRating: 'আপনার রেটিং',
        commentPlaceholder: 'আপনার মন্তব্য এখানে লিখুন...',
        offlineTripNotice: '✈️ ইন্টারনেট সংযোগ ছাড়াই আপনি এই টিকিটটি দেখতে পারবেন।',
    }
};

export const REACT_NATIVE_MVVM_PROJECT_STRUCTURE = `
ticket-booking-rn-app/
├── android/                   # Native Android files
├── ios/                       # Native iOS files
├── src/
│   ├── assets/                # Local images, fonts, icons
│   │   ├── images/
│   │   └── fonts/
│   ├── config/                # Environment variables and constants
│   │   └── env.ts             # Gateway keys, API base URLs
│   ├── constants/             # Theme, Colors, Layout spacing
│   │   └── Colors.ts
│   ├── models/                # Pure raw data structures & models (Data Layer)
│   │   ├── Trip.ts
│   │   ├── Booking.ts
│   │   └── Passenger.ts
│   ├── services/              # API Clients, Firebase, Payment Gateways, Offline Storage
│   │   ├── api.ts             # Axios wrapper
│   │   ├── paymentService.ts  # Stripe/SSLCommerz integrations
│   │   ├── offlineStorage.ts  # AsyncStorage/WatermelonDB/MMKV configurations
│   │   └── pushNotifications.ts # Firebase Cloud Messaging (FCM)
│   ├── viewmodels/            # Business & Presentation logic (ViewModel Layer)
│   │   ├── BookingViewModel.ts
│   │   ├── TripSearchViewModel.ts
│   │   └── ProfileViewModel.ts
│   └── views/                 # UI Screen Components (View Layer)
│       ├── screens/
│       │   ├── HomeScreen.tsx
│       │   ├── TripListScreen.tsx
│       │   ├── SeatSelectionScreen.tsx
│       │   ├── PaymentScreen.tsx
│       │   └── ProfileScreen.tsx
│       └── components/        # Reusable UI Elements
│           ├── Button.tsx
│           ├── TripCard.tsx
│           └── SeatGrid.tsx
├── App.tsx                    # Root navigation wrapper
├── index.js                   # Application Registry Entry Point
├── package.json               # Dependencies list
└── tsconfig.json              # TypeScript definitions
`;

export const MVVM_CODE_TEMPLATES = {
    model: `// src/models/Trip.ts
export interface Trip {
  id: string;
  type: 'bus' | 'train' | 'flight';
  operatorName: string;
  from: string;
  to: string;
  departureTime: string;
  price: number;
  availableSeats: string[];
  totalSeats: number;
  class: string;
}
`,
    viewmodel: `// src/viewmodels/TripSearchViewModel.ts
import { useState, useCallback } from 'react';
import { Trip } from '../models/Trip';
import { fetchTripsFromAPI } from '../services/api';
import { getOfflineTrips, saveTripsOffline } from '../services/offlineStorage';

export const useTripSearchViewModel = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchTrips = useCallback(async (from: string, to: string, type: 'bus' | 'train' | 'flight', isOffline: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isOffline) {
        // Retrieve cached data for remote offline travel
        const offlineData = await getOfflineTrips(type);
        const filtered = offlineData.filter(t => t.from === from && t.to === to);
        setTrips(filtered);
      } else {
        // Fetch fresh real-time seats and ticket inventory
        const data = await fetchTripsFromAPI(from, to, type);
        setTrips(data);
        await saveTripsOffline(type, data); // Sync to offline MMKV cache
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve journeys');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trips,
    isLoading,
    error,
    searchTrips
  };
};
`,
    view: `// src/views/screens/TripListScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTripSearchViewModel } from '../../viewmodels/TripSearchViewModel';
import { TripCard } from '../components/TripCard';

interface Props {
  route: any;
  navigation: any;
}

export const TripListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { from, to, type, isOffline } = route.params;
  const { trips, isLoading, error, searchTrips } = useTripSearchViewModel();

  useEffect(() => {
    searchTrips(from, to, type, isOffline);
  }, [from, to, type, isOffline]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={styles.text}>Tracking live seat availability...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available {type.toUpperCase()}s</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard 
            trip={item} 
            onPress={() => navigation.navigate('SeatSelection', { trip: item })} 
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No journeys found for this route.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#0f172a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 8, color: '#64748b' },
  empty: { textAlign: 'center', marginTop: 40, color: '#64748b' }
});
`,
    service: `// src/services/paymentService.ts
import { Alert } from 'react-native';

export interface PaymentIntentResponse {
  clientSecret: string;
  success: boolean;
}

/**
 * Interface with integrated multi-currency payment providers
 * such as Stripe or local popular Bangladeshi SSLCommerz, bkash, Nagad
 */
export const processPaymentWithGateway = async (
  amount: number,
  currency: string,
  passengerDetails: any
): Promise<boolean> => {
  try {
    // 1. In real app, call your full-stack secure backend /api/payment/create-intent
    // 2. Initialize payment sheet (Stripe Mobile SDK)
    console.log(\`Initiating \${currency} payment for \${amount}...\`);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return true; // Successfully processed
  } catch (error) {
    Alert.alert('Payment Error', 'Failed to complete transaction.');
    return false;
  }
};
`
};
