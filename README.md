# 🏗️ PrixJuste - Les vrais prix du bâtiment en Côte d'Ivoire

![PrixJuste](https://img.shields.io/badge/Made%20in-Côte%20d'Ivoire-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

> Comparez les prix, générez des devis intelligents et évitez les arnaques dans le secteur du BTP.

## 🌟 Fonctionnalités

- ✅ **Catalogue de prix** - 1500+ prix de matériaux actualisés
- ✅ **Générateur de devis** - Estimations précises pour vos projets
- ✅ **Analyseur de devis** - Vérifiez si un devis est au juste prix
- ✅ **Alertes de prix** - Soyez notifié quand un prix baisse
- ✅ **Annuaire fournisseurs** - Trouvez des fournisseurs vérifiés
- ✅ **Blog & Actualités** - Conseils et tendances du BTP
- ✅ **Dashboard complet** - Gérez vos devis, favoris et projets

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/prixjuste.git
cd prixjuste

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer en mode développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Déploiement sur Vercel

### Option 1 : Via l'interface Vercel (Recommandé)

1. Pousse ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com)
3. Clique "Add New Project"
4. Importe ton repo GitHub
5. Clique "Deploy"

### Option 2 : Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🔧 Structure du projet

```
prixjuste/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── page.tsx           # Accueil
│   │   ├── prices/            # Catalogue des prix
│   │   ├── quote/             # Générateur de devis
│   │   ├── analyze/           # Analyseur de devis
│   │   ├── pricing/           # Tarifs
│   │   ├── dashboard/         # Espace utilisateur
│   │   ├── about/             # À propos
│   │   ├── contact/           # Contact
│   │   ├── help/              # Centre d'aide
│   │   ├── blog/              # Blog
│   │   ├── suppliers/         # Annuaire fournisseurs
│   │   └── auth/              # Authentification
│   ├── components/            # Composants réutilisables
│   │   └── ui/               # Composants UI (Button, Card, etc.)
│   ├── data/                  # Données mock
│   └── lib/                   # Utilitaires
├── public/                    # Assets statiques
├── vercel.json               # Configuration Vercel
└── package.json
```

## 🎨 Design System

- **Couleur principale** : `#0F2A44` (Bleu marine)
- **Couleur secondaire** : `#1F3A5F`
- **Police** : Inter (Google Fonts)
- **Framework CSS** : Tailwind CSS

## 📞 Contact

- **Email** : contact@prixjuste.ci
- **WhatsApp** : +225 07 00 00 00 00

---

Fait avec ❤️ en Côte d'Ivoire 🇨🇮
