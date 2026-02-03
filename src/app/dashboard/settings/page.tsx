"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select, Checkbox } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, User, Mail, Phone, Lock, Bell, CreditCard, Shield, Trash2, Download, LogOut, Check, ChevronRight, Crown, Zap, Building2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({ email: true, push: true, alerts: true, newsletter: false });

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Abonnement", icon: CreditCard },
    { id: "security", label: "Sécurité", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} /> Retour au dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-500 mt-1">Gérez votre compte et vos préférences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id ? 'bg-[#0F2A44] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
            <hr className="my-4" />
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50">
              <LogOut size={20} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-[#0F2A44] text-white flex items-center justify-center text-2xl font-bold">JK</div>
                  <div>
                    <Button variant="outline" size="sm">Changer la photo</Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG. Max 2MB</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Prénom" defaultValue="Jean" leftIcon={<User size={18} />} />
                    <Input label="Nom" defaultValue="Kouadio" />
                  </div>
                  <Input label="Email" type="email" defaultValue="jean.kouadio@email.com" leftIcon={<Mail size={18} />} />
                  <Input label="Téléphone" type="tel" defaultValue="+225 07 12 34 56 78" leftIcon={<Phone size={18} />} />
                  <Select label="Ville principale" defaultValue="abidjan" options={[
                    { value: "abidjan", label: "Abidjan" },
                    { value: "bouake", label: "Bouaké" },
                    { value: "yamoussoukro", label: "Yamoussoukro" },
                  ]} />
                </div>
                <div className="mt-6 flex justify-end"><Button>Enregistrer</Button></div>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notification</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Notifications par email</p>
                      <p className="text-sm text-gray-500">Recevez les alertes et mises à jour par email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.email} onChange={e => setNotifications({...notifications, email: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-[#0F2A44]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F2A44]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Alertes de prix</p>
                      <p className="text-sm text-gray-500">Soyez notifié quand un prix atteint votre cible</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.alerts} onChange={e => setNotifications({...notifications, alerts: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-[#0F2A44]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F2A44]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-500">Conseils et actualités du BTP chaque semaine</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notifications.newsletter} onChange={e => setNotifications({...notifications, newsletter: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-[#0F2A44]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F2A44]"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="bg-white/20 text-white mb-2"><Zap size={14} className="mr-1" /> Plan actuel</Badge>
                      <h2 className="text-2xl font-bold">Pro</h2>
                      <p className="text-white/70 mt-1">5 000 FCFA/mois</p>
                    </div>
                    <Crown className="w-16 h-16 text-white/20" />
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link href="/pricing"><Button className="bg-white text-[#0F2A44] hover:bg-white/90">Changer de plan</Button></Link>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Annuler</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Moyens de paiement</h3>
                  <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">OM</div>
                      <div>
                        <p className="font-medium">Orange Money</p>
                        <p className="text-sm text-gray-500">•••• 5678</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Par défaut</Badge>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4" leftIcon={<CreditCard size={16} />}>Ajouter un moyen de paiement</Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Historique des factures</h3>
                  <div className="space-y-3">
                    {[
                      { date: "1 Jan 2025", amount: 5000, status: "paid" },
                      { date: "1 Dec 2024", amount: 5000, status: "paid" },
                      { date: "1 Nov 2024", amount: 5000, status: "paid" },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{f.date}</p>
                          <p className="text-sm text-gray-500">{f.amount.toLocaleString()} FCFA</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="success" size="sm">Payée</Badge>
                          <button className="text-[#0F2A44]"><Download size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Changer le mot de passe</h2>
                  <div className="space-y-4">
                    <Input label="Mot de passe actuel" type="password" leftIcon={<Lock size={18} />} />
                    <Input label="Nouveau mot de passe" type="password" leftIcon={<Lock size={18} />} hint="Minimum 8 caractères" />
                    <Input label="Confirmer le mot de passe" type="password" leftIcon={<Lock size={18} />} />
                  </div>
                  <div className="mt-6"><Button>Mettre à jour</Button></div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Sessions actives</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Chrome - MacOS</p>
                        <p className="text-sm text-gray-500">Abidjan • Session actuelle</p>
                      </div>
                      <Badge variant="success" size="sm">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Safari - iPhone</p>
                        <p className="text-sm text-gray-500">Abidjan • Il y a 2 jours</p>
                      </div>
                      <button className="text-red-500 text-sm font-medium">Déconnecter</button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-red-200 bg-red-50/50">
                  <h3 className="font-semibold text-red-600 mb-2">Zone de danger</h3>
                  <p className="text-sm text-gray-600 mb-4">La suppression de votre compte est irréversible.</p>
                  <Button variant="danger" leftIcon={<Trash2 size={16} />}>Supprimer mon compte</Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
