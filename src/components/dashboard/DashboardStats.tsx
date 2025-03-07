
import React from 'react';
import { 
  GanttChart,
  Award,
  Leaf,
  ShieldCheck 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className={`stats-card border-l-${color}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${color}/10 mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Registered Projects"
        value="142"
        icon={<GanttChart className="h-6 w-6 text-carbonica-green-dark" />}
        color="carbonica-green-dark"
      />
      <StatCard
        title="Verified Projects"
        value="98"
        icon={<Award className="h-6 w-6 text-carbonica-blue-dark" />}
        color="carbonica-blue-dark"
      />
      <StatCard
        title="Carbon Credits Issued"
        value="1.2M"
        icon={<Leaf className="h-6 w-6 text-carbonica-green-dark" />}
        color="carbonica-green-dark"
      />
      <StatCard
        title="Credits Retired"
        value="780K"
        icon={<ShieldCheck className="h-6 w-6 text-carbonica-blue-dark" />}
        color="carbonica-blue-dark"
      />
    </div>
  );
};
