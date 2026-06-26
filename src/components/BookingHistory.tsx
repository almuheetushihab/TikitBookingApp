import React, {useState} from 'react';
import {Booking, Passenger, Language} from '../types';
import {Ticket, Calendar, Clock, User, Armchair, ShieldCheck, Download, Trash, UserCheck, Plus} from 'lucide-react';

interface BookingHistoryProps {
    bookings: Booking[];
    savedPassengers: Passenger[];
    onAddPassenger: (p: Omit<Passenger, 'id'>) => void;
    onRemovePassenger: (id: string) => void;
    language: Language;
    currencySymbol: string;
}

export default function BookingHistory({
                                           bookings,
                                           savedPassengers,
                                           onAddPassenger,
                                           onRemovePassenger,
                                           language,
                                           currencySymbol
                                       }: BookingHistoryProps) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
    const [passport, setPassport] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const t = language === 'bn' ? {
        historyTitle: 'আমার বুকিং ইতিহাস',
        savedPassengersTitle: 'সংরক্ষিত যাত্রী তালিকা',
        noBookings: 'এখনো কোনো টিকিট বুক করা হয়নি।',
        noPassengers: 'কোনো যাত্রী সংরক্ষিত নেই।',
        pnr: 'পিএনআর',
        status: 'অবস্থা',
        completed: 'সম্পন্ন',
        totalPrice: 'মোট মূল্য',
        passengersCount: 'যাত্রী',
        seats: 'আসন নং',
        passengerDetails: 'যাত্রীর বিবরণ',
        fullName: 'পূর্ণ নাম',
        age: 'বয়স',
        gender: 'লিঙ্গ',
        passportNid: 'পাসপোর্ট / এনআইডি',
        addPassengerBtn: 'যাত্রী সংরক্ষণ করুন',
        addNewBtn: 'নতুন যাত্রী যোগ করুন',
        downloadTicket: 'টিকিট ডাউনলোড',
        offlineNotice: 'অফলাইনে টিকিট দেখুন',
    } : {
        historyTitle: 'My Booking History',
        savedPassengersTitle: 'Saved Passenger List',
        noBookings: 'No ticket bookings found yet.',
        noPassengers: 'No saved passenger profiles.',
        pnr: 'PNR',
        status: 'Status',
        completed: 'Confirmed',
        totalPrice: 'Total Paid',
        passengersCount: 'Passenger(s)',
        seats: 'Seat(s)',
        passengerDetails: 'Passenger Details',
        fullName: 'Full Name',
        age: 'Age',
        gender: 'Gender',
        passportNid: 'Passport / NID',
        addPassengerBtn: 'Save Passenger',
        addNewBtn: 'Add New Profile',
        downloadTicket: 'Download Ticket',
        offlineNotice: 'Offline Pass Active',
    };

    const handleSavePassenger = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !age || !passport) return;
        onAddPassenger({
            name,
            age: parseInt(age),
            gender,
            passportOrNID: passport
        });
        setName('');
        setAge('');
        setGender('Male');
        setPassport('');
        setShowAddForm(false);
    };

    return (
        <div className="space-y-8">
            {/* 1. Ticket Booking History */}
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <Ticket className="w-5.5 h-5.5 text-sky-500"/>
                    {t.historyTitle}
                </h3>

                {bookings.length === 0 ? (
                    <div
                        className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <Ticket className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3"/>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t.noBookings}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow transition-all relative"
                            >
                                {/* Boarding pass styled header */}
                                <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-4 text-white">
                                    <div
                                        className="flex justify-between items-center text-xs opacity-90 uppercase tracking-wider font-bold mb-1">
                                        <span>{booking.trip.operatorName} ({booking.trip.number})</span>
                                        <span className="bg-emerald-500/80 text-white px-2 py-0.5 rounded text-[10px]">
                      {t.completed}
                    </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div>
                                            <p className="text-lg font-extrabold">{booking.trip.from.city}</p>
                                            <p className="text-[10px] opacity-80">{booking.trip.from.name}</p>
                                        </div>
                                        <div className="flex flex-col items-center px-4">
                      <span className="text-xs uppercase border border-white/30 rounded-full px-2 py-0.5 scale-90">
                        {booking.trip.type}
                      </span>
                                            <div className="w-12 h-0.5 bg-white/40 my-1 relative">
                                                <div
                                                    className="w-2 h-2 rounded-full bg-white absolute -top-[3px] left-1/2 -translate-x-1/2"></div>
                                            </div>
                                            <span
                                                className="text-[10px] opacity-70 font-mono">{booking.trip.duration}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-extrabold">{booking.trip.to.city}</p>
                                            <p className="text-[10px] opacity-80">{booking.trip.to.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Details */}
                                <div className="p-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-slate-400 block font-medium">{t.pnr}</span>
                                            <span
                                                className="font-mono font-bold text-slate-800 dark:text-slate-200">{booking.ticketPNR}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block font-medium">{t.seats}</span>
                                            <span
                                                className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <Armchair className="w-3.5 h-3.5 text-sky-500"/>
                                                {booking.seats.join(', ')}
                      </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block font-medium">{t.totalPrice}</span>
                                            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                        {currencySymbol} {(booking.totalPriceUSD * booking.exchangeRate).toFixed(2)}
                      </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block font-medium">{t.completed}</span>
                                            <span
                                                className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500"/> Secure SSL
                      </span>
                                        </div>
                                    </div>

                                    {/* Passengers lists inside ticket */}
                                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                                        <span
                                            className="text-[10px] uppercase text-slate-400 block font-bold mb-1">{t.passengerDetails}</span>
                                        <div className="space-y-1">
                                            {booking.passengers.map((p, idx) => (
                                                <div key={p.id || idx}
                                                     className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-850 p-1.5 rounded border border-slate-100 dark:border-slate-800/40">
                          <span className="font-semibold flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400"/> {p.name} ({p.age}, {p.gender})
                          </span>
                                                    <span
                                                        className="font-mono text-[10px] text-slate-400">#{p.passportOrNID}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between text-[11px] text-slate-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/10 mt-2">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t.offlineNotice}
                    </span>
                                        <button
                                            className="flex items-center gap-0.5 text-sky-600 dark:text-sky-400 hover:underline font-bold">
                                            <Download className="w-3.5 h-3.5"/> PDF Pass
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 2. Saved Passenger Management */}
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <UserCheck className="w-5.5 h-5.5 text-indigo-500"/>
                        {t.savedPassengersTitle}
                    </h3>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                        <Plus className="w-4 h-4"/>
                        {showAddForm ? 'Cancel' : t.addNewBtn}
                    </button>
                </div>

                {showAddForm && (
                    <form onSubmit={handleSavePassenger}
                          className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.fullName}</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Al Muheet"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.age}</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.gender}</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value as any)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.passportNid}</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="NID or Passport No"
                                    value={passport}
                                    onChange={(e) => setPassport(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
                            >
                                {t.addPassengerBtn}
                            </button>
                        </div>
                    </form>
                )}

                {savedPassengers.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 dark:text-slate-600 text-sm">
                        {t.noPassengers}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {savedPassengers.map((passenger) => (
                            <div
                                key={passenger.id}
                                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20"
                            >
                                <div>
                                    <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-sky-500"/>
                                        {passenger.name}
                                    </h4>
                                    <div className="flex gap-2 text-[10px] text-slate-400 font-medium mt-1">
                                        <span>{passenger.age} Yrs</span>
                                        <span>•</span>
                                        <span>{passenger.gender}</span>
                                        <span>•</span>
                                        <span className="font-mono font-bold">#{passenger.passportOrNID}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onRemovePassenger(passenger.id)}
                                    className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                                    title="Delete Profile"
                                >
                                    <Trash className="w-4 h-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
