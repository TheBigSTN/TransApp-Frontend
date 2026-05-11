'use server'

import api from "@/models/Api"
import { CompanyDataFull, Info, Value, Service, TeamDepartment } from "../server"

export async function updateCompanyInfo(data: {
    foundedYear: number
    employees: string
    headquarters: string
    mission: string
    vision: string
}) {
    try {
        const response = await api.put("/company/info", {
            name: "",
            ...data
        })
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error updating company info:', error)
        throw error
    }
}

export async function addValue(data: {
    icon: string
    title: string
    description: string
}) {
    try {
        const response = await api.post("/company/values", data)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error adding value:', error)
        throw error
    }
}

export async function deleteValue(valueId: string) {
    try {
        const response = await api.delete(`/company/values/${valueId}`)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error deleting value:', error)
        throw error
    }
}

export async function addTeamDepartment(data: {
    role: string
    count: string
    description: string
}) {
    try {
        const response = await api.post("/company/team", data)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error adding team department:', error)
        throw error
    }
}

export async function deleteTeamDepartment(deptId: string) {
    try {
        const response = await api.delete(`/company/team/${deptId}`)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error deleting team department:', error)
        throw error
    }
}

export async function addService(title: string) {
    try {
        const response = await api.post("/company/services", title)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error adding service:', error)
        throw error
    }
}

export async function deleteService(serviceId: string) {
    try {
        const response = await api.delete(`/company/services/${serviceId}`)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error deleting service:', error)
        throw error
    }
}
