"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchInput, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, MapPin, Phone, Globe, Star, CheckCircle, Clock, ChevronRight, Building2, Zap, Droplets, Paintbrush, Filter, Award, Shield, Sparkles } from "lucide-react";

const suppliers = [
  {
    id: 1,
    name: "CIMAF Distribution",
    category: "Ciment & Agrégats",
    sector: "batiment",
    city: "Abidjan",
    address: "Zone Industrielle Yopougon",
    phone: "+225 27 24 00 00 00",
    website: "www.cimaf.ci",
    rating: 4.8,
    reviews: 156,
    verified: true,
    premium: true,
    description: "Distributeur officiel CIMAF, large stock permanent, livraison rapide sur Abidjan.",
    products: ["Ciment", "Gravier", "Sable"],
    priceLevel: "$$",
    deliveryTime: "24h",
  },
  {
    id: 2,
    name: "Fer Plus CI",
    category: "Métallurgie",
    sector: "batiment",
    city: "Abidjan",
    address: "Boulevard du Port, Treichville",
    phone: "+225 27 21 00 00 00",
    website: "www.ferplus.ci",
    rating: 4.6,
    reviews: 98,
    verified: true,
    premium: true,
    description: "Spécialiste du fer à béton et acier de construction. Import direct, prix compétitifs.",
    products: ["Fer à béton", "Acier", "Treillis"],
    priceLevel: "$$$",
    deliveryTime: "48h",
  },
  {
    id: 3,
    name: "ElectroPro Côte d'Ivoire",
    category: "Matériel électrique",
    sector: "electricite",
    city: "Abidjan",
    address: "Marcory Zone 4",
    phone: "+225 07 00 00 00 00",
    website: "www.electropro.ci",
    rating: 4.5,
    reviews: 67,
    verified: true,
    premium: false,
    description: "Distributeur Legrand et Schneider. Câbles, tableaux, prises et interrupteurs.",
    products: ["Câbles", "Prises", "Tableaux"],
    priceLevel: "$$",
    deliveryTime: "24h",
  },
  {
    id: 4,
    name: "Plomberie Générale",
    category: "Plomberie & Sanitaire",
    sector: "plomberie",
    city: "Abidjan",
    address: "Adjamé, près du Forum",
    phone: "+225 07 00 00 00 01",
    rating: 4.3,
    reviews: 45,
    verified: true,
    premium: false,
    description: "Tout pour la plomberie : tuyaux PVC, robinetterie, sanitaires. Conseils professionnels.",
    products: ["Tuyaux PVC", "Robinets", "WC"],
    priceLevel: "$",
    deliveryTime: "Immédiat",
  },
  {
    id: 5,
    name: "Peintures Seigneurie CI",
    category: "Peintures & Revêtements",
    sector: "peinture",
    city: "Abidjan",
    address: "Cocody Riviera 2",
    phone: "+225 27 22 00 00 00",
    website: "www.seigneurie.ci",
    rating: 4.9,
    reviews: 203,
    verified: true,
    premium: true,
    description: "Distributeur officiel Seigneurie. Peintures premium, vernis, enduits professionnels.",
    products: ["Peintures", "Vernis", "Enduits"],
    priceLevel: "$$$",
    deliveryTime: "24h",
  },
  {
    id: 6,
    name: "Quincaillerie du Centre",
    category: "Quincaillerie",
    sector: "batiment",
    city: "Bouaké",
    address: "Centre-ville, Avenue principale",
    phone: "+225 07 00 00 00 02",
    rating: 4.2,
    reviews: 34,
    verified: false,
    premium: false,
    description: "Quincaillerie générale, outillage, visserie. Le plus grand stock de Bouaké.",
    products: ["Outillage", "Visserie", "Serrurerie"],
    priceLevel: "$",
    deliveryTime: "Immédiat",
  },
  {
    id: 7,
    name: "Bois & Menuiserie Pro",
    category: "Menuiserie",
    sector: "menuiserie",
    city: "Abidjan",
    address: "Zone Industrielle Koumassi",
    phone: "+225 27 21 00 00 01",
    rating: 4.4,
    reviews: 56,
    verified: true,
    premium: false,
    description: "Portes, fenêtres, parquets. Bois local et importé. Fabrication sur mesure.",
    products: ["Portes", "Fenêtres", "Parquets"],
    priceLevel: "$$",
    deliveryTime: "1 semaine",
  },
  {
    id: 8,
    name: "MatériCI Express",
    category: "Matériaux généraux",
    sector: "batiment",
    city: "Yamoussoukro",
    address: "Quartier Habitat",
    phone: "+225 07 00 00 00 03",
    rating: 4.1,
    reviews: 28,
    verified: true,
    premium: false,
    description: "Tous matériaux de construction disponibles. Livraison gratuite sur Yamoussoukro.",
    products: ["Ciment", "Parpaings", "Fer"],
    priceLevel: "$$",
    deliveryTime: "24h",
  },
];

