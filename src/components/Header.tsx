import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGigGuardStore } from '../store/gigGuardStore';
import { formatCurrency } from '../utils/helpers';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { riderId, walletBalance, reset } = useGigGuardStore();

    const handleLogout = () => {
        reset();
        navigate('/');
    };

    return (
        <div className="sticky top-0 z-40 mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-lg">
            <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:px-4 md:px-6">
                {/* Mobile view - stacked */}
                <div className="block md:hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">GigGuard</h1>
                            <p className="text-xs text-blue-100">ID: {riderId}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white bg-opacity-20 text-white hover:bg-opacity-30 rounded-lg transition-all font-medium text-sm"
                        >
                            <LogOut size={16} />
                            <span>Exit</span>
                        </button>
                    </div>

                    {/* Wallet - Mobile */}
                    <div className="flex items-center justify-between bg-white bg-opacity-15 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-20">
                        <div className="flex items-center gap-3">
                            <Wallet size={20} className="text-blue-100" />
                            <span className="text-sm font-medium text-blue-100">Wallet Balance</span>
                        </div>
                        <p className="text-xl font-bold text-white">{formatCurrency(walletBalance)}</p>
                    </div>
                </div>

                {/* Desktop view */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left side */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">GigGuard</h1>
                        <p className="text-sm text-blue-100">Rider ID: {riderId}</p>
                    </div>

                    {/* Center - Wallet */}
                    <div className="flex items-center gap-4 px-8 py-4 bg-white bg-opacity-15 backdrop-blur-sm rounded-xl border border-white border-opacity-20">
                        <Wallet size={28} className="text-blue-100" />
                        <div>
                            <p className="text-xs text-blue-100 font-medium uppercase tracking-wide">Wallet Balance</p>
                            <p className="text-3xl font-bold text-white">{formatCurrency(walletBalance)}</p>
                        </div>
                    </div>

                    {/* Right side - Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white bg-opacity-20 text-white hover:bg-opacity-30 rounded-lg transition-all duration-200 font-semibold hover:shadow-lg"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
