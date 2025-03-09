
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  CreditCard, 
  Save,
  FileText,
  Wallet
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden md:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden md:inline">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization</Label>
                    <Input id="company" defaultValue="Carbonica Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role / Position</Label>
                    <Input id="role" defaultValue="Project Manager" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself or your organization..." 
                    defaultValue="Climate advocate with 10+ years of experience in carbon offset project management."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button 
                  onClick={() => handleSave('profile')}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Project Updates</p>
                      <p className="text-sm text-muted-foreground">Receive notifications about your project status changes.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Verification Alerts</p>
                      <p className="text-sm text-muted-foreground">Be notified when your projects need verification actions.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Credit Transactions</p>
                      <p className="text-sm text-muted-foreground">Get updates about carbon credit purchases or retirements.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-muted-foreground">Receive monthly updates about carbon market trends.</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive promotional content and offers.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('notification')}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and access preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">
                        <Button variant="link" className="h-auto p-0 text-sm">Manage active sessions</Button>
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('security')}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage your API keys and access to the Carbonica platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Your API Key</p>
                    <div className="flex mt-2">
                      <Input defaultValue="sk_test_12345678901234567890123456789012" type="password" className="font-mono" />
                      <Button variant="outline" className="ml-2">Show</Button>
                      <Button variant="outline" className="ml-2">Copy</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This key provides full access to your account. Keep it secure.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium">API Documentation</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Learn how to integrate with our API and access carbon credit data.
                    </p>
                    <Button variant="outline" className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Documentation
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium">Webhook Configuration</p>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-medium">Test Mode</p>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('API')}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save API Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Management</CardTitle>
                <CardDescription>
                  Connect and manage your blockchain wallets for carbon credit transactions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Ethereum Wallet</p>
                        <p className="text-sm font-mono">0x7F5E...8A4D</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Disconnect</Button>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-secondary/20">
                    <p className="font-medium">Connect Additional Wallets</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      <Button variant="outline" className="justify-start">
                        <img src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=024" className="h-5 w-5 mr-2" alt="Polygon" />
                        Connect Polygon
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=024" className="h-5 w-5 mr-2" alt="Solana" />
                        Connect Solana
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <img src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=024" className="h-5 w-5 mr-2" alt="Avalanche" />
                        Connect Avalanche
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <img src="https://cryptologos.cc/logos/near-protocol-near-logo.png?v=024" className="h-5 w-5 mr-2" alt="NEAR" />
                        Connect NEAR
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium">Transaction History</p>
                    <p className="text-sm text-muted-foreground mt-1">View all your wallet transactions and carbon credit transfers.</p>
                    <Button variant="outline" className="mt-2">View Transaction History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Payment Methods</p>
                    <div className="mt-3 p-3 border rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p>•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                    <Button variant="outline" className="mt-3">Add Payment Method</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium">Billing Address</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="space-y-2">
                        <Label htmlFor="address-line1">Address Line 1</Label>
                        <Input id="address-line1" defaultValue="123 Main St" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-line2">Address Line 2</Label>
                        <Input id="address-line2" defaultValue="Suite 101" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" defaultValue="94103" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="United States" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium">Billing History</p>
                    <p className="text-sm text-muted-foreground mt-1">View and download your previous invoices.</p>
                    <Button variant="outline" className="mt-2">View Billing History</Button>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('billing')}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Billing Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