const sectorIcons: Record<string, any> = {
  batiment: Building2,
  electricite: Zap,
  plomberie: Droplets,
  menuiserie: Building2,
  peinture: Paintbrush,
};

const cities = ["Toutes", "Abidjan", "Bouaké", "Yamoussoukro", "San-Pédro", "Korhogo"];
const sectors = [
  { value: "", label: "Tous les secteurs" },
  { value: "batiment", label: "Bâtiment" },
  { value: "electricite", label: "Électricité" },
  { value: "plomberie", label: "Plomberie" },
  { value: "menuiserie", label: "Menuiserie" },
  { value: "peinture", label: "Peinture" },
];

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedSector, setSelectedSector] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredSuppliers = suppliers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.products.some(p => p.toLowerCase().includes(search.toLowerCase()));
    const matchCity = selectedCity === "Toutes" || s.city === selectedCity;
    const matchSector = !selectedSector || s.sector === selectedSector;
    const matchVerified = !verifiedOnly || s.verified;
    return matchSearch && matchCity && matchSector && matchVerified;
  });

  const premiumSuppliers = filteredSuppliers.filter(s => s.premium);
  const regularSuppliers = filteredSuppliers.filter(s => !s.premium);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6">
            <ArrowLeft size={20} /> Retour
          </Link>
          <Badge className="mb-4"><Award size={14} className="mr-1" /> Annuaire</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fournisseurs vérifiés</h1>
          <p className="text-gray-600">Trouvez les meilleurs fournisseurs de matériaux en Côte d'Ivoire</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchInput placeholder="Rechercher un fournisseur ou produit..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm">
                {sectors.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${verifiedOnly ? 'bg-[#0F2A44] text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                <Shield size={16} /> Vérifiés uniquement
              </button>
            </div>
          </div>
        </Card>

        {/* Results count */}
        <p className="text-gray-500 mb-6">{filteredSuppliers.length} fournisseurs trouvés</p>

        {/* Premium Suppliers */}
        {premiumSuppliers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> Fournisseurs Premium
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {premiumSuppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Suppliers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tous les fournisseurs</h2>
          {regularSuppliers.length === 0 && premiumSuppliers.length === 0 ? (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun fournisseur trouvé</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSelectedCity("Toutes"); setSelectedSector(""); setVerifiedOnly(false); }}>
                Réinitialiser les filtres
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {regularSuppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Vous êtes fournisseur ?</h2>
          <p className="text-white/70 mb-6">Rejoignez notre annuaire et touchez des milliers de clients potentiels</p>
          <Link href="/contact">
            <Button className="bg-white text-[#0F2A44] hover:bg-white/90">Devenir partenaire</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

function SupplierCard({ supplier }: { supplier: typeof suppliers[0] }) {
  const Icon = sectorIcons[supplier.sector] || Building2;
  
  return (
    <Card hover className="p-6 relative">
      {supplier.premium && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-50 text-yellow-600 border-yellow-200">
            <Sparkles size={12} className="mr-1" /> Premium
          </Badge>
        </div>
      )}
      
      <div className="flex gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
          supplier.sector === 'electricite' ? 'bg-yellow-50 text-yellow-600' :
          supplier.sector === 'plomberie' ? 'bg-blue-50 text-blue-600' :
          supplier.sector === 'peinture' ? 'bg-pink-50 text-pink-600' :
          'bg-[#0F2A44]/10 text-[#0F2A44]'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
            {supplier.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
          <p className="text-sm text-gray-500">{supplier.category}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{supplier.rating}</span>
              <span className="text-xs text-gray-400">({supplier.reviews})</span>
            </div>
            <span className="text-sm text-gray-500">{supplier.priceLevel}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={12} /> {supplier.deliveryTime}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-4 line-clamp-2">{supplier.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {supplier.products.map((p, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{p}</span>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin size={14} /> {supplier.city}
        </span>
        {supplier.phone && (
          <a href={`tel:${supplier.phone}`} className="text-sm text-[#0F2A44] font-medium flex items-center gap-1">
            <Phone size={14} /> Appeler
          </a>
        )}
        {supplier.website && (
          <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0F2A44] font-medium flex items-center gap-1">
            <Globe size={14} /> Site web
          </a>
        )}
      </div>
    </Card>
  );
}
