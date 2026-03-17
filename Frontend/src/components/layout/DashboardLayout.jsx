import React, { useState } from "react";
import Sidebar from "../../pages/Dashboard/Dashboard/Sidebar";
import PageHeader from "../../pages/Dashboard/Dashboard/PageHeader";
import DashNavbar from "../../pages/Dashboard/Dashboard/DashNavbar";
import { Outlet } from "react-router-dom";


const DashboardLayout = ({ breadcrumbs }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-screen flex bg-gray-100 overflow-hidden">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        <DashNavbar setOpen={setOpen} />

        <PageHeader breadcrumbs={["Dashboard","Folders"]} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          <Outlet/>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;