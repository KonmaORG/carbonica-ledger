import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Terminal, Globe, Bell, Key, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ApiDocumentation = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [id]: true });
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });

    setTimeout(() => {
      setCopied({ ...copied, [id]: false });
    }, 2000);
  };

  const apiEndpoints = [
    {
      id: "credits",
      name: "Carbon Credits API",
      path: "/api/v1/credits",
      description:
        "Retrieve carbon credit data including status, ownership, and history",
      method: "GET",
      parameters: [
        {
          name: "status",
          type: "string",
          description: "Filter by credit status (active, transferred, retired)",
          required: false,
        },
        {
          name: "project_id",
          type: "string",
          description: "Filter by associated project",
          required: false,
        },
        {
          name: "owner",
          type: "string",
          description: "Filter by current owner",
          required: false,
        },
        {
          name: "vintage",
          type: "string",
          description: "Filter by credit vintage year",
          required: false,
        },
      ],
      responseExample: `{
  "data": [
    {
      "id": "CRD-001-2023-A",
      "projectId": "1",
      "projectName": "Amazon Rainforest Conservation",
      "quantity": 25000,
      "vintage": "2023",
      "status": "active",
      "issuanceDate": "2023-01-15T00:00:00Z",
      "lastActionDate": "2023-01-15T00:00:00Z",
      "owner": "EcoFund Inc.",
      "blockchainTx": "tx_abc123def456"
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 10
  }
}`,
    },
    {
      id: "projects",
      name: "Projects API",
      path: "/api/v1/projects",
      description:
        "Access detailed information about registered carbon offset projects",
      method: "GET",
      parameters: [
        {
          name: "status",
          type: "string",
          description: "Filter by project status (pending, verified, rejected)",
          required: false,
        },
        {
          name: "type",
          type: "string",
          description: "Filter by project type",
          required: false,
        },
        {
          name: "location",
          type: "string",
          description: "Filter by project location",
          required: false,
        },
      ],
      responseExample: `{
  "data": [
    {
      "id": "1",
      "name": "Amazon Rainforest Conservation",
      "type": "Forest Conservation",
      "location": "Brazil",
      "startDate": "2023-01-01T00:00:00Z",
      "status": "verified",
      "creditsIssued": 25000,
      "creditsAvailable": 20000,
      "creditsRetired": 5000,
      "developer": "EcoFund Inc.",
      "validationDate": "2023-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10
  }
}`,
    },
    {
      id: "webhooks",
      name: "Webhooks API",
      path: "/api/v1/webhooks",
      description:
        "Subscribe to real-time events like credit issuance, transfers, and retirements",
      method: "POST",
      parameters: [
        {
          name: "callbackUrl",
          type: "string",
          description: "URL to receive webhook notifications",
          required: true,
        },
        {
          name: "events",
          type: "array",
          description:
            "Event types to subscribe to (issuance, transfer, retirement)",
          required: true,
        },
        {
          name: "filters",
          type: "object",
          description:
            "Optional filters for events (projectId, creditId, etc.)",
        },
      ],
      requestExample: `{
  "callbackUrl": "https://your-service.com/webhooks/carbon",
  "events": ["issuance", "retirement"],
  "filters": {
    "projectType": "Forest Conservation"
  },
  "secret": "your_webhook_secret"
}`,
      responseExample: `{
  "id": "whk_123abc456def",
  "callbackUrl": "https://your-service.com/webhooks/carbon",
  "events": ["issuance", "retirement"],
  "status": "active",
  "createdAt": "2023-08-15T14:22:31Z"
}`,
    },
  ];

  const webhookExample = `// Express.js webhook receiver example
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhooks/carbon', (req, res) => {
  const signature = req.headers['x-carbonica-signature'];
  const event = req.body;
  
  // Verify webhook signature using your secret
  if (verifySignature(event, signature, process.env.WEBHOOK_SECRET)) {
    console.log('Received valid webhook:', event.type);
    
    // Handle different event types
    switch(event.type) {
      case 'credit.issuance':
        // Handle credit issuance
        break;
      case 'credit.transfer':
        // Handle credit transfer
        break;
      case 'credit.retirement':
        // Handle credit retirement
        break;
    }
    
    res.status(200).send('Webhook received');
  } else {
    console.error('Invalid webhook signature');
    res.status(401).send('Invalid signature');
  }
});

app.listen(3000, () => console.log('Webhook receiver running on port 3000'));`;

  const apiExample = `// JavaScript fetch example
const fetchCredits = async () => {
  try {
    const response = await fetch('https://api.carbonica.org/v1/credits?status=active', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    console.log('Carbon credits:', data);
    return data;
  } catch (error) {
    console.error('Error fetching carbon credits:', error);
  }
};

fetchCredits();`;

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="text-xl">Carbonica API & Webhooks</CardTitle>
        <CardDescription>
          Integrate with the Carbonica Registry through our RESTful APIs and
          real-time webhooks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="endpoints">
          <TabsList className="mb-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertTitle>Base URL</AlertTitle>
              <AlertDescription>
                <code className="bg-muted px-1 py-0.5 rounded">
                  https://api.carbonica.org/v1
                </code>
              </AlertDescription>
            </Alert>

            {apiEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 border-blue-200"
                      >
                        {endpoint.method}
                      </Badge>
                      <CardTitle className="text-base">
                        {endpoint.name}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(endpoint.path, `path-${endpoint.id}`)
                      }
                      className="h-7 px-2"
                    >
                      {copied[`path-${endpoint.id}`] ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  <CardDescription className="flex items-center">
                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                      {endpoint.path}
                    </code>
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <p className="text-sm mb-4">{endpoint.description}</p>

                  {endpoint.parameters && endpoint.parameters.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium mb-2">Parameters</h4>
                      <div className="bg-muted rounded-md p-2 mb-4">
                        <table className="text-xs w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-1 px-2">Name</th>
                              <th className="text-left py-1 px-2">Type</th>
                              <th className="text-left py-1 px-2">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((param, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-muted-foreground/10 last:border-0"
                              >
                                <td className="py-1 px-2 font-medium">
                                  {param.name}
                                  {param.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                  )}
                                </td>
                                <td className="py-1 px-2 font-mono">
                                  {param.type}
                                </td>
                                <td className="py-1 px-2">
                                  {param.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {endpoint.requestExample && (
                    <>
                      <h4 className="text-sm font-medium mb-2">
                        Request Example
                      </h4>
                      <div className="relative bg-gray-900 rounded-md p-3 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                          onClick={() =>
                            handleCopy(
                              endpoint.requestExample!,
                              `req-${endpoint.id}`
                            )
                          }
                        >
                          {copied[`req-${endpoint.id}`] ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <pre className="text-xs text-white overflow-x-auto whitespace-pre-wrap">
                          {endpoint.requestExample}
                        </pre>
                      </div>
                    </>
                  )}

                  <h4 className="text-sm font-medium mb-2">Response Example</h4>
                  <div className="relative bg-gray-900 rounded-md p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() =>
                        handleCopy(
                          endpoint.responseExample,
                          `resp-${endpoint.id}`
                        )
                      }
                    >
                      {copied[`resp-${endpoint.id}`] ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <pre className="text-xs text-white overflow-x-auto whitespace-pre-wrap">
                      {endpoint.responseExample}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertTitle>Real-time Updates</AlertTitle>
              <AlertDescription>
                Subscribe to webhooks to receive real-time notifications when
                carbon credit events occur
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Credit Issuance</CardTitle>
                    <CardDescription>
                      Triggered when new credits are issued
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p className="text-sm">
                      Event type:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        credit.issuance
                      </code>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Credit Transfer</CardTitle>
                    <CardDescription>
                      Triggered when credits are transferred between owners
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p className="text-sm">
                      Event type:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        credit.transfer
                      </code>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">
                      Credit Retirement
                    </CardTitle>
                    <CardDescription>
                      Triggered when credits are permanently retired
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p className="text-sm">
                      Event type:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        credit.retirement
                      </code>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">
                      Project Validation
                    </CardTitle>
                    <CardDescription>
                      Triggered when a project is validated or rejected
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p className="text-sm">
                      Event type:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        project.validation
                      </code>
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-medium mt-6">
                Webhook Implementation
              </h3>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">
                    Building a Webhook Receiver
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    When an event occurs, we'll send a POST request to your
                    webhook URL with an event payload and a signature header for
                    verification.
                  </p>

                  <div className="relative bg-gray-900 rounded-md p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() =>
                        handleCopy(webhookExample, "webhook-example")
                      }
                    >
                      {copied["webhook-example"] ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <pre className="text-xs text-white overflow-x-auto whitespace-pre-wrap">
                      {webhookExample}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertTitle>API Keys Required</AlertTitle>
              <AlertDescription>
                All API requests require authentication using an API key
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Authentication Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      Bearer Token (Recommended)
                    </h4>
                    <p className="text-sm">
                      Include your API key in the Authorization header:
                    </p>
                    <pre className="bg-muted p-2 rounded text-xs mt-2">
                      Authorization: Bearer YOUR_API_KEY
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      Query Parameter
                    </h4>
                    <p className="text-sm">
                      Alternatively, you can pass your API key as a query
                      parameter:
                    </p>
                    <pre className="bg-muted p-2 rounded text-xs mt-2">
                      https://api.carbonica.org/v1/credits?api_key=YOUR_API_KEY
                    </pre>
                  </div>

                  <div className="pt-2">
                    <Alert variant="destructive" className="bg-red-50">
                      <Lock className="h-4 w-4" />
                      <AlertTitle>API Key Security</AlertTitle>
                      <AlertDescription>
                        Keep your API keys secure. Do not expose them in
                        client-side code or public repositories.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Request API Access
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <h3 className="text-lg font-medium">Code Examples</h3>

            <Card>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    JavaScript / Node.js
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(apiExample, "api-example")}
                    className="h-7 px-2"
                  >
                    {copied["api-example"] ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-900 rounded-md p-3">
                  <pre className="text-xs text-white overflow-x-auto whitespace-pre-wrap">
                    {apiExample}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Need help with integration?
              </p>
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm">
                  <Terminal className="h-4 w-4 mr-2" />
                  View Full Documentation
                </Button>
                <Button size="sm">Contact Developer Support</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
