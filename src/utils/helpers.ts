/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format transaction ID with mask
 */
export const formatTransactionId = (id: string): string => {
    if (!id) return 'N/A';
    return id.substring(0, 4) + '...' + id.substring(id.length - 4);
};

/**
 * Get geolocation with proper error handling
 */
export const getGeolocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('Location access denied. Please enable location permissions.'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Location information unavailable.'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('Location request timed out.'));
                        break;
                    default:
                        reject(new Error('Failed to get location.'));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

/**
 * Get risk level color styling
 */
export const getRiskLevelColor = (level: 'high' | 'normal' | 'safe'): string => {
    switch (level) {
        case 'high':
            return 'border-red-200 bg-red-50';
        case 'safe':
            return 'border-green-200 bg-green-50';
        default:
            return 'border-gray-200 bg-gray-50';
    }
};

/**
 * Get risk level text color
 */
export const getRiskLevelTextColor = (level: 'high' | 'normal' | 'safe'): string => {
    switch (level) {
        case 'high':
            return 'text-red-700';
        case 'safe':
            return 'text-green-700';
        default:
            return 'text-gray-700';
    }
};

/**
 * Get premium status styling
 */
export const getPremiumStatusColor = (level: 'high' | 'normal' | 'safe'): string => {
    switch (level) {
        case 'high':
            return 'text-red-600';
        case 'safe':
            return 'text-green-600';
        default:
            return 'text-blue-600';
    }
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Format date
 */
export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
