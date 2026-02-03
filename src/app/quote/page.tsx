"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Home, Fence, Paintbrush, Zap, ArrowRight, ArrowLeft, Calculator, MapPin, Download, Share2, CheckCircle, Info, Sparkles, FileText } from "lucide-react";
import { cities, quoteTemplates, formatPrice } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const quoteIcons: Record<string, React.ReactNode> = {
  maison_m2: <Home className="w-6 h-6" />,
  cloture_ml: <Fence className="w-6 h-6" />,
  peinture: <Paintbrush className="w-6 h-6" />,
  electricite: <Zap className="w-6 h-6" />,
};

interface QuoteItem { label: string; quantity: number; unit: string; unitMin: number; unitMax: number; totalMin: number; totalMax: number; }
interface QuoteResult { title: string; type: string; city: string; items: QuoteItem[]; totalMin: number; totalMax: number; }

function calculateQuote(type: string, params: Record<string, string>, cityName: string): QuoteResult {
  const items: QuoteItem[] = [];
  
  if (type === "maison_m2") {
    const surface = parseInt(params.surface) || 100;
    const finition = params.finition || "standard";
    const mult = finition === "luxe" ? 1.5 : finition === "premium" ? 1.25 : 1;
    [{ label: "Fondation", min: 25000, max: 35000 }, { label: "Gros œuvre", min: 80000, max: 100000 }, { label: "Toiture", min: 30000, max: 45000 }, { label: "Électricité", min: 15000, max: 25000 }, { label: "Plomberie", min: 12000, max: 20000 }, { label: "Finitions", min: 40000, max: 60000 }].forEach(({ label, min, max }) => {
      items.push({ label, quantity: surface, unit: "m²", unitMin: Math.round(min * mult), unitMax: Math.round(max * mult), totalMin: Math.round(min * mult * surface), totalMax: Math.round(max * mult * surface) });
    });
  }
  if (type === "cloture_ml") {
    const length = parseInt(params.length) || 50;
    const height = parseFloat(params.height) || 2;
    items.push({ label: "Fondation", quantity: length, unit: "ml", unitMin: 8000, unitMax: 12000, totalMin: 8000 * length, totalMax: 12000 * length });
    items.push({ label: "Mur", quantity: length, unit: "ml", unitMin: 25000, unitMax: 35000, totalMin: 25000 * length, totalMax: 35000 * length });
    items.push({ label: "Portail", quantity: 1, unit: "forfait", unitMin: 150000, unitMax: 350000, totalMin: 150000, totalMax: 350000 });
  }
  if (type === "peinture") {
    const surface = parseInt(params.surface) || 100;
    items.push({ label: "Peinture", quantity: surface, unit: "m²", unitMin: 800, unitMax: 1200, totalMin: 800 * surface, totalMax: 1200 * surface });
    items.push({ label: "Main d'œuvre", quantity: surface, unit: "m²", unitMin: 600, unitMax: 1000, totalMin: 600 * surface, totalMax: 1000 * surface });
  }
  if (type === "electricite") {
    const rooms = parseInt(params.rooms) || 5;
    items.push({ label: "Points lumineux", quantity: rooms * 2, unit: "pts", unitMin: 15000, unitMax: 25000, totalMin: 30000 * rooms, totalMax: 50000 * rooms });
    items.push({ label: "Prises", quantity: rooms * 4, unit: "pcs", unitMin: 8000, unitMax: 15000, totalMin: 32000 * rooms, totalMax: 60000 * rooms });
    items.push({ label: "Tableau", quantity: 1, unit: "forfait", unitMin: 150000, unitMax: 300000, totalMin: 150000, totalMax: 300000 });
  }
  const totalMin = items.reduce((s, i) => s + i.totalMin, 0);
  const totalMax = items.reduce((s, i) => s + i.totalMax, 0);
  return { title: `Devis ${quoteTemplates.find(t => t.type === type)?.name || type}`, type, city: cityName, items, totalMin, totalMax };
}

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const template = quoteTemplates.find(t => t.type === selectedType);

  const handleNext = () => {
    if (step === 1 && selectedType) setStep(2);
    else if (step === 2 && selectedCity) setStep(3);
    else if (step === 3) {
      setIsCalculating(true);
      setTimeout(() => {
        const cityName = cities.find(c => c.slug === selectedCity)?.name || selectedCity;
        setResult(calculateQuote(selectedType!, params, cityName));
        setIsCalculating(false);
        setStep(4);
      }, 1500);
    }
  };

  const reset = () => { setStep(1); setSelectedType(null); setSelectedCity(""); setParams({}); setResult(null); };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4"><ArrowLeft size={20} /> Retour</Link>
          <div className="text-center">
            <Badge className="mb-4"><Sparkles size={14} className="mr-1" />Générateur intelligent</Badge>
            <h1 className="text-3xl font-bold text-gray-900">Créer un devis</h1>
            <p className="text-gray-500 mt-2">Estimez le coût de votre projet</p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            {["Type", "Ville", "Détails", "Résultat"].map((label, i) => (
              <div key={i} className={cn("flex items-center gap-2", i + 1 <= step ? "text-[#0F2A44]" : "text-gray-400")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", i + 1 < step ? "bg-[#0F2A44] text-white" : i + 1 === step ? "bg-[#0F2A44]/10 border-2 border-[#0F2A44]" : "bg-gray-100")}>
                  {i + 1 < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quel type de projet ?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quoteTemplates.map((t) => (
                <Card key={t.type} hover className={cn("cursor-pointer", selectedType === t.type && "ring-2 ring-[#0F2A44]")} onClick={() => setSelectedType(t.type)}>
                  <div className="flex items-start gap-4">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", selectedType === t.type ? "bg-[#0F2A44] text-white" : "bg-[#0F2A44]/10 text-[#0F2A44]")}>{quoteIcons[t.type]}</div>
                    <div className="flex-1"><h3 className="font-semibold text-gray-900">{t.name}</h3><p className="text-sm text-gray-500 mt-1">{t.description}</p></div>
                    {selectedType === t.type && <CheckCircle className="text-[#0F2A44]" size={24} />}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dans quelle ville ?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {cities.map((c) => (
                <Card key={c.id} hover className={cn("cursor-pointer text-center py-6", selectedCity === c.slug && "ring-2 ring-[#0F2A44]")} onClick={() => setSelectedCity(c.slug)}>
                  <MapPin className={cn("w-8 h-8 mx-auto mb-2", selectedCity === c.slug ? "text-[#0F2A44]" : "text-gray-400")} />
                  <p className="font-medium text-gray-900">{c.name}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && template && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Détails du projet</h2>
            <Card className="p-6">
              <div className="space-y-6">
                {template.fields.map((f: any) => (
                  <div key={f.name}>
                    {f.type === "number" && <Input label={f.label} type="number" min={f.min} max={f.max} value={params[f.name] || ""} onChange={(e) => setParams({ ...params, [f.name]: e.target.value })} hint={f.unit ? `En ${f.unit}` : undefined} />}
                    {f.type === "select" && f.options && <Select label={f.label} value={params[f.name] || f.defaultValue || ""} onChange={(e) => setParams({ ...params, [f.name]: e.target.value })} options={f.options} />}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#0F2A44]/5 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[#0F2A44] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Prix moyens à {cities.find(c => c.slug === selectedCity)?.name}.</p>
              </div>
            </Card>
          </div>
        )}

        {step === 4 && result && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Votre estimation</h2>
              <div className="flex gap-2"><Button variant="outline" size="sm" leftIcon={<Share2 size={16} />}>Partager</Button><Button variant="outline" size="sm" leftIcon={<Download size={16} />}>PDF</Button></div>
            </div>
            <Card className="p-6 mb-6 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white">
              <div className="flex items-center justify-between">
                <div><p className="text-white/70">Estimation totale</p><p className="text-3xl font-bold mt-1">{formatPrice(result.totalMin)} - {formatPrice(result.totalMax)}</p><p className="text-white/70 mt-2">{result.title} • {result.city}</p></div>
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">{quoteIcons[result.type] || <FileText className="w-10 h-10" />}</div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Détail des postes</h3>
              <div className="space-y-4">
                {result.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div><p className="font-medium text-gray-900">{item.label}</p><p className="text-sm text-gray-500">{item.quantity} {item.unit}</p></div>
                    <div className="text-right"><p className="font-bold text-[#0F2A44]">{formatPrice(item.totalMin)}</p><p className="text-sm text-gray-500">à {formatPrice(item.totalMax)}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t flex justify-between text-lg"><span className="font-semibold">Total</span><span className="font-bold text-[#0F2A44]">{formatPrice(result.totalMin)} - {formatPrice(result.totalMax)}</span></div>
            </Card>
            <div className="mt-6 flex gap-4"><Button variant="outline" onClick={reset} fullWidth>Nouveau devis</Button><Link href="/analyze" className="flex-1"><Button fullWidth>Analyser un devis</Button></Link></div>
          </div>
        )}

        {isCalculating && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 relative"><div className="absolute inset-0 border-4 border-[#0F2A44]/20 rounded-full" /><div className="absolute inset-0 border-4 border-[#0F2A44] border-t-transparent rounded-full animate-spin" /></div>
            <p className="text-lg font-medium text-gray-900">Calcul en cours...</p>
          </div>
        )}

        {step < 4 && !isCalculating && (
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 1} leftIcon={<ArrowLeft size={18} />}>Retour</Button>
            <Button onClick={handleNext} disabled={(step === 1 && !selectedType) || (step === 2 && !selectedCity)} rightIcon={<ArrowRight size={18} />}>{step === 3 ? "Calculer" : "Suivant"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
