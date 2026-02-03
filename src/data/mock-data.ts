// Secteurs
export const sectors = [
  { id: "sec-batiment", name: "Bâtiment", slug: "batiment", color: "#0F2A44" },
  { id: "sec-electricite", name: "Électricité", slug: "electricite", color: "#F59E0B" },
  { id: "sec-plomberie", name: "Plomberie", slug: "plomberie", color: "#3B82F6" },
  { id: "sec-menuiserie", name: "Menuiserie", slug: "menuiserie", color: "#8B5CF6" },
  { id: "sec-peinture", name: "Peinture", slug: "peinture", color: "#EC4899" },
];

// Villes
export const cities = [
  { id: "city-abidjan", name: "Abidjan", slug: "abidjan", region: "Lagunes" },
  { id: "city-bouake", name: "Bouaké", slug: "bouake", region: "Vallée du Bandama" },
  { id: "city-yamoussoukro", name: "Yamoussoukro", slug: "yamoussoukro", region: "Lacs" },
  { id: "city-san-pedro", name: "San-Pédro", slug: "san-pedro", region: "Bas-Sassandra" },
  { id: "city-korhogo", name: "Korhogo", slug: "korhogo", region: "Savanes" },
  { id: "city-daloa", name: "Daloa", slug: "daloa", region: "Haut-Sassandra" },
  { id: "city-man", name: "Man", slug: "man", region: "Tonkpi" },
  { id: "city-gagnoa", name: "Gagnoa", slug: "gagnoa", region: "Gôh" },
];

// Catégories
export const categories = [
  { id: "cat-ciment", name: "Ciment", sectorId: "sec-batiment", unit: "sac" },
  { id: "cat-fer", name: "Fer à béton", sectorId: "sec-batiment", unit: "barre" },
  { id: "cat-gravier", name: "Gravier", sectorId: "sec-batiment", unit: "m³" },
  { id: "cat-sable", name: "Sable", sectorId: "sec-batiment", unit: "m³" },
  { id: "cat-parpaing", name: "Parpaing", sectorId: "sec-batiment", unit: "unité" },
  { id: "cat-cable", name: "Câble électrique", sectorId: "sec-electricite", unit: "ml" },
  { id: "cat-prise", name: "Prise électrique", sectorId: "sec-electricite", unit: "unité" },
  { id: "cat-tuyau-pvc", name: "Tuyau PVC", sectorId: "sec-plomberie", unit: "ml" },
  { id: "cat-robinet", name: "Robinetterie", sectorId: "sec-plomberie", unit: "unité" },
  { id: "cat-porte", name: "Porte", sectorId: "sec-menuiserie", unit: "unité" },
  { id: "cat-peinture", name: "Peinture", sectorId: "sec-peinture", unit: "seau" },
];

// Prix
export const pricePoints = [
  { id: "price-1", categoryId: "cat-ciment", cityId: "city-abidjan", priceMin: 4800, priceMax: 5200, quality: "Standard", brand: "CIMAF", confidence: 95, status: "PUBLISHED", effectiveAt: new Date("2025-01-15") },
  { id: "price-2", categoryId: "cat-ciment", cityId: "city-abidjan", priceMin: 5500, priceMax: 5800, quality: "Premium", brand: "Lafarge", confidence: 90, status: "PUBLISHED", effectiveAt: new Date("2025-01-15") },
  { id: "price-3", categoryId: "cat-fer", cityId: "city-abidjan", priceMin: 3500, priceMax: 4000, quality: "Ø8mm", confidence: 88, status: "PUBLISHED", effectiveAt: new Date("2025-01-14") },
  { id: "price-4", categoryId: "cat-fer", cityId: "city-abidjan", priceMin: 4500, priceMax: 5000, quality: "Ø10mm", confidence: 85, status: "PUBLISHED", effectiveAt: new Date("2025-01-14") },
  { id: "price-5", categoryId: "cat-gravier", cityId: "city-abidjan", priceMin: 18000, priceMax: 22000, quality: "Concassé", confidence: 82, status: "PUBLISHED", effectiveAt: new Date("2025-01-13") },
  { id: "price-6", categoryId: "cat-sable", cityId: "city-abidjan", priceMin: 12000, priceMax: 15000, quality: "Fin", confidence: 80, status: "PUBLISHED", effectiveAt: new Date("2025-01-12") },
  { id: "price-7", categoryId: "cat-parpaing", cityId: "city-abidjan", priceMin: 350, priceMax: 400, quality: "15cm", confidence: 92, status: "PUBLISHED", effectiveAt: new Date("2025-01-15") },
  { id: "price-8", categoryId: "cat-parpaing", cityId: "city-abidjan", priceMin: 400, priceMax: 450, quality: "20cm", confidence: 90, status: "PUBLISHED", effectiveAt: new Date("2025-01-15") },
  { id: "price-9", categoryId: "cat-ciment", cityId: "city-bouake", priceMin: 5000, priceMax: 5400, quality: "Standard", brand: "CIMAF", confidence: 85, status: "PUBLISHED", effectiveAt: new Date("2025-01-14") },
  { id: "price-10", categoryId: "cat-cable", cityId: "city-abidjan", priceMin: 800, priceMax: 1200, quality: "2.5mm²", confidence: 78, status: "PUBLISHED", effectiveAt: new Date("2025-01-10") },
  { id: "price-11", categoryId: "cat-prise", cityId: "city-abidjan", priceMin: 2500, priceMax: 4000, quality: "Standard", brand: "Legrand", confidence: 75, status: "PUBLISHED", effectiveAt: new Date("2025-01-10") },
  { id: "price-12", categoryId: "cat-tuyau-pvc", cityId: "city-abidjan", priceMin: 1500, priceMax: 2000, quality: "63mm", confidence: 80, status: "PUBLISHED", effectiveAt: new Date("2025-01-09") },
  { id: "price-13", categoryId: "cat-porte", cityId: "city-abidjan", priceMin: 45000, priceMax: 75000, quality: "Bois massif", confidence: 70, status: "PUBLISHED", effectiveAt: new Date("2025-01-08") },
  { id: "price-14", categoryId: "cat-peinture", cityId: "city-abidjan", priceMin: 25000, priceMax: 35000, quality: "15L", brand: "Seigneurie", confidence: 85, status: "PUBLISHED", effectiveAt: new Date("2025-01-11") },
];

