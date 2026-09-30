"use client";

import {
  ArrowUp,
  Plus,
  Search,
  GraduationCap,
  Wrench,
  Mail,
  BookOpen,
  Calendar,
  Loader2,
} from "lucide-react";
import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const quickSuggestions = [
  {
    label: "Find AI jobs",
    prompt: "I want to find AI jobs in the US. Can you help me with that?",
  },
  {
    label: "Find AI courses",
    prompt: "I want to find AI courses online. Can you help me with that?",
  },
  {
    label: "Find AI tools",
    prompt: "I want to find AI tools for my business. Can you help me with that?",
  },
  {
    label: "Inbox Summary",
    prompt: "I want to get a summary of my inbox. Can you help me with that?",
  },
  {
    label: "Research AI topics",
    prompt: "I want to research AI topics. Can you help me with that?",
  },
  {
    label: "Plan My day",
    prompt: "I want to plan my day. Can you help me with that?",
  },
];

const templates = [
  {
    title: "Find AI jobs",
    description: "I want to find AI jobs in the US. Can you help me with that?",
    icon: Search,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-900 dark:text-blue-200",
    border: "hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700",
    glow: "hover:shadow-blue-200 dark:hover:shadow-none",
  },
  {
    title: "Find AI courses",
    description: "I want to find AI courses online. Can you help me with that?",
    icon: GraduationCap,
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-900 dark:text-green-200",
    border: "hover:bg-green-50/50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700",
    glow: "hover:shadow-green-200 dark:hover:shadow-none",
  },
  {
    title: "Find AI tools",
    description: "I want to find AI tools for my business. Can you help me with that?",
    icon: Wrench,
    iconBg: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-900 dark:text-red-200",
    border: "hover:bg-red-50/50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700",
    glow: "hover:shadow-red-200 dark:hover:shadow-none",
  },
  {
    title: "Inbox Summary",
    description: "I want to get a summary of my inbox. Can you help me with that?",
    icon: Mail,
    iconBg: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-900 dark:text-purple-200",
    border: "hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700",
    glow: "hover:shadow-purple-200 dark:hover:shadow-none",
  },
  {
    title: "Research AI topics",
    description: "I want to research AI topics. Can you help me with that?",
    icon: BookOpen,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-900 dark:text-yellow-200",
    border: "hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-700",
    glow: "hover:shadow-yellow-200 dark:hover:shadow-none",
  },
  {
    title: "Plan My day",
    description: "I want to plan my day. Can you help me with that?",
    icon: Calendar,
    iconBg: "bg-pink-100 dark:bg-pink-950",
    iconColor: "text-pink-900 dark:text-pink-200",
    border: "hover:bg-pink-50/50 dark:hover:bg-pink-900/20 hover:border-pink-300 dark:hover:border-pink-700",
    glow: "hover:shadow-pink-200 dark:hover:shadow-none",
  },
];

type AgentConfigResp = {
  status: "needs_clarification" | "ready";
  clarificationQuestions?: unknown;
  config?: {
    name?: string;
    description?: string;
    [key: string]: unknown;
  };
};

function CreateAgent() {
  const { userDetail } = useContext(UserDetailContext) as {
    userDetail?: { id: string; name?: string; email?: string };
  };
  const [prompt, setPrompt] = useState("");
  const [configResult, setConfigResult] = useState<AgentConfigResp | null>(null);
  const [loading, setLoading] = useState(false);

  const OnSubmit = async () => {
    if (!prompt.trim() || loading) return;
    try {
      setLoading(true);
      setConfigResult(null);
      const result = await axios.post("/api/agent/configure", {
        prompt: prompt,
      });

      console.log("Agent Config:", result.data);
      setConfigResult(result.data);
    } catch (error) {
      console.error("Failed to generate agent config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setConfigResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      OnSubmit();
    }
  };

  const handleSaveAgent = async () => {
    if (!userDetail) {
      alert("Please log in to save agents.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        name: configResult?.config?.name || "New Agent",
        description: configResult?.config?.description || "",
        prompt: prompt,
        userId: userDetail.id,
      };
      await axios.post("/api/agent/create", payload);
      alert("Agent created successfully!");
      setConfigResult(null);
      setPrompt("");
    } catch (e) {
      console.error("Failed to save agent:", e);
      alert("Failed to save agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Create New Agent
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Ask what type of agent you want to create. Type your goal, task, or
          workflow.
        </p>
      </div>

      {/* Prompt Input Box */}
      <div className="w-full border rounded-xl bg-background p-2.5 mt-3 shadow-md shadow-blue-100 dark:shadow-none hover:shadow-blue-200 transition-all">
        <textarea
          placeholder="Describe the agent you want to create..."
          className="min-h-[3.5rem] w-full resize-none bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-muted-foreground"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Action Controls Row */}
        <div className="flex items-center justify-between pt-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7">
            <Plus className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            disabled={loading || !prompt.trim()}
            onClick={OnSubmit}
            size="icon"
            className="h-7 w-7 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {quickSuggestions.map((suggestion) => (
          <Button
            key={suggestion.label}
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2.5 text-xs rounded-lg hover:bg-blue-100 hover:text-blue-700 hover:border-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors"
            onClick={() => handleSelectPrompt(suggestion.prompt)}
          >
            {suggestion.label}
          </Button>
        ))}
      </div>

      {/* Conditional Rendering: Loading vs Templates vs Result */}
      {loading ? (
        <div className="flex gap-2 items-center p-5 mt-7 border rounded-xl shadow-sm bg-card">
          <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
          <h2 className="text-sm font-medium">Generating Agent Config...</h2>
        </div>
      ) : !configResult ? (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold tracking-tight text-sm">
              Get Started Quickly
            </h2>
            <span className="text-sm font-medium text-blue-500 cursor-pointer hover:underline">
              View All
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Choose from a variety of pre-built templates to get started quickly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.title}
                  onClick={() => handleSelectPrompt(template.description)}
                  className={`p-3 border rounded-xl cursor-pointer transition-all duration-200 bg-background shadow-sm ${template.border} ${template.glow}`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${template.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${template.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight mt-2">
                    {template.title}
                  </h3>
                  <p className="mt-1 text-xs leading-tight text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Result State when config is ready */
        <div className="mt-6 p-4 border rounded-xl bg-card space-y-4">
          <h2 className="text-sm font-semibold">Agent Config Generated</h2>
          <pre className="text-sm p-3 bg-muted rounded-lg overflow-auto max-h-60">
            {JSON.stringify(configResult, null, 2)}
          </pre>

          {configResult.status === "ready" && (
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                disabled={loading || !userDetail}
                onClick={handleSaveAgent}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-8 px-4 rounded-md"
              >
                Save Agent
              </Button>
            </div>
          )}
        </div>
      )}

      {
        configResult && 
          <div className="p-5 border rounded-2xl">
              <p>{JSON.stringify(configResult)}</p>
          </div>
      }
    </div>
  );
}

export default CreateAgent;