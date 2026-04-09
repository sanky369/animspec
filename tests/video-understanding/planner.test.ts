
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { createPipelinePlan, getAnalysisFamily } from '../../src/lib/video-understanding/planner.ts';
// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { buildSharedArtifactBundle } from '../../src/lib/video-understanding/preprocess/shared.ts';

test('routes UI/UX audit to the audit family', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 8, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'flow.mp4' },
    triggerContext: 'click',
    fileSize: 1024,
    format: 'ui_ux_audit',
    quality: 'balanced',
  });

  const plan = createPipelinePlan({
    format: 'ui_ux_audit',
    quality: 'balanced',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 8, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'flow.mp4' },
  });

  assert.equal(getAnalysisFamily('ui_ux_audit'), 'audit');
  assert.equal(plan.family, 'audit');
  assert.equal(plan.stages[0]?.id, 'audit_flow');
});

test('routes interaction state machine to the behavior family', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 5, width: 390, height: 844, size: 1024, mimeType: 'video/mp4', name: 'state.mp4' },
    triggerContext: 'hover',
    fileSize: 1024,
    format: 'interaction_state_machine',
    quality: 'balanced',
  });

  const plan = createPipelinePlan({
    format: 'interaction_state_machine',
    quality: 'balanced',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 5, width: 390, height: 844, size: 1024, mimeType: 'video/mp4', name: 'state.mp4' },
  });

  assert.equal(plan.family, 'behavior');
  assert.equal(plan.stages[0]?.id, 'behavior_inventory');
});

test('escalates reconstruct jobs with longer durations to non-simple complexity', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 18, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'long.mp4' },
    triggerContext: 'scroll',
    fileSize: 1024,
    frameGridCount: 8,
    format: 'clone_landing_page',
    quality: 'precise',
  });

  const plan = createPipelinePlan({
    format: 'clone_landing_page',
    quality: 'precise',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 18, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'long.mp4' },
  });

  assert.notEqual(plan.complexity, 'simple');
  assert.equal(plan.family, 'reconstruct');
});
