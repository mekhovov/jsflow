goog.provide('assess.common.navigation.Routes');


(function () {
	
	/**
	 * @constructor
	 * @extends {Backbone.Router}
	 */
	assess.common.navigation.Routes = Backbone.Router.extend({
		 
		 /**
		 * @this {assess.common.navigation.Routes}
		 */
		initialize : function (containerId) {
			this._logNamespace = "Routes";

			// Save a reference to our app's parent div
			this._containerId = containerId;

			// The currently executing controller.
			this._currentController = null;
		},
		
		routes: {
			"" : "hello",
			"/:params" : "hello"
		},
		
		hello : function () {
			this._log('Hello Andrew!')
			//this._runController();
		},
		
		/**
		 * Run the given controller.
		 * We ignore local storage check when redirected to the app selection screen.
		 * param {Class} Controller the constructor of the given controller
		 * param {string} params a query string of parameters.
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_runController : function (Controller, params) {	
			try { 
				params = params || '';
				this._replaceController(Controller, params);
			} catch (error) {
				this._handleRouteError(error);
			}
		},

		/**
		 * Run the given controller and if necessary, tear down any
		 * controller that is currently running.
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_replaceController : function (Controller, params) {
			try {
				params = params || '';
				this._tearDownCurrentController();
				var options = this._parseUrlParams(params);
				options.containerId = this._containerId;

				this._currentController = new Controller(options);
				this._currentController.start();
			} catch (error) {
				this._handleRouteError(error);
			}
		},

		/**
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_tearDownCurrentController : function () {
			if (this._currentController) {
				this._currentController.stop();
			}
			this._container.empty();
			this._container.removeClass();
		},
		
		/**
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_parseUrlParams : function (params) {
            var paramMap = {};
            if (params.length) {
                _.each(params.split("&"), function (paramString) {
                    var keyValArray = paramString.split("=");
                    paramMap[decodeURI(keyValArray[0])] = decodeURI(keyValArray[1]);
                });
            }
            return paramMap;
        },
        
        /**
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_handleRouteError : function (error) {
			try {
				this._log("Unexpected error initializing route:" + error.toString());
			} catch (logError) {
				// Not much we can do here.
			}
		},
		
		/**
		 * @this {assess.common.navigation.Routes}
		 * @private
		 */
		_log : function (msg) {
			window.console.log('assess | ' + (new Date().toString()) + ' | ' + this._logNamespace + ": " + msg);
		}
	});
})();
