"use client"

import { DataTable } from '@/models/DataTables';
import { columns } from './columns';
import { addAnexa, getAllDataAnexa } from '@/models/Anexa';

export default function AnexaPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="glass-card p-6">
        <h5 className="text-2xl font-bold text-center mb-5 text-white">Anexe</h5>
        <DataTable
          Addform={() => <></>}
          GetData={getAllDataAnexa}
          columns={columns}
          model="anexa"
          idKey="id" />
      </div>
    </div>
  );
}
