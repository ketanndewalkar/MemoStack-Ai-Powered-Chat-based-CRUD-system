import React from "react";
import StatsCards from "./StatsCards";
import AnalyticsSection from "./AnalyticsSection";
import RecentFolders from "./RecentFolders";
import TestimonialsSetup from "./TestimonialsSetup";
import { getDashboardData } from "./Handler/FetchDashboardHandler";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  return (
    <div className="min-h-screen pb-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Dashboard
      </h1>

      {/* Stats Cards */}
      <StatsCards data={data?.stats} isPending={isPending} />

      {/* Analytics + Recent Folders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AnalyticsSection data={data?.activities} isPending={isPending} />
        <RecentFolders data={data?.recentFolders} isPending={isPending} />
      </div>

      {/* Testimonials */}
      <div className="mt-6">
        <TestimonialsSetup data={data?.testimonials} isPending={isPending} />
      </div>
    </div>
  );
};

export default Dashboard;