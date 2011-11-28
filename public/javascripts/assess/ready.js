goog.provide('assess.ready');

goog.require('assess.common.navigation.Routes');

(function () {
	
	var Routes = assess.common.navigation.Routes;
	
	assess.ready = {
		
		/**
         * Initialize the web assessment home page.
         */
		homePageReady : function (containerId) {
			// Initialize common application routes.
			var routes = new Routes(containerId);
			
			// Start listening to route changes.
            Backbone.history.start();		
		}		
	};	
})();
