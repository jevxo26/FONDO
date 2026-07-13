import React from 'react';
import { usePackages } from './packages-provider';
import PackageCard from './packages-card';

const PackageGrid = () => {
        const {processedPackages } = usePackages();
    return (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {processedPackages.map((pkg) =><PackageCard key={pkg.id} pkg= {pkg} />)}
          </div>
    );
};

export default PackageGrid;