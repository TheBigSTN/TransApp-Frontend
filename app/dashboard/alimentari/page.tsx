"use client"

import { getAllDataAlimentare } from "@/models/Alimentare"
import { columns } from "./columns"
import AlimentareForm from "@/forms/AlimentareForm";
import { DataTable } from "@/models/DataTables";


export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Alimentări</h5>
        <DataTable
          GetData={getAllDataAlimentare}
          columns={columns}
          model="alimentare"
          idKey="id"
          Addform={AlimentareForm}
        />
      </div>
    </div>
  );
}