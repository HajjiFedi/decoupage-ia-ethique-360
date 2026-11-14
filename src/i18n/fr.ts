export const fr = {
  appTitle: 'Découpage',
  appTagline: 'Plan au sol et règles de grammaire filmique',
  addActor: 'Ajouter un personnage',
  addCamera: 'Ajouter une caméra',
  resetScene: 'Réinitialiser la scène',
  exportPng: 'Exporter en PNG',
  shotsTitle: 'Découpage technique',
  shotLabel: 'Plan {order}',
  rulesTitle: 'Vérifications',
  rulesOk: 'Aucune violation : la règle des 180° est respectée.',
  lineCrossing:
    'Plan {shot} : {camera} franchit l’axe des 180° par rapport au plan {previous}. Les regards vont sembler inversés au montage.',
  axisLabel: 'Axe : {a} ↔ {b}',
  noAxis: 'Aucun axe défini',
  saved: 'Enregistré',
  saving: 'Enregistrement…',
  saveError: 'Échec de l’enregistrement',
  hint: 'Glissez les personnages et les caméras. Les caméras visent automatiquement leurs sujets.',
  actorDefaultName: 'Personnage {n}',
  cameraDefaultName: 'Cam {n}',
  shotSizes: {
    TGP: 'Très gros plan',
    GP: 'Gros plan',
    PR: 'Plan rapproché',
    PM: 'Plan moyen',
    PA: 'Plan américain',
    PE: 'Plan d’ensemble',
    PG: 'Plan général',
  },
} as const;

type StringKey = { [K in keyof typeof fr]: (typeof fr)[K] extends string ? K : never }[keyof typeof fr];

export function t(key: StringKey, params: Record<string, string | number> = {}): string {
  return fr[key].replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
}
