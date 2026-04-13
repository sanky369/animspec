import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { inferUseCaseFromIntent } from '../src/lib/mcp/use-case-inference.ts';

test('infers UI/UX audit from an onboarding critique request', () => {
  const inference = inferUseCaseFromIntent('Audit this onboarding flow for UX friction and clarity issues');

  assert.equal(inference.format, 'ui_ux_audit');
  assert.equal(inference.confidence, 'high');
});

test('infers tailwind animate from a Tailwind keyframes request', () => {
  const inference = inferUseCaseFromIntent('Turn this motion into Tailwind keyframes and utility classes');

  assert.equal(inference.format, 'tailwind_animate');
  assert.notEqual(inference.confidence, 'low');
});

test('infers interaction state machine from state and transition language', () => {
  const inference = inferUseCaseFromIntent('Extract the interaction state machine with states, guards, and transitions');

  assert.equal(inference.format, 'interaction_state_machine');
  assert.equal(inference.confidence, 'high');
});

test('falls back to clone_ui_animation for a broad recreate request', () => {
  const inference = inferUseCaseFromIntent('Recreate this animation for me');

  assert.equal(inference.format, 'clone_ui_animation');
});
