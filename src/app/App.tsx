import React, { useState, useEffect } from 'react';
import { Trip, Passenger, Booking, Feedback, NotificationItem, Language, Currency } from './types';
import { SAMPLE_TRIPS, CURRENCIES, TRANSLATIONS, STATIONS } from './data';
import RNGuide from './components/RNGuide';
import BookingHistory from './components/BookingHistory';
import FeedbackSection from './components/FeedbackSection';
import NotificationHub from './components/NotificationHub';
import {
    Bus,
    Train,
    Plane,
    Search,
    Calendar,
    Users,
    Armchair,
    Globe,
    Coins,
    Moon,
    Sun,
    Wifi,
    WifiOff,
    CreditCard,
    Sparkles,
    CheckCircle,
    ArrowRightLeft,
    Bell,
    User,
    X,
    Plus,
    Send,
    Smartphone,
    Check
} from 'lucide-react';

export default function App() {
    // Theme & Language states
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [language, setLanguage] = useState<Language>('bn');
    const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]); // Default to BDT ৳
    const [isOffline, setIsOffline] = useState<boolean>(false);

    // Core Functional States
    const [activeTab, setActiveTab] = useState<'search' | 'bookings' | 'notifications' | 'feedback' | 'rnGuide'>('search');
    const [transportType, setTransportType] = useState<'bus' | 'train' | 'flight'>('bus');

    // Search parameters
    const [fromStation, setFromStation] = useState<string>('');
    const [toStation, setToStation] = useState<string>('');
    const [journeyDate, setJourneyDate] = useState<string>('2026-06-30');
    const [passengerCount, setPassengerCount] = useState<number>(1);
    const [searchResults, setSearchResults] = useState<Trip[]>([]);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // Active Booking flow states
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookingPassengers, setBookingPassengers] = useState<Omit<Passenger, 'id'>[]>([
        { name: '', age: 25, gender: 'Male', passportOrNID: '' }
    ]);
    const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'card'>('bkash');
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
    const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

    // Database / Persisted states in Local Storage (Simulating Cloud Sync)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [savedPassengers, setSavedPassengers] = useState<Passenger[]>([
        { id: 'sp-1', name: 'Al Muheet', age: 24, gender: 'Male', passportOrNID: '9823102391' },
        { id: 'sp-2', name: 'Nusrat Jahan', age: 22, gender: 'Female', passportOrNID: '5421092837' }
    ]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([
        { id: 'fb-1', userName: 'Asif Rahman', email: 'asif@gmail.com', rating: 5, comment: 'I really love the real-time seat availability updates! Looking forward to the mobile launch.', date: '2026-06-24' },
        { id: 'fb-2', userName: 'Sabina Yasmin', email: 'sabina@yahoo.com', rating: 4, comment: 'Offline ticket checking will be very useful when boarding trains inside rural stations in Bangladesh.', date: '2026-06-23' }
    ]);
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        { id: 'nt-1', title: 'Welcome to YatraGo', message: 'Set up your passenger profiles to save travel time during checkout.', type: 'info', date: '2026-06-25 09:00 AM', read: false }
    ]);

    // Load initial datasets from localStorage
    useEffect(() => {
        const localBookings = localStorage.getItem('yatra_bookings');
        if (localBookings) setBookings(JSON.parse(localBookings));

        const localPassengers = localStorage.getItem('yatra_passengers');
        if (localPassengers) setSavedPassengers(JSON.parse(localPassengers));

        const localFeedbacks = localStorage.getItem('yatra_feedbacks');
        if (localFeedbacks) setFeedbacks(JSON.parse(localFeedbacks));

        const localNotifications = localStorage.getItem('yatra_notifications');
        if (localNotifications) setNotifications(JSON.parse(localNotifications));
    }, []);

    // Sync to local storage
    const saveBookings = (newBookings: Booking[]) => {
        setBookings(newBookings);
        localStorage.setItem('yatra_bookings', JSON.stringify(newBookings));
    };

    const savePassengers = (newPassengers: Passenger[]) => {
        setSavedPassengers(newPassengers);
        localStorage.setItem('yatra_passengers', JSON.stringify(newPassengers));
    };

    // Set default stations when transport mode changes
    useEffect(() => {
        const list = STATIONS[transportType];
        if (list && list.length >= 2) {
            setFromStation(list[0].id);
            setToStation(list[1].id);
        }
        setSearchResults([]);
        setHasSearched(false);
        setSelectedTrip(null);
        setSelectedSeats([]);
    }, [transportType]);

    // Sync HTML elements Dark Theme
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Add notification helper
    const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
        const newNotif: NotificationItem = {
            id: `nt-${Date.now()}`,
            title,
            message,
            type,
            date: new Date().toLocaleString(),
            read: false
        };
        const updated = [newNotif, ...notifications];
        setNotifications(updated);
        localStorage.setItem('yatra_notifications', JSON.stringify(updated));
    };

    const markNotificationAsRead = (id: string) => {
        const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        setNotifications(updated);
        localStorage.setItem('yatra_notifications', JSON.stringify(updated));
    };

    const clearNotifications = () => {
        setNotifications([]);
        localStorage.setItem('yatra_notifications', JSON.stringify([]));
    };

    // Add passenger helper
    const handleAddSavedPassenger = (p: Omit<Passenger, 'id'>) => {
        const newP: Passenger = {
            ...p,
            id: `sp-${Date.now()}`
        };
        const updated = [...savedPassengers, newP];
        savePassengers(updated);
    };

    const handleRemoveSavedPassenger = (id: string) => {
        const updated = savedPassengers.filter(p => p.id !== id);
        savePassengers(updated);
    };

    // Add Feedback helper
    const handleAddFeedback = (f: Omit<Feedback, 'id' | 'date'>) => {
        const newF: Feedback = {
            ...f,
            id: `fb-${Date.now()}`,
            date: new Date().toISOString().split('T')[0]
        };
        const updated = [newF, ...feedbacks];
        setFeedbacks(updated);
        localStorage.setItem('yatra_feedbacks', JSON.stringify(updated));

        // Add success notification
        addNotification(
            language === 'bn' ? '📝 মতামত প্রদানের জন্য ধন্যবাদ!' : '📝 Feedback Received',
            language === 'bn' ? 'আপনার মূল্যবান মতামতটি সফলভাবে সাবমিট করা হয়েছে।' : 'Thank you for your rating! We review passenger insights daily.',
            'success'
        );
    };

    // Search Action
    const handleSearchTrips = (e: React.FormEvent) => {
        e.preventDefault();
        setSelectedTrip(null);
        setSelectedSeats([]);

        // Filter based on transport type, from and to
        const filtered = SAMPLE_TRIPS.filter(trip => {
            return trip.type === transportType &&
                trip.from.id === fromStation &&
                trip.to.id === toStation;
        });

        setSearchResults(filtered);
        setHasSearched(true);

        if (isOffline) {
            addNotification(
                language === 'bn' ? '📴 অফলাইন ট্রিপ সার্চ সম্পন্ন' : '📴 Offline Trip Search Completed',
                language === 'bn' ? 'অফলাইন মেমোরি থেকে পূর্বে সংরক্ষিত টিকিট অপশন লোড করা হয়েছে।' : 'Loaded previously cached schedule routes from offline storage.',
                'info'
            );
        }
    };

    // Swapping source & destination
    const handleSwapStations = () => {
        const temp = fromStation;
        setFromStation(toStation);
        setToStation(temp);
    };

    // Seat toggle selection
    const handleSeatClick = (seat: string) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            // Ensure passenger count doesn't exceed selected seats
            if (selectedSeats.length < passengerCount) {
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                // Replace first selected seat or alert
                setSelectedSeats([...selectedSeats.slice(1), seat]);
            }
        }
    };

    // Update passengers count and auto-adjust input lines
    useEffect(() => {
        const diff = passengerCount - bookingPassengers.length;
        if (diff > 0) {
            const added: Omit<Passenger, 'id'>[] = Array(diff).fill(null).map(() => ({
                name: '', age: 25, gender: 'Male', passportOrNID: ''
            }));
            setBookingPassengers([...bookingPassengers, ...added]);
        } else if (diff < 0) {
            setBookingPassengers(bookingPassengers.slice(0, passengerCount));
        }
    }, [passengerCount]);

    // Load a saved passenger details directly into checkout form
    const handleLoadSavedPassenger = (formIdx: number, p: Passenger) => {
        const updated = [...bookingPassengers];
        updated[formIdx] = {
            name: p.name,
            age: p.age,
            gender: p.gender,
            passportOrNID: p.passportOrNID
        };
        setBookingPassengers(updated);
    };

    // Booking confirm and payment simulator
    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTrip) return;
        if (selectedSeats.length === 0) {
            alert(language === 'bn' ? TRANSLATIONS.bn.seatAlert : TRANSLATIONS.en.seatAlert);
            return;
        }

        setIsProcessingPayment(true);

        // Simulate Payment Gateway API Response delay
        setTimeout(() => {
            const pnr = 'YTR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            const newBooking: Booking = {
                id: `bkg-${Date.now()}`,
                trip: selectedTrip,
                seats: selectedSeats,
                passengers: bookingPassengers.map((bp, idx) => ({ ...bp, id: `p-${idx}-${Date.now()}` })),
                totalPriceUSD: selectedTrip.priceUSD * selectedSeats.length,
                currency: currency.code,
                exchangeRate: currency.rateToUSD,
                paymentStatus: 'completed',
                bookingDate: new Date().toLocaleDateString(),
                ticketPNR: pnr
            };

            const updatedBookings = [newBooking, ...bookings];
            saveBookings(updatedBookings);
            setSuccessBooking(newBooking);
            setIsProcessingPayment(false);

            // Add Success alert to Push Notifications
            addNotification(
                language === 'bn' ? '🎉 বুকিং নিশ্চিত করা হয়েছে!' : '🎉 Booking Fully Confirmed!',
                language === 'bn'
                    ? `আপনার ${selectedTrip.operatorName} (${selectedTrip.number}) এর টিকিট সফলভাবে বুক করা হয়েছে। PNR: ${pnr}`
                    : `Ticket booked successfully for ${selectedTrip.operatorName} (${selectedTrip.number}). Seats: ${selectedSeats.join(', ')}. PNR: ${pnr}`,
                'success'
            );

            // Clean active selection
            setSelectedTrip(null);
            setSelectedSeats([]);
            setPassengerCount(1);
            setBookingPassengers([{ name: '', age: 25, gender: 'Male', passportOrNID: '' }]);
        }, 2000);
    };

    const activeTranslations = TRANSLATIONS[language];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans pb-16">

            {/* 1. Offline Mode Banner */}
            {isOffline && (
                <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-extrabold flex items-center justify-center gap-2 transition-all">
                    <WifiOff className="w-4 h-4 animate-pulse" />
                    <span>{activeTranslations.offlineBanner}</span>
                </div>
            )}

            {/* 2. App Main Navigation Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Logo & Slogan */}
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-tr from-sky-600 to-indigo-600 text-white rounded-xl shadow-md">
                            <Bus className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                    {activeTranslations.appName}
                                </h1>
                                <span className="text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full font-bold">
                  v1.2.0
                </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                {activeTranslations.tagline}
                            </p>
                        </div>
                    </div>

                    {/* Quick System Controls */}
                    <div className="flex flex-wrap items-center gap-3 md:self-center">

                        {/* Language Picker */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                            <button
                                onClick={() => setLanguage('bn')}
                                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                    language === 'bn'
                                        ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-extrabold'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                }`}
                            >
                                বাংলা
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                    language === 'en'
                                        ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-extrabold'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Currency Select */}
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                            <Coins className="w-3.5 h-3.5 text-slate-400" />
                            <select
                                value={currency.code}
                                onChange={(e) => {
                                    const found = CURRENCIES.find(c => c.code === e.target.value);
                                    if (found) setCurrency(found);
                                }}
                                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                            >
                                {CURRENCIES.map(curr => (
                                    <option key={curr.code} value={curr.code} className="dark:bg-slate-900">
                                        {curr.code} ({curr.symbol})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Offline Simulator Switch */}
                        <button
                            onClick={() => {
                                setIsOffline(!isOffline);
                                if (!isOffline) {
                                    addNotification(
                                        language === 'bn' ? '📴 অফলাইন মোড চালু হয়েছে' : '📴 Offline Mode Enabled',
                                        language === 'bn' ? 'আপনি এখন ইন্টারনেট ছাড়াই সংরক্ষিত টিকিট তথ্য দেখতে পারবেন।' : 'You are now navigating offline. Bookings are temporarily paused but history lookup remains available.',
                                        'alert'
                                    );
                                } else {
                                    addNotification(
                                        language === 'bn' ? '📶 অনলাইন মোড সক্রিয়' : '📶 Back Online',
                                        language === 'bn' ? 'রিয়েল-টাইম আসন বুকিং ও পেমেন্ট গেটওয়ে এখন সচল।' : 'Connected back to servers. Real-time seat tracking and currency gateways are now live.',
                                        'success'
                                    );
                                }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                isOffline
                                    ? 'bg-amber-500/15 border-amber-500 text-amber-600'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                            }`}
                            title="Toggle Offline Access Simulator"
                        >
                            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                            <span>{isOffline ? 'Offline' : 'Online'}</span>
                        </button>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Toggle Dark Theme"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 3. Global Section Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 scrollbar-none">
                    <button
                        onClick={() => { setActiveTab('search'); setSuccessBooking(null); }}
                        className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'search'
                                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-extrabold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                    >
                        <Search className="w-4 h-4" />
                        {language === 'bn' ? 'টিকিট বুক করুন' : 'Search & Reserv'}
                    </button>

                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'bookings'
                                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-extrabold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                    >
                        <Users className="w-4 h-4" />
                        {activeTranslations.bookingHistory}
                        {bookings.length > 0 && (
                            <span className="bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                {bookings.length}
              </span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'notifications'
                                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-extrabold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                    >
                        <Bell className="w-4 h-4" />
                        {activeTranslations.notification}
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold animate-pulse">
                {notifications.filter(n => !n.read).length}
              </span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'feedback'
                                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-extrabold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                    >
                        <Sun className="w-4 h-4" />
                        {activeTranslations.feedback}
                    </button>

                    <button
                        onClick={() => setActiveTab('rnGuide')}
                        className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'rnGuide'
                                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-extrabold'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                    >
                        <Smartphone className="w-4 h-4" />
                        {activeTranslations.rnGuide}
                    </button>
                </div>
            </div>

            {/* 4. Tab Contents View */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* TAB 1: SEARCH & BOOKING */}
                {activeTab === 'search' && (
                    <div className="space-y-8">

                        {/* Payment success modal card banner */}
                        {successBooking && (
                            <div className="bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-500 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute right-4 top-4">
                                    <button
                                        onClick={() => setSuccessBooking(null)}
                                        className="p-1.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-slate-500 dark:text-slate-400"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="p-4 bg-emerald-500 text-white rounded-full scale-110 shadow-lg">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-2">
                                        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">
                                            {activeTranslations.successBooking}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                            {language === 'bn'
                                                ? `আপনার পিএনআর (PNR) হচ্ছে ${successBooking.ticketPNR}। টিকিট বিবরণ বুকিং হিস্ট্রি ট্যাবে যুক্ত হয়েছে। আপনি এটি এখন অফলাইন মুডেও দেখতে পারবেন।`
                                                : `Your reservation PNR is ${successBooking.ticketPNR}. Boarding details are now saved in your travel profile.`}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                                            <button
                                                onClick={() => setActiveTab('bookings')}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                                            >
                                                {language === 'bn' ? 'টিকিট দেখুন' : 'View Offline Ticket Pass'}
                                            </button>
                                            <button
                                                onClick={() => setSuccessBooking(null)}
                                                className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                                            >
                                                {language === 'bn' ? 'নতুন টিকিট বুক করুন' : 'Book Another Trip'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Core Search Interface */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 md:p-8">

                            {/* Transport modes */}
                            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setTransportType('bus')}
                                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        transportType === 'bus'
                                            ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-md font-extrabold'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                    }`}
                                >
                                    <Bus className="w-4 h-4" />
                                    {activeTranslations.bus}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTransportType('train')}
                                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        transportType === 'train'
                                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-md font-extrabold'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                    }`}
                                >
                                    <Train className="w-4 h-4" />
                                    {activeTranslations.train}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTransportType('flight')}
                                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                        transportType === 'flight'
                                            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-md font-extrabold'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                    }`}
                                >
                                    <Plane className="w-4 h-4" />
                                    {activeTranslations.flight}
                                </button>
                            </div>

                            {/* Input Form Fields */}
                            <form onSubmit={handleSearchTrips} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">

                                    {/* From Station */}
                                    <div className="md:col-span-3 space-y-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            {activeTranslations.from}
                                        </label>
                                        <select
                                            value={fromStation}
                                            onChange={(e) => setFromStation(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        >
                                            {STATIONS[transportType].map(station => (
                                                <option key={station.id} value={station.id}>
                                                    {station.city} ({station.code}) - {station.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="md:col-span-1 flex justify-center pb-1">
                                        <button
                                            type="button"
                                            onClick={handleSwapStations}
                                            className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full transition-all hover:rotate-180"
                                            title="Swap Stations"
                                        >
                                            <ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" />
                                        </button>
                                    </div>

                                    {/* To Station */}
                                    <div className="md:col-span-3 space-y-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            {activeTranslations.to}
                                        </label>
                                        <select
                                            value={toStation}
                                            onChange={(e) => setToStation(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        >
                                            {STATIONS[transportType].map(station => (
                                                <option key={station.id} value={station.id}>
                                                    {station.city} ({station.code}) - {station.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Journey Date */}
                                    <div className="md:col-span-3 space-y-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {activeTranslations.date}
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={journeyDate}
                                            onChange={(e) => setJourneyDate(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        />
                                    </div>

                                    {/* Passengers Count */}
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            {activeTranslations.passengers}
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={4}
                                            value={passengerCount}
                                            onChange={(e) => setPassengerCount(Math.min(4, Math.max(1, parseInt(e.target.value) || 1)))}
                                            className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 text-center"
                                        />
                                    </div>

                                </div>

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2 scale-100 hover:scale-[1.02]"
                                    >
                                        <Search className="w-4 h-4" />
                                        {activeTranslations.searchBtn}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Trip Results List */}
                        {hasSearched && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                    {language === 'bn'
                                        ? `উপলব্ধ ট্রিপ সমূহ (${searchResults.length} টি পাওয়া গেছে)`
                                        : `Available Trips (${searchResults.length} found)`}
                                </h3>

                                {searchResults.length === 0 ? (
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
                                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                        <p className="text-slate-500 dark:text-slate-400 font-bold">
                                            {language === 'bn' ? 'দুঃখিত! এই রুটে কোনো ট্রিপ পাওয়া যায়নি।' : 'No trips found for this specific route selection.'}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {language === 'bn' ? 'পরামর্শ: অন্য ট্রিপ ধরন বা স্টেশন পরিবর্তন করে চেষ্টা করুন।' : 'Try toggling other transport operators or stations.'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {searchResults.map((trip) => {
                                            const isSelected = selectedTrip?.id === trip.id;
                                            return (
                                                <div
                                                    key={trip.id}
                                                    className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border transition-all overflow-hidden ${
                                                        isSelected
                                                            ? 'border-sky-500 ring-2 ring-sky-500/10'
                                                            : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                                                    }`}
                                                >
                                                    {/* Inner trip details row */}
                                                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                                                        {/* Operator & Class */}
                                                        <div className="space-y-1 md:w-1/4">
                                                            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base flex items-center gap-2">
                                                                {trip.type === 'flight' && <Plane className="w-4 h-4 text-sky-500" />}
                                                                {trip.type === 'train' && <Train className="w-4 h-4 text-indigo-500" />}
                                                                {trip.type === 'bus' && <Bus className="w-4 h-4 text-emerald-500" />}
                                                                {trip.operatorName}
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-500">
                                  {trip.number}
                                </span>
                                                                <span className="text-[10px] bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 px-2 py-0.5 rounded font-bold">
                                  {trip.class}
                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Timeline Route info */}
                                                        <div className="flex items-center gap-6 md:w-2/5">
                                                            <div>
                                                                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{trip.departureTime}</p>
                                                                <p className="text-xs text-slate-400">{trip.from.city}</p>
                                                            </div>
                                                            <div className="flex-1 flex flex-col items-center px-4">
                                                                <span className="text-[10px] text-slate-400 font-mono font-bold">{trip.duration}</span>
                                                                <div className="w-16 h-0.5 bg-slate-200 dark:bg-slate-700 my-1 relative">
                                                                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full absolute -top-[2px] right-0"></div>
                                                                </div>
                                                                <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Direct</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{trip.arrivalTime}</p>
                                                                <p className="text-xs text-slate-400">{trip.to.city}</p>
                                                            </div>
                                                        </div>

                                                        {/* Seats availability tracker */}
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 md:w-1/6">
                                                            <span className="block font-medium">{language === 'bn' ? 'আসন খালি আছে' : 'Available seats'}</span>
                                                            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                                {trip.availableSeats.length} / {trip.totalSeats}
                              </span>
                                                        </div>

                                                        {/* Price & Booking Trigger Button */}
                                                        <div className="flex items-center justify-between md:justify-end md:w-1/6 gap-4 w-full border-t md:border-t-0 pt-4 md:pt-0">
                                                            <div className="text-right">
                                                                <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-bold">{language === 'bn' ? 'টিকিট মূল্য' : 'Price'}</span>
                                                                <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                  {currency.symbol} {(trip.priceUSD * currency.rateToUSD).toFixed(0)}
                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    if (isOffline) {
                                                                        alert(language === 'bn' ? 'দুঃখিত! অফলাইন মুডে নতুন টিকিট বুকিং করা সম্ভব নয়।' : 'Seat registration is locked during offline mode simulation.');
                                                                        return;
                                                                    }
                                                                    setSelectedTrip(isSelected ? null : trip);
                                                                    setSelectedSeats([]);
                                                                }}
                                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                                    isSelected
                                                                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                                        : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm'
                                                                }`}
                                                            >
                                                                {isSelected ? 'Cancel' : activeTranslations.selectSeat}
                                                            </button>
                                                        </div>

                                                    </div>

                                                    {/* Expanded Seat Reservation & checkout area */}
                                                    {isSelected && (
                                                        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                                                            {/* Left: Seat Grid Selection Map */}
                                                            <div className="lg:col-span-5 space-y-4">
                                                                <h5 className="font-extrabold text-slate-850 dark:text-slate-200 text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                                                                    {activeTranslations.selectSeat} ({language === 'bn' ? `সর্বোচ্চ ${passengerCount}টি সিট` : `Max ${passengerCount} seats`})
                                                                </h5>

                                                                {/* Driver Steering Column / Cockpit visual mock */}
                                                                <div className="flex justify-end pr-4 opacity-50 mb-2">
                                                                    <div className="border border-slate-300 dark:border-slate-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                                                        {trip.type === 'flight' ? 'Cockpit' : 'Driver'}
                                                                    </div>
                                                                </div>

                                                                {/* Seat matrix representation */}
                                                                <div className="grid grid-cols-4 gap-2 bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-150 dark:border-slate-800 max-w-sm mx-auto">
                                                                    {/* Dummy generated seat layout based on trip type */}
                                                                    {Array(trip.totalSeats / 4).fill(null).map((_, rowIdx) => {
                                                                        const letters = ['A', 'B', 'C', 'D'];
                                                                        return letters.map((letter) => {
                                                                            const seatId = `${rowIdx + 1}${letter}`;
                                                                            const isSold = !trip.availableSeats.includes(seatId);
                                                                            const isSelectedSeat = selectedSeats.includes(seatId);

                                                                            return (
                                                                                <button
                                                                                    key={seatId}
                                                                                    type="button"
                                                                                    disabled={isSold}
                                                                                    onClick={() => handleSeatClick(seatId)}
                                                                                    className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all relative ${
                                                                                        isSold
                                                                                            ? 'bg-red-50 dark:bg-red-950/20 text-red-300 dark:text-red-900 border border-red-100 dark:border-red-950/50 cursor-not-allowed'
                                                                                            : isSelectedSeat
                                                                                                ? 'bg-sky-500 text-white shadow'
                                                                                                : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                                                                    }`}
                                                                                    title={`Seat ${seatId} - ${isSold ? 'Sold' : 'Available'}`}
                                                                                >
                                                                                    {seatId}
                                                                                </button>
                                                                            );
                                                                        });
                                                                    })}
                                                                </div>

                                                                {/* Seat legends indicators */}
                                                                <div className="flex justify-center gap-4 text-[10px] text-slate-500 font-bold pt-2">
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="w-3.5 h-3.5 rounded bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-750 inline-block"></span>
                                                                        {activeTranslations.available}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="w-3.5 h-3.5 rounded bg-sky-500 inline-block"></span>
                                                                        {activeTranslations.selected}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="w-3.5 h-3.5 rounded bg-red-100 dark:bg-red-950/40 border border-red-200 inline-block"></span>
                                                                        {activeTranslations.sold}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Right: Checkout details, Passengers list and payments */}
                                                            <div className="lg:col-span-7 space-y-6">

                                                                {/* Passenger Details inputs */}
                                                                <div className="space-y-4">
                                                                    <h5 className="font-extrabold text-slate-850 dark:text-slate-200 text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                                                                        {activeTranslations.passengerDetails} ({passengerCount} {activeTranslations.passengersCount})
                                                                    </h5>

                                                                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                                                                        {bookingPassengers.map((passenger, formIdx) => (
                                                                            <div key={formIdx} className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-150 dark:border-slate-800 relative space-y-3">

                                                                                {/* Saved passenger quick link dropdown */}
                                                                                <div className="flex justify-between items-center text-[11px] text-slate-400">
                                          <span className="font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                                            Passenger #{formIdx + 1}
                                          </span>
                                                                                    {savedPassengers.length > 0 && (
                                                                                        <select
                                                                                            onChange={(e) => {
                                                                                                const p = savedPassengers.find(x => x.id === e.target.value);
                                                                                                if (p) handleLoadSavedPassenger(formIdx, p);
                                                                                            }}
                                                                                            className="bg-slate-100 dark:bg-slate-800 rounded px-2 py-0.5 text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
                                                                                            defaultValue=""
                                                                                        >
                                                                                            <option value="" disabled>Load Saved Profile</option>
                                                                                            {savedPassengers.map(sp => (
                                                                                                <option key={sp.id} value={sp.id}>{sp.name}</option>
                                                                                            ))}
                                                                                        </select>
                                                                                    )}
                                                                                </div>

                                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                                    <input
                                                                                        type="text"
                                                                                        required
                                                                                        placeholder={activeTranslations.fullName}
                                                                                        value={passenger.name}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...bookingPassengers];
                                                                                            updated[formIdx].name = e.target.value;
                                                                                            setBookingPassengers(updated);
                                                                                        }}
                                                                                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
                                                                                    />
                                                                                    <input
                                                                                        type="number"
                                                                                        required
                                                                                        placeholder={activeTranslations.age}
                                                                                        value={passenger.age || ''}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...bookingPassengers];
                                                                                            updated[formIdx].age = parseInt(e.target.value) || 0;
                                                                                            setBookingPassengers(updated);
                                                                                        }}
                                                                                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
                                                                                    />
                                                                                    <select
                                                                                        value={passenger.gender}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...bookingPassengers];
                                                                                            updated[formIdx].gender = e.target.value as any;
                                                                                            setBookingPassengers(updated);
                                                                                        }}
                                                                                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
                                                                                    >
                                                                                        <option value="Male">Male</option>
                                                                                        <option value="Female">Female</option>
                                                                                        <option value="Other">Other</option>
                                                                                    </select>
                                                                                    <input
                                                                                        type="text"
                                                                                        required
                                                                                        placeholder={activeTranslations.idDoc}
                                                                                        value={passenger.passportOrNID}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...bookingPassengers];
                                                                                            updated[formIdx].passportOrNID = e.target.value;
                                                                                            setBookingPassengers(updated);
                                                                                        }}
                                                                                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Integrated Payment Gateway Segment */}
                                                                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                                    <h5 className="font-extrabold text-slate-850 dark:text-slate-200 text-sm flex items-center gap-2">
                                                                        <CreditCard className="w-4 h-4 text-sky-500" />
                                                                        {activeTranslations.paymentGateway}
                                                                    </h5>

                                                                    {/* Multi-Currency dynamic calculation */}
                                                                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl flex justify-between items-center">
                                                                        <div>
                                                                            <span className="text-[10px] uppercase text-slate-400 block font-bold">Seats Selected</span>
                                                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                                      </span>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <span className="text-[10px] uppercase text-slate-400 block font-bold">Total Payable</span>
                                                                            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                                        {currency.symbol} {((trip.priceUSD * selectedSeats.length) * currency.rateToUSD).toFixed(2)}
                                      </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Gateway selectors */}
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setPaymentMethod('bkash')}
                                                                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                                                                                paymentMethod === 'bkash'
                                                                                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/10 text-pink-600'
                                                                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                                                                            }`}
                                                                        >
                                                                            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                                                                            bKash / Nagad / MFS
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setPaymentMethod('card')}
                                                                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                                                                                paymentMethod === 'card'
                                                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/10 text-indigo-600'
                                                                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                                                                            }`}
                                                                        >
                                                                            <CreditCard className="w-4 h-4 text-indigo-500" />
                                                                            Card (Visa/Master/Stripe)
                                                                        </button>
                                                                    </div>

                                                                    {/* Card fields */}
                                                                    {paymentMethod === 'card' && (
                                                                        <div className="grid grid-cols-3 gap-3 bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                                                            <div className="col-span-3">
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Card Number"
                                                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs"
                                                                                    defaultValue="4242 4242 4242 4242"
                                                                                />
                                                                            </div>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="MM/YY"
                                                                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs"
                                                                                defaultValue="12/29"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                placeholder="CVC"
                                                                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs"
                                                                                defaultValue="123"
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    {/* MFS wallet */}
                                                                    {paymentMethod === 'bkash' && (
                                                                        <div className="bg-pink-50/50 dark:bg-pink-950/5 p-4 rounded-xl border border-pink-100 dark:border-pink-950/30 flex items-center justify-between">
                                      <span className="text-[11px] text-pink-700 dark:text-pink-400 font-bold">
                                        🇧🇩 bKash / Nagad Instant Mobile Banking Enabled
                                      </span>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="017XXXXXXXX"
                                                                                className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-950/30 px-3 py-1.5 rounded-lg text-xs w-36 font-bold"
                                                                                defaultValue="01712345678"
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    {/* Payment Trigger Buttons */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleConfirmBooking}
                                                                        disabled={selectedSeats.length === 0 || isProcessingPayment}
                                                                        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                                                                            selectedSeats.length === 0
                                                                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                                                                : isProcessingPayment
                                                                                    ? 'bg-indigo-400 text-white cursor-wait'
                                                                                    : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white'
                                                                        }`}
                                                                    >
                                                                        {isProcessingPayment ? (
                                                                            <>
                                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                                {language === 'bn' ? 'পেমেন্ট অনুমোদিত হচ্ছে...' : 'Authorizing multi-currency checkout...'}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Check className="w-4 h-4" />
                                                                                {activeTranslations.payNow}
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: BOOKING HISTORY & PASSENGER LIST */}
                {activeTab === 'bookings' && (
                    <BookingHistory
                        bookings={bookings}
                        savedPassengers={savedPassengers}
                        onAddPassenger={handleAddSavedPassenger}
                        onRemovePassenger={handleRemoveSavedPassenger}
                        language={language}
                        currencySymbol={currency.symbol}
                    />
                )}

                {/* TAB 3: NOTIFICATIONS */}
                {activeTab === 'notifications' && (
                    <NotificationHub
                        notifications={notifications}
                        onAddNotification={addNotification}
                        onMarkAsRead={markNotificationAsRead}
                        onClearAll={clearNotifications}
                        language={language}
                    />
                )}

                {/* TAB 4: FEEDBACK & RATING */}
                {activeTab === 'feedback' && (
                    <FeedbackSection
                        feedbacks={feedbacks}
                        onAddFeedback={handleAddFeedback}
                        language={language}
                    />
                )}

                {/* TAB 5: REACT NATIVE ARCHITECT GUIDE */}
                {activeTab === 'rnGuide' && (
                    <RNGuide language={language} />
                )}

            </main>

            {/* 5. Footer copyrights details */}
            <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 dark:text-slate-500">
                <p>© 2026 {activeTranslations.appName}. {activeTranslations.allRightsReserved}</p>
                <p className="mt-1">
                    {language === 'bn'
                        ? 'গর্বের সাথে রিয়্যাক্ট অ্যান্ড উইন্ড-টেইলউইন্ড সিএসএস দিয়ে তৈরি করা হয়েছে।'
                        : 'Designed & crafted using modern React and Tailwind CSS.'}
                </p>
            </footer>

        </div>
    );
}
