"use client";
import React, { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Webhook, Leaf } from "lucide-react";
import { BlockchainVerification } from "./components/BlockchainVerification";
import { ApiDocumentation } from "@/components/api/ApiDocumentation";
import { createClient } from "@supabase/supabase-js";
import { SUPABASEURL, SUPABASEANONKEY } from "@/config";

if (!SUPABASEURL || !SUPABASEANONKEY) {
  throw new Error("Supabase Key Error");
}
const supabaseServer = createClient(SUPABASEURL, SUPABASEANONKEY);

interface CreditEntry {
  id: string;
  credit_id: string;
  project_id: string;
  project_name: string | null;
  vintage: string;
  status: "active" | "transferred" | "retired";
  owner: string;
  location: string | null;
  last_action_date: string;
  quantity: number;
}

interface CreditLedgerProps {
  creditEntries: CreditEntry[];
}

// Format timestamp to year (e.g., "2025")
const formatVintage = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.getFullYear().toString();
  } catch {
    return timestamp;
  }
};

// Format timestamp to readable date (e.g., "May 7, 2025")
const formatDate = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return timestamp;
  }
};

const shortenId = (id: string): string => {
  if (id.length <= 16) return id;
  return `${id.slice(0, 8)}...${id.slice(-8)}`;
};

// Transform data to create separate rows for each non-zero status
const transformEntries = (data: any[]): CreditEntry[] => {
  const entries: CreditEntry[] = [];
  data.forEach((item) => {
    // Deduplicate by credit_id, keeping latest last_action_date
    const existing = entries.find(
      (e) =>
        e.credit_id === item.credit_id &&
        new Date(e.last_action_date) > new Date(item.last_action_date)
    );
    if (existing) return;

    const baseEntry = {
      id: item.id,
      credit_id: item.credit_id,
      project_id: item.project_id,
      project_name: item.project_name,
      vintage: item.vintage,
      owner: item.owner,
      location: item.location,
      last_action_date: item.last_action_date,
    };

    // Create a row for each non-zero status
    if (item.active_amount > 0) {
      entries.push({
        ...baseEntry,
        status: "active",
        quantity: item.active_amount,
      });
    }
    if (item.transfer_amount > 0) {
      entries.push({
        ...baseEntry,
        status: "transferred",
        quantity: item.transfer_amount,
      });
    }
    if (item.retired_amount > 0) {
      entries.push({
        ...baseEntry,
        status: "retired",
        quantity: item.retired_amount,
      });
    }
  });
  return entries;
};

const CreditLedger = ({ creditEntries }: CreditLedgerProps) => {
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
              <TableHead>Vintage</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Last Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditEntries.map((entry, index) => (
              <TableRow key={`${entry.credit_id}-${entry.status}-${index}`}>
                <TableCell>{shortenId(entry.credit_id)}</TableCell>
                <TableCell>{entry.project_name || "Unknown"}</TableCell>
                <TableCell>{formatVintage(entry.vintage)}</TableCell>
                <TableCell>{shortenId(entry.owner)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      entry.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : entry.status === "transferred"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-purple-100 text-purple-800 border-purple-200"
                    }
                  >
                    {entry.status.charAt(0).toUpperCase() +
                      entry.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{entry.quantity.toLocaleString()}</TableCell>
                <TableCell>{formatDate(entry.last_action_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const RegistryTabs = () => {
  const [activeTab, setActiveTab] = useState("registry");
  const [creditEntries, setCreditEntries] = useState<CreditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const { data, error } = await supabaseServer.rpc("get_carbon_credits");
        if (error) {
          throw new Error(error.message);
        }

        const transformedData = transformEntries(data);
        setCreditEntries(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Supabase error:", err);
        setError((err as Error).message);
        setLoading(false);
      }
    }
    fetchCredits();
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="registry" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          Public Registry
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-1">
          <Code className="h-4 w-4" />
          API Access
        </TabsTrigger>
        <TabsTrigger value="webhooks" className="flex items-center gap-1">
          <Webhook className="h-4 w-4" />
          Webhooks
        </TabsTrigger>
      </TabsList>

      <TabsContent value="registry">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <CreditLedger creditEntries={creditEntries} />
            <BlockchainVerification />
          </>
        )}
      </TabsContent>

      <TabsContent value="api">
        <ApiDocumentation />
      </TabsContent>

      <TabsContent value="webhooks">
        <ApiDocumentation />
      </TabsContent>
    </Tabs>
  );
};
