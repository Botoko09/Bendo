# Référence du projet S22 Akieni Academy

Projet Fullstack du Groupe 5, à déposer avant vendredi 06/11/2026 à 16 h, avec démonstration pendant le stand-up. Il s’agit d’une boutique en ligne de téléphones (vente), et non d’une gestion de stock.

## Stack
- Next.js App Router, TypeScript, Tailwind CSS
- Auth.js Credentials : email et mot de passe haché avec bcrypt, session persistante
- Prisma avec PostgreSQL (Neon)
- Vercel Blob pour les photos
- Secrets uniquement dans les variables d’environnement ; `.env.example` à jour et sans secret réel

## Rôles
- Client : aucun compte ni connexion ; accès direct au catalogue.
- Vendeur : connexion obligatoire, aucune inscription publique ; un script seed crée un compte vendeur de test.

## Modèle de données
- Seller : id, email, passwordHash, name, whatsappNumber (indicatif, ex. 24206XXXXXXX)
- Product : id, name, description, price, imageUrl, sold (booléen, défaut false), soldAt, orderClicks (entier, défaut 0), createdAt, sellerId

## Pages et rendu
- `/comment-commander` : explications pour commander, SSG.
- `/` : catalogue public des produits non vendus, ISR.
- `/produits/[id]` : fiche avec photo, description, prix et bouton « Commander », rendu dynamique avec revalidation (ISR).
- `/vendeur/dashboard` : SSR ; nombre de ventes (`sold = true`) et somme de `orderClicks`.
- `/vendeur/produits` : produits du vendeur avec case « Vendu ».
- `/vendeur/produits/nouveau` : formulaire nom, description, prix, photo et numéro WhatsApp si absent.
- `/login` : connexion vendeur ; bouton de déconnexion dans l’espace vendeur.

## Comportement et sécurité
- Connexion et déconnexion fonctionnelles, session persistante. Middleware protégeant `/vendeur/*`, redirection vers `/login` sans session.
- « Commander » incrémente `orderClicks`, puis redirige vers `https://wa.me/<whatsappNumber>?text=<message encodé avec encodeURIComponent>`. Message : « Bonjour, je suis intéressé par <nom> à <prix> FCFA. »
- « Vendu » met `sold = true`, `soldAt = maintenant`, revalide `/` et la fiche ; le produit quitte le catalogue et le dashboard est actualisé.
- Le serveur vérifie qu’un vendeur ne modifie que ses propres produits.

## Livrables
- `README.md` : lancement, compte vendeur de test, section « Rendu » justifiant SSG / ISR / SSR, et comptes Git des cinq membres avec emplacements à compléter.
- `docs/DEPLOIEMENT.md` : checklist Vercel, variables d’environnement et URL de production stable.
- `docs/lighthouse-mobile.png` : emplacement de la capture Lighthouse mobile, à réaliser par l’utilisateur quand l’application sera prête.
- Cibles Lighthouse mobile : Performance >= 80 et Accessibility >= 80 ; employer `next/image`, contraste suffisant, labels de formulaires et attributs `alt`.

## Méthode de travail
- Avancer par petites étapes et rendre compte à la fin de chacune de ce qui est fait et reste à faire.
- Ne rien inventer : laisser les comptes Git, URL de production et clés manquants sous forme d’emplacements à compléter.
- Chantiers séparés en branches avec commits clairs et une pull request par chantier : `auth`, `rendu-perf`, `deploiement`, `features-1` (publication et liste produits), `features-2` (dashboard et commander).
- Avant conclusion, vérifier chaque exigence et fournir un tableau « exigence / fait ou pas fait ».