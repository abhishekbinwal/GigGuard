import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGigGuardStore } from '../store/gigGuardStore';
import { Header } from '../components/Header';
import { LocationCard } from '../components/LocationCard';
import { PremiumCard } from '../components/PremiumCard';
import { ClaimForm } from '../components/ClaimForm';
import { ClaimResult } from '../components/ClaimResult';
import { Toast } from '../components/Toast';

export const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { riderId, apiError, setApiError } = useGigGuardStore();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

    // Redirect to login if no rider ID
    React.useEffect(() => {
        if (!riderId) {
            navigate('/');
        }
    }, [riderId, navigate]);

    const handleClaimSubmitted = () => {
        setToast({
            message: '✅ Claim submitted successfully!',
            type: 'success',
        });
    };

    if (!riderId) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            {/* Container */}
            <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:px-4 md:px-6">
                {/* Header */}
                <Header />

                {/* API Error Toast */}
                {apiError && (
                    <Toast
                        message={apiError}
                        type="error"
                        onClose={() => setApiError(null)}
                        duration={4000}
                    />
                )}

                {/* Success Toast */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                        duration={3000}
                    />
                )}

                {/* Main Content */}
                <div className="space-y-5 md:space-y-7">
                    {/* Location Card */}
                    <LocationCard />

                    {/* Premium Card */}
                    <PremiumCard />

                    {/* Claim Result (if exists) */}
                    <ClaimResult />

                    {/* Claim Form */}
                    <ClaimForm onClaimSubmitted={handleClaimSubmitted} />

                    {/* Info Card - Enhanced */}
                    <div className="card p-6 md:p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 border-2 border-blue-300 border-opacity-40">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl flex-shrink-0">💡</div>
                            <div>
                                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">About GigGuard</h3>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    GigGuard provides <span className="font-semibold text-blue-600">instant insurance</span> for gig workers. File claims in seconds,
                                    get approved instantly, and receive payouts directly to your wallet. We protect you while you work.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-200 bg-opacity-50 rounded-full text-xs font-semibold text-blue-800">⚡ Instant Approval</span>
                                    <span className="px-3 py-1 bg-green-200 bg-opacity-50 rounded-full text-xs font-semibold text-green-800">🔒 Secure</span>
                                    <span className="px-3 py-1 bg-purple-200 bg-opacity-50 rounded-full text-xs font-semibold text-purple-800">🎯 24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="text-center mt-10 md:mt-12 pb-6 text-xs md:text-sm text-gray-600">
                    <p>🔒 Your data is secure and encrypted • Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};
