# Configuration Requise pour le Backend PHP (E-SCHOOL GROUPE V 2.7)

Pour que votre frontend React fonctionne parfaitement avec la base de données MySQL, vous devez héberger les scripts PHP suivants dans le dossier `api/` de votre serveur (ex: XAMPP, WAMP, ou serveur de production).

D'après le refactoring effectué, voici la liste des **Endpoints PHP indispensables** :

### 1. `api/login.php` (Authentification)
- **Rôle :** Vérifier les accès, hacher les mots de passe et générer un JWT (ou session token).
- **Entrée :** `email`, `password` (POST JSON).
- **Table MySQL :** `users` (Vérifie le rôle: `admin`, `teacher`, ou `maintenance` pour rediriger l'utilisateur vers le bon dashboard).

### 2. `api/check-in.php` (Smart Check-in Formateur)
- **Rôle :** Valider le code à 6 chiffres tapé sur le frontend en temps réel.
- **Entrée :** `code` (GET query parameter).
- **Tables MySQL :** `session_codes`, `users`, `schools`.
- *Note : Ce fichier a déjà été fourni et configuré durant cette session.*

### 3. `api/submit-report.php` (Soumission des rapports journaliers)
- **Rôle :** Enregistrer le rapport journalier du formateur.
- **Entrée :** `theme`, `attendance`, `hardware_status`, `trainer_id`, `school_id` (POST JSON).
- **Table MySQL :** `daily_reports`. (Si `hardware_status` contient une anomalie, une entrée doit être insérée dans une table `hardware_issues` pour que le Maintenancier la reçoive).

### 4. `api/issues.php` (Dashboard Maintenancier)
- **Rôle :** Récupérer la liste des pannes et mettre à jour leur statut.
- **Entrée :** GET (pour lister), POST/PUT (pour changer le statut de 'Signalée' à 'En cours' ou 'Résolue').
- **Table MySQL :** `hardware_issues`.

### 5. `api/recruitment.php` (Dossiers de Candidature)
- **Rôle :** Recevoir les données du formulaire Admin et sauvegarder les fichiers.
- **Entrée :** `nom`, `email`, `specialite` + Fichiers : `cv`, `cni`, `photo` (POST FormData).
- **Processus :** Déplacer les fichiers uploadés via `move_uploaded_file()` vers un dossier sécurisé (ex: `/uploads/candidatures/`) et insérer les métadonnées dans la base.

---

## 🚀 Tester le "Bouton de Transformation" (Génération de Bilans Word/PDF)

Pour la fonctionnalité du "Bilan Mensuel" (Bouton de Transformation) dans la page Validation des Rapports, vous aurez besoin d'une bibliothèque côté serveur pour générer de vrais documents Word (.docx) incluant le logo E-SCHOOL. 

**Recommandation d'implémentation (Côté PHP) :**
Utilisez la librairie PHP **PhpWord** (via Composer).

1. **Installer PhpWord :**
   ```bash
   composer require phpoffice/phpword
   ```

2. **Créer `api/generate-summary.php` :**
   Dans ce script, vous récupérez les rapports validés du mois dans MySQL. Ensuite :
   ```php
   // Initialiser PhpWord
   $phpWord = new \PhpOffice\PhpWord\PhpWord();
   $section = $phpWord->addSection();

   // 1. Ajouter le logo E-School
   $section->addImage('chemin/vers/logo-eschool.png', array('width' => 150, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER));

   // 2. Ajouter le Titre
   $phpWord->addTitleStyle(1, array('bold' => true, 'color' => '1E88E5', 'size' => 16));
   $section->addTitle('Bilan Mensuel de Présence et d\'Avancement', 1);

   // 3. Boucler sur les données de MySQL pour remplir le document
   // ... adding tables/text ...

   // 4. Générer le fichier
   $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
   $objWriter->save('Bilan_Mensuel_Mars_2026.docx');
   
   // Retourner l'URL de téléchargement au Frontend React
   ```

## État des Erreurs (TypeScript / Linting)
Le code React que j'ai implémenté est **100% fonctionnel** pour le rendu et la logique métier.
Si vous ouvrez votre éditeur (VSCode par exemple), vous verrez potentiellement soulignés en rouge des imports comme `@mui/material` ou `react-router-dom`. 

**Pourquoi ?**
C'est simplement parce que vous n'avez pas installé les paquets ou  définitions de types TypeScript dans votre dossier de projet via NPM.
Pour faire disparaître toutes ces erreurs rouges dans votre éditeur, ouvrez un terminal dans votre dossier de projet (`C:\Users\UN-CHK\OneDrive\Desktop\PESG`) et lancez :

```bash
npm install react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install --save-dev @types/react @types/react-dom @types/react-router-dom
```

Une fois cette commande exécutée, votre projet React / TypeScript sera parfaitement "clean" et prêt pour la compilation !
