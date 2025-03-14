import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { KarbonDatum } from "@/types/datum";
import { Data, toText, UTxO } from "@lucid-evolution/lucid";
import { useWallet } from "@/context/walletContext";

interface VerificationRequestCardProps {
  request: { data: VerificationRequest; project: UTxO };
}
// export const VerificationRequestCard = (request: UTxO) => {
export const VerificationRequestCard: React.FC<
  VerificationRequestCardProps
> = ({ request: { data, project } }) => {
  const [walletConnection] = useWallet();
  const { lucid } = walletConnection;

  const [datum, setDatum] = useState<KarbonDatum | undefined>(undefined);

  useEffect(() => {
    async function fetchDatum() {
      if (!lucid) return;
      const data = await lucid.datumOf(project);
      const datum = Data.castFrom(data, KarbonDatum);
      console.log(datum);
      setDatum(datum);
    }
    fetchDatum();
  }, [lucid]);

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        {datum ? (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {toText(datum.asset_name)}
                </h3>
                <p className="text-sm text-gray-500">
                  Submitted: {data.submittedDate}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <VerificationStatusBadge status={data.status} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verification Progress</span>
                <span className="font-medium">{data.progress}%</span>
              </div>
              <Progress value={data.progress} className="h-2" />
            </div>

            {data.verifier && (
              <div className="mt-4 text-sm">
                <span className="text-gray-600">Verifier: </span>
                <span className="font-medium">{data.verifier}</span>
              </div>
            )}

            {data.expectedCompletion && (
              <div className="mt-1 text-sm">
                <span className="text-gray-600">Expected Completion: </span>
                <span className="font-medium">{data.expectedCompletion}</span>
              </div>
            )}

            {data.rejectionReason && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-800">
                <p className="font-medium mb-1">Rejection Reason:</p>
                <p>{data.rejectionReason}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          "loading..."
        )}
      </CardContent>
    </Card>
  );
};
