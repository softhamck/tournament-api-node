const ChampionshipRepository = require("../../ports/repos/ChampionshipRepository");

class InMemoryChampionshipRepository extends ChampionshipRepository {
  constructor() {
    super();
    this.store = new Map(); // id -> Championship
  }
  save(ch) { this.store.set(ch.id, ch); }
  findById(id) { return this.store.get(id) ?? null; }
}
module.exports = InMemoryChampionshipRepository;