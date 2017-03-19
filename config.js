var config = {
    NODE_ENV:'dist',
    port:8181
};



if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = config;
} else {
    if ( typeof define === "function") {
        define( "user_config", [], function () { return config; } );
    }
}
