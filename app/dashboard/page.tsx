import { Badge } from '@/components/ui/badge'
import { Building2, Users, Target, Zap, Shield, TrendingUp, MapPin, Mail, Phone, Edit3, Star, Heart, Rocket, Flame } from 'lucide-react'
import { getCompanyData, type CompanyData } from './server'
import Link from 'next/link'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Heart,
  Rocket,
  Flame
}

export default async function DashboardPage() {
  const data: CompanyData = await getCompanyData()
  const { companyInfo, values, services, teamSize } = data

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated gradient blobs in background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-16 py-12 space-y-12 relative z-10">
        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-white">About Our Company</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">{data.name}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto drop-shadow">{data.description}</p>

          {/* Manager Edit Button */}
          <div className="pt-4">
            <Link href="/dashboard/edit">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <Edit3 className="w-5 h-5" />
                Manage Company Data
              </button>
            </Link>
          </div>
        </section>

        {/* Quick Stats with Glassmorphism */}
        {companyInfo && <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { value: companyInfo.foundedYear, label: 'Year Founded', icon: '📅' },
            { value: companyInfo.employees, label: 'Team Members', icon: '👥' },
            { value: services.length, label: 'Core Services', icon: '⚙️' },
            { value: 'EU', label: 'Operating Region', icon: '🌍' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-center group cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-blue-100 mt-2">{stat.label}</div>
            </div>
          ))}
        </section>}

        {/* Mission & Vision */}
        {companyInfo && <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-blue-50 leading-relaxed">{companyInfo.mission}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-blue-50 leading-relaxed">{companyInfo.vision}</p>
          </div>
        </section>}

        {/* Core Values */}
        {values.length > 0 && <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const IconComponent = iconMap[value.icon]
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  {IconComponent && <IconComponent className="w-8 h-8 text-blue-400 mb-4" />}
                  <h3 className="font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-blue-100">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>}

        {/* Services */}
        {services.length > 0 && <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">What We Offer</h2>
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-blue-50 font-medium">{service.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>}

        {/* Team Structure */}
        {teamSize.length > 0 && <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamSize.map((team, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <Badge className="bg-blue-400/30 text-blue-100 border border-blue-400/50">{team.count} people</Badge>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{team.role}</h3>
                <p className="text-sm text-blue-100">{team.description}</p>
              </div>
            ))}
          </div>
        </section>}

        {/* Contact Info */}
        {companyInfo && <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <MapPin className="w-6 h-6 text-red-400 mb-4" />
              <h3 className="font-bold text-white mb-2">Headquarters</h3>
              <p className="text-blue-100 text-sm">{companyInfo.headquarters}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Mail className="w-6 h-6 text-blue-400 mb-4" />
              <h3 className="font-bold text-white mb-2">Email</h3>
              <p className="text-blue-100 text-sm">info@transportms.com</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Phone className="w-6 h-6 text-green-400 mb-4" />
              <h3 className="font-bold text-white mb-2">Phone</h3>
              <p className="text-blue-100 text-sm">+40 (21) 123-4567</p>
            </div>
          </div>
        </section>}

        {/* Footer Message */}
        {companyInfo && <section className="text-center py-8 border-t border-white/10">
          <p className="text-blue-100">
            Join <span className="font-semibold text-white">{companyInfo.employees}</span> amazing team members who are transforming the logistics industry
          </p>
        </section>}
      </div>
    </div>
  )
}
