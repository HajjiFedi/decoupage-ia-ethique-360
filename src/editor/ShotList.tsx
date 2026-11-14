import { fr, t } from '../i18n/fr';
import type { RuleViolation } from '../rules';
import { useSceneStore } from './sceneStore';

export function ShotList({ violations }: { violations: RuleViolation[] }) {
  const scene = useSceneStore((s) => s.scene);
  const flagged = new Set(violations.map((v) => v.shotId));
  const shots = [...scene.shots].sort((a, b) => a.order - b.order);
  const nameOf = (ids: string[]): string =>
    scene.actors.filter((a) => ids.includes(a.id)).map((a) => a.name).join(', ');
  return (
    <section>
      <h2>{t('shotsTitle')}</h2>
      <ol className="shots">
        {shots.map((shot) => (
          <li key={shot.id} className={flagged.has(shot.id) ? 'shot shot--flagged' : 'shot'}>
            <strong>{t('shotLabel', { order: shot.order })}</strong>
            <span>{fr.shotSizes[shot.size]}</span>
            <span className="muted">
              {scene.cameras.find((c) => c.id === shot.cameraId)?.name} · {nameOf(shot.subjectIds)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
