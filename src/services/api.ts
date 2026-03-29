import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export interface PremiumResponse {
    premium: number;
    status: string;
    risk_level: string;
    risk_hint: string;
}

export interface ClaimRequest {
    rider_id: string;
    latitude: number;
    longitude: number;
    incident_type: string;
    description?: string;
}

export interface ClaimResponse {
    status: 'approved' | 'fraud' | 'terminated';
    message: string;
    payout: number;
    bonus?: string;
    transaction_id: string;
    wallet_balance: number;
}

// Mock data
const mockPremiumData: Record<string, PremiumResponse> = {
    'zone-1': {
        premium: 450,
        status: 'Active Coverage',
        risk_level: 'normal',
        risk_hint: 'Clear weather, Normal traffic',
    },
    'zone-2': {
        premium: 620,
        status: 'High Risk Alert',
        risk_level: 'high',
        risk_hint: '⚠️ Heavy rain detected → Higher payout eligibility',
    },
    'zone-3': {
        premium: 350,
        status: 'Safe Zone',
        risk_level: 'safe',
        risk_hint: 'Optimal conditions for delivery',
    },
};

const mockClaimResponses: ClaimResponse[] = [
    {
        status: 'approved',
        message: 'Claim Approved! Your incident has been verified.',
        payout: 1500,
        bonus: 'Heavy Rain Bonus +15%',
        transaction_id: 'TXN-2024-001234',
        wallet_balance: 6500,
    },
    {
        status: 'fraud',
        message: 'Claim Under Review - Potential fraud detected',
        payout: 0,
        transaction_id: 'TXN-2024-001235',
        wallet_balance: 5000,
    },
    {
        status: 'terminated',
        message: 'Account Terminated - Multiple fraudulent claims detected',
        payout: 0,
        transaction_id: 'TXN-2024-001236',
        wallet_balance: 5000,
    },
];

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

function getRandomZone(): string {
    const zones = ['zone-1', 'zone-2', 'zone-3'];
    return zones[Math.floor(Math.random() * zones.length)];
}

function getRandomClaimResult(): ClaimResponse {
    return mockClaimResponses[Math.floor(Math.random() * mockClaimResponses.length)];
}

export const premiumService = {
    async fetchPremium(riderId: string): Promise<PremiumResponse> {
        if (USE_MOCK) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            const zone = getRandomZone();
            return mockPremiumData[zone];
        }

        try {
            const response = await apiClient.get<PremiumResponse>(`/premium/${getRandomZone()}`, {
                params: { rider_id: riderId },
            });
            return response.data;
        } catch (error) {
            console.error('Premium fetch error:', error);
            throw new Error('Failed to fetch premium data');
        }
    },
};

export const claimService = {
    async fileClaim(request: ClaimRequest): Promise<ClaimResponse> {
        if (USE_MOCK) {
            // Simulate network delay and processing
            await new Promise(resolve => setTimeout(resolve, 1500));
            return {
                ...getRandomClaimResult(),
                transaction_id: `TXN-${Date.now()}`,
            };
        }

        try {
            const response = await apiClient.post<ClaimResponse>('/claims/file', request);
            return response.data;
        } catch (error) {
            console.error('Claim filing error:', error);
            throw new Error('Failed to file claim');
        }
    },
};

export default apiClient;
