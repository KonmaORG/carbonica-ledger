
import { User, CreditTransaction } from "@/types/user";
import { Project } from "@/types/project";
import { UserBadge } from "@/components/badges/BadgeDisplay";

// Sample user data
export const userData: User = {
  id: "user1",
  name: "Jane Smith",
  company: "EcoTech Solutions",
  email: "jane.smith@ecotech.com",
  role: "Project Developer",
  avatarUrl: "https://i.pravatar.cc/150?img=5",
  joinDate: "January 2023",
  totalCredits: 43000,
  activeCredits: 28000,
  retiredCredits: 15000,
  verifiedProjects: 4
};

// Sample projects
export const userProjects: Project[] = [
  {
    id: "1",
    title: "Amazon Rainforest Conservation",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified" as "verified" | "pending" | "rejected",
    credits: 25000,
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Serengeti Wildlife Corridor",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified" as "verified" | "pending" | "rejected",
    credits: 18000,
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Wind Power Expansion",
    type: "Renewable Energy",
    location: "United Kingdom",
    startDate: "Apr 2023",
    status: "pending" as "verified" | "pending" | "rejected",
    credits: 12000,
    thumbnailUrl: "/placeholder.svg",
  }
];

// Sample credit transactions
export const creditTransactions: CreditTransaction[] = [
  {
    id: "tx1",
    date: "May 15, 2023",
    type: "Issuance",
    project: "Amazon Rainforest Conservation",
    amount: 25000,
    status: "Completed"
  },
  {
    id: "tx2",
    date: "June 2, 2023",
    type: "Transfer",
    project: "Amazon Rainforest Conservation",
    amount: 5000,
    recipient: "TechGiant Co.",
    status: "Completed"
  },
  {
    id: "tx3",
    date: "July 10, 2023",
    type: "Retirement",
    project: "Amazon Rainforest Conservation",
    amount: 5000,
    status: "Completed"
  },
  {
    id: "tx4",
    date: "August 5, 2023",
    type: "Issuance",
    project: "Serengeti Wildlife Corridor",
    amount: 18000,
    status: "Completed"
  }
];

// Sample user badges
export const userBadges: UserBadge[] = [
  {
    id: "badge1",
    title: "Early Adopter",
    description: "One of the first to join our platform",
    icon: "star",
    level: "bronze",
    earnedAt: "2023-01-15"
  },
  {
    id: "badge2",
    title: "Carbon Neutralizer",
    description: "Retired 10,000+ carbon credits",
    icon: "leaf",
    level: "silver",
    earnedAt: "2023-05-20"
  },
  {
    id: "badge3",
    title: "Project Validator",
    description: "Successfully validated 5+ projects",
    icon: "shield",
    level: "gold",
    earnedAt: "2023-07-10"
  }
];
