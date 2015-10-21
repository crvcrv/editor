var Sandbox = function(){
    var CONTAINER, CORE, MODULE_SELECTOR;
    return {
        create: function(core, module){
            CORE = core;
            MODULE = module;
            MODULE_SELECTOR = '#' + module;
            CONTAINER = core.dom.query(MODULE_SELECTOR);
            return this;
        },
        dom: {
            find: function(selector){
                return CONTAINER.query(selector)[0];
            },
            findAll: function(selector){
                return CONTAINER.query(selector);
            },
            content: function(content, options){
                var options = options || {
                    escapeHTML: true,
                };

                if(options.escapeHTML){
                    CORE.dom.text(MODULE_SELECTOR, content);
                }else{
                    CORE.dom.html(MODULE_SELECTOR, content);
                }

            },
            edit: function(){
                CORE.dom.attr(MODULE_SELECTOR, {
                    contenteditable: true
                });
                CORE.dom.focus(MODULE_SELECTOR);
            },
            attr: function(attrs){
                CORE.dom.attr(MODULE_SELECTOR, attrs);
            },
            animate: {
                hide: function(){
                    CORE.dom.animate.hide(MODULE_SELECTOR);
                },
                show: function(){
                    CORE.dom.animate.show(MODULE_SELECTOR);
                }
            }
        },
        addEvent: function(elem, evt, fn){
            CORE.dom.bind(elem, evt, fn);
        },
        removeEvent: function(elem, evt, fn){
            CORE.dom.unbind(elem, evt, fn);
        },
        notify: function(evt){
            CORE.triggerEvent(evt);
        },
        listen: function(evts){
            CORE.registerEvents(evts, MODULE);
        },
        ignore: function(evts){
            CORE.removeEvents(evts, MODULE);
        }
    }
};
