"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ExternalLink, Leaf, BadgeCheck } from "lucide-react";
import { CreditEntry } from "../types/registryTypes";
import Link from "next/link";

interface CreditLedgerProps {
  creditEntries: CreditEntry[];
}

const StatusBadge = ({ status }: { status: CreditEntry["status"] }) => {
  switch (status) {
    case "active":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          Active
        </Badge>
      );
    case "transferred":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-200"
        >
          Transferred
        </Badge>
      );
    case "retired":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-800 border-purple-200"
        >
          Retired
        </Badge>
      );
    default:
      return null;
  }
};

export const CreditLedger = ({ creditEntries }: CreditLedgerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] =
    useState<CreditEntry[]>(creditEntries);

  const handleSearch = () => {
    const filtered = creditEntries.filter(
      (entry) =>
        entry.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.creditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilteredEntries(creditEntries);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-carbonica-green-dark" />
          Carbon Credit Ledger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by credit ID, project, owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
            {searchTerm && (
              <Button variant="outline" onClick={resetFilters}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
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
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {entry.creditId}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/projects/${entry.projectId}`}
                      className="text-carbonica-blue-dark hover:underline flex items-center"
                    >
                      {entry.projectName}
                      <BadgeCheck className="h-4 w-4 ml-1 text-carbonica-green-dark" />
                    </Link>
                    <div className="text-xs text-gray-500">
                      {entry.location}
                    </div>
                  </TableCell>
                  <TableCell>{entry.quantity.toLocaleString()}</TableCell>
                  <TableCell>{entry.vintage}</TableCell>
                  <TableCell>
                    <StatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell>{entry.owner}</TableCell>
                  <TableCell>{entry.lastActionDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <p>
            Showing {filteredEntries.length} of {creditEntries.length} entries
          </p>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
