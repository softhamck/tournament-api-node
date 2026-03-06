// Generador pseudo-aleatorio con semilla (LCG) para que "aleatorio" sea reproducible
function makeSeededRng(seed) {
  let state = (seed >>> 0) || 123456789;
  return function next() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

function shuffleWithSeed(arr, seed) {
  const rng = makeSeededRng(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = { makeSeededRng, shuffleWithSeed };