"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Bot, Loader2, Play, Settings } from "lucide-react";
import { Button } from "../../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { AgentChatDrawer } from "./AgentChatDrawer";

type Agent = {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};

const MyAgents = () => {
  const { userDetail } = useContext(UserDetailContext) as any;
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (userDetail?.id) {
      fetchAgents();
    } else {
      setLoading(false);
    }
  }, [userDetail]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/agent/list?userId=${userDetail.id}`);
      setAgents(res.data.agents || []);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className="text-center py-20 border rounded-xl bg-card">
        <h3 className="text-lg font-semibold">Please log in</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You need to be logged in to view your agents.
        </p>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-20 border rounded-xl bg-card">
        <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold">No agents found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Head over to the Create Agent tab to build your first AI assistant.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="p-5 border rounded-xl bg-card shadow-sm hover:shadow transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{agent.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium capitalize">
                      {agent.status}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {agent.description || "No description provided."}
            </p>
            
            <div className="mt-4 pt-4 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-8 text-sm px-3">
                View Runs
              </Button>
              <Button 
                size="sm" 
                className="h-8 text-sm px-3 gap-1"
                onClick={() => {
                  setSelectedAgentId(agent.id);
                  setIsDrawerOpen(true);
                }}
              >
                <Play className="h-3 w-3" /> Execute
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedAgentId && (
        <AgentChatDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          agentId={selectedAgentId}
        />
      )}
    </>
  );
};

export default MyAgents;
