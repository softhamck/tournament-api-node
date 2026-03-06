class Score {
  constructor(homeGoals, awayGoals) {
    if (homeGoals < 0 || awayGoals < 0) throw new Error("Negative goals");
    this.homeGoals = homeGoals;
    this.awayGoals = awayGoals;
  }
}
module.exports = Score;