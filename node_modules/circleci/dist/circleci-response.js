(function() {
  var CircleCIResponse;

  CircleCIResponse = (function() {
    function CircleCIResponse(res) {
      this.body = res.body;
      this.statusCode = res.statusCode;
    }

    CircleCIResponse.prototype.success = function() {
      return this.statusCode >= 200 && this.statusCode <= 299;
    };

    CircleCIResponse.prototype.clientError = function() {
      if (this.statusCode >= 400 && this.statusCode <= 499) {
        return new Error("HTTP client error " + this.statusCode);
      }
    };

    CircleCIResponse.prototype.serverError = function() {
      if (this.statusCode >= 500 && this.statusCode <= 599) {
        return new Error("HTTP server error " + this.statusCode);
      }
    };

    return CircleCIResponse;

  })();

  module.exports = CircleCIResponse;

}).call(this);
