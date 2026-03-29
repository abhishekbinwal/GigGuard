import React, { useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { useGigGuardStore } from '../store/gigGuardStore';
import { getGeolocation } from '../utils/helpers';
import { SkeletonLoader } from './SkeletonLoader';

export const LocationCard: React.FC = () => {
    const {
        latitude,
        longitude,
        locationError,
        locationLoading,
        setLocation,
        setLocationError,
        setLocationLoading,
    } = useGigGuardStore();

    useEffect(() => {
        if (!latitude || !longitude) {
            fetchLocation();
        }
    }, []);

    const fetchLocation = async () => {
        setLocationLoading(true);
        try {
            const { latitude: lat, longitude: lon } = await getGeolocation();
            setLocation(lat, lon);
        } catch (error) {
            setLocationError(
                error instanceof Error ? error.message : 'Failed to get location'
            );
        } finally {
            setLocationLoading(false);
        }
    };

    return (
        <div className="card mb-6 p-6 md:p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 bg-opacity-60">
                        <MapPin size={24} className="text-purple-700" />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Current Location</h3>
                        <p className="text-xs text-gray-600 mt-0.5">Live GPS Tracking</p>
                    </div>
                </div>
            </div>

            {locationLoading ? (
                <SkeletonLoader count={2} />
            ) : locationError ? (
                <div className="bg-red-100 bg-opacity-60 border border-red-300 rounded-2xl p-4 md:p-5 text-red-800 flex items-start gap-3">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-red-600" />
                    <div className="flex-1">
                        <p className="font-semibold text-sm md:text-base mb-3">{locationError}</p>
                        <button
                            onClick={fetchLocation}
                            className="btn-primary text-sm"
                        >
                            🔄 Retry
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* Coordinates Container */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Latitude */}
                        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 border-opacity-50">
                            <p className="text-xs uppercase tracking-widest font-bold text-purple-700 mb-2">Latitude</p>
                            <p className="text-2xl font-black text-gray-900 font-mono">{latitude?.toFixed(4)}</p>
                        </div>

                        {/* Longitude */}
                        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 border-opacity-50">
                            <p className="text-xs uppercase tracking-widest font-bold text-purple-700 mb-2">Longitude</p>
                            <p className="text-2xl font-black text-gray-900 font-mono">{longitude?.toFixed(4)}</p>
                        </div>
                    </div>

                    {/* Verification Badge */}
                    <div className="flex items-center justify-between bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-4 border border-green-300 border-opacity-50">
                        <span className="text-sm font-medium text-gray-700">
                            📡 GPS Accuracy
                        </span>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-sm">
                            High
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
