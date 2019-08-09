var connection = require ("./connection.js");

var orm = {
    select: function(queryObject, callback){
        let queryString ="SELECT ?? FROM ??";
        let searchCriteria = [query.columns || ['*'], query.table];
        let queryConnection = this._buildTableQuery(queryString, searchCriteria, queryConnection);
     {  
         let statement = connection.query(queryString, searchCriteria, function(error,result){
             
         })
    }
}