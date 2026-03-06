const ResultsPublisherPort = require("../../ports/external/ResultsPublisherPort");

class ExternalResultsPlatformAdapter extends ResultsPublisherPort {
  publishResult(payload) {
    console.log("[ExternalAdapter] publishResult", payload);
  }
  publishStandings(payload) {
    console.log("[ExternalAdapter] publishStandings", payload);
  }
}
module.exports = ExternalResultsPlatformAdapter;