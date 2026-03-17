import React from "react";
import StatsCards from "./StatsCards";
import AnalyticsSection from "./AnalyticsSection";
import RecentFolders from "./RecentFolders";
import TestimonialsSetup from "./TestimonialsSetup";
import { getStats } from "./Handler/FetchDashboardHandler";
import { useQuery } from "@tanstack/react-query";
import { errorHandler } from "../../../utils/errorHandler";

const Dashboard = () => {

  const { data, isPending, error } = useQuery({
  queryKey: ['stats'],
  queryFn: getStats
})


  return (
    <div className="min-h-screen">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Dashboard
      </h1>

      {/* Stats */}
      <StatsCards data={data} isPending={isPending}/>

      {/* Analytics + Recent */}

      <div className="grid grid-cols-2 gap-6 mt-6 max-md:grid-cols-1">

        <AnalyticsSection data={data} isPending={isPending}/>

        <RecentFolders data={data} isPending={isPending}/>

      </div>

      {/* Testimonials */}

      <div className="mt-6">
        <TestimonialsSetup data={data} isPending={isPending}/>
      </div>

    </div>
  );
};

export default Dashboard;