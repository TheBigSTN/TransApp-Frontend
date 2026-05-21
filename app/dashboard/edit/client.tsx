'use client'

import { useState, useTransition, useEffect } from 'react'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { updateCompanyInfo, addValue, deleteValue, addTeamDepartment, deleteTeamDepartment, addService, deleteService } from './server'
import { CompanyDataFull } from '../server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const iconOptions = ['Target', 'Zap', 'Shield', 'TrendingUp', 'Star', 'Heart', 'Rocket', 'Flame']

interface EditPageClientProps {
    initialData: CompanyDataFull
}

export default function EditPageClient({ initialData }: EditPageClientProps) {
    const [data, setData] = useState<CompanyDataFull | null>(initialData || null)
    const [isPending, startTransition] = useTransition()
    const [activeTab, setActiveTab] = useState<'info' | 'values' | 'team' | 'services'>('info')
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // Company Info Form
    const [infoForm, setInfoForm] = useState({
        foundedYear: 0,
        employees: '',
        headquarters: '',
        mission: '',
        vision: '',
    })

    // Value Form
    const [valueForm, setValueForm] = useState({
        icon: iconOptions[0],
        title: '',
        description: '',
    })

    // Team Form
    const [teamForm, setTeamForm] = useState({
        role: '',
        count: '',
        description: '',
    })

    // Service Form
    const [serviceForm, setServiceForm] = useState('')

    // Initialize form when data loads
    useEffect(() => {
        if (data?.info) {
            setInfoForm({
                foundedYear: data.info.foundedYear,
                employees: data.info.employees,
                headquarters: data.info.headquarters,
                mission: data.info.ourMission,
                vision: data.info.ourVision,
            })
        }
    }, [data])

    // Check for unsaved changes
    useEffect(() => {
        if (!data?.info) {
            setHasUnsavedChanges(false)
            return
        }

        const isInfoChanged =
            infoForm.foundedYear !== data.info.foundedYear ||
            infoForm.employees !== data.info.employees ||
            infoForm.headquarters !== data.info.headquarters ||
            infoForm.mission !== data.info.ourMission ||
            infoForm.vision !== data.info.ourVision

        const isValueFormDirty = valueForm.title !== '' || valueForm.description !== ''
        const isTeamFormDirty = teamForm.role !== '' || teamForm.count !== '' || teamForm.description !== ''
        const isServiceFormDirty = serviceForm !== ''

        setHasUnsavedChanges(isInfoChanged || isValueFormDirty || isTeamFormDirty || isServiceFormDirty)
    }, [infoForm, valueForm, teamForm, serviceForm, data])

    // Warn user before leaving page with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault()
                e.returnValue = 'Aveți modificări nesalvate. Sigur doriți să părăsiți pagina?'
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [hasUnsavedChanges])

    const handleUpdateInfo = () => {
        startTransition(async () => {
            try {
                await updateCompanyInfo(infoForm)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        info: {
                            ...prev.info,
                            foundedYear: infoForm.foundedYear,
                            employees: infoForm.employees,
                            headquarters: infoForm.headquarters,
                            ourMission: infoForm.mission,
                            ourVision: infoForm.vision,
                        }
                    }
                })
            } catch (error) {
                alert('Eroare la actualizarea informațiilor companiei')
            }
        })
    }

    const handleAddValue = () => {
        if (!valueForm.title || !valueForm.description) {
            alert('Vă rugăm completați toate câmpurile')
            return
        }
        startTransition(async () => {
            try {
                const result = await addValue(valueForm)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        values: [...prev.values, result.data]
                    }
                })
                setValueForm({ icon: iconOptions[0], title: '', description: '' })
            } catch (error) {
                alert('Eroare la adăugarea valorii')
            }
        })
    }

    const handleDeleteValue = (valueId: string) => {
        startTransition(async () => {
            try {
                await deleteValue(valueId)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        values: prev.values.filter(v => v.id !== valueId)
                    }
                })
            } catch (error) {
                alert('Eroare la ștergerea valorii')
            }
        })
    }

    const handleAddTeam = () => {
        if (!teamForm.role || !teamForm.count || !teamForm.description) {
            alert('Please fill in all fields')
            return
        }
        startTransition(async () => {
            try {
                const result = await addTeamDepartment(teamForm)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        teamDepartments: [...prev.teamDepartments, result.data]
                    }
                })
                setTeamForm({ role: '', count: '', description: '' })
            } catch (error) {
                alert('Eroare la adăugarea departamentului de echipă')
            }
        })
    }

    const handleDeleteTeam = (deptId: string) => {
        startTransition(async () => {
            try {
                await deleteTeamDepartment(deptId)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        teamDepartments: prev.teamDepartments.filter(t => t.id !== deptId)
                    }
                })
            } catch (error) {
                alert('Eroare la ștergerea departamentului de echipă')
            }
        })
    }

    const handleAddService = () => {
        if (!serviceForm.trim()) {
            alert('Vă rugăm introduceți un nume de serviciu')
            return
        }
        startTransition(async () => {
            try {
                const result = await addService(serviceForm)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        services: [...prev.services, result.data]
                    }
                })
                setServiceForm('')
            } catch (error) {
                alert('Eroare la adăugarea serviciului')
            }
        })
    }

    const handleDeleteService = (serviceId: string) => {
        startTransition(async () => {
            try {
                await deleteService(serviceId)
                setData(prev => {
                    if (!prev) return prev
                    return {
                        ...prev,
                        services: prev.services.filter(s => s.id !== serviceId)
                    }
                })
            } catch (error) {
                alert('Eroare la ștergerea serviciului')
            }
        })
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Loading state */}
            {!data && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
                        <p className="text-xl text-blue-100">Se încarcă datele companiei...</p>
                    </div>
                </div>
            )}

            {data && (
                <>
                    {/* Animated gradient blobs */}
                    <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-8 py-12 space-y-8 relative z-10">
                        {/* Header */}
                        <section className="text-center space-y-4">
                            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Gestionați datele companiei</h1>
                            <p className="text-xl text-blue-100">Editați informații despre companie, valori, echipă și servicii</p>
                        </section>

                        {/* Navigation Tabs */}
                        <div className="flex gap-4 flex-wrap justify-center">
                            {(['info', 'values', 'team', 'services'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === tab
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                                        : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-8">
                            {/* Company Info Tab */}
                            {activeTab === 'info' && (
                                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-6">
                                    <h2 className="text-3xl font-bold text-white">Informații despre companie</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Anul înființării</label>
                                            <Input
                                                type="number"
                                                value={infoForm.foundedYear}
                                                onChange={(e) => setInfoForm({ ...infoForm, foundedYear: parseInt(e.target.value) })}
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Angajați</label>
                                            <Input
                                                value={infoForm.employees}
                                                onChange={(e) => setInfoForm({ ...infoForm, employees: e.target.value })}
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Sediul central</label>
                                            <Input
                                                value={infoForm.headquarters}
                                                onChange={(e) => setInfoForm({ ...infoForm, headquarters: e.target.value })}
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Misiune</label>
                                            <textarea
                                                value={infoForm.mission}
                                                onChange={(e) => setInfoForm({ ...infoForm, mission: e.target.value })}
                                                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Viziune</label>
                                            <textarea
                                                value={infoForm.vision}
                                                onChange={(e) => setInfoForm({ ...infoForm, vision: e.target.value })}
                                                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleUpdateInfo}
                                        disabled={isPending}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
                                    >
                                        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Actualizați informații despre companie
                                    </Button>
                                </div>
                            )}

                            {/* Values Tab */}
                            {activeTab === 'values' && (
                                <div className="space-y-6">
                                    {/* Add New Value */}
                                    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
                                        <h2 className="text-2xl font-bold text-white">Adăugați o nouă valoare</h2>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Pictogramă</label>
                                            <select
                                                value={valueForm.icon}
                                                onChange={(e) => setValueForm({ ...valueForm, icon: e.target.value })}
                                                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon} className="bg-slate-900">{icon}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Titlu</label>
                                            <Input
                                                value={valueForm.title}
                                                onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })}
                                                placeholder="de exemplu, Inovație"
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Descriere</label>
                                            <textarea
                                                value={valueForm.description}
                                                onChange={(e) => setValueForm({ ...valueForm, description: e.target.value })}
                                                placeholder="Descrieți această valoare..."
                                                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                rows={3}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleAddValue}
                                            disabled={isPending}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all"
                                        >
                                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            <Plus className="w-4 h-4 mr-2" />
                                            Adăugați valoare
                                        </Button>
                                    </div>

                                    {/* List Values */}
                                    <div className="space-y-4">
                                        {data.values.map(value => (
                                            <div key={value.id} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{value.title}</h3>
                                                    <p className="text-blue-100 text-sm">{value.description}</p>
                                                    <p className="text-white/50 text-xs mt-2">Pictogramă: {value.icon}</p>
                                                </div>
                                                {console.log(value)!! || <div></div>}
                                                <button
                                                    onClick={() => handleDeleteValue(value.id)}
                                                    disabled={isPending}
                                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-all"
                                                >
                                                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Team Tab */}
                            {activeTab === 'team' && (
                                <div className="space-y-6">
                                    {/* Add New Team */}
                                    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
                                        <h2 className="text-2xl font-bold text-white">Adăugați departament în echipă</h2>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Rol/Departament</label>
                                            <Input
                                                value={teamForm.role}
                                                onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                                                placeholder="de exemplu, Echipa de inginerie"
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Numărul de persoane</label>
                                            <Input
                                                value={teamForm.count}
                                                onChange={(e) => setTeamForm({ ...teamForm, count: e.target.value })}
                                                placeholder="de exemplu, 15"
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Descriere</label>
                                            <textarea
                                                value={teamForm.description}
                                                onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                                                placeholder="Descrieți această echipă..."
                                                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                rows={3}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleAddTeam}
                                            disabled={isPending}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all"
                                        >
                                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            <Plus className="w-4 h-4 mr-2" />
                                            Adăugați echipă
                                        </Button>
                                    </div>

                                    {/* List Teams */}
                                    <div className="space-y-4">
                                        {data.teamDepartments.map(team => (
                                            <div key={team.id} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{team.role}</h3>
                                                    <p className="text-blue-100 text-sm">{team.description}</p>
                                                    <p className="text-white/50 text-xs mt-2">Dimensiunea echipei: {team.count} persoane</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteTeam(team.id)}
                                                    disabled={isPending}
                                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-all"
                                                >
                                                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Services Tab */}
                            {activeTab === 'services' && (
                                <div className="space-y-6">
                                    {/* Add New Service */}
                                    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
                                        <h2 className="text-2xl font-bold text-white">Adăugați serviciu</h2>

                                        <div>
                                            <label className="block text-sm font-semibold text-blue-100 mb-2">Nume serviciu</label>
                                            <Input
                                                value={serviceForm}
                                                onChange={(e) => setServiceForm(e.target.value)}
                                                placeholder="de exemplu, Gestionarea și urmărirea flotei"
                                                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                                            />
                                        </div>

                                        <Button
                                            onClick={handleAddService}
                                            disabled={isPending}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all"
                                        >
                                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            <Plus className="w-4 h-4 mr-2" />
                                            Adăugați serviciu
                                        </Button>
                                    </div>

                                    {/* List Services */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.services.map(service => (
                                            <div key={service.id} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex justify-between items-center">
                                                <span className="text-white font-semibold">{service.title}</span>
                                                <button
                                                    onClick={() => handleDeleteService(service.id)}
                                                    disabled={isPending}
                                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-all"
                                                >
                                                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