// Plans tarifaires
export const plans = [
  { id: "plan-free", name: "free", displayName: "Gratuit", description: "Pour découvrir", priceMonthly: 0, priceYearly: 0 },
  { id: "plan-pro", name: "pro", displayName: "Pro", description: "Pour les professionnels", priceMonthly: 5000, priceYearly: 50000 },
  { id: "plan-business", name: "business", displayName: "Business", description: "Pour les entreprises", priceMonthly: 15000, priceYearly: 150000 },
];

// Templates de devis
export const quoteTemplates = [
  { type: "maison_m2", name: "Construction maison", description: "Estimation au m²", fields: [
    { name: "surface", label: "Surface (m²)", type: "number", min: 50, max: 500, unit: "m²" },
    { name: "finition", label: "Niveau de finition", type: "select", options: [
      { value: "standard", label: "Standard" },
      { value: "premium", label: "Premium" },
      { value: "luxe", label: "Luxe" },
    ], defaultValue: "standard" },
  ]},
  { type: "cloture_ml", name: "Clôture", description: "Estimation au mètre linéaire", fields: [
    { name: "length", label: "Longueur (ml)", type: "number", min: 10, max: 500, unit: "ml" },
    { name: "height", label: "Hauteur", type: "select", options: [
      { value: "2", label: "2 mètres" },
      { value: "2.5", label: "2.5 mètres" },
      { value: "3", label: "3 mètres" },
    ], defaultValue: "2" },
  ]},
  { type: "peinture", name: "Peinture", description: "Travaux de peinture", fields: [
    { name: "surface", label: "Surface à peindre (m²)", type: "number", min: 20, max: 1000, unit: "m²" },
  ]},
  { type: "electricite", name: "Électricité", description: "Installation électrique", fields: [
    { name: "rooms", label: "Nombre de pièces", type: "number", min: 1, max: 20 },
  ]},
];

// Helpers
export const getCategoryById = (id: string) => categories.find(c => c.id === id);
export const getCityById = (id: string) => cities.find(c => c.id === id);
export const formatPrice = (amount: number): string => new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Testimonials for dynamic display
export const testimonials = [
  { id: 1, name: "Amadou Koné", role: "Entrepreneur BTP", city: "Abidjan", rating: 5, text: "PrixJuste m'a permis d'économiser 2 millions FCFA sur ma dernière commande.", avatar: "AK" },
  { id: 2, name: "Marie Kouassi", role: "Architecte", city: "Cocody", rating: 5, text: "Un outil indispensable pour établir des devis justes et compétitifs.", avatar: "MK" },
  { id: 3, name: "Ibrahim Diallo", role: "Particulier", city: "Bouaké", rating: 5, text: "J'ai pu vérifier que mon devis était correct avant de signer. Merci PrixJuste !", avatar: "ID" },
  { id: 4, name: "Sophie Bamba", role: "Promotrice immobilière", city: "Yamoussoukro", rating: 4, text: "Les alertes de prix me permettent d'acheter au meilleur moment.", avatar: "SB" },
  { id: 5, name: "Konan Yao", role: "Maçon", city: "San-Pédro", rating: 5, text: "Mes clients font confiance à mes devis grâce à PrixJuste.", avatar: "KY" },
];

// Suppliers for the directory
export const suppliersData = [
  { id: 1, name: "CIMAF Distribution", category: "Ciment & Agrégats", city: "Abidjan", rating: 4.8, verified: true, premium: true },
  { id: 2, name: "Fer Plus CI", category: "Métallurgie", city: "Abidjan", rating: 4.6, verified: true, premium: true },
  { id: 3, name: "ElectroPro CI", category: "Électricité", city: "Abidjan", rating: 4.5, verified: true, premium: false },
  { id: 4, name: "Plomberie Générale", category: "Plomberie", city: "Abidjan", rating: 4.3, verified: true, premium: false },
  { id: 5, name: "Peintures Seigneurie", category: "Peinture", city: "Abidjan", rating: 4.9, verified: true, premium: true },
];

// Blog articles
export const blogArticles = [
  { id: 1, title: "Le prix du ciment en hausse de 8%", category: "Tendances", date: "15 Jan 2025", readTime: "5 min" },
  { id: 2, title: "Guide: Construire sa maison en 2025", category: "Guides", date: "12 Jan 2025", readTime: "15 min" },
  { id: 3, title: "5 erreurs à éviter lors de l'achat de matériaux", category: "Conseils", date: "10 Jan 2025", readTime: "7 min" },
];

// Price history for charts
export const priceHistory = [
  { month: "Sep", ciment: 4500, fer: 4100, gravier: 17000 },
  { month: "Oct", ciment: 4600, fer: 4200, gravier: 17500 },
  { month: "Nov", ciment: 4700, fer: 4350, gravier: 17800 },
  { month: "Dec", ciment: 4750, fer: 4400, gravier: 18000 },
  { month: "Jan", ciment: 4800, fer: 4500, gravier: 18000 },
];
