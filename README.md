# Carte jeune engagé

![CI Workflow](https://github.com/DISIC/jedonnemonavis.numerique.gouv.fr/actions/workflows/ci.yml/badge.svg)

## Developpement

### Webapp

Accédez au dossier de l'application NextJS webapp :

```bash
cd webapp
```

Copiez le fichier .env.example :

```bash
cp .env.example .env
```

Installez les dépendances nécessaires :

```bash
yarn
```

Générez les données de test :

```bash
yarn seed
```

Lancez l'application, qui sera accessible sur le port 3000 :

```bash
yarn dev
```

Voici les informations des utilisateurs prêts à être utilisés en développement grâce aux données de test :
| Email | Type de compte | Mot de passe |
| -------- | -------- | -------- |
| user@test.loc     | Utilisateur     | user123     |
| admin@test.loc     | Administrateur     | admin123     |
