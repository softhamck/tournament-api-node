const express = require("express");
const ApplicationFacade = require("./app/applicationFacade");
const makeApiRouter = require("./controllers/apiRouter");

const app = express();
app.use(express.json());

const facade = new ApplicationFacade();
app.use("/api", makeApiRouter(facade));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}/api`));