"use client";

import React, { useEffect, useState } from "react";
import { Plug2, Mail, Calendar, Database, Search, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const availableIntegrations = [
  { name: "Gmail", id: "gmail", icon: Mail, desc: "Read and write emails directly from your inbox." },
  { name: "Google Calendar", id: "googlecalendar", icon: Calendar, desc: "Schedule meetings and check your availability." },
  { name: "Notion", id: "notion", icon: Database, desc: "Sync notes and organize your workspace." },
  { name: "Slack", id: "slack", icon: MessageSquare, desc: "Send messages and alert your team." },
  { name: "Google Search", id: "googlesearch", icon: Search, desc: "Allow agents to browse the live internet." },
  { name: "CRM Tool", id: "crm", icon: Briefcase, desc: "Manage your leads and customer data." },
];

export default function IntegrationsPage() {
  const { userId } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchConnections();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/integrations/composio/list?userId=${userId}`);
      const data = await res.json();
      if (data.connections) {
        setConnections(data.connections);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (appName: string) => {
    try {
      const res = await fetch("/api/integrations/composio/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, appName })
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      await fetch("/api/integrations/composio/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, connectionId })
      });
      fetchConnections();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground mt-1 text-sm">Connect your favorite tools to give your AI agents new abilities.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableIntegrations.map((integration) => {
          const Icon = integration.icon;
          const connection = connections.find(c => c.appName?.toLowerCase() === integration.id.toLowerCase());
          const isConnected = !!connection;

          return (
            <div key={integration.name} className="flex flex-col border rounded-xl p-5 bg-card shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${isConnected ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-secondary text-secondary-foreground'}`}>
                  {isConnected ? "Connected" : "Connect"}
                </span>
              </div>
              <h3 className="text-base font-semibold">{integration.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                {integration.desc}
              </p>
              <Button 
                variant={isConnected ? "outline" : "default"} 
                className="w-full mt-6"
                onClick={() => {
                  if (isConnected && connection) {
                    handleDisconnect(connection.id);
                  } else {
                    handleConnect(integration.id);
                  }
                }}
                disabled={loading}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
