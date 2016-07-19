var smartRequire = require("smart-require");
var Route = smartRequire("utils/web/Route");
var Pet = smartRequire("entities/Pet");

var addPet = new Route("/pet", "put", function(request, response){
    
    if(request.body.name !== undefined && request.body.type !== undefined && request.body.born !== undefined && request.body.userId !== undefined)
    {
        var nameRegex = /\w{5,20}/;
        var typeRegex = /[a-zA-Z]{5,20}/;
        var dateRegex = /\d{2}\/\d{2}\/\d{4}/;
        var userIdRegex = /\d+/;
        if(request.body.name.match(nameRegex) && request.body.type.match(typeRegex) 
                && request.body.date.match(dateRegex) && request.body.userId.match(userIdRegex))
        {
            var pet = Pet.build({
                name: request.body.name,
                type: request.body.type,
                born : new Date(request.body.born),
                userId: request.body.userId
            });            
            
            pet.save().success(function() {
                response.json({
                    message: "Pet succesfully added"
                });
            }).error(function(error) {
                response.json({
                    message: "Pet failed to be added",
                    error: error
                });
            });
        }
        else
        {
            response.json({
                message: "Pet failed to be added",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be added",
            error: "A field is empty"
        });
    }
});

var addPetFriend = new Route("/petFriend", "put", function(request, response){
    
    if(request.body.userId !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex) && request.body.idFriend.match(idRegex))
        {
            Pet.findById(request.body.id).then(function(result) {
		if(result)
		{
			Pet.findById(request.body.id).then(function(friend) {
                            if(friend)
                            {
                                result.addPet(friend).then(function() {
                                    friend.addPet(result).then(function(){
                                        res.json({
                                            code: 0,
                                            message : "Pet are now friends at index " + request.body.id + "/" + request.body.idFriend,
                                            result: true
                                        });
                                    });
                                });
                            }
                            else
                            {
                                    res.json({
                                            code: 1,
                                            message : "No Pet detected at index " + request.body.idFriend,
                                            result: false
                                    });
                            }
				
			}).catch(function(err) {
				res.json({
					code: 1,
                                        message : "No Pet detected at index " + request.body.idFriend,
                                        result: false
				});
			});
		}
		
		else
		{
			res.json({
				code: 1,
                                message : "No Pet detected at index " + request.body.id,
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
        else
        {
            response.json({
                message: "Pet failed to be retrieved",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be retrieved",
            error: "A field is empty"
        });
    }
});

var delPetFriend = new Route("/petFriend", "delete", function(request, response){
    
    if(request.body.userId !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex) && request.body.idFriend.match(idRegex))
        {
            Pet.findById(request.body.id).then(function(result) {
		if(result)
		{
			Pet.findById(request.body.id).then(function(friend) {
                            if(friend)
                            {
                                result.removePet(friend).then(function() {
                                    friend.removePet(result).then(function(){
                                        res.json({
                                            code: 0,
                                            message : "Pet are now friends at index " + request.body.id + "/" + request.body.idFriend,
                                            result: true
                                        });
                                    });
                                });
                            }
                            else
                            {
                                    res.json({
                                            code: 1,
                                            message : "No Pet detected at index " + request.body.idFriend,
                                            result: false
                                    });
                            }
				
			}).catch(function(err) {
				res.json({
					code: 1,
                                        message : "No Pet detected at index " + request.body.idFriend,
                                        result: false
				});
			});
		}
		
		else
		{
			res.json({
				code: 1,
                                message : "No Pet detected at index " + request.body.id,
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
        else
        {
            response.json({
                message: "Pet failed to be retrieved",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be retrieved",
            error: "A field is empty"
        });
    }
});

// check session token
var delPet = new Route("/pet", "delete", function(request, response){
    
    if(request.body.id !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            Pet.findById(request.body.id).then(function(results) {
		if(result)
		{
			results.destroy().then(function(suc) {
				res.json({
					code: 0,
                                        message : "Pet succesfully deleted at index " + request.body.id,
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
				code: 1,
                                message : "No Pet detected at index " + request.body.id,
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
        else
        {
            response.json({
                message: "Pet failed to be deleted",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be deleted",
            error: "A field is empty"
        });
    }
});

var showPetFriend = new Route("/petFriend", "get", function(request, response){
    
    if(request.body.userId !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            Pet.findById(request.body.id).then(function(results) {
                if(result)
		{
			results.getPets().then(function(suc) {
				res.json({
					code: 0,
                                        message : "Pet succesfully deleted at index " + request.body.id,
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
				code: 1,
                                message : "No Pet detected at index " + request.body.id,
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
        else
        {
            response.json({
                message: "Pet failed to be retrieved",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be retrieved",
            error: "A field is empty"
        });
    }
});

var showPet = new Route("/pet", "get", function(request, response){
    
    if(request.body.userId !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            Pet.findAllAndCount({
                where: ["userId = " + request.body.userId]
            }).success(function(result) {
                response.json({
                    message: "Pet succesfully retrieved",
                    result: result
                });
            }).error(function(error) {
                response.json({
                    message: "Pet failed to be retrieved",
                    error: error
                });
            });
        }
        else
        {
            response.json({
                message: "Pet failed to be retrieved",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Pet failed to be retrieved",
            error: "A field is empty"
        });
    }
});

module.exports = [addPet, addPetFriend, delPetFriend, delPet, showPet];