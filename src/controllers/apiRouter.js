const express = require("express");

function makeApiRouter(appFacade) {
  const r = express.Router();

  // RQ001
  r.post("/championships", (req, res) => {
    try {
      const ch = appFacade.createChampionship(req.body);
      res.status(201).json(ch);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ002 + RQ003
  r.post("/championships/:id/teams", (req, res) => {
    try {
      appFacade.registerTeam(req.params.id, req.body.name);
      res.status(201).json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ004 + RQ005
  r.post("/championships/:id/groups", (req, res) => {
    try {
      const groupCount = Number(req.body.groupCount);
      const seed = Number(req.body.seed ?? Date.now());
      const groups = appFacade.generateGroups(req.params.id, groupCount, seed);
      res.json(groups);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ006
  r.post("/championships/:id/schedule", (req, res) => {
    try {
      const group = req.body.group; // { name, teams:[{id,name}...] }
      const matches = appFacade.generateSchedule(req.params.id, group);
      res.json(matches);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ007
  r.post("/matches/:matchId/result", (req, res) => {
    try {
      const m = appFacade.registerResult(
        req.params.matchId,
        Number(req.body.homeGoals),
        Number(req.body.awayGoals)
      );
      res.json(m);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ011 + RQ009 + RQ010
  r.get("/championships/:id/standings", (req, res) => {
    try {
      const groupName = String(req.query.group ?? "");
      const out = appFacade.standings(req.params.id, groupName);
      res.json(out);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // RQ012
  r.get("/championships/:id/matches", (req, res) => {
    try {
      const groupName = String(req.query.group ?? "");
      const out = appFacade.listMatches(req.params.id, groupName);
      res.json(out);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  return r;
}

module.exports = makeApiRouter;