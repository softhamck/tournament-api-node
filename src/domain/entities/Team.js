const { randomUUID } = require("crypto");

class Team {
  constructor(name) {
    const n = String(name ?? "").trim();
    if (!n) throw new Error("Team name empty");
    this.id = randomUUID();
    this.name = n;
  }
}

module.exports = Team;