"use client"

import LicentaForm from "@/forms/LicentaForm";
import { columns } from "./columns"
import { DataTable } from "@/models/DataTables"
import { getAllDataLicenta } from "@/models/Licenta";

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Licențe</h5>
        <DataTable
          Addform={LicentaForm}
          GetData={getAllDataLicenta}
          columns={columns}
          model='licenta'
          idKey="id"
        />
      </div>
    </div>
  );
}

