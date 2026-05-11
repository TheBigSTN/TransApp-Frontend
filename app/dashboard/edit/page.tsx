import EditPageClient from './client'
import { getCompanyData } from '../server'

export default async function EditPage() {
    const data = await getCompanyData(true)

    return <EditPageClient initialData={data} />
}
