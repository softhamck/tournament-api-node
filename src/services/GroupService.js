const { shuffleWithSeed } = require("../util/seededRandom");

class GroupService {
  generateBalancedRandomGroups(teams, groupCount, seed) {
    if (groupCount <= 0) throw new Error("groupCount <= 0");
    if (teams.length < groupCount) throw new Error("Not enough teams for groups");

    const shuffled = shuffleWithSeed(teams, seed);
    const groups = Array.from({ length: groupCount }, (_, i) => ({
      name: `G${i + 1}`,
      teams: [],
    }));

    for (let i = 0; i < shuffled.length; i++) {
      groups[i % groupCount].teams.push(shuffled[i]);
    }
    return groups;
  }
}
module.exports = GroupService;