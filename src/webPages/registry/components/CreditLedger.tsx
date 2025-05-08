"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

export interface CreditEntry {
  id: string;
  creditId: string;
  projectId: string;
  projectName: string;
  quantity: number;
  vintage: string;
  status: "active" | "transferred" | "retired";
  owner: string;
  location: string;
  lastActionDate: string;
  activeAmount: number;
  retiredAmount: number;
  transferAmount: number;
}

export interface CreditLedgerProps {
  creditEntries: CreditEntry[];
}

const StatusBadge = ({
  activeAmount,
  retiredAmount,
  transferAmount,
}: {
  activeAmount: number;
  retiredAmount: number;
  transferAmount: number;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {activeAmount > 0 && (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          Active: {activeAmount.toLocaleString()}
        </Badge>
      )}
      {transferAmount > 0 && (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-200"
        >
          Transferred: {transferAmount.toLocaleString()}
        </Badge>
      )}
      {retiredAmount > 0 && (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-800 border-purple-200"
        >
          Retired: {retiredAmount.toLocaleString()}
        </Badge>
      )}
    </div>
  );
};

export const CreditLedger = ({ creditEntries }: CreditLedgerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-600" />
          Carbon Credit Ledger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Credit ID</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Vintage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.creditId}</TableCell>
                <TableCell>{entry.projectName}</TableCell>
                <TableCell>{entry.vintage}</TableCell>
                <TableCell>{entry.owner}</TableCell>
                <TableCell>{entry.quantity.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge
                    activeAmount={entry.activeAmount}
                    retiredAmount={entry.retiredAmount}
                    transferAmount={entry.transferAmount}
                  />
                </TableCell>
                <TableCell>{entry.lastActionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
