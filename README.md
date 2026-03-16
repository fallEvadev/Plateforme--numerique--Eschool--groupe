📋 Présentation du Projet
E-School Groupe est une plateforme numérique conçue pour automatiser et centraliser le suivi pédagogique, la maintenance, le recrutement et la gestion contractuelle au sein du groupe scolaire. Elle offre une interface sécurisée, accessible et responsive, adaptée aux environnements à connexion internet limitée.

👥 Architecture des Utilisateurs & Droits d'Accès
La plateforme applique une segmentation stricte des profils pour garantir la sécurité des données.
👤 Profil🔐 Accès & FonctionnalitésFormateurPlanning personnalisé · Règlement intérieur (après activation) · Programme mensuel · Formulaire de rapport journalierMaintenancierListe des pannes signalées par établissement et numéro de machineAdministrateur (Multi-comptes)Création de 4 comptes admin ou plus · Ventilation des tâches : Pédagogie, RH, Maintenance, Super-Admin

🧑‍💼 Gestion du Personnel (Mouvements RH)
🟢 Nouvelles Recrues

L'Admin RH crée le profil via un formulaire dédié (CV, CNI, Photo).
Un accès sécurisé est généré automatiquement dès la validation.
Le Règlement Intérieur n'est consultable qu'après activation du compte.

🔴 Licenciements & Fins de Contrat

Désactivation instantanée du compte.
L'accès est coupé immédiatement.
L'historique des rapports et documents est conservé en base de données pour les archives.


🕐 Module de Pointage & Documents Pédagogiques
⚙️ Fonctionnalité📝 DescriptionCodes QuotidiensLa Direction Pédagogique génère chaque jour des codes uniques par écoleValidation du CodeLe formateur saisit le code → la plateforme affiche son nom pour confirmer son identificationTransmission DiscrèteEnvoi des codes aux directeurs partenaires via SMS/WhatsAppProgramme MensuelPublié chaque mois par la Direction, consultable sur l'interface formateurRèglement IntérieurDocument numérique modifiable par la Direction, accessible aux agents actifs uniquement

📄 Circuit du Rapport Journalier
Formateur          →     Direction          →     Formateur
Saisie du rapport       Réception & révision      Notification : ✅ Validé / ✏️ À modifier
Champs du formulaire de saisie :

🏫 Nom de l'école
📅 Date & Heure
📚 Classes enseignées
📖 Thème du cours
🔧 État du matériel (pannes éventuelles)


📊 Automatisation & Diffusion des Rapports Périodiques
🔘 Action📋 RésultatBouton de TransformationRegroupement automatique des rapports journaliers en bilans hebdomadaires ou mensuelsExportation ProfessionnelleGénération de fichiers Word éditables avec Logo E-School et signaturesEnvoi aux PartenairesTransmission directe du rapport finalisé aux écoles partenaires concernées via le système

⚙️ Spécifications Techniques
🛠️ Composant🔧 TechnologieFront-endHTML · CSS (palette Bleu / Blanc / Gris) · JavaScriptInteractivité & LocalisationJavaScript (Géolocalisation intégrée)Back-endPHPBase de donnéesMySQLEnvironnement de développementXAMPP (architecture 64 bits)AccessibilitéInterface Responsive — optimisée pour connexion internet limitée

🗂️ Structure des Modules
E-School Groupe v2.7
├── 👥 Gestion des Utilisateurs
│   ├── Profil Formateur
│   ├── Profil Maintenancier
│   └── Pôle Administrateur (Multi-comptes)
├── 🧑‍💼 RH & Recrutement
│   ├── Intégration des recrues
│   └── Gestion des fins de contrat
├── 🕐 Pointage & Présence
│   ├── Générateur de codes quotidiens
│   └── Validation & identification formateur
├── 📄 Rapports Journaliers
│   ├── Formulaire de saisie
│   └── Circuit de validation
├── 📊 Rapports Périodiques
│   ├── Transformation automatique
│   └── Export Word + envoi partenaires
└── 🔧 Maintenance
    └── Suivi des pannes par établissement

🔒 Sécurité & Confidentialité

✅ Segmentation stricte des profils et des droits d'accès
✅ Accès au Règlement Intérieur conditionné à l'activation du compte
✅ Désactivation instantanée en cas de fin de contrat
✅ Conservation des archives même après désactivation
✅ Transmission des codes de présence via canaux discrets (SMS / WhatsApp)