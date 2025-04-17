
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Download, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BillingSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your billing information has been updated successfully.",
    });
  };

  return (
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
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Billing Information
        </Button>
      </CardContent>
    </Card>
  );
};
