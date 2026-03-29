import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { useGigGuardStore } from '../store/gigGuardStore';
import { claimService } from '../services/api';

interface ClaimFormProps {
    onClaimSubmitted: () => void;
}

const INCIDENT_TYPES = [
    { value: 'bike_slip', label: 'Bike Slip' },
    { value: 'accident', label: 'Accident' },
    { value: 'rain_issue', label: 'Rain Issue' },
    { value: 'theft', label: 'Theft' },
    { value: 'other', label: 'Other (please describe)' },
];

export const ClaimForm: React.FC<ClaimFormProps> = ({ onClaimSubmitted }) => {
    const {
        riderId,
        latitude,
        longitude,
        claimLoading,
        claimStatus,
        setClaimResult,
        setClaimLoading,
        setApiError,
    } = useGigGuardStore();

    const [incidentType, setIncidentType] = useState('bike_slip');
    const [description, setDescription] = useState('');

    const isDisabled = claimStatus === 'terminated' || claimLoading || !riderId || !latitude || !longitude;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!riderId || latitude === null || longitude === null) {
            setApiError('Location or rider ID missing');
            return;
        }

        try {
            setClaimLoading(true);
            const response = await claimService.fileClaim({
                rider_id: riderId,
                latitude,
                longitude,
                incident_type: incidentType,
                description: incidentType === 'other' ? description : undefined,
            });

            setClaimResult({
                status: response.status,
                message: response.message,
                payout: response.payout,
                bonus: response.bonus,
                transaction_id: response.transaction_id,
                wallet_balance: response.wallet_balance,
            });

            onClaimSubmitted();
            setIncidentType('bike_slip');
            setDescription('');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to file claim';
            setApiError(message);
        } finally {
            setClaimLoading(false);
        }
    };

    return (
        <div className="card mb-6 p-6 md:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-200 bg-opacity-60">
                    <Send size={24} className="text-indigo-700" />
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">File a Claim</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Quick incident reporting</p>
                </div>
            </div>

            {claimStatus === 'terminated' && (
                <div className="bg-red-100 bg-opacity-60 border border-red-300 rounded-2xl p-4 md:p-5 mb-6 flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">⛔</div>
                    <p className="text-red-900 font-semibold text-sm md:text-base">
                        Your account has been terminated. You cannot file new claims.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {/* Incident Type Dropdown */}
                <div>
                    <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-700 block mb-3">Select Incident Type</label>
                    <select
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        disabled={isDisabled}
                        className="input-field disabled:opacity-50 text-sm md:text-base px-4 md:px-5 py-3 md:py-3.5 rounded-xl border-2 border-indigo-200 bg-white hover:border-indigo-300 focus:border-indigo-500"
                    >
                        {INCIDENT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description for "Other" */}
                {incidentType === 'other' && (
                    <div className="animate-fade-in">
                        <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-700 block mb-3">Describe the Incident</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isDisabled}
                            placeholder="Tell us what happened..."
                            rows={4}
                            className="input-field resize-none disabled:opacity-50 text-sm md:text-base px-4 md:px-5 py-3 md:py-3.5 rounded-xl border-2 border-indigo-200 bg-white hover:border-indigo-300 focus:border-indigo-500"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 md:py-4 text-sm md:text-base font-bold mt-4 md:mt-6 shadow-lg hover:shadow-xl"
                >
                    {claimLoading ? (
                        <>
                            <Loader size={20} className="animate-spin" />
                            <span>Processing Claim...</span>
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            <span>Submit Claim</span>
                        </>
                    )}
                </button>

                {!riderId && (
                    <div className="bg-yellow-100 bg-opacity-60 border border-yellow-300 rounded-2xl p-4 md:p-5 text-yellow-900 text-sm md:text-base font-semibold text-center">
                        📝 Please login first to file a claim
                    </div>
                )}
            </form>
        </div>
    );
};
