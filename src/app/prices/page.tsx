"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchInput, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Filter, Grid3X3, List, MapPin, Building2, X, ChevronRight, Clock, ArrowLeft } from "lucide-react";
import { sectors, categories, cities, pricePoints, formatPrice, getCategoryById, getCityById } from "@/data/mock-data";
import { cn } from "@/lib/utils";

function PricesContent() {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get("sector") || "";
  
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState(initialSector);
  const [selectedCity, setSelectedCity] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPrices = useMemo(() => {
    let result = pricePoints.filter(p => p.status === "PUBLISHED");

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => {
        const category = getCategoryById(p.categoryId);
        const city = getCityById(p.cityId);
        return category?.name.toLowerCase().includes(searchLower) || city?.name.toLowerCase().includes(searchLower) || p.brand?.toLowerCase().includes(searchLower);
      });
    }

    if (selectedSector) {
      const sectorCategories = categories.filter(c => {
        const sector = sectors.find(s => s.id === c.sectorId);
        return sector?.slug === selectedSector;
      });
      const categoryIds = sectorCategories.map(c => c.id);
      result = result.filter(p => categoryIds.includes(p.categoryId));
    }

    if (selectedCity) {
      result = result.filter(p => {
        const city = getCityById(p.cityId);
        return city?.slug === selectedCity;
      });
    }

    return result;
  }, [search, selectedSector, selectedCity]);

  const clearFilters = () => {
    setSearch("");
    setSelectedSector("");
    setSelectedCity("");
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} /> Retour
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catalogue des prix</h1>
              <p className="text-gray-500 mt-1">{filteredPrices.length} prix disponibles</p>
            </div>
            <Badge variant="success" dot pulse>
              <Clock size={14} className="mr-1" /> Mis à jour aujourd'hui
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchInput placeholder="Rechercher un matériau, une ville..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} options={[{ value: "", label: "Tous les secteurs" }, ...sectors.map(s => ({ value: s.slug, label: s.name }))]} className="w-40" />
            <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} options={[{ value: "", label: "Toutes les villes" }, ...cities.map(c => ({ value: c.slug, label: c.name }))]} className="w-40" />
            {(selectedSector || selectedCity || search) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>Effacer</Button>
            )}
          </div>
        </div>

        {/* Sector pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <button onClick={() => setSelectedSector("")} className={cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all", !selectedSector ? "bg-[#0F2A44] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200")}>
            Tous
          </button>
          {sectors.map((sector) => (
            <button key={sector.id} onClick={() => setSelectedSector(sector.slug)} className={cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all", selectedSector === sector.slug ? "bg-[#0F2A44] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200")}>
              {sector.name}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500"><span className="font-semibold text-gray-900">{filteredPrices.length}</span> résultats</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-colors", viewMode === "grid" ? "bg-[#0F2A44]/10 text-[#0F2A44]" : "text-gray-400 hover:bg-gray-100")}>
              <Grid3X3 size={20} />
            </button>
            <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-colors", viewMode === "list" ? "bg-[#0F2A44]/10 text-[#0F2A44]" : "text-gray-400 hover:bg-gray-100")}>
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredPrices.length === 0 ? (
          <Card className="p-12 text-center">
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun prix trouvé</h3>
            <p className="text-gray-500 mb-4">Essayez de modifier vos filtres</p>
            <Button onClick={clearFilters}>Effacer les filtres</Button>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPrices.map((price) => {
              const category = getCategoryById(price.categoryId);
              const city = getCityById(price.cityId);
              return (
                <Card key={price.id} hover className="group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#0F2A44] transition-colors">{category?.name}</h4>
                      <p className="text-sm text-gray-500">{city?.name}</p>
                    </div>
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", price.confidence >= 80 ? "bg-green-50 text-green-600" : price.confidence >= 60 ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600")}>
                      {price.confidence}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#0F2A44]">{formatPrice(price.priceMin)}</span>
                      {price.priceMin !== price.priceMax && (
                        <>
                          <span className="text-gray-400">-</span>
                          <span className="text-lg font-bold text-[#0F2A44]">{formatPrice(price.priceMax)}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">par {category?.unit || "unité"}</p>
                    {(price.quality || price.brand) && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {price.quality && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{price.quality}</span>}
                        {price.brand && <span className="text-xs px-2 py-0.5 bg-[#0F2A44]/5 text-[#0F2A44] rounded">{price.brand}</span>}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPrices.map((price) => {
              const category = getCategoryById(price.categoryId);
              const city = getCityById(price.cityId);
              return (
                <Card key={price.id} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category?.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={14} /> {city?.name}
                          {price.quality && <><span>•</span><span>{price.quality}</span></>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#0F2A44]">{formatPrice(price.priceMin)}</p>
                        <p className="text-sm text-gray-500">par {category?.unit || "unité"}</p>
                      </div>
                      <Badge variant={price.confidence >= 80 ? "success" : price.confidence >= 60 ? "warning" : "danger"}>
                        {price.confidence}%
                      </Badge>
                      <ChevronRight className="text-gray-400" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#0F2A44]/20 border-t-[#0F2A44] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Chargement...</p>
      </div>
    </div>
  );
}

export default function PricesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PricesContent />
    </Suspense>
  );
}
