"use client"

import { DataTable } from "@/models/DataTables";
import { columns } from "./columns";
import ClientForm from "@/forms/ClientForm";
import { getAllDataClient } from "@/models/Client";

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Clienți</h5>
        <DataTable
          GetData={getAllDataClient}
          Addform={ClientForm}
          columns={columns}
          model='client'
          idKey="id" />
      </div>
    </div>
  );
}
