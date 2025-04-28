import React from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  UserCheck,
} from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  description?: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  date,
  description,
  isLast = false,
}) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="rounded-full p-1 bg-white border border-gray-200">
        {icon}
      </div>
      {!isLast && <div className="w-px h-full bg-gray-200 my-1" />}
    </div>
    <div className={`pb-${isLast ? "0" : "5"}`}>
      <p className="font-medium text-gray-900">{title}</p>
      <time className="text-xs text-gray-500">
        {new Date(date).toLocaleString()}
      </time>
      {description && (
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      )}
    </div>
  </div>
);

interface VerificationTimelineProps {
  request: VerificationRequest;
}

export const VerificationTimeline: React.FC<VerificationTimelineProps> = ({
  request,
}) => {
  if (
    !request.verification.timeline ||
    request.verification.timeline.length === 0
  ) {
    return (
      <div className="border border-gray-100 rounded-md p-4">
        <p className="text-center text-gray-500">
          No timeline events available
        </p>
      </div>
    );
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "submission":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "assignment":
        return <UserCheck className="h-4 w-4 text-purple-500" />;
      case "review":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejection":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Sort timeline events by timestamp (newest first)
  const sortedEvents = [...request.verification[0].timeline].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="border border-gray-100 rounded-md p-4 bg-gray-50">
      <h3 className="font-medium mb-4">Timeline</h3>
      <div className="space-y-2">
        {sortedEvents.map((event, index) => (
          <TimelineItem
            key={event.id}
            icon={getEventIcon(event.eventType)}
            title={event.message}
            date={event.timestamp}
            description={event.metadata?.description}
            isLast={index === sortedEvents.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
