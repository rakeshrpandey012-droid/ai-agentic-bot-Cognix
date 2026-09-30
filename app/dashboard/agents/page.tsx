'use client';
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAgent from "@/components/ui/custom/agents/CreateAgent";
import MyAgents from "@/components/ui/custom/agents/MyAgents";

const AgentsPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-6 pt-14 pb-16">
        <Tabs defaultValue="create-agent" className="w-full">
          <TabsList>
            <TabsTrigger value="create-agent">Create Agent</TabsTrigger>
            <TabsTrigger value="my-agents">My Agents</TabsTrigger>
          </TabsList>
          <TabsContent value="create-agent">
            <CreateAgent />
          </TabsContent>
          <TabsContent value="my-agents">
            <MyAgents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsPage;
