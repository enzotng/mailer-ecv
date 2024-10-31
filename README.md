# Mailer ECV

## Description

Mailer ECV est une API qui permet de gérer des tâches et d’envoyer des notifications par email en utilisant un compte Gmail. Les notifications sont envoyées lors de la création, de la mise à jour et de la suppression des tâches pour garder les utilisateurs informés des changements.

## Fonctionnalités

-   Création de tâches avec notification par email
-   Mise à jour de tâches avec notification par email
-   Suppression de tâches avec notification par email
-   Gestion des tâches en mémoire (in-memory database)

## Prérequis

-   **Node.js** (version 14+)
-   Un compte Gmail pour l'envoi d'emails
-   **Typescript** pour le développement

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/enzotng/mailer-ecv.git
    cd mailer-ecv
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet avec les informations suivantes :

    ```plaintext
    EMAIL_USER=ton_email@gmail.com
    EMAIL_PASS=ton_mot_de_passe_application
    EMAIL_RECEPTION=adresse_email_de_reception@gmail.com
    SMTP_SERVER_smtp.test.com
    ```

    > ⚠️ Utilisez un mot de passe d'application pour Gmail. Voir [Créer un mot de passe d&#39;application](https://support.google.com/mail/answer/185833?hl=fr) pour plus d’informations.

## Démarrage du Serveur

Pour démarrer le serveur en mode développement :

```bash
npm run dev
```

Pour démarrer le serveur en production :

```bash
npm start
```

L'API sera accessible à `http://localhost:3000`.

## Utilisation de l'API

### Endpoints

#### 1. Créer une tâche

-   **URL** : `/taches`
-   **Méthode** : `POST`
-   **Corps** :
    ```json
    {
        "titre": "Nom de la tâche",
        "description": "Description détaillée de la tâche"
    }
    ```
-   **Réponse** : La tâche créée

#### 2. Mettre à jour une tâche

-   **URL** : `/taches/:id`
-   **Méthode** : `PUT`
-   **Corps** :
    ```json
    {
        "titre": "Nom mis à jour",
        "description": "Description mise à jour"
    }
    ```
-   **Réponse** : La tâche mise à jour ou une erreur 404 si l'ID est introuvable

#### 3. Supprimer une tâche

-   **URL** : `/taches/:id`
-   **Méthode** : `DELETE`
-   **Réponse** : Code 204 si la suppression est réussie, ou une erreur 404 si l'ID est introuvable

#### 4. Récupérer toutes les tâches

-   **URL** : `/taches`
-   **Méthode** : `GET`
-   **Réponse** : Liste des tâches

#### 5. Récupérer une tâche par ID

-   **URL** : `/taches/:id`
-   **Méthode** : `GET`
-   **Réponse** : Détails de la tâche ou erreur 404 si l'ID est introuvable

## Tests

Pour exécuter les tests :

```bash
npm test
```

Les tests couvrent les endpoints de l’API et vérifient que les emails sont bien envoyés.

## Structure du Projet

```
mailer-ecv/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── routes/
│   │   └── tachesRouter.ts
│   ├── services/
│   │   └── tachesService.ts
│   └── utils/
│       └── mailer.ts
├── tests/
│   ├── mailer.test.ts
│   ├── tachesRouter.test.ts
│   └── tachesService.test.ts
├── .env
├── package.json
└── tsconfig.json
```

## Auteur

Enzo Tang

## Licence

Projet académique - usage non commercial
