
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'issuance' | 'transfer' | 'retirement' | 'validation';
  projectId: string;
  projectName: string;
  date: string;
  amount?: number;
  from?: string;
  to?: string;
  validator?: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    type: "issuance",
    projectId: "1",
    projectName: "Amazon Rainforest Conservation",
    date: "12 Jun 2023",
    amount: 25000
  },
  {
    id: "a2",
    type: "transfer",
    projectId: "2",
    projectName: "Serengeti Wildlife Corridor",
    date: "10 Jun 2023",
    amount: 15000,
    from: "EcoFund Inc.",
    to: "GreenCorp"
  },
  {
    id: "a3",
    type: "retirement",
    projectId: "1",
    projectName: "Amazon Rainforest Conservation",
    date: "08 Jun 2023",
    amount: 5000,
    from: "TechGiant Co."
  },
  {
    id: "a4",
    type: "validation",
    projectId: "3",
    projectName: "Solar Farm Development",
    date: "07 Jun 2023",
    validator: "ClimateVerify Ltd."
  }
];

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'issuance':
      return <Leaf className="h-5 w-5 text-carbonica-green-dark" />;
    case 'transfer':
      return <ArrowRight className="h-5 w-5 text-carbonica-blue-dark" />;
    case 'retirement':
      return <ShieldCheck className="h-5 w-5 text-carbonica-blue-dark" />;
    case 'validation':
      return <Award className="h-5 w-5 text-carbonica-green-dark" />;
    default:
      return null;
  }
};

const ActivityBadge = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'issuance':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Issuance
        </Badge>
      );
    case 'transfer':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          Transfer
        </Badge>
      );
    case 'retirement':
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
          Retirement
        </Badge>
      );
    case 'validation':
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
          Validation
        </Badge>
      );
    default:
      return null;
  }
};

const ActivityDetails = ({ activity }: { activity: ActivityItem }) => {
  switch (activity.type) {
    case 'issuance':
      return (
        <p className="text-sm text-gray-600">
          <span className="font-medium">{activity.amount?.toLocaleString()}</span> credits issued for{' '}
          <a href={`/projects/${activity.projectId}`} className="text-carbonica-blue-dark hover:underline">
            {activity.projectName}
          </a>
        </p>
      );
    case 'transfer':
      return (
        <p className="text-sm text-gray-600">
          <span className="font-medium">{activity.amount?.toLocaleString()}</span> credits transferred from{' '}
          <span className="font-medium">{activity.from}</span> to{' '}
          <span className="font-medium">{activity.to}</span>
        </p>
      );
    case 'retirement':
      return (
        <p className="text-sm text-gray-600">
          <span className="font-medium">{activity.amount?.toLocaleString()}</span> credits retired by{' '}
          <span className="font-medium">{activity.from}</span>
        </p>
      );
    case 'validation':
      return (
        <p className="text-sm text-gray-600">
          <a href={`/projects/${activity.projectId}`} className="text-carbonica-blue-dark hover:underline">
            {activity.projectName}
          </a>{' '}
          validated by <span className="font-medium">{activity.validator}</span>
        </p>
      );
    default:
      return null;
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {MOCK_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <ActivityIcon type={activity.type} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <ActivityBadge type={activity.type} />
                  <span className="ml-2 text-xs text-gray-500">{activity.date}</span>
                </div>
                <ActivityDetails activity={activity} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
