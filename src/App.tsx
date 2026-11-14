import type Konva from 'konva';
import { useMemo, useRef } from 'react';
import { exportStageToPng } from './export/exportPng';
import { FloorPlanCanvas } from './editor/FloorPlanCanvas';
import { RulesPanel } from './editor/RulesPanel';
import { ShotList } from './editor/ShotList';
import { useSceneStore } from './editor/sceneStore';
import { useScenePersistence, type SaveStatus } from './editor/useScenePersistence';
import { t } from './i18n/fr';
import { runRules } from './rules';
import { IndexedDbSceneRepository } from './storage/IndexedDbSceneRepository';

const repository = new IndexedDbSceneRepository();
const statusText: Record<SaveStatus, string> = { saved: t('saved'), saving: t('saving'), error: t('saveError') };

export function App() {
  const { scene, addActor, addCamera, reset } = useSceneStore();
  const violations = useMemo(() => runRules(scene), [scene]);
  const status = useScenePersistence(repository);
  const stageRef = useRef<Konva.Stage | null>(null);
  const exportPng = (): void => {
    if (stageRef.current) exportStageToPng(stageRef.current, scene.title);
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>{t('appTitle')}</h1>
          <p className="muted">{t('appTagline')} · {scene.title}</p>
        </div>
        <div className="toolbar">
          <button onClick={addActor}>{t('addActor')}</button>
          <button onClick={addCamera}>{t('addCamera')}</button>
          <button onClick={exportPng}>{t('exportPng')}</button>
          <button className="secondary" onClick={reset}>{t('resetScene')}</button>
          <span className={`status status--${status}`}>{statusText[status]}</span>
        </div>
      </header>
      <main>
        <div className="canvas">
          <FloorPlanCanvas violations={violations} stageRef={stageRef} />
          <p className="muted">{t('hint')}</p>
        </div>
        <aside>
          <RulesPanel violations={violations} />
          <ShotList violations={violations} />
        </aside>
      </main>
    </div>
  );
}
