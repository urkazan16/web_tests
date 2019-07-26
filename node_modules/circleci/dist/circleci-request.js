(function() {
  var CircleCIRequest, CircleCIResponse, q, qs, urlHelper,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  q = require("q");

  qs = require("querystring");

  urlHelper = require("url");

  CircleCIResponse = require("./circleci-response");

  CircleCIRequest = (function() {
    function CircleCIRequest(config) {
      if (config == null) {
        config = {};
      }
      this.process = __bind(this.process, this);
      this.url = "https://circleci.com/api/v1/";
      this.auth = config.auth;
      this.request = require("request");
    }

    CircleCIRequest.prototype.buildUrl = function(path, query, urlParams) {
      var url;
      if (path == null) {
        path = "";
      }
      if (query == null) {
        query = {};
      }
      if (urlParams == null) {
        urlParams = {};
      }
      path = this.injectParams(path, urlParams);
      query['circle-token'] = this.auth;
      url = this.url + path.replace(/^\//, "");
      url += "?" + qs.stringify(query);
      url = url.replace("/?", "?");
      return url;
    };

    CircleCIRequest.prototype.injectParams = function(path, params) {
      var fragment, fragments, key, _i, _len;
      if (params == null) {
        params = {};
      }
      path = "/" + path;
      fragments = path.match(/\/:[A-z0-9_-]+/g) || [];
      for (_i = 0, _len = fragments.length; _i < _len; _i++) {
        fragment = fragments[_i];
        key = fragment.replace("/:", "");
        if (params[key] === void 0) {
          throw new Error("Method requires '" + key + "' option.");
        }
        path = path.replace(fragment, "/" + params[key]);
      }
      return path.replace(/^\//, "");
    };

    CircleCIRequest.prototype.buildRequestConfig = function(resource, data) {
      var config, query;
      config = {};
      config.method = resource.method;
      query = this.buildQueryObject(resource.options || [], data || {});
      config.url = this.buildUrl(resource.path, query, data);
      config.json = true;
      if (data && data.body) {
        config.body = data.body;
      }
      return config;
    };

    CircleCIRequest.prototype.buildQueryObject = function(availableOptions, data) {
      var option, query, _i, _len;
      query = {};
      for (_i = 0, _len = availableOptions.length; _i < _len; _i++) {
        option = availableOptions[_i];
        if (data[option] !== void 0) {
          query[option] = data[option];
        }
      }
      return query;
    };

    CircleCIRequest.prototype.process = function(resource, opts) {
      var config, deferred;
      config = this.buildRequestConfig(resource, opts);
      deferred = q.defer();
      this.request(config, (function(_this) {
        return function(err, res) {
          if (err) {
            return deferred.reject(err);
          }
          return _this.handleResponse(deferred)(res);
        };
      })(this));
      return deferred.promise;
    };

    CircleCIRequest.prototype.handleResponse = function(deferred) {
      return function(res) {
        var response;
        response = new CircleCIResponse(res);
        if (response.success()) {
          return deferred.resolve(response.body);
        }
        if (response.clientError()) {
          return deferred.reject(response.clientError());
        }
        if (response.serverError()) {
          return deferred.reject(response.serverError());
        }
        return null;
      };
    };

    return CircleCIRequest;

  })();

  module.exports = CircleCIRequest;

}).call(this);
