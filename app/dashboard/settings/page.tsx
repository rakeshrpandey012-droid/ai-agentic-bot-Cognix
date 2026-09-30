"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Key } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account preferences and API keys.</p>
        </div>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Bring your own LLM keys to bypass standard usage limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="sk-..." 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                />
                <Button variant="outline" className="shrink-0 gap-2"><Key className="h-4 w-4" /> Save</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Google Gemini API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="AIzaSy..." 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                />
                <Button variant="outline" className="shrink-0 gap-2"><Key className="h-4 w-4" /> Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              General platform settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <p className="text-xs text-muted-foreground">Receive emails when agents complete a scheduled task.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-medium">Dark Mode</h4>
                <p className="text-xs text-muted-foreground">Toggle the visual theme.</p>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
