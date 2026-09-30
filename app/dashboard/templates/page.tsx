"use client";

import React from "react";
import { Search, GraduationCap, Wrench, Mail, BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  {
    title: "Find AI jobs",
    description: "I want to find AI jobs in the US. Can you help me with that?",
    icon: Search,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-900",
  },
  {
    title: "Find AI courses",
    description: "I want to find AI courses online. Can you help me with that?",
    icon: GraduationCap,
    iconBg: "bg-green-100",
    iconColor: "text-green-900",
  },
  {
    title: "Find AI tools",
    description: "I want to find AI tools for my business. Can you help me with that?",
    icon: Wrench,
    iconBg: "bg-red-100",
    iconColor: "text-red-900",
  },
  {
    title: "Inbox Summary",
    description: "I want to get a summary of my inbox. Can you help me with that?",
    icon: Mail,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-900",
  },
  {
    title: "Research AI topics",
    description: "I want to research AI topics. Can you help me with that?",
    icon: BookOpen,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-900",
  },
  {
    title: "Plan My day",
    description: "I want to plan my day. Can you help me with that?",
    icon: Calendar,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-900",
  }
];

export default function TemplatesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
          <p className="text-muted-foreground mt-1 text-sm">Start from a pre-built template to get your agent running faster.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div key={template.title} className="flex flex-col border rounded-xl p-5 bg-card shadow-sm hover:shadow-md transition-all">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${template.iconBg} mb-4`}>
                <Icon className={`h-6 w-6 ${template.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{template.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                {template.description}
              </p>
              <Button className="w-full mt-6 gap-2" variant="outline">
                Use Template <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
