const Championship = require("../domain/entities/Championship");
const { defaultRules } = require("../domain/rules/rulesConfig");

class ChampionshipService {
  constructor({ championshipRepo }) {
    this.championshipRepo = championshipRepo;
  }

  create({ name, startDate, endDate, rules }) {
    const ch = new Championship({
      name,
      startDate,
      endDate,
      rules: rules ?? defaultRules(),
    });
    this.championshipRepo.save(ch);
    return ch;
  }

  get(id) {
    const ch = this.championshipRepo.findById(id);
    if (!ch) throw new Error("Championship not found");
    return ch;
  }
}

module.exports = ChampionshipService;