import { create } from 'zustand';
import { persist as persistMiddleware } from 'zustand/middleware';

export interface ClaimResult {
    status: 'approved' | 'fraud' | 'terminated' | null;
    message: string;
    payout?: number;
    bonus?: string;
    transaction_id?: string;
    wallet_balance?: number;
}

interface GigGuardStore {
    // Auth
    riderId: string | null;
    setRiderId: (id: string) => void;

    // Location
    latitude: number | null;
    longitude: number | null;
    locationError: string | null;
    locationLoading: boolean;
    setLocation: (lat: number, lon: number) => void;
    setLocationError: (error: string | null) => void;
    setLocationLoading: (loading: boolean) => void;

    // Premium
    premium: number | null;
    premiumStatus: string;
    premiumLoading: boolean;
    setPremium: (amount: number) => void;
    setPremiumStatus: (status: string) => void;
    setPremiumLoading: (loading: boolean) => void;

    // Risk Indicator
    riskHint: string;
    riskLevel: 'high' | 'normal' | 'safe';
    setRiskHint: (hint: string) => void;
    setRiskLevel: (level: 'high' | 'normal' | 'safe') => void;

    // Wallet
    walletBalance: number;
    setWalletBalance: (balance: number) => void;

    // Claims
    claimResult: ClaimResult | null;
    claimLoading: boolean;
    setClaimResult: (result: ClaimResult) => void;
    setClaimLoading: (loading: boolean) => void;
    clearClaimResult: () => void;

    // Claim Status
    claimStatus: 'terminated' | null;
    setClaimStatus: (status: 'terminated' | null) => void;

    // API error
    apiError: string | null;
    setApiError: (error: string | null) => void;

    // Reset state
    reset: () => void;
}

const initialState = {
    riderId: null,
    latitude: null,
    longitude: null,
    locationError: null,
    locationLoading: false,
    premium: null,
    premiumStatus: '',
    premiumLoading: false,
    riskHint: '',
    riskLevel: 'normal' as const,
    walletBalance: 5000,
    claimResult: null,
    claimLoading: false,
    claimStatus: null,
    apiError: null,
};

export const useGigGuardStore = create<GigGuardStore>()(
    persistMiddleware(
        (set) => ({
            ...initialState,

            setRiderId: (id: string) => set({ riderId: id }),

            setLocation: (lat: number, lon: number) =>
                set({ latitude: lat, longitude: lon, locationError: null }),
            setLocationError: (error: string | null) => set({ locationError: error }),
            setLocationLoading: (loading: boolean) => set({ locationLoading: loading }),

            setPremium: (amount: number) => set({ premium: amount }),
            setPremiumStatus: (status: string) => set({ premiumStatus: status }),
            setPremiumLoading: (loading: boolean) => set({ premiumLoading: loading }),

            setRiskHint: (hint: string) => set({ riskHint: hint }),
            setRiskLevel: (level: 'high' | 'normal' | 'safe') => set({ riskLevel: level }),

            setWalletBalance: (balance: number) => set({ walletBalance: balance }),

            setClaimResult: (result: ClaimResult) => set({ claimResult: result }),
            setClaimLoading: (loading: boolean) => set({ claimLoading: loading }),
            clearClaimResult: () => set({ claimResult: null }),

            setClaimStatus: (status: 'terminated' | null) => set({ claimStatus: status }),

            setApiError: (error: string | null) => set({ apiError: error }),

            reset: () => set({ ...initialState, riderId: null }),
        }),
        {
            name: 'gigguard-store',
            partialize: (state) => ({
                riderId: state.riderId,
                walletBalance: state.walletBalance,
            }),
        }
    )
);
