function initEntry(team) {
  return { team, points: 0, gf: 0, ga: 0 };
}
function goalDiff(e) { return e.gf - e.ga; }

function applyMatch(entryHome, entryAway, score, scoring) {
  entryHome.gf += score.homeGoals;
  entryHome.ga += score.awayGoals;
  entryAway.gf += score.awayGoals;
  entryAway.ga += score.homeGoals;

  if (score.homeGoals > score.awayGoals) {
    entryHome.points += scoring.win;
    entryAway.points += scoring.loss;
  } else if (score.homeGoals < score.awayGoals) {
    entryAway.points += scoring.win;
    entryHome.points += scoring.loss;
  } else {
    entryHome.points += scoring.draw;
    entryAway.points += scoring.draw;
  }
}

// headToHead SOLO resuelve empates de 2 equipos (si hay 3+ empatados, toca mini-tabla)
function headToHeadComparator(teamAId, teamBId, matches) {
  let aPts = 0, bPts = 0;
  for (const m of matches) {
    if (!m.played()) continue;
    const ids = [m.homeTeam.id, m.awayTeam.id];
    if (!(ids.includes(teamAId) && ids.includes(teamBId))) continue;

    const hg = m.score.homeGoals, ag = m.score.awayGoals;
    const homeIsA = m.homeTeam.id === teamAId;

    if (hg === ag) { aPts += 1; bPts += 1; }
    else if ((hg > ag && homeIsA) || (ag > hg && !homeIsA)) { aPts += 3; }
    else { bPts += 3; }
  }
  if (aPts !== bPts) return bPts - aPts; // mayor puntos H2H primero
  return 0;
}

module.exports = { initEntry, goalDiff, applyMatch, headToHeadComparator };