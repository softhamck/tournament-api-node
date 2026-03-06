// Default: Victoria 3, Empate 1, Derrota 0 (reglas iniciales)
function defaultRules() {
  return {
    scoring: { win: 3, draw: 1, loss: 0 },
    tieBreakers: ["goalDiff", "goalsFor", "headToHead"], // orden requerido
  };
}

module.exports = { defaultRules };