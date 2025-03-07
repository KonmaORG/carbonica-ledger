
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { RegistryHeader } from './registry/components/RegistryHeader';
import { RegistryTabs } from './registry/RegistryTabs';

const Registry = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <RegistryHeader />
        <RegistryTabs />
      </div>
    </Layout>
  );
};

export default Registry;
