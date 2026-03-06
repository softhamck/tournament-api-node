const InMemoryChampionshipRepository = require("../infra/repos/InMemoryChampionshipRepository");
const InMemoryTeamRepository = require("../infra/repos/InMemoryTeamRepository");
const InMemoryMatchRepository = require("../infra/repos/InMemoryMatchRepository");
const ExternalResultsPlatformAdapter = require("../infra/external/ExternalResultsPlatformAdapter");

const ChampionshipService = require("../services/ChampionshipService");
const TeamService = require("../services/TeamService");
const GroupService = require("../services/GroupService");
const ScheduleService = require("../services/ScheduleService");
const ResultService = require("../services/ResultService");
const StandingsService = require("../services/StandingsService");

class ApplicationFacade {
  constructor() {
    this.championshipRepo = new InMemoryChampionshipRepository();
    this.teamRepo = new InMemoryTeamRepository();
    this.matchRepo = new InMemoryMatchRepository();
    this.publisher = new ExternalResultsPlatformAdapter();

    this.championshipService = new ChampionshipService({ championshipRepo: this.championshipRepo });
    this.teamService = new TeamService({ teamRepo: this.teamRepo, championshipRepo: this.championshipRepo });
    this.groupService = new GroupService();
    this.scheduleService = new ScheduleService({ matchRepo: this.matchRepo });
    this.resultService = new ResultService({ matchRepo: this.matchRepo, publisher: this.publisher });
    this.standingsService = new StandingsService({ matchRepo: this.matchRepo, publisher: this.publisher });
  }

  createChampionship(data) { return this.championshipService.create(data); }
  getChampionship(id) { return this.championshipService.get(id); }

  registerTeam(championshipId, name) {
    return this.teamService.registerTeam(championshipId, name);
  }

  generateGroups(championshipId, groupCount, seed) {
    const teams = this.teamService.listTeams(championshipId);
    const groups = this.groupService.generateBalancedRandomGroups(teams, groupCount, seed);
    const ch = this.getChampionship(championshipId);
    ch.markStarted(); // desde aqui bloqueas edicion de equipos (prototipo)
    this.championshipRepo.save(ch);
    return groups;
  }

  generateSchedule(championshipId, group) {
    return this.scheduleService.generateRoundRobin({ championshipId, group });
  }

  registerResult(matchId, hg, ag) {
    return this.resultService.registerResult(matchId, hg, ag);
  }

  standings(championshipId, groupName) {
    const championship = this.getChampionship(championshipId);
    return this.standingsService.computeStandings({ championship, groupName });
  }

  listMatches(championshipId, groupName) {
    return this.matchRepo.listByChampionshipAndGroup(championshipId, groupName);
  }
}

module.exports = ApplicationFacade;