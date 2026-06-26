import React, { useState } from 'react';
import { Feedback, Language } from '../types';
import { MessageSquare, Star, Send, ShieldAlert } from 'lucide-react';

interface FeedbackSectionProps {
    feedbacks: Feedback[];
    onAddFeedback: (feedback: Omit<Feedback, 'id' | 'date'>) => void;
    language: Language;
}

export default function FeedbackSection({ feedbacks, onAddFeedback, language }: FeedbackSectionProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const t = language === 'bn' ? {
        title: 'ইউজার ফিডব্যাক ও মতামত',
        desc: 'ভবিষ্যতের আপডেটের জন্য আমাদের সার্ভিস নিয়ে আপনার গুরুত্বপূর্ণ মতামত দিন।',
        name: 'আপনার নাম',
        email: 'ইমেইল এড্রেস',
        rating: 'রেটিং দিন',
        comment: 'আপনার মন্তব্য লিখুন...',
        submitBtn: 'ফিডব্যাক পাঠান',
        recentReviews: 'সাম্প্রতিক রিভিউ সমূহ',
        averageRating: 'গড় রেটিং',
        outOf5: '৫ এর মধ্যে',
        totalReviews: 'টি রিভিউ',
        thanksFeedback: 'আপনার মতামতের জন্য ধন্যবাদ!',
    } : {
        title: 'Feedback & User Insights',
        desc: 'Help us improve our feature offerings by sharing your ticket booking insights.',
        name: 'Your Name',
        email: 'Email Address',
        rating: 'Your Rating',
        comment: 'Write your comments here...',
        submitBtn: 'Submit Feedback',
        recentReviews: 'Recent Passenger Reviews',
        averageRating: 'Average Score',
        outOf5: 'out of 5',
        totalReviews: 'total reviews',
        thanksFeedback: 'Thank you for your valuable feedback!',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !comment) return;
        onAddFeedback({
            userName: name,
            email,
            rating,
            comment
        });
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
    };

    const averageRating = feedbacks.length > 0
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
        : '5.0';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feedbacks overview & submit form */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> {t.title}
          </span>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                        {t.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
                        {t.desc}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.name}</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Al Muheet"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.email}</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. name@example.com"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.rating}</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(null)}
                                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-6 h-6 ${
                                                star <= (hoverRating ?? rating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-slate-300 dark:text-slate-600'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.comment}</label>
                            <textarea
                                required
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t.comment}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                            <Send className="w-4 h-4" /> {t.submitBtn}
                        </button>
                    </form>
                </div>
            </div>

            {/* Reviews List & Stats */}
            <div className="lg:col-span-7 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t.averageRating}</h4>
                        <div className="flex items-baseline gap-1 justify-center sm:justify-start mt-1">
                            <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">{averageRating}</span>
                            <span className="text-xs text-slate-400">{t.outOf5}</span>
                        </div>
                    </div>
                    <div className="flex gap-1.5 items-center bg-slate-50 dark:bg-slate-800/20 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-4 h-4 fill-amber-400" />
                            ))}
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">
              {feedbacks.length} {t.totalReviews}
            </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-4 max-h-[460px] overflow-y-auto">
                    <h3 className="text-lg font-bold text-slate-850 dark:text-slate-200">{t.recentReviews}</h3>

                    <div className="space-y-4">
                        {feedbacks.map((f) => (
                            <div
                                key={f.id}
                                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 space-y-2 hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{f.userName}</h4>
                                        <span className="text-[10px] text-slate-400">{f.date}</span>
                                    </div>
                                    <div className="flex text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10 scale-90">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`w-3 h-3 ${s <= f.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                                    "{f.comment}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
