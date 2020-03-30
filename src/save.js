const core = require('@actions/core');
const exec = require('@actions/exec');

const { cacheFile, tag, runAndCatch } = require('./shared');

async function run() {
  const save = core.getInput('save') === 'true';

  if (!save) return console.log('Build set to false, so skipping build');

  console.log(`Saving image for cache (${cacheFile})`);
  return exec.exec('docker', ['save', tag, '--output', cacheFile]);
}

runAndCatch(run);
