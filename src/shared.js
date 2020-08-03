const github = require('@actions/github');
const core = require('@actions/core');
const path = require('path');

export const stageName = core.getInput('stage-name');
export const cacheDir = core.getInput('cache-path');
export const buildArgs = JSON.parse(core.getInput('build-args'));
export const cacheFile = path.join(cacheDir, stageName);

const imageName = core.getInput('image-name');
export const tag = imageName
  ? imageName
  : `${github.context.repo.repo}/${stageName}`;

export async function runAndCatch(fn) {
  try {
    await fn();
  } catch (error) {
    core.setFailed(error.message || error.toString());
  }
}
