import React from "react";
import { DashboardHero } from "./DashboardHero";
import { DashboardStats } from "./DashboardStats";
import { FeaturedProjects } from "./FeaturedProjects";
import { RecentActivity } from "./RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDisplay, UserBadge } from "../badges/BadgeDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock recent badges data
const recentBadges: UserBadge[] = [
  {
    id: "badge-1",
    title: "First Offset",
    description: "Completed your first carbon offset",
    icon: "leaf",
    level: "bronze",
    earnedAt: "2023-02-15",
  },
  {
    id: "badge-2",
    title: "Offset Champion",
    description: "Retired over 10,000 carbon credits",
    icon: "trophy",
    level: "gold",
    earnedAt: "2023-05-22",
  },
  {
    id: "badge-3",
    title: "Rainforest Supporter",
    description: "Supported forest conservation projects",
    icon: "shield",
    level: "silver",
    earnedAt: "2023-03-10",
  },
];

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
        <div className="space-y-8">
          <RecentActivity />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {recentBadges.map((badge) => (
                  <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                ))}
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Achievements
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
