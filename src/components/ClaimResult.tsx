import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useGigGuardStore } from '../store/gigGuardStore';
import { formatCurrency, formatTransactionId } from '../utils/helpers';

export const ClaimResult: React.FC = () => {
    const { claimResult, clearClaimResult } = useGigGuardStore();

    if (!claimResult) return null;

    const getStatusIcon = () => {
        switch (claimResult.status) {
            case 'approved':
                return <CheckCircle size={48} className="text-green-600" />;
            case 'fraud':
                return <AlertTriangle size={48} className="text-yellow-600" />;
            case 'terminated':
                return <XCircle size={48} className="text-red-600" />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (claimResult.status) {
            case 'approved':
                return 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100';
            case 'fraud':
                return 'bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100';
            case 'terminated':
                return 'bg-gradient-to-br from-red-50 via-pink-50 to-red-100';
            default:
                return 'bg-gradient-to-br from-gray-50 to-gray-100';
        }
    };

    const getStatusAccentColor = () => {
        switch (claimResult.status) {
            case 'approved':
                return 'from-green-600 to-emerald-600';
            case 'fraud':
                return 'from-yellow-600 to-orange-600';
            case 'terminated':
                return 'from-red-600 to-pink-600';
            default:
                return 'from-gray-600 to-gray-700';
        }
    };

    return (
        <div className={`card ${getStatusColor()} p-6 md:p-10 mb-6 animate-fade-in overflow-hidden relative`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 opacity-5 rounded-full blur-3xl"
                style={{
                    background: claimResult.status === 'approved' ? '#10b981' :
                        claimResult.status === 'fraud' ? '#f59e0b' :
                            claimResult.status === 'terminated' ? '#ef4444' : '#6b7280'
                }}
            ></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-5 md:space-y-7">
                {/* Icon - Large and prominent */}
                <div className={`flex justify-center p-4 md:p-6 rounded-3xl bg-gradient-to-br ${getStatusAccentColor()} bg-opacity-10`}>
                    {getStatusIcon()}
                </div>

                {/* Status Title - Bold and large */}
                <div>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 md:mb-3 capitalize bg-gradient-to-r ${getStatusAccentColor()} bg-clip-text text-transparent`}>
                        Claim {claimResult.status}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 font-medium">{claimResult.message}</p>
                </div>

                {/* Payout (if approved) - Enhanced */}
                {claimResult.payout !== undefined && claimResult.payout > 0 && (
                    <div className="border-t-2 border-gray-300 border-opacity-30 w-full pt-6 md:pt-8 mt-4 md:mt-6">
                        <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-700 mb-3">Payout Amount</p>
                        <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                            {formatCurrency(claimResult.payout)}
                        </p>
                        {claimResult.bonus && (
                            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg">
                                🎉 {claimResult.bonus}
                            </div>
                        )}
                    </div>
                )}

                {/* Transaction Details - Card based */}
                <div className="border-t-2 border-gray-300 border-opacity-30 w-full pt-6 md:pt-8 mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
                    <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200 border-opacity-50">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Transaction ID</p>
                        <p className="text-sm md:text-base font-mono font-bold text-gray-900 break-all">
                            {formatTransactionId(claimResult.transaction_id || 'N/A')}
                        </p>
                    </div>
                    {claimResult.wallet_balance !== undefined && (
                        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200 border-opacity-50">
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                                Updated Wallet
                            </p>
                            <p className="text-sm md:text-base font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {formatCurrency(claimResult.wallet_balance)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <button
                    onClick={clearClaimResult}
                    className="btn-primary w-full mt-6 md:mt-8 py-3 md:py-4 text-base md:text-lg"
                >
                    ✨ Start New Claim
                </button>
            </div>
        </div>
    );
};
