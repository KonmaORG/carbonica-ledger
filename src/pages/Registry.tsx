
import React from 'react';
import { RegistryHeader } from './registry/components/RegistryHeader';
import { RegistryTabs } from './registry/RegistryTabs';

const Registry = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <RegistryHeader />
      <RegistryTabs />
    </div>
  );
};

export default Registry;
