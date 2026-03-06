const Team = require("../domain/entities/Team");

class TeamService {
  constructor({ teamRepo, championshipRepo }) {
    this.teamRepo = teamRepo;
    this.championshipRepo = championshipRepo;
  }

  registerTeam(championshipId, name) {
    const ch = this.championshipRepo.findById(championshipId);
    if (!ch) throw new Error("Championship not found");
    if (ch.started) throw new Error("Cannot add teams after championship started");

    if (this.teamRepo.findByName(championshipId, name)) {
      throw new Error("Duplicate team name in same championship");
    }
    this.teamRepo.add(championshipId, new Team(name));
  }

  listTeams(championshipId) {
    return this.teamRepo.listByChampionship(championshipId);
  }
}
module.exports = TeamService;