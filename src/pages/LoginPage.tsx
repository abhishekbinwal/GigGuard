import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useGigGuardStore } from '../store/gigGuardStore';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { setRiderId } = useGigGuardStore();

    const [riderId, setRiderIdInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!riderId.trim()) {
            setError('Please enter a valid Rider ID');
            return;
        }

        try {
            setLoading(true);
            // Simulate API validation
            await new Promise(resolve => setTimeout(resolve, 500));

            // Store rider ID and navigate
            setRiderId(riderId.trim());
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to authenticate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-400 opacity-5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Card */}
                <div className="card shadow-2xl p-8 sm:p-10 md:p-12 space-y-6 sm:space-y-8 rounded-3xl border-0 bg-white backdrop-blur-xl">
                    {/* Logo/Title */}
                    <div className="text-center space-y-3">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                            <LogIn size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                GigGuard
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 font-medium mt-2">Insurance for gig workers, made simple</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {/* Error message */}
                        {error && (
                            <div className="bg-red-100 bg-opacity-80 border-l-4 border-red-600 p-4 sm:p-5 rounded-xl flex gap-3 animate-fade-in">
                                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-red-900 text-sm sm:text-base font-semibold">{error}</p>
                            </div>
                        )}

                        {/* Rider ID Input */}
                        <div>
                            <label htmlFor="riderId" className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-3">
                                Rider ID
                            </label>
                            <div className="relative">
                                <input
                                    id="riderId"
                                    type="text"
                                    value={riderId}
                                    onChange={(e) => {
                                        setRiderIdInput(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="e.g., RIDER-12345"
                                    disabled={loading}
                                    className="input-field disabled:opacity-50 text-sm sm:text-base px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-300 focus:border-blue-600"
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2.5 flex items-center gap-1">
                                <span>📍</span> We'll auto-detect your location after login
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 px-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    <span>Continue</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-white text-gray-600 font-medium">Why choose GigGuard?</span>
                        </div>
                    </div>

                    {/* Features list - Cards */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 border-opacity-50">
                            <span className="text-xl flex-shrink-0">⚡</span>
                            <div>
                                <p className="font-bold text-sm text-gray-900">Fast Claim Processing</p>
                                <p className="text-xs text-gray-600">Get approved in minutes</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 border-opacity-50">
                            <span className="text-xl flex-shrink-0">📊</span>
                            <div>
                                <p className="font-bold text-sm text-gray-900">Real-Time Updates</p>
                                <p className="text-xs text-gray-600">Premium updates every 12 seconds</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 border-opacity-50">
                            <span className="text-xl flex-shrink-0">💰</span>
                            <div>
                                <p className="font-bold text-sm text-gray-900">Instant Payouts</p>
                                <p className="text-xs text-gray-600">Direct to your wallet account</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white text-xs sm:text-sm mt-8 opacity-90 font-medium">
                    <span className="inline-block">🔒</span> Insurance by GigGuard™ • Zero-touch claims
                </p>
            </div>
        </div>
    );
};
