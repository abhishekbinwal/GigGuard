import React from 'react';

interface SkeletonLoaderProps {
    height?: string;
    width?: string;
    className?: string;
    count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    height = 'h-4',
    width = 'w-full',
    className = '',
    count = 1,
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`skeleton ${width} ${height} rounded ${className} ${index > 0 ? 'mt-2' : ''}`}
                />
            ))}
        </>
    );
};

export const SkeletonCard: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
    <div className="card p-4 md:p-6 space-y-3 md:space-y-4">
        <SkeletonLoader height="h-6" width="w-3/4" />
        <SkeletonLoader count={lines} height="h-4" />
    </div>
);
