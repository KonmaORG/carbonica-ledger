
import React from 'react';
import { CheckCircle, ChevronRight, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface ProjectRegistrationSuccessProps {
  projectData: any;
}

export function ProjectRegistrationSuccess({ projectData }: ProjectRegistrationSuccessProps) {
  return (
    <Card className="border-green-100">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Project Submitted Successfully!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your project "{projectData?.projectName}" has been submitted for validation. 
            Our validators will review your submission and contact you if additional information is needed.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-2">What happens next?</h3>
          <ol className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">1</div>
              <div>
                <p className="font-medium">Validation Review</p>
                <p>Our validators will review your project details and documentation.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">2</div>
              <div>
                <p className="font-medium">Verification Process</p>
                <p>If approved, your project will undergo verification to confirm emissions reduction claims.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">3</div>
              <div>
                <p className="font-medium">Credit Issuance</p>
                <p>Once verified, carbon credits will be issued based on your project's emissions reduction.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/verification">
              <span>Track Verification Status</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/projects">
              <span>View All Projects</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
