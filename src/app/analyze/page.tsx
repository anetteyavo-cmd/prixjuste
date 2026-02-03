"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Upload, FileText, X, CheckCircle, AlertTriangle, XCircle, ArrowRight, Info, Sparkles, ArrowLeft } from "lucide-react";
import { cities, formatPrice } from "@/data/mock-data";
import { cn } from "@/lib/utils";

type Verdict = "NORMAL" | "ELEVATED" | "ABUSIVE";
interface AnalysisResult { verdict: Verdict; score: number; totalAmount: number; expectedMin: number; expectedMax: number; items: { label: string; amount: number; verdict: Verdict }[]; }

const verdictConfig = {
  NORMAL: { label: "Prix normal", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-8 h-8" /> },
  ELEVATED: { label: "Prix élevé", color: "text-yellow-600", bg: "bg-yellow-50", icon: <AlertTriangle className="w-8 h-8" /> },
  ABUSIVE: { label: "Prix abusif", color: "text-red-600", bg: "bg-red-50", icon: <XCircle className="w-8 h-8" /> },
};

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ totalAmount: "", city: "", projectType: "" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && (f.type === "application/pdf" || f.type.startsWith("image/"))) setFile(f);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) setFile(e.target.files[0]); };

  const analyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const total = parseInt(formData.totalAmount) || 25000000;
      const expectedMax = Math.round(total * 0.85);
      const expectedMin = Math.round(total * 0.65);
      const overcharge = Math.round(((total - expectedMax) / expectedMax) * 100);
      let verdict: Verdict = "NORMAL";
      if (overcharge > 30) verdict = "ABUSIVE";
      else if (overcharge > 10) verdict = "ELEVATED";

      setResult({
        verdict, score: overcharge, totalAmount: total, expectedMin, expectedMax,
        items: [
          { label: "Gros œuvre", amount: Math.round(total * 0.4), verdict: overcharge > 20 ? "ELEVATED" : "NORMAL" },
          { label: "Toiture", amount: Math.round(total * 0.15), verdict: "NORMAL" },
          { label: "Électricité", amount: Math.round(total * 0.12), verdict: overcharge > 15 ? "ABUSIVE" : "NORMAL" },
          { label: "Finitions", amount: Math.round(total * 0.23), verdict: overcharge > 25 ? "ELEVATED" : "NORMAL" },
        ],
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const reset = () => { setFile(null); setFormData({ totalAmount: "", city: "", projectType: "" }); setResult(null); };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4"><ArrowLeft size={20} /> Retour</Link>
          <div className="text-center">
            <Badge variant="warning" className="mb-4"><Sparkles size={14} className="mr-1" />Analyse intelligente</Badge>
            <h1 className="text-3xl font-bold text-gray-900">Analyser un devis</h1>
            <p className="text-gray-500 mt-2">Uploadez un devis et découvrez si les prix sont justes</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result && !isAnalyzing && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">1. Uploadez votre devis</h2>
              <div onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop} onClick={() => document.getElementById("file-input")?.click()} className={cn("border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors", file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#0F2A44] hover:bg-[#0F2A44]/5")}>
                <input id="file-input" type="file" accept=".pdf,image/*" onChange={handleFileSelect} className="hidden" />
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-4"><FileText size={32} /></div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-sm text-red-600 hover:underline flex items-center gap-1"><X size={14} /> Supprimer</button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center mx-auto mb-4"><Upload size={32} /></div>
                    <p className="font-medium text-gray-900">Glissez votre devis ici</p>
                    <p className="text-sm text-gray-500 mt-2">PDF ou image (max 10 MB)</p>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">2. Informations</h2>
              <div className="space-y-4">
                <Input label="Montant total du devis" type="number" placeholder="Ex: 25000000" value={formData.totalAmount} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} hint="En FCFA" required />
                <Select label="Ville" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} options={[{ value: "", label: "Sélectionnez" }, ...cities.map(c => ({ value: c.slug, label: c.name }))]} required />
                <Select label="Type de projet" value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} options={[{ value: "", label: "Sélectionnez" }, { value: "maison", label: "Construction maison" }, { value: "cloture", label: "Clôture" }, { value: "renovation", label: "Rénovation" }]} />
              </div>
            </Card>

            <div className="p-4 bg-[#0F2A44]/5 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0F2A44] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">L'analyse coûte <strong>2 000 FCFA</strong>. Vous ne payez que pour les détails complets.</p>
            </div>

            <Button fullWidth size="lg" onClick={analyze} disabled={!formData.totalAmount || !formData.city} rightIcon={<ArrowRight size={18} />}>Analyser le devis</Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 relative"><div className="absolute inset-0 border-4 border-[#0F2A44]/20 rounded-full" /><div className="absolute inset-0 border-4 border-[#0F2A44] border-t-transparent rounded-full animate-spin" /></div>
            <p className="text-xl font-medium text-gray-900">Analyse en cours...</p>
            <p className="text-gray-500 mt-2">Comparaison avec notre base de prix</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className={cn("p-8 text-center", verdictConfig[result.verdict].bg)}>
              <div className={cn("w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center", verdictConfig[result.verdict].bg, verdictConfig[result.verdict].color)}>{verdictConfig[result.verdict].icon}</div>
              <h2 className={cn("text-2xl font-bold", verdictConfig[result.verdict].color)}>{verdictConfig[result.verdict].label}</h2>
              <p className="text-gray-600 mt-2">{result.score > 0 ? `Ce devis est ${result.score}% au-dessus du prix juste` : "Ce devis est dans la moyenne"}</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div><p className="text-sm text-gray-500">Devis reçu</p><p className="text-xl font-bold text-gray-900">{formatPrice(result.totalAmount)}</p></div>
                <div><p className="text-sm text-gray-500">Prix juste estimé</p><p className="text-xl font-bold text-green-600">{formatPrice(result.expectedMin)} - {formatPrice(result.expectedMax)}</p></div>
                <div><p className="text-sm text-gray-500">Écart</p><p className={cn("text-xl font-bold", result.score > 20 ? "text-red-600" : result.score > 10 ? "text-yellow-600" : "text-green-600")}>{result.score > 0 ? "+" : ""}{result.score}%</p></div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Analyse par poste</h3>
              <div className="space-y-3">
                {result.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div><p className="font-medium text-gray-900">{item.label}</p></div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-gray-900">{formatPrice(item.amount)}</p>
                      <Badge variant={item.verdict === "NORMAL" ? "success" : item.verdict === "ELEVATED" ? "warning" : "danger"} size="sm">
                        {item.verdict === "NORMAL" ? "OK" : item.verdict === "ELEVATED" ? "Élevé" : "Abusif"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={reset} fullWidth>Nouvelle analyse</Button>
              <Link href="/quote" className="flex-1"><Button fullWidth>Générer mon propre devis</Button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
