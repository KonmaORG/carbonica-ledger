import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Leaf, BadgeCheck, Clock } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { UserAchievements } from "@/components/badges/UserAchievements";

const ProfileOverview = ({ user, projects, transactions, badges }) => {
  const formatNumber = (num) => num.toLocaleString();

  const StatCard = ({ title, value, Icon, colorClass }) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Icon className={`h-4 w-4 mr-2 ${colorClass}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatNumber(value)}</p>
      </CardContent>
    </Card>
  );

  const TransactionRow = ({ transaction }) => (
    <div className="py-3 flex justify-between items-center">
      <div>
        <p className="font-medium">
          {transaction.type}: {formatNumber(transaction.amount)} credits
        </p>
        <p className="text-sm text-gray-600">{transaction.project}</p>
      </div>
      <div className="text-right">
        <Badge variant="outline" className="bg-green-100 text-green-800">
          {transaction.status}
        </Badge>
        <p className="text-sm text-gray-600 mt-1">{transaction.date}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Credits"
          value={user.totalCredits}
          Icon={Award}
          colorClass="text-carbonica-blue-medium"
        />
        <StatCard
          title="Active Credits"
          value={user.activeCredits}
          Icon={Leaf}
          colorClass="text-carbonica-green-medium"
        />
        <StatCard
          title="Retired Credits"
          value={user.retiredCredits}
          Icon={BadgeCheck}
          colorClass="text-carbonica-purple-medium"
        />
      </div>

      <h2 className="text-xl font-bold mt-8">Recent Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Credit Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {transactions.slice(0, 3).map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            <Clock className="h-4 w-4 mr-2" />
            View All Transactions
          </Button>
        </CardFooter>
      </Card>

      <UserAchievements
        badges={badges}
        userName={user.name}
        totalCreditsRetired={user.retiredCredits}
      />
    </div>
  );
};

export default ProfileOverview;
