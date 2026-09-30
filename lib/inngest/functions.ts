import { inngest } from "./client";
import { db } from "@/db";
import { runs, agents } from "@/db/schema";
import { eq, and, lte, inArray } from "drizzle-orm";

export const processScheduledAgentRun = inngest.createFunction(
  { id: "process-scheduled-agent-run" },
  { cron: "*/5 * * * *" }, // Runs every 5 minutes
  async ({ step }) => {
    // Query runs for scheduled tasks in the next 60 minutes
    const scheduledRuns = await step.run("fetch-scheduled-runs", async () => {
      const now = new Date();
      const in60Minutes = new Date(now.getTime() + 60 * 60 * 1000);
      return await db
        .select()
        .from(runs)
        .where(
          and(
            eq(runs.status, "QUEUED"),
            lte(runs.nextRun, in60Minutes)
          )
        );
    });

    if (scheduledRuns.length === 0) {
      return { message: "No scheduled runs found" };
    }

    // Process them
    const results = await step.run("process-runs", async () => {
      const runIds = scheduledRuns.map((r) => r.id);
      
      // Update status to RUNNING
      await db.update(runs)
        .set({ status: "RUNNING" })
        .where(inArray(runs.id, runIds));

      const processed = [];
      
      for (const run of scheduledRuns) {
        try {
          // Get agent details for execution logic
          const agentArr = await db.select().from(agents).where(eq(agents.id, run.agentId!));
          const agent = agentArr[0];

          // Simulate execution for now (replace with actual logic)
          const outputResult = "Execution completed successfully for agent: " + (agent?.name || "Unknown");
          
          let nextRunDate = null;
          // Basic logic to schedule next run based on agent schedule
          // (Can be enhanced using parser for cron or exact time)
          if (agent?.schedule) {
             const scheduleObj = agent.schedule as any;
             // Assume daily for demo purposes if not specified
             nextRunDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
          }

          // Save output and schedule next run
          await db.update(runs)
            .set({ 
              status: "COMPLETED", 
              outputResult,
              nextRun: nextRunDate,
              logs: [{ timestamp: new Date().toISOString(), message: "Execution succeeded" }]
            })
            .where(eq(runs.id, run.id));
            
          processed.push({ id: run.id, status: "COMPLETED" });
        } catch (error: any) {
          await db.update(runs)
            .set({ 
              status: "FAILED", 
              logs: [{ timestamp: new Date().toISOString(), message: error.message }] 
            })
            .where(eq(runs.id, run.id));
            
          processed.push({ id: run.id, status: "FAILED", error: error.message });
        }
      }
      
      return processed;
    });

    return { processedRuns: results };
  }
);
