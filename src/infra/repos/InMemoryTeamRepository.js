const TeamRepository = require("../../ports/repos/TeamRepository");

class InMemoryTeamRepository extends TeamRepository {
  constructor() {
    super();
    this.store = new Map(); // championshipId -> Team[]
  }
  add(championshipId, team) {
    const list = this.store.get(championshipId) ?? [];
    list.push(team);
    this.store.set(championshipId, list);
  }
  listByChampionship(championshipId) {
    return [...(this.store.get(championshipId) ?? [])];
  }
  findByName(championshipId, name) {
    const n = String(name ?? "").trim().toLowerCase();
    return this.listByChampionship(championshipId).find(t => t.name.toLowerCase() === n) ?? null;
  }
}
module.exports = InMemoryTeamRepository;