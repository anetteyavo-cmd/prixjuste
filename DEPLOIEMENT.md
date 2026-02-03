# 🚀 Guide de Déploiement PrixJuste

## Étape 1 : Préparer ton ordinateur

### Installer les outils nécessaires

**1. Installer Node.js** (si pas déjà fait)
- Va sur https://nodejs.org
- Télécharge la version LTS (recommandée)
- Installe-le

**2. Installer Git** (si pas déjà fait)
- Va sur https://git-scm.com
- Télécharge et installe

**3. Vérifier l'installation** (dans le terminal)
```bash
node --version    # Doit afficher v18.x.x ou plus
npm --version     # Doit afficher 9.x.x ou plus
git --version     # Doit afficher git version 2.x.x
```

---

## Étape 2 : Créer un compte GitHub

1. Va sur **https://github.com**
2. Clique "Sign up"
3. Entre ton email, crée un mot de passe
4. Choisis un username (ex: `anette-yavo` ou `footsociety`)
5. Vérifie ton email

---

## Étape 3 : Créer un repository GitHub

1. Sur GitHub, clique le **+** en haut à droite
2. Clique "New repository"
3. Nom : `prixjuste`
4. Description : `Les vrais prix du bâtiment en Côte d'Ivoire`
5. Laisse "Public" coché
6. **NE COCHE PAS** "Add a README file"
7. Clique "Create repository"

---

## Étape 4 : Extraire et configurer le projet

```bash
# 1. Extraire l'archive
unzip prixjuste-complete.zip
cd prixjuste

# 2. Installer les dépendances
npm install

# 3. Tester en local (optionnel)
npm run dev
# Ouvre http://localhost:3000 pour vérifier
# Ctrl+C pour arrêter
```

---

## Étape 5 : Pousser le code sur GitHub

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Faire le premier commit
git commit -m "🚀 Initial commit - PrixJuste"

# 4. Connecter à GitHub (REMPLACE par ton username!)
git branch -M main
git remote add origin https://github.com/TON_USERNAME/prixjuste.git

# 5. Pousser le code
git push -u origin main
```

**Note** : GitHub te demandera de te connecter la première fois.

---

## Étape 6 : Déployer sur Vercel

### Créer un compte Vercel
1. Va sur **https://vercel.com**
2. Clique "Sign Up"
3. Choisis "Continue with GitHub"
4. Autorise Vercel à accéder à ton GitHub

### Importer le projet
1. Sur le dashboard Vercel, clique **"Add New..."** → **"Project"**
2. Tu verras la liste de tes repos GitHub
3. Trouve `prixjuste` et clique **"Import"**
4. Laisse toutes les options par défaut
5. Clique **"Deploy"**

### Attendre le déploiement
- Vercel va builder ton projet (1-2 minutes)
- Une fois terminé, tu verras "Congratulations!"
- Ton site est en ligne sur `https://prixjuste.vercel.app` 🎉

---

## Étape 7 : Ajouter un domaine personnalisé (optionnel)

### Acheter un domaine
- **prixjuste.ci** → ARTCI (https://www.artci.ci)
- **prixjuste.com** → Namecheap, GoDaddy, OVH

### Configurer sur Vercel
1. Dans ton projet Vercel, va dans **"Settings"**
2. Clique **"Domains"**
3. Entre ton domaine : `prixjuste.ci`
4. Clique **"Add"**
5. Vercel te donnera des enregistrements DNS à configurer

### Configurer les DNS
Chez ton registrar de domaine, ajoute :
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🎉 Félicitations !

Ton site PrixJuste est maintenant en ligne !

### URLs
- **Vercel** : https://prixjuste.vercel.app
- **Domaine perso** : https://prixjuste.ci (après configuration)

### Prochaines étapes
1. Tester toutes les pages
2. Partager avec des beta-testeurs
3. Collecter les retours
4. Améliorer en continu

---

## 🆘 Besoin d'aide ?

### Problèmes courants

**"Permission denied" lors du git push**
→ Configure ton identité Git :
```bash
git config --global user.email "ton@email.com"
git config --global user.name "Ton Nom"
```

**Build failed sur Vercel**
→ Vérifie les logs dans Vercel
→ Assure-toi que `npm run build` fonctionne en local

**Page blanche après déploiement**
→ Vérifie la console du navigateur (F12)
→ Regarde les logs Vercel

### Support
- Email : contact@prixjuste.ci
- WhatsApp : +225 07 00 00 00 00

---

Fait avec ❤️ pour PrixJuste 🇨🇮
