const Match = require("../domain/entities/Match");

class ScheduleService {
  constructor({ matchRepo }) {
    this.matchRepo = matchRepo;
  }

  // Round-robin; si impar, "BYE" (solo para cuadrar)
  generateRoundRobin({ championshipId, group }) {
    const list = [...group.teams];
    const bye = { id: "BYE", name: "BYE" };
    if (list.length % 2 === 1) list.push(bye);

    const n = list.length;
    const rounds = n - 1;
    const half = n / 2;

    const created = [];

    let arr = [...list];
    for (let r = 0; r < rounds; r++) {
      for (let i = 0; i < half; i++) {
        const home = arr[i];
        const away = arr[n - 1 - i];
        if (home.id === "BYE" || away.id === "BYE") continue;

        const m = new Match({
          championshipId,
          groupName: group.name,
          homeTeam: home,
          awayTeam: away,
        });
        this.matchRepo.save(m);
        created.push(m);
      }
      // rotate keeping first fixed
      const last = arr.pop();
      arr.splice(1, 0, last);
    }

    return created;
  }
}
module.exports = ScheduleService;