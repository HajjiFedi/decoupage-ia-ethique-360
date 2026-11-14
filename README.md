# Découpage

Outil de storyboard : le réalisateur place personnages et caméras sur un plan au sol, et un moteur de règles vérifie la grammaire filmique (règle des 180°).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # tests unitaires des règles et du schéma
npm run build
```

## Structure

- `src/editor/` : canevas Konva, store Zustand, panneaux
- `src/model/` : schéma de scène versionné (`schemaVersion: 1`), géométrie
- `src/rules/` : une fonction pure par règle, avec tests (`lineCrossing.ts`)
- `src/storage/` : interface `SceneRepository` et implémentation IndexedDB
- `src/export/` : export PNG du plan au sol
- `src/i18n/` : chaînes en français
- `src/lib/logger.ts` : logger (pas de `console.log` ailleurs)

## Règle des 180°

L’axe passe par deux personnages. Les plans sont parcourus dans l’ordre du montage ; un plan est signalé quand sa caméra est de l’autre côté de l’axe par rapport au dernier plan placé d’un côté. Une caméra exactement sur l’axe est neutre.
