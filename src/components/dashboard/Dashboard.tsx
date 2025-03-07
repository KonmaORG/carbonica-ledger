
import React from 'react';
import { DashboardHero } from './DashboardHero';
import { DashboardStats } from './DashboardStats';
import { FeaturedProjects } from './FeaturedProjects';
import { RecentActivity } from './RecentActivity';

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHero />
      
      <div className="my-8">
        <DashboardStats />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FeaturedProjects />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
