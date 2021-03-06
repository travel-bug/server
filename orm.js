let connection = require('./connection');

let orm = {
    
    select: function(query, callback) {
        let queryString = "SELECT ?? FROM ??";
        let searchCriteria = [query.columns || ['*'], query.table];
        if (query.join) {
            queryString = orm._buildJoinStatement(query, queryString, searchCriteria);
        }
        if (query.where){
            queryString = orm._buildWhereStatement(query, queryString, searchCriteria);
        }
        let statement = connection.query(queryString, searchCriteria, function(error, result) {
            callback(error, result);
        });
        if (query.debug){
            console.log(statement.sql);
        }
    },
    
    _buildWhereStatement: function(query, queryString, searchCriteria){
        queryString += " WHERE ";
        let whereString = [];
        for (let where in query.where) {
            searchCriteria.push(query.where[where]);
            whereString.push(' ? ');
    
        }
        let operator = query.operator || 'AND';
        queryString += whereString.join(operator);
        return queryString;
    },
    _buildJoinStatement: function(query, queryString, searchCriteria) {
        for (let i in query.join) {
            queryString += ' JOIN ?? ON ';
            searchCriteria.push(query.join[i].table)
            for (let j in query.join[i].condition) {
                queryString += '?? = ??';
                searchCriteria.push(query.join[i].condition[j].left);
                searchCriteria.push(query.join[i].condition[j].right);
            }
        }
        return queryString;
    },
    insert: function(query, callback) {
        let queryString = "INSERT INTO ?? SET ?";
        let statement = connection.query(queryString, [query.table, query.data], function(error, result) {
            callback(error, result);
        });
        if (query.debug){
            console.log(statement.sql);
        }
    },
    update: function(query, callback) {
        let queryString = "UPDATE ?? SET ?";
        let updateCriteria = [query.table, query.data];
        if (query.where){
            queryString = orm._buildWhereStatement(query, queryString, updateCriteria);
        }
        let statement = connection.query(queryString, updateCriteria, function(error, result) {
            callback(error, result);
        });
        if (query.debug){
            console.log(statement.sql);
        }
    },
    delete: function(query, callback) {
        let queryString = "DELETE FROM ?? WHERE ?";
        let statement = connection.query(queryString, [query.table, query.where[0]], function(error, result) {
            callback(error, result);
        });
        if (query.debug){
            console.log(statement.sql);
        }
    },
    query: function(queryString, queryArray, callback) {
        connection.query(queryString, queryArray, function(error, result) {
            callback(error, result);
        });
    }
    };


module.exports = orm