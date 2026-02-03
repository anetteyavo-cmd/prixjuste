"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, StatsCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Calculator, FileSearch, ArrowRight, CheckCircle, TrendingUp, Shield, Building2, Zap, Droplets, DoorOpen, Paintbrush, ChevronRight, Star, MapPin, Menu, X, Bell, User } from "lucide-react";
import { sectors, cities, pricePoints, formatPrice } from "@/data/mock-data";
import { cn } from "@/lib/utils";

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Prix", href: "/prices" },
    { name: "Devis", href: "/quote" },
    { name: "Analyser", href: "/analyze" },
    { name: "Tarifs", href: "/pricing" },
  ];

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-white")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0F2A44] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-[#0F2A44]">Prix<span className="text-[#1F3A5F]">Juste</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/auth/sign-in" className="hidden sm:block">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link href="/auth/sign-up" className="hidden sm:block">
              <Button size="sm">S'inscrire</Button>
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl">
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <Link href="/auth/sign-in"><Button variant="outline" fullWidth>Connexion</Button></Link>
              <Link href="/auth/sign-up"><Button fullWidth>S'inscrire</Button></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#0F2A44] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-[#0F2A44] font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold">PrixJuste</span>
            </div>
            <p className="text-white/70 text-sm">La référence des prix du bâtiment en Côte d'Ivoire.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/prices" className="hover:text-white">Catalogue des prix</Link></li>
              <li><Link href="/quote" className="hover:text-white">Générateur de devis</Link></li>
              <li><Link href="/analyze" className="hover:text-white">Analyse de devis</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Tarifs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Secteurs</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {sectors.map(s => (
                <li key={s.id}><Link href={`/prices?sector=${s.slug}`} className="hover:text-white">{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>contact@prixjuste.ci</li>
              <li>+225 07 00 00 00 00</li>
              <li>Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          © {new Date().getFullYear()} PrixJuste. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

// Sector icons
const sectorIcons: Record<string, React.ReactNode> = {
  "sec-batiment": <Building2 className="w-6 h-6" />,
  "sec-electricite": <Zap className="w-6 h-6" />,
  "sec-plomberie": <Droplets className="w-6 h-6" />,
  "sec-menuiserie": <DoorOpen className="w-6 h-6" />,
  "sec-peinture": <Paintbrush className="w-6 h-6" />,
};

// Features
const features = [
  { icon: <Search className="w-6 h-6" />, title: "Prix en temps réel", description: "Accédez aux prix actualisés des matériaux dans toutes les villes.", color: "bg-[#0F2A44]/10 text-[#0F2A44]" },
  { icon: <Calculator className="w-6 h-6" />, title: "Devis intelligents", description: "Générez des estimations précises pour vos projets en quelques clics.", color: "bg-green-50 text-green-600" },
  { icon: <FileSearch className="w-6 h-6" />, title: "Analyse de devis", description: "Uploadez un devis et découvrez si les prix sont justes ou abusifs.", color: "bg-yellow-50 text-yellow-600" },
  { icon: <Shield className="w-6 h-6" />, title: "Sources vérifiées", description: "Nos prix proviennent de fournisseurs vérifiés.", color: "bg-red-50 text-red-600" },
];

// Testimonials
const testimonials = [
  { name: "Amadou Koné", role: "Entrepreneur BTP", content: "PrixJuste m'a permis d'économiser 2 millions FCFA sur ma dernière commande.", avatar: "AK", rating: 5 },
  { name: "Marie Kouassi", role: "Propriétaire", content: "Grâce à l'analyse de devis, j'ai évité une arnaque. Merci PrixJuste !", avatar: "MK", rating: 5 },
  { name: "Ibrahim Diallo", role: "Architecte", content: "Un outil indispensable pour mes estimations. Les prix sont fiables.", avatar: "ID", rating: 5 },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const recentPrices = pricePoints.filter(p => p.status === "PUBLISHED").slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-blue-50/30 to-[#F6F8FA] pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#0F2A44]/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2A44]/10 rounded-full text-[#0F2A44] text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                +500 prix mis à jour cette semaine
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                Les <span className="gradient-text">vrais prix</span> du bâtiment en{" "}
                <span className="text-[#0F2A44]">Côte d'Ivoire</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Comparez les prix, générez des devis intelligents et évitez les arnaques.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <Link href="/prices">
                  <Button size="lg" rightIcon={<ArrowRight size={20} />}>Voir les prix</Button>
                </Link>
                <Link href="/quote">
                  <Button variant="outline" size="lg" leftIcon={<Calculator size={20} />}>Créer un devis</Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["AK", "MK", "ID", "SK"].map((initials, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-[#0F2A44]/10 text-[#0F2A44] text-xs font-semibold flex items-center justify-center border-2 border-white">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">+2,500 utilisateurs</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}
                  <span className="text-sm text-gray-500 ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Card className="shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="success" dot pulse>Prix du jour</Badge>
                  <span className="text-sm text-gray-500">Abidjan</span>
                </div>
                
                <div className="space-y-3">
                  {recentPrices.map((price) => (
                    <div key={price.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-[#0F2A44]/5 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center group-hover:bg-[#0F2A44] group-hover:text-white transition-colors">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{price.categoryId.replace("cat-", "").replace("-", " ")}</p>
                          <p className="text-xs text-gray-500">{price.quality || "Standard"}</p>
                        </div>
                      </div>
                      <p className="font-bold text-[#0F2A44]">{formatPrice(price.priceMin)}</p>
                    </div>
                  ))}
                </div>

                <Link href="/prices" className="mt-4 flex items-center justify-center gap-2 text-[#0F2A44] font-medium hover:gap-3 transition-all">
                  Voir tous les prix <ChevronRight size={18} />
                </Link>
              </Card>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><TrendingUp size={16} /></div>
                  <div><p className="text-xs text-gray-500">Économie moyenne</p><p className="font-bold text-green-600">15%</p></div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0F2A44]/10 text-[#0F2A44] flex items-center justify-center"><MapPin size={16} /></div>
                  <div><p className="text-xs text-gray-500">Villes couvertes</p><p className="font-bold text-[#0F2A44]">{cities.length}+</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1500+", label: "Prix référencés" },
              { value: "8", label: "Villes couvertes" },
              { value: "2500+", label: "Utilisateurs actifs" },
              { value: "98%", label: "Satisfaction client" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#0F2A44]">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Fonctionnalités</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tout ce dont vous avez besoin</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Des outils puissants pour maîtriser vos coûts de construction</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", feature.color)}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Secteurs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tous les secteurs couverts</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sectors.map((sector) => (
              <Link key={sector.id} href={`/prices?sector=${sector.slug}`} className="group">
                <Card hover className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: `${sector.color}15`, color: sector.color }}>
                    {sectorIcons[sector.id]}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0F2A44] transition-colors">{sector.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#0F2A44] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/30 text-white">Comment ça marche</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Simple comme 1, 2, 3</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Recherchez", description: "Trouvez le prix de n'importe quel matériau.", icon: <Search className="w-6 h-6" /> },
              { step: "2", title: "Comparez", description: "Comparez les prix entre différentes sources.", icon: <TrendingUp className="w-6 h-6" /> },
              { step: "3", title: "Économisez", description: "Prenez les meilleures décisions.", icon: <CheckCircle className="w-6 h-6" /> },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6 border-2 border-white/30">
                  <span className="text-3xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-white text-[#0F2A44] hover:bg-white/90" rightIcon={<ArrowRight size={20} />}>
                Commencer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ce que disent nos utilisateurs</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}
              </div>
              <p className="text-xl text-gray-700 mb-8 italic">&ldquo;{testimonials[activeTestimonial].content}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F2A44]/10 text-[#0F2A44] font-bold flex items-center justify-center">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveTestimonial(index)} className={cn("w-2 h-2 rounded-full transition-all", index === activeTestimonial ? "bg-[#0F2A44] w-6" : "bg-gray-300 hover:bg-gray-400")} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à économiser sur vos projets ?</h2>
          <p className="text-xl text-white/80 mb-8">Rejoignez des milliers d'utilisateurs qui font confiance à PrixJuste.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="xl" className="bg-white text-[#0F2A44] hover:bg-white/90" rightIcon={<ArrowRight size={20} />}>
                Créer un compte gratuit
              </Button>
            </Link>
            <Link href="/prices">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                Explorer les prix
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">Gratuit pour commencer • Pas de carte bancaire requise</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
