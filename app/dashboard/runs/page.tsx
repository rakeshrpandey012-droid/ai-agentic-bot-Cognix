"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Loader2, Play } from "lucide-react";

type Run = {
  id: string;
  agentId: string;
  status: string;
  inputPrompt: string;
  outputResult: string;
  createdAt: string;
};

export default function RunsPage() {
  const { userDetail } = useContext(UserDetailContext) as any;
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetail?.id) {
      fetchRuns();
    } else {
      setLoading(false);
    }
  }, [userDetail]);

  const fetchRuns = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/agent/runs?userId=${userDetail.id}`);
      setRuns(res.data.runs || []);
    } catch (error) {
      console.error("Failed to fetch runs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-500" /></div>;

  if (!userDetail) return <div className="p-8"><h1 className="text-2xl font-bold">Please log in to view your runs.</h1></div>;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agent Runs</h2>
      </div>

      {runs.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-card">
          <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No runs yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Execute an agent to see the results here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {runs.map((run) => (
            <div key={run.id} className="p-5 border rounded-xl bg-card shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm">Run ID: <span className="font-normal text-muted-foreground">{run.id.substring(0,8)}</span></h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${run.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {run.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2"><strong>Input:</strong> {run.inputPrompt}</p>
              <div className="bg-slate-50 border p-3 rounded-md max-h-40 overflow-y-auto">
                <p className="text-xs text-slate-700 whitespace-pre-wrap">{run.outputResult}</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 text-right">
                {new Date(run.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
