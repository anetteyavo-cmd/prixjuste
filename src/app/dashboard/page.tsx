"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, StatsCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { 
  Calculator, FileSearch, Search, Bell, Settings, TrendingUp, 
  ArrowRight, Plus, LogOut, Heart, ChevronRight, BarChart3, 
  FolderOpen, History, Home, Fence, Paintbrush, Zap, FileText,
  User, Loader2
} from "lucide-react";
import { formatPrice } from "@/data/mock-data";

const recentQuotes = [
  { id: 1, type: "maison", title: "Construction maison 150m²", city: "Abidjan", date: "15 Jan 2025", totalMin: 32000000, totalMax: 45000000 },
  { id: 2, type: "cloture", title: "Clôture 80ml", city: "Bouaké", date: "10 Jan 2025", totalMin: 4500000, totalMax: 6000000 },
  { id: 3, type: "peinture", title: "Peinture appartement", city: "Abidjan", date: "8 Jan 2025", totalMin: 850000, totalMax: 1200000 },
];

const typeIcons: Record<string, any> = { maison: Home, cloture: Fence, peinture: Paintbrush, electricite: Zap };

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Protéger la page - rediriger si non connecté
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/sign-in');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FA]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0F2A44] mx-auto" />
          <p className="mt-4 text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  // Ne rien afficher si pas connecté (la redirection va se faire)
  if (!user) {
    return null;
  }

  // Récupérer le nom de l'utilisateur
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0F2A44] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-[#0F2A44]">PrixJuste</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <Link href="/dashboard/settings" className="p-2 rounded-xl hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </Link>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-[#0F2A44] text-white flex items-center justify-center font-semibold text-sm">
                  {userInitials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, {userName.split(' ')[0]} 👋</h1>
            <p className="text-gray-500">Bienvenue sur votre tableau de bord PrixJuste</p>
          </div>
          <div className="flex gap-2">
            <Link href="/quote">
              <Button leftIcon={<Plus size={18} />}>Nouveau devis</Button>
            </Link>
            <Link href="/analyze">
              <Button variant="outline" leftIcon={<FileSearch size={18} />}>Analyser</Button>
            </Link>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {userInitials}
            </div>
            <div>
              <h2 className="text-xl font-bold">{userName}</h2>
              <p className="text-white/70">{user.email}</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">Plan Gratuit</Badge>
            </div>
            <div className="ml-auto hidden md:block">
              <Link href="/pricing">
                <Button className="bg-white text-[#0F2A44] hover:bg-white/90">
                  Passer à Pro
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: "overview", label: "Vue d'ensemble", icon: BarChart3 },
            { id: "quotes", label: "Mes devis", icon: Calculator },
            { id: "favorites", label: "Favoris", icon: Heart },
            { id: "history", label: "Historique", icon: History },
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#0F2A44] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Devis générés" value="0" icon={<Calculator className="w-6 h-6" />} />
              <StatsCard title="Analyses" value="0" icon={<FileSearch className="w-6 h-6" />} />
              <StatsCard title="Recherches" value="0" icon={<Search className="w-6 h-6" />} />
              <StatsCard title="Favoris" value="0" icon={<Heart className="w-6 h-6" />} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">Actions rapides</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Voir les prix", icon: Search, href: "/prices", color: "bg-blue-50 text-blue-600" },
                      { label: "Créer un devis", icon: Calculator, href: "/quote", color: "bg-green-50 text-green-600" },
                      { label: "Analyser", icon: FileSearch, href: "/analyze", color: "bg-yellow-50 text-yellow-600" },
                    ].map((action, i) => (
                      <Link key={i} href={action.href}>
                        <div className="p-4 rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-center">
                          <div className={`w-12 h-12 mx-auto rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                            <action.icon className="w-6 h-6" />
                          </div>
                          <p className="font-medium text-gray-900">{action.label}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Activité récente</h2>
                  </div>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <History className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Aucune activité pour le moment</p>
                    <p className="text-sm text-gray-400 mt-1">Commencez par créer un devis ou rechercher des prix</p>
                    <Link href="/quote">
                      <Button className="mt-4" size="sm">Créer mon premier devis</Button>
                    </Link>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Completion */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Compléter mon profil</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email vérifié</span>
                      <Badge variant="success" size="sm">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Téléphone</span>
                      <Badge variant="outline" size="sm">À ajouter</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ville</span>
                      <Badge variant="outline" size="sm">À ajouter</Badge>
                    </div>
                  </div>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" fullWidth size="sm" className="mt-4">
                      Compléter mon profil
                    </Button>
                  </Link>
                </Card>

                {/* Upgrade CTA */}
                <Card className="p-6 bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white">
                  <h3 className="font-semibold mb-2">Passez à Pro</h3>
                  <p className="text-sm text-white/70 mb-4">Débloquez toutes les fonctionnalités</p>
                  <ul className="text-sm text-white/80 space-y-2 mb-4">
                    <li>✓ Devis illimités</li>
                    <li>✓ 5 analyses/mois</li>
                    <li>✓ Export PDF</li>
                    <li>✓ Alertes de prix</li>
                  </ul>
                  <Link href="/pricing">
                    <Button className="w-full bg-white text-[#0F2A44] hover:bg-white/90">
                      Voir les plans
                    </Button>
                  </Link>
                </Card>

                {/* Help */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
                  <p className="text-sm text-gray-500 mb-4">Notre équipe est là pour vous</p>
                  <Link href="/help">
                    <Button variant="outline" fullWidth size="sm">Centre d'aide</Button>
                  </Link>
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
              <Link href="/quote">
                <Button size="sm" leftIcon={<Plus size={16} />}>Nouveau</Button>
              </Link>
            </div>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Vous n'avez pas encore de devis</p>
              <Link href="/quote">
                <Button className="mt-4">Créer mon premier devis</Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Mes favoris</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Vous n'avez pas encore de favoris</p>
              <p className="text-sm text-gray-400 mt-1">Ajoutez des prix en favoris pour les retrouver ici</p>
              <Link href="/prices">
                <Button className="mt-4">Explorer les prix</Button>
              </Link>
            </div>
          </Card>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Historique</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <History className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Aucun historique pour le moment</p>
              <p className="text-sm text-gray-400 mt-1">Vos recherches et actions apparaîtront ici</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
