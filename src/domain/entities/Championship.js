const { randomUUID } = require("crypto");

class Championship {
  constructor({ name, startDate, endDate, rules }) {
    this.id = randomUUID();
    this.name = String(name ?? "").trim();
    this.startDate = startDate;
    this.endDate = endDate;
    this.started = false;
    this.rules = rules; // configuracion (RQ020)
  }
  markStarted() { this.started = true; }
}

module.exports = Championship;