"use client"
import { getAllDataMasina } from "@/models/Masina"
import { columns } from "./columns"
import MasinaForm from "@/forms/MasinaForm";
import { DataTable } from "@/models/DataTables";

export default function MasinaPage() {

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Mașini</h5>
        <DataTable
          model='masina'
          idKey="id"
          columns={columns}
          Addform={MasinaForm}
          GetData={getAllDataMasina}
        />
      </div>
    </div>
  );
}
