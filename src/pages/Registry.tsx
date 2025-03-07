
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, ExternalLink, Filter, Leaf, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreditEntry {
  id: string;
  creditId: string;
  projectId: string;
  projectName: string;
  projectType: string;
  location: string;
  quantity: number;
  vintage: string;
  status: 'active' | 'transferred' | 'retired';
  issuanceDate: string;
  lastActionDate: string;
  owner: string;
}

const MOCK_CREDIT_ENTRIES: CreditEntry[] = [
  {
    id: "c1",
    creditId: "CRD-001-2023-A",
    projectId: "1",
    projectName: "Amazon Rainforest Conservation",
    projectType: "Forest Conservation",
    location: "Brazil",
    quantity: 25000,
    vintage: "2023",
    status: 'active',
    issuanceDate: "Jan 15, 2023",
    lastActionDate: "Jan 15, 2023",
    owner: "EcoFund Inc."
  },
  {
    id: "c2",
    creditId: "CRD-002-2023-A",
    projectId: "2",
    projectName: "Serengeti Wildlife Corridor",
    projectType: "Biodiversity Conservation",
    location: "Tanzania",
    quantity: 18000,
    vintage: "2023",
    status: 'transferred',
    issuanceDate: "Mar 10, 2023",
    lastActionDate: "Apr 5, 2023",
    owner: "GreenCorp"
  },
  {
    id: "c3",
    creditId: "CRD-001-2023-B",
    projectId: "1",
    projectName: "Amazon Rainforest Conservation",
    projectType: "Forest Conservation",
    location: "Brazil",
    quantity: 5000,
    vintage: "2023",
    status: 'retired',
    issuanceDate: "Jan 15, 2023",
    lastActionDate: "May 20, 2023",
    owner: "TechGiant Co."
  },
  {
    id: "c4",
    creditId: "CRD-003-2023-A",
    projectId: "4",
    projectName: "Wind Power Expansion",
    projectType: "Renewable Energy",
    location: "United Kingdom",
    quantity: 12000,
    vintage: "2023",
    status: 'active',
    issuanceDate: "Apr 22, 2023",
    lastActionDate: "Apr 22, 2023",
    owner: "CleanEnergy Ltd."
  },
  {
    id: "c5",
    creditId: "CRD-004-2023-A",
    projectId: "5",
    projectName: "Mangrove Restoration",
    projectType: "Wetland Restoration",
    location: "Bangladesh",
    quantity: 30000,
    vintage: "2023",
    status: 'active',
    issuanceDate: "Feb 8, 2023",
    lastActionDate: "Feb 8, 2023",
    owner: "EcoRestoration Partners"
  }
];

const StatusBadge = ({ status }: { status: CreditEntry['status'] }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Active
        </Badge>
      );
    case 'transferred':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          Transferred
        </Badge>
      );
    case 'retired':
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
          Retired
        </Badge>
      );
    default:
      return null;
  }
};

const Registry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<CreditEntry[]>(MOCK_CREDIT_ENTRIES);

  const handleSearch = () => {
    const filtered = MOCK_CREDIT_ENTRIES.filter(entry => 
      entry.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.creditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilteredEntries(MOCK_CREDIT_ENTRIES);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Public Carbon Credit Registry</h1>
          <p className="text-gray-600">Explore and verify all carbon credits in the Carbonica registry</p>
        </div>

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
                      <TableCell className="font-medium">{entry.creditId}</TableCell>
                      <TableCell>
                        <Link to={`/projects/${entry.projectId}`} className="text-carbonica-blue-dark hover:underline flex items-center">
                          {entry.projectName}
                          <BadgeCheck className="h-4 w-4 ml-1 text-carbonica-green-dark" />
                        </Link>
                        <div className="text-xs text-gray-500">{entry.location}</div>
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
              <p>Showing {filteredEntries.length} of {MOCK_CREDIT_ENTRIES.length} entries</p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Blockchain Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              All carbon credit transactions are recorded on the Cardano blockchain for maximum transparency and security.
              You can verify any credit by entering its ID in the Cardano blockchain explorer.
            </p>
            <Button variant="outline" className="text-carbonica-blue-dark border-carbonica-blue-dark hover:bg-carbonica-blue-light/10">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Blockchain Explorer
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Registry;
