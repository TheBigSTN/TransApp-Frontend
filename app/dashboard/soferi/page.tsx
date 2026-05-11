"use client"

import { getAllDataSofer } from "@/models/Sofer";
import { columns } from "./columns";
import SoferForm from "@/forms/SoferForm";
import { DataTable } from "@/models/DataTables";

export default function SoferPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Șoferi</h5>
        <DataTable
          columns={columns}
          model='sofer'
          idKey="id"
          Addform={SoferForm}
          GetData={getAllDataSofer}
        />
      </div>
    </div>
  );
}
