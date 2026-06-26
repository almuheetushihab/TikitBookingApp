import React from 'react';
import {
    Bell,
    Info,
    AlertTriangle,
    CheckCircle,
    Flame,
    CalendarRange,
    ToggleLeft,
    ToggleRight,
    Trash2
} from 'lucide-react';
import {Language, NotificationItem} from "@/models";

interface NotificationHubProps {
    notifications: NotificationItem[];
    onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'alert' | 'cancelled') => void;
    onMarkAsRead: (id: string) => void;
    onClearAll: () => void;
    language: Language;
}

export default function NotificationHub({
                                            notifications,
                                            onAddNotification,
                                            onMarkAsRead,
                                            onClearAll,
                                            language
                                        }: NotificationHubProps) {
    const t = language === 'bn' ? {
        title: 'নোটিফিকেশন সেন্টার',
        desc: 'টিকিট আপডেট, বাস/ট্রেন শিডিউল পরিবর্তন এবং পুশ নোটিফিকেশন সিস্টেম টেস্ট করুন।',
        simTitle: 'পুশ নোটিফিকেশন সিমুলেশন',
        simDesc: 'নিচের বাটনগুলো ক্লিক করে লাইভ পুশ নোটিফিকেশন ট্রিগার করুন:',
        sim1: 'বিমান শিডিউল পরিবর্তন সিমুলেট করুন',
        sim2: 'ট্রেন বিলম্ব এলার্ট সিমুলেট করুন',
        sim3: 'বাস টিকেট বুকিং কনফার্মেশন',
        sim4: 'টিকেট বাতিল নোটিফিকেশন',
        emptyNotif: 'কোনো নতুন নোটিফিকেশন নেই।',
        clearAll: 'সব মুছে ফেলুন',
        markRead: 'পঠিত হিসেবে চিহ্নিত করুন',
    } : {
        title: 'Notification Center',
        desc: 'Receive alerts on rescheduled flights, train delays, and ticket booking status.',
        simTitle: 'FCM Push Notification Simulator',
        simDesc: 'Test the notification delivery channel by triggering instant passenger alerts below:',
        sim1: 'Simulate Air Schedule Update',
        sim2: 'Simulate Train Delay Alert',
        sim3: 'Simulate Bus Reservation Receipt',
        sim4: 'Simulate Emergency Cancellation',
        emptyNotif: 'All caught up! No notifications yet.',
        clearAll: 'Clear All Notifications',
        markRead: 'Mark as read',
    };

    const handleSimulate = (type: 1 | 2 | 3 | 4) => {
        switch (type) {
            case 1:
                onAddNotification(
                    language === 'bn' ? '✈️ বিমান শিডিউল আপডেট: BG-433' : '✈️ Air Schedule Update: BG-433',
                    language === 'bn' ? 'আবহাওয়া অনুকূল থাকায় বিমান বাংলাদেশ এয়ারলাইন্স-এর ফ্লাইটটি ১১:৪৫ মিনিটে ছাড়বে।' : 'Biman Flight BG-433 has been updated to depart at 11:45 AM due to favorable weather conditions.',
                    'info'
                );
                break;
            case 2:
                onAddNotification(
                    language === 'bn' ? '🚨 ট্রেন বিলম্ব সতর্কবার্তা: মহানগর এক্সপ্রেস' : '🚨 Train Delay Alert: Mahanagar Express',
                    language === 'bn' ? 'কারিগরি ত্রুটির কারণে মহানগর এক্সপ্রেস ট্রেনটি ৪০ মিনিট দেরিতে কমলাপুর ছাড়বে।' : 'Mahanagar Express train has been delayed by 40 minutes at Kamalapur due to line safety signals.',
                    'alert'
                );
                break;
            case 3:
                onAddNotification(
                    language === 'bn' ? '✅ বাস টিকিট বুকিং নিশ্চিতকরণ' : '✅ Bus Booking Confirmed',
                    language === 'bn' ? 'গ্রীন লাইন ট্রিপ GL-104-এর টিকিট সফলভাবে বুক করা হয়েছে। সিট নম্বর: A1, A2।' : 'Your booking for Green Line Paribahan (GL-104) is confirmed! Seats: A1, A2.',
                    'success'
                );
                break;
            case 4:
                onAddNotification(
                    language === 'bn' ? '⚠️ বুকিং বাতিল নোটিফিকেশন' : '⚠️ Reservation Cancelled',
                    language === 'bn' ? 'সড়ক মেরামতের কাজের কারণে হানিফ এন্টারপ্রাইজের ট্রিপ HN-890 বাতিল করা হয়েছে। সম্পূর্ণ রিফান্ড প্রসেস করা হচ্ছে।' : 'Trip HN-890 by Hanif Enterprise has been cancelled due to highway repairs. Full refund initiated.',
                    'cancelled'
                );
                break;
        }
    };

    const getIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'info':
                return <Info className="w-5 h-5 text-sky-500"/>;
            case 'alert':
                return <AlertTriangle className="w-5 h-5 text-amber-500 animate-bounce"/>;
            case 'success':
                return <CheckCircle className="w-5 h-5 text-emerald-500"/>;
            case 'cancelled':
                return <Flame className="w-5 h-5 text-rose-500"/>;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Simulation controller */}
            <div className="lg:col-span-5 space-y-6">
                <div
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <CalendarRange className="w-5.5 h-5.5 text-sky-500"/>
                        {t.simTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                        {t.simDesc}
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => handleSimulate(1)}
                            className="w-full text-left bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/40 p-3.5 rounded-xl border border-sky-100 dark:border-sky-800 text-xs font-bold text-sky-700 dark:text-sky-300 transition-all flex items-center gap-3"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                            {t.sim1}
                        </button>
                        <button
                            onClick={() => handleSimulate(2)}
                            className="w-full text-left bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 p-3.5 rounded-xl border border-amber-100 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300 transition-all flex items-center gap-3"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                            {t.sim2}
                        </button>
                        <button
                            onClick={() => handleSimulate(3)}
                            className="w-full text-left bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-all flex items-center gap-3"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            {t.sim3}
                        </button>
                        <button
                            onClick={() => handleSimulate(4)}
                            className="w-full text-left bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 p-3.5 rounded-xl border border-rose-100 dark:border-rose-800 text-xs font-bold text-rose-700 dark:text-rose-300 transition-all flex items-center gap-3"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                            {t.sim4}
                        </button>
                    </div>
                </div>
            </div>

            {/* Actual Notifications Center */}
            <div className="lg:col-span-7 space-y-4">
                <div
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-4">
                    <div
                        className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                            <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Bell className="w-5.5 h-5.5 text-indigo-500"/>
                                {t.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                        </div>
                        {notifications.length > 0 && (
                            <button
                                onClick={onClearAll}
                                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4"/>
                                {t.clearAll}
                            </button>
                        )}
                    </div>

                    <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                        {notifications.length === 0 ? (
                            <div className="text-center py-16">
                                <Bell className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3"/>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t.emptyNotif}</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    onClick={() => onMarkAsRead(notif.id)}
                                    className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                        notif.read
                                            ? 'bg-slate-50/50 dark:bg-slate-800/10 border-slate-100 dark:border-slate-800/50 opacity-60'
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm hover:border-sky-300 dark:hover:border-sky-800'
                                    }`}
                                >
                                    <div className="mt-0.5">{getIcon(notif.type)}</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                {notif.title}
                                            </h4>
                                            <span className="text-[9px] text-slate-400 font-medium">{notif.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {notif.message}
                                        </p>
                                        {!notif.read && (
                                            <span
                                                className="inline-block text-[9px] text-sky-600 dark:text-sky-400 font-extrabold uppercase tracking-wide bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-full mt-1">
                        New
                      </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
