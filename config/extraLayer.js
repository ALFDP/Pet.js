var sequelize = require("./sequelize");

var insert = function(Class, object) {
	
	Class.create(object).then(function (result) {
		res.json({
			code: 0,
			result: result
		});
	}).catch(function(err) {
		res.json({
			code: 2,
			message: "Sequelize error"
		});
	});
}

var findAll = function(Class) {
	
	Class.findAll().then(function(results) {
		res.json({
			code: 0,
			result: results
		});
	}).catch(function(err) {
		res.json({
			code: 2,
			message: "Sequelize error",
			error: err
		});
	});
}

var find = function(Class, request){
	
	Class.find(request).then(function(results) {
		res.json({
			code: 0,
			result: results
		});
	}).catch(function(err) {
		res.json({
			code: 2,
			message: "Sequelize error",
			error: err
		});
	});
}
	
var suppress = function(Class, id) {
	
	Class.findById(id).then(function(results) {
		if(result)
		{
			results.destroy().then(function(suc) {
				res.json({
					code: 0,
					result: true
				});
			}).catch(function(err) {
				res.json({
					code: 2,
					message: "Sequelize error",
					error: err
				});
			});
		}
		
		else
		{
			res.json({
				code: 0,
				result: false
			});
		}
	}).catch(function(err) {
		res.json({
			code: 2,
			message: "Sequelize error",
			error: err
		});
	});
}

var register = function(className, tableName, object) {
        return registerModel(className, object);
}

var registerModel = function(className, object) {
    
    return sequelize.define(className, object, {
        paranoid : true,
        freezeTableName : true,
        underscored : true
    });
}

module.exports = {
	"find": find,
	"suppress": suppress,
	"findAll": findAll,
	"insert": insert,
	"register": register,
        "registerModel" : registerModel
}