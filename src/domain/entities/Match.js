const { randomUUID } = require("crypto");

class Match {
  constructor({ championshipId, groupName, homeTeam, awayTeam }) {
    this.id = randomUUID();
    this.championshipId = championshipId;
    this.groupName = groupName;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.score = null; // hasta que se juegue
  }
  setScore(score) { this.score = score; }
  played() { return this.score !== null; }
}

module.exports = Match;