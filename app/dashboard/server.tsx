'use server'

import api from "@/models/Api"

export interface CompanyData {
    name: string;
    description: string;
    companyInfo: {
        name: string
        foundedYear: string
        employees: string
        headquarters: string
        mission: string
        vision: string
    }
    values: Array<{
        icon: string
        title: string
        description: string
    }>
    services: Array<{
        title: string
        order: number
    }>
    teamSize: Array<{
        role: string
        count: string
        description: string
    }>
}

export interface Info {
    id: string;
    foundedYear: number;
    employees: string;
    headquarters: string;
    ourMission: string;
    ourVision: string;
    updatedAt: string; // ISO date string
}

export interface Value {
    id: string;
    icon: string;
    title: string;
    description: string;
    order: number;
    createdAt: string; // ISO date string
}

export interface Service {
    id: string;
    title: string;
    order: number;
    createdAt: string; // ISO date string
}

export interface TeamDepartment {
    id: string;
    role: string;
    count: string;
    description: string;
    order: number;
    createdAt: string; // ISO date string
}

export interface CompanyDataFull {
    id: string;
    name: string;
    description: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    info: Info;
    values: Value[];
    services: Service[];
    teamDepartments: TeamDepartment[];
}

export async function getCompanyData(full: true): Promise<CompanyDataFull>
export async function getCompanyData(full?: false): Promise<CompanyData>
export async function getCompanyData(full: boolean = false): Promise<CompanyData | CompanyDataFull> {
    if (!full) {
        const response = await api.get<CompanyData>("/company/data");

        return response.data;
    } else {
        try {
            const response = await api.get<CompanyDataFull>("/company");
            return response.data;
        } catch (error) {
            debugger;

        }
    }

    return {
        name: 'Transport Management Systems',
        description: 'Leading provider of innovative transport management solutions for logistics companies.',
        companyInfo: {
            name: 'Transport Management Systems',
            foundedYear: '2020',
            employees: '45+',
            headquarters: 'Bucharest, Romania',
            mission: 'Revolutionizing fleet management and logistics through innovative technology solutions',
            vision: 'To become the leading transport management platform trusted by logistics companies across Europe',
        },
        values: [
            { icon: 'Target', title: 'Customer Focus', description: 'We prioritize our clients needs and deliver solutions that drive their success' },
            { icon: 'Zap', title: 'Innovation', description: 'Continuously improving our platform with cutting-edge technology' },
            { icon: 'Shield', title: 'Reliability', description: 'Dependable systems that keep fleets moving 24/7' },
            { icon: 'TrendingUp', title: 'Growth', description: 'Committed to scaling and expanding our impact across markets' },
        ],
        services: [
            { title: 'Fleet Management & Tracking', order: 1 },
            { title: 'Driver Management & Scheduling', order: 2 },
            { title: 'Vehicle Maintenance Tracking', order: 3 },
            { title: 'Fuel Cost Analysis', order: 4 },
            { title: 'License & Documentation Management', order: 5 },
            { title: 'Billing & Invoice Generation', order: 6 },
            // 'Real-time Analytics Dashboard',
            // 'Mobile App for Drivers',
        ],
        teamSize: [
            { role: 'Engineering Team', count: '15', description: 'Building robust, scalable solutions' },
            { role: 'Product & Design', count: '8', description: 'Creating intuitive user experiences' },
            { role: 'Sales & Support', count: '12', description: 'Driving customer success and growth' },
            { role: 'Operations & Admin', count: '10', description: 'Keeping everything running smoothly' },
        ],
    }
}
