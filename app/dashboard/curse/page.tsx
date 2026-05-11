"use client"

import { getAllDataCursa } from "@/models/Cursa";
import { DataTable } from "@/models/DataTables";
import { columns } from "./columns";
import CursaForm from "@/forms/CursaForm";

export default function CursaPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Curse</h5>
        <DataTable
          Addform={CursaForm}
          GetData={getAllDataCursa}
          columns={columns}
          model='cursa'
          idKey="id"
        />
      </div>
    </div>
  );
}
