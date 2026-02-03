"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X, Sparkles, Zap, Building2, ArrowRight, ArrowLeft } from "lucide-react";
import { plans, formatPrice } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const planFeatures: Record<string, { included: string[]; excluded: string[] }> = {
  free: { included: ["5 recherches/jour", "3 devis/mois", "Historique 30 jours", "Support email"], excluded: ["Analyses de devis", "Alertes de prix", "Export PDF", "API"] },
  pro: { included: ["Recherches illimitées", "Devis illimités", "5 analyses/mois", "Historique complet", "Alertes email", "Export PDF", "Support prioritaire"], excluded: ["API access"] },
  business: { included: ["Tout le plan Pro", "Analyses illimitées", "API access", "Dashboard équipe", "Factures personnalisées", "Account manager", "Formation"], excluded: [] },
};

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8"><ArrowLeft size={20} /> Retour</Link>
          <Badge className="mb-4"><Sparkles size={14} className="mr-1" />Tarifs transparents</Badge>
          <h1 className="text-4xl font-bold text-gray-900">Choisissez votre plan</h1>
          <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">Commencez gratuitement et évoluez selon vos besoins</p>

          <div className="mt-8 inline-flex items-center gap-4 p-1 bg-gray-100 rounded-xl">
            <button onClick={() => setBilling("monthly")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", billing === "monthly" ? "bg-white text-[#0F2A44] shadow-sm" : "text-gray-500")}>Mensuel</button>
            <button onClick={() => setBilling("yearly")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2", billing === "yearly" ? "bg-white text-[#0F2A44] shadow-sm" : "text-gray-500")}>Annuel <Badge variant="success" size="sm">-17%</Badge></button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const features = planFeatures[plan.name];
            const price = billing === "yearly" ? plan.priceYearly / 12 : plan.priceMonthly;
            const isPopular = plan.name === "pro";

            return (
              <Card key={plan.id} className={cn("relative overflow-hidden", isPopular && "ring-2 ring-[#0F2A44] shadow-lg")}>
                {isPopular && <div className="absolute top-0 left-0 right-0 bg-[#0F2A44] text-white text-center py-2 text-sm font-medium"><Zap size={14} className="inline mr-1" />Le plus populaire</div>}
                <div className={cn("p-6", isPopular && "pt-14")}>
                  <div className="text-center mb-6">
                    <div className={cn("w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center", plan.name === "free" && "bg-gray-100 text-gray-600", plan.name === "pro" && "bg-[#0F2A44]/10 text-[#0F2A44]", plan.name === "business" && "bg-yellow-50 text-yellow-600")}>
                      {plan.name === "free" && <Sparkles size={28} />}
                      {plan.name === "pro" && <Zap size={28} />}
                      {plan.name === "business" && <Building2 size={28} />}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{plan.displayName}</h2>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    {price === 0 ? <p className="text-4xl font-bold text-gray-900">Gratuit</p> : (
                      <><p className="text-4xl font-bold text-gray-900">{formatPrice(price)}</p><p className="text-gray-500">/mois</p>
                      {billing === "yearly" && <p className="text-sm text-green-600 mt-1">Soit {formatPrice(plan.priceYearly)}/an</p>}</>
                    )}
                  </div>

                  <Link href="/auth/sign-up"><Button fullWidth variant={isPopular ? "primary" : "outline"} size="lg" rightIcon={<ArrowRight size={18} />}>{price === 0 ? "Commencer gratuitement" : "Choisir ce plan"}</Button></Link>

                  <div className="mt-8 space-y-4">
                    <p className="text-sm font-medium text-gray-900">Inclus :</p>
                    <ul className="space-y-3">{features.included.map((f, i) => <li key={i} className="flex items-start gap-3"><Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-700">{f}</span></li>)}</ul>
                    {features.excluded.length > 0 && (
                      <><p className="text-sm font-medium text-gray-900 pt-4">Non inclus :</p><ul className="space-y-3">{features.excluded.map((f, i) => <li key={i} className="flex items-start gap-3"><X size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-400">{f}</span></li>)}</ul></>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 text-center mb-12"><h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2></div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { q: "Puis-je changer de plan ?", a: "Oui, à tout moment. Les changements prennent effet immédiatement." },
            { q: "Quels moyens de paiement ?", a: "Orange Money, MTN Money, Wave et cartes bancaires." },
            { q: "Remboursement possible ?", a: "Oui, remboursement complet sous 7 jours." },
            { q: "Support disponible ?", a: "Support email pour tous, prioritaire pour Pro et Business." },
          ].map((faq, i) => (
            <Card key={i} className="p-6"><h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3><p className="text-sm text-gray-500">{faq.a}</p></Card>
          ))}
        </div>

        <div className="mt-20">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-[#0F2A44] to-[#1F3A5F] text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'une offre personnalisée ?</h2>
            <p className="text-white/80 mb-8">Contactez-nous pour une offre sur mesure.</p>
            <Button size="lg" className="bg-white text-[#0F2A44] hover:bg-white/90">Contactez-nous</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
