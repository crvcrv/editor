var CORE = function(){
    var moduleData = {};
    return {
        /**
         * logging module
         * @return {[object]} [provides logging functionality for different log levels.]
         */
        logger: function(){
            var DEBUG = 0,
                INFO =  1,
                WARNING = 2,
                ERROR = 3,
                CRITICAL = 4;

            function debug(msg){
                console.log('DEBUG: '+msg);
            }

            function info(msg){
                console.log('INFO: '+msg);
            }

            function warning(msg){
                console.log('WARNING: '+msg);
            }

            function error(msg){
                console.log('ERROR: '+msg);
            }

            function critical(msg){
                console.log('CRITICAL: '+msg);
            }
            return {
                DEBUG: DEBUG,
                INFO: INFO,
                WARNING: WARNING,
                ERROR: ERROR,
                CRITICAL: CRITICAL,
                debug: debug,
                info: info,
                warning: warning,
                error: error,
                critical: critical,
                log: function(severity, msg){
                    // case severity is a string msg
                    if(typeof severity === 'string'){
                        severityString = severity.toLowerCase();
                        if(severityString == 'debug'){
                            debug(msg);
                        }else if(severityString == 'info'){
                            info(msg);
                        }else if(severityString == 'warning'){
                            warning(msg);
                        }else if(severityString == 'error'){
                            error(msg);
                        }else if(severityString == 'critical'){
                            critical(msg);
                        }else {
                            critical(msg);
                        }
                    // otherwise it's a flag
                    }else{
                        if(severity == DEBUG){
                            debug(msg);
                        }else if(severity == INFO){
                            info(msg);
                        }else if(severity == WARNING){
                            warning(msg);
                        }else if(severity == ERROR){
                            error(msg);
                        }else if(severity == CRITICAL){
                            critical(msg);
                        }else {
                            critical(msg);
                        }
                    }
                }
            }
        }(),
        /**
         * registers a new `Module` at the core
         * @param  {string} moduleID the `Modules` ID
         * @param  {[function]} creator  creation function
         */
        createModule: function(moduleID, creator){
            var temp;
            if(typeof moduleID === 'string' && typeof creator === 'function'){
                temp = creator(Sandbox.create(this, moduleID));
                if(temp.init && temp.destroy && typeof temp.init === 'function' && typeof temp.destroy === 'function'){
                    moduleData[moduleID] = {
                        create: creator,
                        instance: null
                    };
                    temp = null;
                }else{
                    this.logger.log(this.logger.WARNING, 'Module '+ moduleID + 'registration failed: Module has no init or destroy method.');
                }
            }else{
                this.logger.log(this.logger.WARNING, 'Module '+ moduleID + 'registration failed: argument moduleID has to be of type string, argument creator has to be of type function');
            }
        },
        dom: {
            query: function(selector, context){
                var result = {}, that = this, jqEls, i = 0;

                if(context && context.find){
                    jqEls = context.find(selector);
                }else{
                    jqEls = jQuery(selector);
                }

                result = jqEls.get();
                result.length = jqEls.length;
                result.query = function(selectr){
                    return that.query(selectr, jqEls);
                }
                return result;
            }
        }
    }
}();
