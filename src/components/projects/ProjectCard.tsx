import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  MapPin,
  Calendar,
  BadgeCheck,
  ExternalLink,
  Info,
} from "lucide-react";
import { SocialShareButton } from "../social/SocialShareButton";
import Link from "next/link";

export interface ProjectCardProps {
  id: string;
  title: string;
  type: string;
  location: string;
  startDate: string;
  status: "pending" | "verified" | "rejected";
  credits: number;
  thumbnailUrl?: string;
  description?: string;
}

export const ProjectCard = ({
  id,
  title,
  type,
  location,
  startDate,
  status,
  credits,
  thumbnailUrl,
  description,
}: ProjectCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "verified":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-verified"
          >
            <BadgeCheck className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-pending"
          >
            Pending Verification
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-rejected"
          >
            Verification Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const shareContent = {
    title: `Carbon Offset Project: ${title}`,
    description: `Check out this ${type} carbon offset project in ${location} with ${credits.toLocaleString()} verified carbon credits!`,
    url: `${window.location.origin}/projects/${id}`,
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            thumbnailUrl ||
            "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">{getStatusBadge()}</div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Leaf className="h-4 w-4 mr-2 text-carbonica-green-dark" />
            <span>{type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-carbonica-green-dark" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-carbonica-green-dark" />
            <span>Started: {startDate}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="bg-carbonica-green-light/20 px-3 py-1 rounded-full">
            <span className="text-carbonica-green-dark font-medium">
              {credits.toLocaleString()} Credits
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/projects/${id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full group hover:bg-carbonica-green-dark hover:text-white transition-colors"
          >
            <Info className="h-4 w-4 mr-2 group-hover:text-white" />
            View Details
          </Button>
        </Link>
        <SocialShareButton content={shareContent} className="w-auto" />
      </CardFooter>
    </Card>
  );
};
