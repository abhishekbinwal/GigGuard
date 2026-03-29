import React, { useEffect, useRef } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useGigGuardStore } from '../store/gigGuardStore';
import { premiumService } from '../services/api';
import { formatCurrency, getPremiumStatusColor } from '../utils/helpers';
import { SkeletonCard } from './SkeletonLoader';

export const PremiumCard: React.FC = () => {
    const {
        riderId,
        premium,
        premiumStatus,
        premiumLoading,
        riskLevel,
        riskHint,
        setPremium,
        setPremiumStatus,
        setPremiumLoading,
        setRiskHint,
        setRiskLevel,
        setApiError,
    } = useGigGuardStore();

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!riderId) return;

        const fetchPremium = async () => {
            try {
                setPremiumLoading(true);
                const data = await premiumService.fetchPremium(riderId);
                setPremium(data.premium);
                setPremiumStatus(data.status);
                setRiskHint(data.risk_hint);
                setRiskLevel(data.risk_level as 'high' | 'normal' | 'safe');
                setApiError(null);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to fetch premium';
                setApiError(message);
            } finally {
                setPremiumLoading(false);
            }
        };

        // Initial fetch
        fetchPremium();

        // Poll every 12 seconds
        pollIntervalRef.current = setInterval(fetchPremium, 12000);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [riderId]);

    const getRiskBgColor = () => {
        switch (riskLevel) {
            case 'high':
                return 'bg-red-50 border-red-200';
            case 'safe':
                return 'bg-green-50 border-green-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getRiskIcon = () => {
        switch (riskLevel) {
            case 'high':
                return <AlertTriangle size={24} className="text-red-600" />;
            case 'safe':
                return <CheckCircle size={24} className="text-green-600" />;
            default:
                return <TrendingUp size={24} className="text-blue-600" />;
        }
    };

    if (premiumLoading && !premium) {
        return <SkeletonCard lines={4} />;
    }

    return (
        <div className={`card mb-6 p-6 md:p-8 relative overflow-hidden ${riskLevel === 'high'
                ? 'bg-gradient-to-br from-red-50 via-orange-50 to-red-100'
                : riskLevel === 'safe'
                    ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100'
                    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100'
            }`}>
            {/* Background design element */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl"
                style={{
                    background: riskLevel === 'high' ? '#ef4444' : riskLevel === 'safe' ? '#10b981' : '#3b82f6'
                }}
            ></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0 md:mb-8 mb-6">
                    <div className="flex items-start gap-3 md:gap-4">
                        <div className={`flex-shrink-0 p-2.5 rounded-xl ${riskLevel === 'high'
                                ? 'bg-red-200 bg-opacity-50'
                                : riskLevel === 'safe'
                                    ? 'bg-green-200 bg-opacity-50'
                                    : 'bg-blue-200 bg-opacity-50'
                            }`}>
                            {getRiskIcon()}
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">Live Premium Coverage</h3>
                            <p className="text-sm text-gray-600 mt-0.5">{premiumStatus}</p>
                        </div>
                    </div>
                    <span className={`text-xs font-bold uppercase px-4 py-2 rounded-xl whitespace-nowrap shadow-sm ${riskLevel === 'high'
                            ? 'bg-red-500 text-white'
                            : riskLevel === 'safe'
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-500 text-white'
                        }`}>
                        {riskLevel} RISK
                    </span>
                </div>

                {/* Premium Amount - Enhanced */}
                <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-300 border-opacity-40">
                    <p className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-600 mb-2">Active Premium</p>
                    <div className={`text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r ${riskLevel === 'high'
                            ? 'from-red-600 to-orange-600'
                            : riskLevel === 'safe'
                                ? 'from-green-600 to-emerald-600'
                                : 'from-blue-600 to-indigo-600'
                        } bg-clip-text text-transparent mb-2`}>
                        {formatCurrency(premium || 0)}
                    </div>
                    <p className="text-sm text-gray-700">Your active coverage amount</p>
                </div>

                {/* Risk Hint - Enhanced */}
                {riskHint && (
                    <div className={`p-4 md:p-5 rounded-2xl mb-4 border-l-4 ${riskLevel === 'high'
                            ? 'bg-red-100 bg-opacity-60 text-red-900 border-l-red-500'
                            : riskLevel === 'safe'
                                ? 'bg-green-100 bg-opacity-60 text-green-900 border-l-green-500'
                                : 'bg-blue-100 bg-opacity-60 text-blue-900 border-l-blue-500'
                        }`}>
                        <p className="font-semibold text-sm md:text-base">{riskHint}</p>
                    </div>
                )}

                {/* Polling indicator - Enhanced */}
                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700 bg-white bg-opacity-50 px-4 py-3 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">Live</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Updates every 12 seconds</span>
                </div>
            </div>
        </div>
    );
};
