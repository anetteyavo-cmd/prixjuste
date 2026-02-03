"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Search, ChevronDown, ChevronRight, Book, Calculator, CreditCard, Shield, Users, Settings, MessageCircle, FileText, Zap, HelpCircle, PlayCircle, Sparkles } from "lucide-react";

const categories = [
  { id: "getting-started", name: "Démarrage", icon: Book, color: "bg-blue-50 text-blue-600" },
  { id: "prices", name: "Prix & Recherche", icon: Search, color: "bg-green-50 text-green-600" },
  { id: "quotes", name: "Devis", icon: Calculator, color: "bg-purple-50 text-purple-600" },
  { id: "analyze", name: "Analyse", icon: FileText, color: "bg-yellow-50 text-yellow-600" },
  { id: "billing", name: "Facturation", icon: CreditCard, color: "bg-red-50 text-red-600" },
  { id: "account", name: "Compte", icon: Settings, color: "bg-gray-100 text-gray-600" },
];

const faqs = [
  {
    category: "getting-started",
    questions: [
      { q: "Comment créer un compte PrixJuste ?", a: "Cliquez sur 'S'inscrire' en haut à droite, remplissez le formulaire avec vos informations et confirmez votre email. C'est gratuit et prend moins de 2 minutes." },
      { q: "PrixJuste est-il gratuit ?", a: "Oui ! Le plan gratuit vous donne accès à 5 recherches par jour et 3 devis par mois. Pour un accès illimité, découvrez nos plans Pro et Business." },
      { q: "Dans quelles villes êtes-vous disponibles ?", a: "Nous couvrons actuellement 8 villes : Abidjan, Bouaké, Yamoussoukro, San-Pédro, Korhogo, Daloa, Man et Gagnoa. Nous nous étendons régulièrement." },
      { q: "Comment sont collectés les prix ?", a: "Nos équipes terrain visitent régulièrement les fournisseurs et marchés. Nous utilisons aussi des partenaires vérifiés qui partagent leurs prix en temps réel." },
    ]
  },
  {
    category: "prices",
    questions: [
      { q: "À quelle fréquence les prix sont-ils mis à jour ?", a: "Les prix sont mis à jour quotidiennement pour les matériaux les plus courants (ciment, fer, etc.) et hebdomadairement pour les autres." },
      { q: "Que signifie le pourcentage de confiance ?", a: "C'est notre indicateur de fiabilité. 90%+ = prix très fiable, 70-90% = fiable, <70% = à vérifier. Il dépend de la fraîcheur et du nombre de sources." },
      { q: "Puis-je signaler un prix incorrect ?", a: "Oui ! Cliquez sur le prix concerné puis 'Signaler'. Notre équipe vérifiera et corrigera si nécessaire sous 24h." },
      { q: "Comment exporter les prix ?", a: "En version Pro, cliquez sur 'Exporter' en haut de la liste des prix. Vous pouvez télécharger en PDF ou Excel." },
    ]
  },
  {
    category: "quotes",
    questions: [
      { q: "Comment générer un devis ?", a: "Allez dans 'Devis', sélectionnez le type de projet (maison, clôture, etc.), choisissez la ville, entrez les détails et cliquez sur 'Calculer'." },
      { q: "Les estimations sont-elles fiables ?", a: "Nos estimations sont basées sur les prix réels du marché avec une marge de +/- 15%. Elles vous donnent une bonne base de négociation." },
      { q: "Puis-je personnaliser un devis ?", a: "Oui ! En version Pro, vous pouvez ajouter, modifier ou supprimer des postes, et ajuster les quantités manuellement." },
      { q: "Comment partager un devis ?", a: "Cliquez sur 'Partager' pour obtenir un lien unique. Le destinataire pourra voir le devis sans créer de compte." },
    ]
  },
  {
    category: "analyze",
    questions: [
      { q: "Comment fonctionne l'analyse de devis ?", a: "Uploadez votre devis (PDF ou image), entrez le montant total et la ville. Notre IA compare chaque poste aux prix du marché." },
      { q: "Que signifient les verdicts ?", a: "Normal = prix dans la moyenne, Élevé = 10-30% au-dessus, Abusif = +30%. Nous détaillons chaque poste pour vous aider à négocier." },
      { q: "L'analyse est-elle payante ?", a: "Une analyse coûte 2 000 FCFA, ou est incluse dans les plans Pro (5/mois) et Business (illimité)." },
      { q: "Puis-je analyser un devis manuscrit ?", a: "Oui, prenez une photo lisible. Notre système peut lire les devis manuscrits, mais les résultats sont meilleurs avec des devis imprimés." },
    ]
  },
  {
    category: "billing",
    questions: [
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Orange Money, MTN Money, Wave, Moov Money, et cartes bancaires (Visa, Mastercard)." },
      { q: "Comment annuler mon abonnement ?", a: "Dans Paramètres > Abonnement > Annuler. Vous gardez l'accès jusqu'à la fin de la période payée." },
      { q: "Proposez-vous des remboursements ?", a: "Oui, remboursement complet sous 7 jours si vous n'êtes pas satisfait. Contactez-nous avec votre numéro de commande." },
      { q: "Comment obtenir une facture ?", a: "Toutes vos factures sont dans Dashboard > Facturation. Vous pouvez les télécharger en PDF." },
    ]
  },
  {
    category: "account",
    questions: [
      { q: "Comment modifier mes informations ?", a: "Allez dans Dashboard > Paramètres > Profil. Vous pouvez modifier nom, email, téléphone et mot de passe." },
      { q: "Comment supprimer mon compte ?", a: "Dans Paramètres > Compte > Supprimer. Cette action est irréversible et efface toutes vos données." },
      { q: "J'ai oublié mon mot de passe", a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Un lien de réinitialisation sera envoyé à votre email." },
      { q: "Puis-je avoir plusieurs utilisateurs ?", a: "Oui, avec le plan Business. Vous pouvez ajouter jusqu'à 10 membres d'équipe avec des rôles différents." },
    ]
  },
];

const tutorials = [
  { title: "Premiers pas avec PrixJuste", duration: "3 min", thumbnail: "🎬" },
  { title: "Créer votre premier devis", duration: "5 min", thumbnail: "📝" },
  { title: "Analyser un devis reçu", duration: "4 min", thumbnail: "🔍" },
  { title: "Configurer les alertes de prix", duration: "2 min", thumbnail: "🔔" },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(search.toLowerCase()) || 
      q.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const currentFaqs = search ? filteredFaqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8">
            <ArrowLeft size={20} /> Retour
          </Link>
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <HelpCircle size={14} className="mr-1" /> Centre d'aide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Comment pouvons-nous vous aider ?</h1>
          <p className="text-xl text-white/80 mb-8">Trouvez des réponses à toutes vos questions</p>
          <div className="max-w-xl mx-auto">
            <SearchInput 
              placeholder="Rechercher dans l'aide..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        {!search && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center ${
                  activeCategory === cat.id 
                    ? 'border-[#0F2A44] bg-white shadow-lg' 
                    : 'border-transparent bg-white hover:border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl ${cat.color} flex items-center justify-center mb-2`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">{cat.name}</p>
              </button>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {search ? `Résultats pour "${search}"` : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              
              {currentFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun résultat trouvé</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                    Effacer la recherche
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentFaqs.map(cat => 
                    cat.questions.map((faq, i) => (
                      <div key={`${cat.category}-${i}`} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenQuestion(openQuestion === `${cat.category}-${i}` ? null : `${cat.category}-${i}`)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openQuestion === `${cat.category}-${i}` ? 'rotate-180' : ''}`} />
                        </button>
                        {openQuestion === `${cat.category}-${i}` && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tutorials */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#0F2A44]" /> Tutoriels vidéo
              </h3>
              <div className="space-y-3">
                {tutorials.map((tuto, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <div className="w-12 h-12 rounded-lg bg-[#0F2A44]/10 flex items-center justify-center text-xl">
                      {tuto.thumbnail}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{tuto.title}</p>
                      <p className="text-xs text-gray-500">{tuto.duration}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Contact CTA */}
            <Card className="p-6 bg-gradient-to-br from-[#0F2A44] to-[#1F3A5F] text-white">
              <MessageCircle className="w-10 h-10 mb-4" />
              <h3 className="font-semibold mb-2">Besoin d'aide supplémentaire ?</h3>
              <p className="text-sm text-white/70 mb-4">Notre équipe support est disponible 7j/7</p>
              <Link href="/contact">
                <Button className="w-full bg-white text-[#0F2A44] hover:bg-white/90">
                  Nous contacter
                </Button>
              </Link>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Liens utiles</h3>
              <div className="space-y-2">
                <Link href="/pricing" className="flex items-center gap-2 text-gray-600 hover:text-[#0F2A44] py-2">
                  <CreditCard className="w-4 h-4" /> Voir les tarifs
                </Link>
                <Link href="/about" className="flex items-center gap-2 text-gray-600 hover:text-[#0F2A44] py-2">
                  <Users className="w-4 h-4" /> À propos de nous
                </Link>
                <Link href="/suppliers" className="flex items-center gap-2 text-gray-600 hover:text-[#0F2A44] py-2">
                  <Zap className="w-4 h-4" /> Devenir partenaire
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
