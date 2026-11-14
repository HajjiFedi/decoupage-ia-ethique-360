import { t } from '../i18n/fr';
import type { RuleViolation } from '../rules';
import { useSceneStore } from './sceneStore';

export function RulesPanel({ violations }: { violations: RuleViolation[] }) {
  const scene = useSceneStore((s) => s.scene);
  const order = (shotId: string): number | string => scene.shots.find((s) => s.id === shotId)?.order ?? '?';
  const camera = (id: string): string => scene.cameras.find((c) => c.id === id)?.name ?? id;
  const axis = scene.actionLine;
  const actorName = (id: string | undefined): string => scene.actors.find((a) => a.id === id)?.name ?? '?';
  return (
    <section>
      <h2>{t('rulesTitle')}</h2>
      <p className="muted">
        {axis ? t('axisLabel', { a: actorName(axis.actorAId), b: actorName(axis.actorBId) }) : t('noAxis')}
      </p>
      {violations.length === 0 ? (
        <p className="ok" role="status">✓ {t('rulesOk')}</p>
      ) : (
        <ul className="violations" role="alert">
          {violations.map((v) => (
            <li key={v.shotId}>
              ⚠ {t('lineCrossing', { shot: order(v.shotId), camera: camera(v.cameraId), previous: order(v.previousShotId) })}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
