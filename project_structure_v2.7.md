# Structure du Projet E-SCHOOL GROUPE (Version 2.7)

Ce document récapitule l'ensemble de l'architecture Front-End (React) et Back-End (PHP) développée pour répondre au cahier des charges V 2.7. Il servira de guide de référence pour le déploiement sur votre serveur XAMPP/WAMP.

---

## 🏗️ 1. Architecture Front-End (React / TypeScript / Material-UI)

Le dossier principal `src/` contient toute l'interface utilisateur. Voici les fichiers clés que nous avons créés ou modifiés :

### ⚙️ Cœur de l'Application & Routage
*   **`src/App.tsx`** : Le contrôleur principal. Il protège les routes (`<ProtectedRoute>`) et s'assure qu'un Formateur ne peut pas accéder aux pages Admin, et inversement.
*   **`src/components/layout/Sidebar.tsx`** : La barre de navigation dynamique. Elle lit le rôle de l'utilisateur (`admin`, `teacher`, `maintenance`) et affiche uniquement les menus autorisés. L'ancien rôle "Student" a été supprimé.
*   **`src/features/auth/authSlice.ts`** : Gestionnaire d'état Redux. Il stocke le token JWT et le rôle de l'utilisateur actuellement connecté.
*   **`src/pages/Login.tsx`** : La page de connexion, mise à jour avec les nouveaux comptes de démonstration (Administrateur, Formateur, Maintenancier).

### 👨‍💼 Module Administrateur (`src/pages/admin/`)
*   **`Recruitment.tsx`** : Formulaire de candidature pour les formateurs, incluant des champs de dépôt de fichiers (CV, CNI, Photo) et un tableau d'examen des candidatures.
*   **`Contracts.tsx`** : Tableau de bord de gestion contractuelle. Permet de voir les contrats "Actifs" et "Expirés", avec un bouton pour révoquer les accès.
*   **`Reports.tsx`** : Interface de **Validation des Rapports**. L'Admin peut examiner les rapports, demander des modifications, et utiliser le "Bouton de Transformation" pour générer des synthèses hebdomadaires/mensuelles.

### 👨‍🏫 Module Formateur (`src/pages/teacher/`)
*   **`DailyReport.tsx`** : Le cœur de l'innovation V 2.7. Contient le champ de **Smart Check-In**. Dès que 6 chiffres sont saisis, une requête part au serveur PHP pour afficher dynamiquement le nom et l'école du formateur, débloquant la suite du rapport (Présences, Thème, Matériel).
*   **`Rules.tsx`** : Le Règlement Intérieur. Sécurisé logiciellement : si le compte du formateur n'est pas "actif", il voit une alerte de restriction d'accès.

### 🔧 Module Maintenancier (`src/pages/maintenance/`)
*   **`IssueList.tsx`** : L'espace de travail exclusif du Maintenancier. Il affiche une liste des pannes matérielles (isolées des rapports pédagogiques) avec la possibilité pour lui de basculer le statut (`Signalée` -> `En cours` -> `Résolue`).

---

## 🌐 2. Architecture Back-End (API PHP & MySQL)

Pour que l'application React puisse communiquer avec vos bases de données, ces fichiers doivent être placés dans un dossier `api/` accessible publiquement (ex: `htdocs/api/` sous XAMPP).

### 🗄️ Base de Données
*   **`database_schema.sql`** : Le script de base de données que je vous ai fourni. Il crée les tables fondamentales : `users`, `schools`, et `session_codes` nécessaires au Smart Check-In.

### 🔌 Fichiers API (`api/`)
*   **`check-in.php`** : Point d'entrée pour le Smart Check-In. Reçoit le code à 6 chiffres depuis React, interroge MySQL (tables `session_codes` + `users`), et renvoie l'identité du formateur en JSON.
*   **`recruitment.php`** : API qui reçoit les envois de formulaires complexes (`multipart/form-data`). Capture les champs textes (nom, spécialité) et téléverse de manière sécurisée les fichiers (CV, CNI, Photo) dans un sous-dossier `/uploads/candidatures/`.
*   *(À créer par la suite selon vos besoins :)* `login.php` (Génération de Token JWT), `submit-report.php` (Enregistrement final du cours), `issues.php` (Transmission des pannes au Maintenancier).

---

## 🚀 Prochaines Étapes pour le Déploiement Local

1.  **Démarrer XAMPP :** Lancez Apache et MySQL.
2.  **Base de données :** Allez sur `localhost/phpmyadmin` et importez `database_schema.sql`.
3.  **Hébergement API :** Placez le dossier `api/` (contenant `check-in.php` et `recruitment.php`) dans le dossier `htdocs` de XAMPP.
4.  **Installer Node.js :** Si ce n'est pas fait, installez Node.js.
5.  **Lancer React :**
    *   Ouvrez un terminal dans le dossier du projet `PESG`.
    *   Tapez `npm install` pour installer toutes les dépendances (cela corrigera toutes les éventuelles fenêtres d'erreur rouges de votre éditeur).
    *   Tapez `npm run dev` pour lancer l'interface utilisateur.

Félicitations pour l'architecture E-SCHOOL GROUPE V 2.7 ! Le projet est maintenant structuré selon les meilleurs standards de l'industrie (React/TypeScript/PHP/MUI).
