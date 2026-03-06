const Score = require("../domain/entities/Score");

class ResultService {
  constructor({ matchRepo, publisher }) {
    this.matchRepo = matchRepo;
    this.publisher = publisher;
  }

  registerResult(matchId, homeGoals, awayGoals) {
    const m = this.matchRepo.findById(matchId);
    if (!m) throw new Error("Match not found");

    m.setScore(new Score(homeGoals, awayGoals));
    this.matchRepo.save(m);

    this.publisher.publishResult({
      championshipId: m.championshipId,
      groupName: m.groupName,
      matchId: m.id,
      homeGoals,
      awayGoals,
    });

    return m;
  }
}
module.exports = ResultService;