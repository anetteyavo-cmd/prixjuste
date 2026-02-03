"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, StatsCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calculator, FileSearch, Search, Bell, Settings, TrendingUp, ArrowRight, Plus, Download, Share2, Heart, Clock, ChevronRight, BarChart3, FolderOpen, History, Bookmark, AlertCircle, CheckCircle, Home, Fence, Paintbrush, Zap, FileText, Star, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/mock-data";

const recentQuotes = [
  { id: 1, type: "maison", title: "Construction maison 150m²", city: "Abidjan", date: "15 Jan 2025", totalMin: 32000000, totalMax: 45000000, status: "completed" },
  { id: 2, type: "cloture", title: "Clôture 80ml", city: "Bouaké", date: "10 Jan 2025", totalMin: 4500000, totalMax: 6000000, status: "completed" },
  { id: 3, type: "peinture", title: "Peinture appartement", city: "Abidjan", date: "8 Jan 2025", totalMin: 850000, totalMax: 1200000, status: "draft" },
];

const favorites = [
  { id: 1, name: "Ciment CIMAF", price: 4800, city: "Abidjan", change: -2.5 },
  { id: 2, name: "Fer à béton Ø10", price: 4500, city: "Abidjan", change: 3.2 },
  { id: 3, name: "Gravier concassé", price: 18000, city: "Abidjan", change: 0 },
];

const priceAlerts = [
  { id: 1, product: "Ciment CIMAF", target: 4500, current: 4800, triggered: false },
  { id: 2, product: "Fer à béton Ø12", target: 5000, current: 4800, triggered: true },
];

const notifications = [
  { id: 1, type: "alert", title: "Alerte prix atteinte", message: "Fer à béton Ø12 sous 5 000 FCFA", time: "Il y a 2h", read: false },
  { id: 2, type: "success", title: "Devis partagé", message: "Consulté 3 fois", time: "Hier", read: true },
];

const projects = [
  { id: 1, name: "Maison Cocody", quotes: 3, budget: 50000000, status: "active" },
  { id: 2, name: "Rénovation Bureau", quotes: 2, budget: 15000000, status: "completed" },
];

