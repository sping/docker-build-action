const github = require('@actions/github');
const core = require('@actions/core');
const path = require('path');

export const stageName = core.getInput('stage-name');
export const cacheDir = core.getInput('cache-path');
export const cacheFile = path.join(cacheDir, stageName);
export const tag = `${github.context.repo.repo}:${stageName}`;

export async function runAndCatch(fn) {
  try {
    await fn();
  } catch (error) {
    core.setFailed(error.message || error.toString());
  }
}
