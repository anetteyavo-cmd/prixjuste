"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Target, Eye, Heart, Users, Award, MapPin, Linkedin, Twitter, Mail, Building2, TrendingUp, Shield, Sparkles } from "lucide-react";

const team = [
  { name: "Amadou Koné", role: "CEO & Fondateur", image: "AK", bio: "15 ans d'expérience dans le BTP en Côte d'Ivoire" },
  { name: "Marie Kouassi", role: "CTO", image: "MK", bio: "Ex-ingénieure chez Orange CI, experte en tech" },
  { name: "Ibrahim Diallo", role: "Head of Data", image: "ID", bio: "Data scientist, spécialiste des marchés africains" },
  { name: "Sophie Bamba", role: "Head of Sales", image: "SB", bio: "10 ans dans la vente B2B, réseau BTP solide" },
];

const milestones = [
  { year: "2023", title: "Création", desc: "Lancement de l'idée PrixJuste à Abidjan" },
  { year: "2024", title: "Lancement", desc: "Première version avec 500 prix référencés" },
  { year: "2024", title: "Expansion", desc: "Couverture de 8 villes ivoiriennes" },
  { year: "2025", title: "Croissance", desc: "2,500+ utilisateurs actifs, 1,500+ prix" },
];

const values = [
  { icon: Shield, title: "Transparence", desc: "Des prix vérifiés et des sources fiables" },
  { icon: Heart, title: "Accessibilité", desc: "Des outils gratuits pour tous" },
  { icon: TrendingUp, title: "Innovation", desc: "La technologie au service du BTP" },
  { icon: Users, title: "Communauté", desc: "Construire ensemble un marché plus juste" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8">
            <ArrowLeft size={20} /> Retour
          </Link>
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <Sparkles size={14} className="mr-1" /> Notre histoire
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de PrixJuste</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Nous révolutionnons le marché du BTP en Côte d'Ivoire en rendant les prix transparents et accessibles à tous.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="p-8 bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
            <p className="text-white/80 leading-relaxed">
              Démocratiser l'accès aux informations de prix dans le secteur du BTP en Côte d'Ivoire, 
              permettant à chaque particulier et professionnel de prendre des décisions éclairées 
              et d'éviter les arnaques.
            </p>
          </Card>
          <Card className="p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Devenir la référence incontournable des prix du BTP en Afrique de l'Ouest, 
              contribuant à un marché plus transparent, équitable et professionnel 
              pour tous les acteurs du secteur.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Nos valeurs</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Ce qui nous guide</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} hover className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center mb-4">
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Notre parcours</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Les grandes étapes</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#0F2A44]/10 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <Card className="p-6 inline-block">
                      <Badge variant="outline" className="mb-2">{m.year}</Badge>
                      <h3 className="font-semibold text-gray-900">{m.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[#0F2A44] text-white items-center justify-center font-bold z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">L'équipe</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Les personnes derrière PrixJuste</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={i} hover className="text-center py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {member.image}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-[#0F2A44] font-medium">{member.role}</p>
                <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0F2A44]">
                    <Linkedin size={18} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0F2A44]">
                    <Twitter size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="p-8 md:p-12 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,500+", label: "Prix référencés" },
              { value: "8", label: "Villes couvertes" },
              { value: "2,500+", label: "Utilisateurs actifs" },
              { value: "15M+", label: "FCFA économisés" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl font-bold">{s.value}</p>
                <p className="text-white/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rejoignez l'aventure PrixJuste</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Que vous soyez particulier, entrepreneur ou fournisseur, PrixJuste est fait pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg">Créer un compte gratuit</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Nous contacter</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
