const MatchRepository = require("../../ports/repos/MatchRepository");

class InMemoryMatchRepository extends MatchRepository {
  constructor() {
    super();
    this.store = new Map(); // id -> Match
  }
  save(m) { this.store.set(m.id, m); }
  findById(id) { return this.store.get(id) ?? null; }

  listByChampionshipAndGroup(championshipId, groupName) {
    const out = [];
    for (const m of this.store.values()) {
      if (m.championshipId === championshipId && m.groupName === groupName) out.push(m);
    }
    return out;
  }
}
module.exports = InMemoryMatchRepository;