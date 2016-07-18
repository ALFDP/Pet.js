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
            
            pet.save()
            .success(function() {
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

// check session token
var delPet = new Route("/pet", "delete", function(request, response){
    
    if(request.body.id !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            var pet = Pet.findById(request.body.id).success(function() {
                response.json({
                    message: "Pet succesfully deleted"
                });
            }).error(function(error) {
                response.json({
                    message: "Pet failed to be deleted",
                    error: error
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

var delPet = new Route("/pet", "view", function(request, response){
    
    if(request.body.userId !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            var pet = Pet.findAllAndCount({
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
    
    else // by session id?
    {
        response.json({
            message: "Pet failed to be retrieved",
            error: "A field is empty"
        });
    }
});

module.exports = [addPet];