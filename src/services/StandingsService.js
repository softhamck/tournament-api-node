const { initEntry, goalDiff, applyMatch, headToHeadComparator } = require("../domain/rules/standings");

class StandingsService {
  constructor({ matchRepo, publisher }) {
    this.matchRepo = matchRepo;
    this.publisher = publisher;
  }

  computeStandings({ championship, groupName }) {
    const matches = this.matchRepo.listByChampionshipAndGroup(championship.id, groupName);
    const table = new Map(); // teamId -> entry

    for (const m of matches) {
      if (!m.played()) continue;

      if (!table.has(m.homeTeam.id)) table.set(m.homeTeam.id, initEntry(m.homeTeam));
      if (!table.has(m.awayTeam.id)) table.set(m.awayTeam.id, initEntry(m.awayTeam));

      const eh = table.get(m.homeTeam.id);
      const ea = table.get(m.awayTeam.id);

      applyMatch(eh, ea, m.score, championship.rules.scoring);
    }

    const entries = [...table.values()];

    entries.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;

      const gd = goalDiff(b) - goalDiff(a);
      if (gd !== 0) return gd;

      if (b.gf !== a.gf) return b.gf - a.gf;

      // head-to-head SOLO para empates de 2 (si hay 3+ empatados, se requiere mini-tabla)
      const h2h = headToHeadComparator(a.team.id, b.team.id, matches);
      if (h2h !== 0) return h2h;

      return a.team.name.localeCompare(b.team.name);
    });

    const payload = {
      championshipId: championship.id,
      groupName,
      standings: entries.map(e => ({
        team: e.team.name,
        points: e.points,
        goalDiff: goalDiff(e),
        goalsFor: e.gf,
      })),
    };

    this.publisher.publishStandings(payload);
    return payload;
  }
}

module.exports = StandingsService;