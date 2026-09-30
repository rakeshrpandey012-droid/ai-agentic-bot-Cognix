"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>
      <div className="w-full flex justify-center">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}
