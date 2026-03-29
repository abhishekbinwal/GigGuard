import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <AlertCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            default:
                return <AlertCircle size={20} />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className={`fixed bottom-3 left-3 right-3 sm:bottom-4 sm:right-4 sm:left-auto max-w-sm ${getStyles()} px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 animate-fade-in z-50`}>
            {getIcon()}
            <span className="text-sm sm:text-base flex-1">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 sm:ml-4 hover:opacity-80 transition-opacity flex-shrink-0"
            >
                <X size={18} />
            </button>
        </div>
    );
};
