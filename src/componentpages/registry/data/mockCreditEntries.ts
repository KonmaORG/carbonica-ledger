
import { CreditEntry } from '../types/registryTypes';

export const MOCK_CREDIT_ENTRIES: CreditEntry[] = [
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
