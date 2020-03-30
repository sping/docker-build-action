const exec = require('@actions/exec');

const {
  stageName,
  cacheDir,
  cacheFile,
  tag,
  runAndCatch
} = require('./shared');

async function run() {
  await loadCached();

  console.log(`Building image for stage ${stageName}`);
  await exec.exec(
    'docker',
    [
      'build',
      '--build-arg',
      'BUILDKIT_INLINE_CACHE=1',
      `--cache-from`,
      tag,
      `--target`,
      stageName,
      `-t`,
      tag,
      '.'
    ],
    { env: { DOCKER_BUILDKIT: '1' } }
  );
  console.log('Built image');
}

async function loadCached() {
  await exec.exec('mkdir', ['-p', cacheDir]);
  const cacheCheckReturn = await exec.exec('test', ['-f', cacheFile], {
    ignoreReturnCode: true
  });

  if (cacheCheckReturn !== 0) {
    return console.log('No cached image, skipping loading');
  }

  console.log(`Loading cached image (${cacheFile})`);
  return exec.exec('docker', ['load', '--input', cacheFile]);
}

runAndCatch(run);
