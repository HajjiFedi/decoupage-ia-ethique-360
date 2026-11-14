import type Konva from 'konva';

/** Downloads the floor plan as a PNG; storyboard PDF export comes later, server side. */
export function exportStageToPng(stage: Konva.Stage, fileName: string): void {
  const link = document.createElement('a');
  link.href = stage.toDataURL({ pixelRatio: 2 });
  link.download = `${fileName}.png`;
  link.click();
}
