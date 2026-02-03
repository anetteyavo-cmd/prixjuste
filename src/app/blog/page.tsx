"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Clock, User, ChevronRight, TrendingUp, Bookmark, Share2, ArrowRight, Sparkles } from "lucide-react";

const categories = ["Tous", "Actualités", "Conseils", "Tendances", "Guides", "Témoignages"];

const articles = [
  {
    id: 1,
    title: "Le prix du ciment en hausse de 8% : ce qu'il faut savoir",
    excerpt: "Une analyse complète des facteurs qui ont conduit à cette augmentation et nos prévisions pour les prochains mois.",
    category: "Tendances",
    author: "Amadou Koné",
    date: "15 Jan 2025",
    readTime: "5 min",
    image: "📈",
    featured: true,
  },
  {
    id: 2,
    title: "Guide complet : Construire sa maison en Côte d'Ivoire en 2025",
    excerpt: "De l'achat du terrain à la remise des clés, découvrez toutes les étapes et les coûts à prévoir.",
    category: "Guides",
    author: "Marie Kouassi",
    date: "12 Jan 2025",
    readTime: "15 min",
    image: "🏠",
    featured: true,
  },
  {
    id: 3,
    title: "5 erreurs à éviter lors de l'achat de matériaux",
    excerpt: "Les pièges classiques et comment les éviter pour économiser sur votre budget construction.",
    category: "Conseils",
    author: "Ibrahim Diallo",
    date: "10 Jan 2025",
    readTime: "7 min",
    image: "⚠️",
  },
  {
    id: 4,
    title: "Témoignage : Comment j'ai économisé 3 millions grâce à PrixJuste",
    excerpt: "Jean-Marc partage son expérience de construction et ses astuces pour optimiser son budget.",
    category: "Témoignages",
    author: "Jean-Marc Brou",
    date: "8 Jan 2025",
    readTime: "4 min",
    image: "💰",
  },
  {
    id: 5,
    title: "Les meilleurs fournisseurs de fer à béton à Abidjan",
    excerpt: "Notre sélection des fournisseurs les plus fiables avec les meilleurs rapports qualité-prix.",
    category: "Guides",
    author: "Sophie Bamba",
    date: "5 Jan 2025",
    readTime: "6 min",
    image: "🏗️",
  },
  {
    id: 6,
    title: "Nouveauté : L'analyse de devis par IA maintenant disponible",
    excerpt: "Découvrez notre nouvelle fonctionnalité qui vous permet de vérifier si un devis est au juste prix.",
    category: "Actualités",
    author: "Équipe PrixJuste",
    date: "1 Jan 2025",
    readTime: "3 min",
    image: "🤖",
  },
  {
    id: 7,
    title: "Prévisions 2025 : L'évolution des prix du BTP",
    excerpt: "Nos experts analysent les tendances et vous préparent aux changements à venir.",
    category: "Tendances",
    author: "Ibrahim Diallo",
    date: "28 Dec 2024",
    readTime: "10 min",
    image: "📊",
  },
  {
    id: 8,
    title: "Comment négocier avec un entrepreneur",
    excerpt: "Les techniques de négociation efficaces pour obtenir les meilleurs prix sans sacrifier la qualité.",
    category: "Conseils",
    author: "Amadou Koné",
    date: "25 Dec 2024",
    readTime: "8 min",
    image: "🤝",
  },
];

const trendingTopics = [
  { name: "Prix ciment", count: 234 },
  { name: "Construction maison", count: 189 },
  { name: "Devis travaux", count: 156 },
  { name: "Fer à béton", count: 98 },
  { name: "Fournisseurs Abidjan", count: 87 },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredArticles = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Tous" || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6">
            <ArrowLeft size={20} /> Retour
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge className="mb-4"><Sparkles size={14} className="mr-1" /> Blog</Badge>
              <h1 className="text-4xl font-bold text-gray-900">Actualités & Conseils</h1>
              <p className="text-gray-600 mt-2">Restez informé des tendances du BTP en Côte d'Ivoire</p>
            </div>
            <div className="w-full md:w-80">
              <SearchInput placeholder="Rechercher un article..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles */}
        {!search && activeCategory === "Tous" && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">À la une</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map(article => (
                <Card key={article.id} hover className="overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] flex items-center justify-center text-6xl">
                    {article.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" size="sm">{article.category}</Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#0F2A44] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center text-xs font-semibold">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0F2A44] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0F2A44] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {search ? `Résultats pour "${search}"` : activeCategory === "Tous" ? "Tous les articles" : activeCategory}
            </h2>
            
            {filteredArticles.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500">Aucun article trouvé</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory("Tous"); }}>
                  Voir tous les articles
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredArticles.filter(a => !a.featured || search || activeCategory !== "Tous").map(article => (
                  <Card key={article.id} hover className="flex gap-4 p-4 cursor-pointer group">
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#0F2A44]/10 to-[#1F3A5F]/10 flex items-center justify-center text-3xl">
                      {article.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" size="sm">{article.category}</Badge>
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#0F2A44] transition-colors line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <User size={12} /> {article.author}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {article.readTime}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredArticles.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline">Charger plus d'articles</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter */}
            <Card className="p-6 bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white">
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-sm text-white/70 mb-4">Recevez nos derniers articles et les tendances du marché</p>
              <input type="email" placeholder="votre@email.com" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 mb-3" />
              <Button className="w-full bg-white text-[#0F2A44] hover:bg-white/90">S'abonner</Button>
            </Card>

            {/* Trending */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0F2A44]" /> Tendances
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700">{topic.name}</span>
                    <span className="text-xs text-gray-400">{topic.count} articles</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Popular Articles */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Les plus lus</h3>
              <div className="space-y-4">
                {articles.slice(0, 4).map((article, i) => (
                  <div key={article.id} className="flex gap-3 cursor-pointer group">
                    <span className="text-2xl font-bold text-[#0F2A44]/20">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#0F2A44] transition-colors line-clamp-2">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{article.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Besoin d'un devis ?</h3>
              <p className="text-sm text-gray-500 mb-4">Estimez le coût de votre projet en 2 minutes</p>
              <Link href="/quote">
                <Button fullWidth rightIcon={<ArrowRight size={16} />}>Créer un devis</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
