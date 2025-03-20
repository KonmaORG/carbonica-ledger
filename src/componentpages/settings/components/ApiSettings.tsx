"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";

export const ApiSettings = () => {
  const handleSave = () => {
    toast("Settings saved", {
      description: "Your API settings have been updated successfully.",
    });
  };

  return (
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
              <Input
                defaultValue="sk_test_12345678901234567890123456789012"
                type="password"
                className="font-mono"
              />
              <Button variant="outline" className="ml-2">
                Show
              </Button>
              <Button variant="outline" className="ml-2">
                Copy
              </Button>
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
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/webhook"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Test Mode</p>
              <Switch />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save API Settings
        </Button>
      </CardContent>
    </Card>
  );
};