const typeIcons: Record<string, any> = { maison: Home, cloture: Fence, peinture: Paintbrush, electricite: Zap };

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0F2A44] rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">P</span></div>
              <span className="text-xl font-bold text-[#0F2A44]">PrixJuste</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-xl hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-100"><h3 className="font-semibold">Notifications</h3></div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-4 hover:bg-gray-50 border-b border-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-gray-500">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/dashboard/settings" className="p-2 rounded-xl hover:bg-gray-100"><Settings className="w-5 h-5 text-gray-600" /></Link>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-[#0F2A44] text-white flex items-center justify-center font-semibold">JK</div>
                <div className="hidden sm:block"><p className="text-sm font-medium">Jean Kouadio</p><p className="text-xs text-[#0F2A44]">Plan Pro</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div><h1 className="text-2xl font-bold text-gray-900">Bonjour, Jean 👋</h1><p className="text-gray-500">Voici un résumé de votre activité</p></div>
          <div className="flex gap-2">
            <Link href="/quote"><Button leftIcon={<Plus size={18} />}>Nouveau devis</Button></Link>
            <Link href="/analyze"><Button variant="outline" leftIcon={<FileSearch size={18} />}>Analyser</Button></Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: "overview", label: "Vue d'ensemble", icon: BarChart3 },
            { id: "quotes", label: "Mes devis", icon: Calculator },
            { id: "favorites", label: "Favoris", icon: Heart },
            { id: "alerts", label: "Alertes", icon: Bell },
            { id: "projects", label: "Projets", icon: FolderOpen },
            { id: "history", label: "Historique", icon: History },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-[#0F2A44] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Devis générés" value="12" icon={<Calculator className="w-6 h-6" />} trend="up" change={{ value: "+3", label: "ce mois" }} />
              <StatsCard title="Analyses" value="5" icon={<FileSearch className="w-6 h-6" />} trend="up" change={{ value: "+2", label: "ce mois" }} />
              <StatsCard title="Économies" value="2.5M" icon={<TrendingUp className="w-6 h-6" />} trend="up" change={{ value: "FCFA", label: "estimées" }} />
              <StatsCard title="Favoris" value="8" icon={<Heart className="w-6 h-6" />} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Quotes */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Derniers devis</h2>
                    <button onClick={() => setActiveTab("quotes")} className="text-sm text-[#0F2A44] font-medium flex items-center gap-1">Voir tout <ChevronRight size={16} /></button>
                  </div>
                  <div className="space-y-3">
                    {recentQuotes.map(q => {
                      const Icon = typeIcons[q.type] || FileText;
                      return (
                        <div key={q.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${q.type === 'maison' ? 'bg-[#0F2A44]/10 text-[#0F2A44]' : q.type === 'cloture' ? 'bg-green-50 text-green-600' : q.type === 'peinture' ? 'bg-pink-50 text-pink-600' : 'bg-yellow-50 text-yellow-600'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{q.title}</p>
                              <p className="text-sm text-gray-500">{q.city} • {q.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#0F2A44]">{formatPrice(q.totalMin)}</p>
                            <p className="text-xs text-gray-500">à {formatPrice(q.totalMax)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Voir les prix", icon: Search, href: "/prices" },
                    { label: "Créer un devis", icon: Calculator, href: "/quote" },
                    { label: "Analyser", icon: FileSearch, href: "/analyze" },
                  ].map((a, i) => (
                    <Link key={i} href={a.href}>
                      <Card hover className="p-6 text-center cursor-pointer">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center mb-3"><a.icon className="w-6 h-6" /></div>
                        <p className="font-medium">{a.label}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upgrade CTA */}
                <Card className="p-6 bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white">
                  <h3 className="font-semibold mb-2">Passez à Business</h3>
                  <p className="text-sm text-white/70 mb-4">Analyses illimitées, API, équipe</p>
                  <Link href="/pricing"><Button className="w-full bg-white text-[#0F2A44] hover:bg-white/90">Voir les plans</Button></Link>
                </Card>

                {/* Favorites Preview */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Favoris</h3>
                    <button onClick={() => setActiveTab("favorites")} className="text-sm text-[#0F2A44]">Voir tout</button>
                  </div>
                  <div className="space-y-3">
                    {favorites.slice(0, 3).map(f => (
                      <div key={f.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{f.name}</p>
                          <p className="text-xs text-gray-500">{f.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#0F2A44]">{formatPrice(f.price)}</p>
                          <p className={`text-xs ${f.change < 0 ? 'text-green-600' : f.change > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                            {f.change > 0 ? '+' : ''}{f.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Price Alerts */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Alertes prix</h3>
                    <button onClick={() => setActiveTab("alerts")} className="text-sm text-[#0F2A44]">Gérer</button>
                  </div>
                  <div className="space-y-3">
                    {priceAlerts.map(a => (
                      <div key={a.id} className={`p-3 rounded-xl ${a.triggered ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{a.product}</p>
                          {a.triggered && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Cible: {formatPrice(a.target)} • Actuel: {formatPrice(a.current)}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" fullWidth size="sm" className="mt-4" leftIcon={<Plus size={14} />}>Nouvelle alerte</Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Mes devis</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Exporter</Button>
                <Link href="/quote"><Button size="sm" leftIcon={<Plus size={16} />}>Nouveau</Button></Link>
              </div>
            </div>
            <div className="space-y-3">
              {recentQuotes.map(q => {
                const Icon = typeIcons[q.type] || FileText;
                return (
                  <div key={q.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${q.type === 'maison' ? 'bg-[#0F2A44]/10 text-[#0F2A44]' : q.type === 'cloture' ? 'bg-green-50 text-green-600' : q.type === 'peinture' ? 'bg-pink-50 text-pink-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{q.title}</p>
                        <p className="text-sm text-gray-500">{q.city} • {q.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-[#0F2A44]">{formatPrice(q.totalMin)} - {formatPrice(q.totalMax)}</p>
                        <Badge size="sm" variant={q.status === 'completed' ? 'success' : q.status === 'shared' ? 'default' : 'outline'}>
                          {q.status === 'completed' ? 'Terminé' : q.status === 'shared' ? 'Partagé' : 'Brouillon'}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 hover:bg-gray-200 rounded-lg"><Share2 size={16} className="text-gray-500" /></button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg"><Download size={16} className="text-gray-500" /></button>
                        <button className="p-2 hover:bg-red-100 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Mes favoris</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map(f => (
                <Card key={f.id} className="p-4 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{f.name}</p>
                      <p className="text-sm text-gray-500">{f.city}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-600"><Heart className="w-5 h-5 fill-current" /></button>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-xl font-bold text-[#0F2A44]">{formatPrice(f.price)}</p>
                    <p className={`text-sm font-medium ${f.change < 0 ? 'text-green-600' : f.change > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {f.change > 0 ? '+' : ''}{f.change}%
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Alertes de prix</h2>
              <Button size="sm" leftIcon={<Plus size={16} />}>Nouvelle alerte</Button>
            </div>
            <div className="space-y-4">
              {priceAlerts.map(a => (
                <div key={a.id} className={`p-4 rounded-xl border ${a.triggered ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{a.product}</p>
                      <p className="text-sm text-gray-500 mt-1">Alerte quand le prix passe sous {formatPrice(a.target)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {a.triggered ? (
                        <Badge variant="success"><CheckCircle size={14} className="mr-1" /> Déclenchée</Badge>
                      ) : (
                        <Badge variant="outline"><Clock size={14} className="mr-1" /> En attente</Badge>
                      )}
                      <button className="p-2 hover:bg-red-100 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#0F2A44] h-2 rounded-full" style={{ width: `${Math.min(100, (a.target / a.current) * 100)}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500">{formatPrice(a.current)} actuel</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Mes projets</h2>
              <Button size="sm" leftIcon={<Plus size={16} />}>Nouveau projet</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map(p => (
                <Card key={p.id} hover className="p-6 border border-gray-100 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{p.name}</h3>
                      <Badge size="sm" variant={p.status === 'active' ? 'success' : 'outline'} className="mt-1">
                        {p.status === 'active' ? 'En cours' : 'Terminé'}
                      </Badge>
                    </div>
                    <FolderOpen className="w-6 h-6 text-[#0F2A44]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Devis</span><span className="font-medium">{p.quotes}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Budget</span><span className="font-medium">{formatPrice(p.budget)}</span></div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Historique de recherche</h2>
            <div className="space-y-3">
              {[
                { query: "ciment abidjan", date: "15 Jan 2025, 14:30" },
                { query: "fer à béton", date: "15 Jan 2025, 10:15" },
                { query: "parpaing 15cm bouake", date: "14 Jan 2025, 16:45" },
                { query: "peinture seigneurie", date: "14 Jan 2025, 09:20" },
                { query: "tuyau pvc 100mm", date: "13 Jan 2025, 11:00" },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{h.query}</span>
                  </div>
                  <span className="text-sm text-gray-500">{h.date}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
