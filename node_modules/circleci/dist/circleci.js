(function() {
  var CircleCI;

  CircleCI = (function() {
    var CircleCIRequest, CircleCIResponse;

    CircleCIRequest = require("./circleci-request");

    CircleCIResponse = require("./circleci-response");

    function CircleCI(config) {
      if (typeof config.auth !== "string") {
        throw new Error("API token must be provided");
      }
      this.request = new CircleCIRequest(config);
      this.routes = require("./routes");
    }

    CircleCI.prototype.getUser = function() {
      return this.request.process(this.routes['getUser']);
    };

    CircleCI.prototype.getProjects = function() {
      return this.request.process(this.routes['getProjects']);
    };

    CircleCI.prototype.getRecentBuilds = function(opts) {
      return this.request.process(this.routes['getRecentBuilds'], opts);
    };

    CircleCI.prototype.getBuilds = function(opts) {
      return this.request.process(this.routes['getBuilds'], opts);
    };

    CircleCI.prototype.getBranchBuilds = function(opts) {
      return this.request.process(this.routes['getBranchBuilds'], opts);
    };

    CircleCI.prototype.getBuild = function(opts) {
      return this.request.process(this.routes['getBuild'], opts);
    };

    CircleCI.prototype.startBuild = function(opts) {
      return this.request.process(this.routes['startBuild'], opts);
    };

    CircleCI.prototype.cancelBuild = function(opts) {
      return this.request.process(this.routes['cancelBuild'], opts);
    };

    CircleCI.prototype.retryBuild = function(opts) {
      return this.request.process(this.routes['retryBuild'], opts);
    };

    CircleCI.prototype.getBuildArtifacts = function(opts) {
      return this.request.process(this.routes['getBuildArtifacts'], opts);
    };

    CircleCI.prototype.clearBuildCache = function(opts) {
      return this.request.process(this.routes['clearBuildCache'], opts);
    };

    CircleCI.prototype.getTestMetadata = function(opts) {
      return this.request.process(this.routes['getTestMetadata'], opts);
    };

    CircleCI.prototype.getEnvVars = function(opts) {
      return this.request.process(this.routes['getEnvVars'], opts);
    };

    CircleCI.prototype.getEnvVar = function(opts) {
      return this.request.process(this.routes['getEnvVar'], opts);
    };

    CircleCI.prototype.setEnvVar = function(opts) {
      return this.request.process(this.routes['setEnvVar'], opts);
    };

    CircleCI.prototype.deleteEnvVar = function(opts) {
      return this.request.process(this.routes['deleteEnvVar'], opts);
    };

    return CircleCI;

  })();

  module.exports = CircleCI;

}).call(this);
