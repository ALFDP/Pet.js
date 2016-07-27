var smartRequire = require("smart-require");
var Route = smartRequire("utils/web/Route");
var Pet = smartRequire("entities/Pet");
var User = smartRequire("entities/User");
var authenticate = smartRequire("utils/Session/authenticate");

var addPet = new Route("/pet", "put", function(request, response){
    
    if(request.body.name !== undefined && request.body.type !== undefined && request.body.born !== undefined && request.body.userId !== undefined
            && request.body.token !== undefined)
    {
        var nameRegex = /\w{2,20}/;
        var typeRegex = /[a-zA-Z]{3,20}/;
        var dateRegex = /\d{2}\/\d{2}\/\d{4}/;
        var userIdRegex = /\d+/;
        if(request.body.name.match(nameRegex) && request.body.type.match(typeRegex) 
                && request.body.born.match(dateRegex) && request.body.userId.match(userIdRegex))
        {
            authenticate(request, response, function() {
                var pet = Pet.build({
                    name: request.body.name,
                    type: request.body.type,
                    born : new Date(request.body.born)
                });
                
                User.findById(request.body.userId).then(function(result) {
                    result.addPet(pet);

                    pet.save().then(function() {
                        response.json({
                            message: "Pet succesfully added"
                        });
                    }).catch(function(error) {
                        response.json({
                            message: "Pet failed to be added",
                            error: error
                        });
                    });
                    result.save();
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
    
    if(request.body.userId !== undefined && request.body.id !== undefined && request.body.idFriend && request.body.token)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex) && request.body.idFriend.match(idRegex))
        {
            authenticate(request, response, function() {
                Pet.findById(request.body.id).then(function(result) {
                    if(result)
                    {
                            Pet.findById(request.body.id).then(function(friend) {
                                if(friend)
                                {
                                    result.addPet(friend).then(function() {
                                        friend.addPet(result).then(function(){
                                            response.json({
                                                code: 0,
                                                message : "Pet are now friends at index " + request.body.id + "/" + request.body.idFriend,
                                                result: true
                                            });
                                        });
                                    });
                                }
                                else
                                {
                                        response.json({
                                                code: 1,
                                                message : "No Pet detected at index " + request.body.idFriend,
                                                result: false
                                        });
                                }

                            }).catch(function(err) {
                                    response.json({
                                            code: 1,
                                            message : "No Pet detected at index " + request.body.idFriend,
                                            result: false
                                    });
                            });
                    }

                    else
                    {
                            response.json({
                                    code: 1,
                                    message : "No Pet detected at index " + request.body.id,
                                    result: false
                            });
                    }
                }).catch(function(err) {
                        response.json({
                                code: 2,
                                message: "Sequelize error",
                                error: err
                        });
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
    
    if(request.body.userId !== undefined && request.body.id !== undefined && request.body.idFriend !== undefined && request.body.token !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex) && request.body.idFriend.match(idRegex))
        {
            authenticate(request, response, function() {
                
                Pet.findById(request.body.id).then(function(result) {
                    if(result)
                    {
                            Pet.findById(request.body.id).then(function(friend) {
                                if(friend)
                                {
                                    result.removePet(friend).then(function() {
                                        friend.removePet(result).then(function(){
                                            response.json({
                                                code: 0,
                                                message : "Pet are now friends at index " + request.body.id + "/" + request.body.idFriend,
                                                result: true
                                            });
                                        });
                                    });
                                }
                                else
                                {
                                        response.json({
                                                code: 1,
                                                message : "No Pet detected at index " + request.body.idFriend,
                                                result: false
                                        });
                                }

                            }).catch(function(err) {
                                    response.json({
                                            code: 1,
                                            message : "No Pet detected at index " + request.body.idFriend,
                                            result: false
                                    });
                            });
                    }

                    else
                    {
                            response.json({
                                    code: 1,
                                    message : "No Pet detected at index " + request.body.id,
                                    result: false
                            });
                    }
                }).catch(function(err) {
                        response.json({
                                code: 2,
                                message: "Sequelize error",
                                error: err
                        });
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
    
    if(request.body.id !== undefined && request.body.userId !== undefined && request.body.token)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            authenticate(request, response, function() {
                Pet.findById(request.body.id).then(function(result) {
                    if(result)
                    {
                            result.destroy().then(function(suc) {
                                    response.json({
                                            code: 0,
                                            message : "Pet succesfully deleted at index " + request.body.id,
                                            result: true
                                    });
                            }).catch(function(err) {
                                    response.json({
                                            code: 2,
                                            message: "Sequelize error",
                                            error: err
                                    });
                            });
                    }

                    else
                    {
                            response.json({
                                    code: 1,
                                    message : "No Pet detected at index " + request.body.id,
                                    result: false
                            });
                    }
                }).catch(function(err) {
                        response.json({
                                code: 2,
                                message: "Sequelize error",
                                error: err
                        });
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
    
    if(request.body.userId !== undefined && request.body.token !== undefined && request.body.id !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            authenticate(request, response, function() {
                Pet.findById(request.body.id).then(function(result) {
                    if(result)
                    {
                            result.getPets().then(function(r) {
                                    response.json({
                                    message: "Pet succesfully retrieved",
                                    result: r
                                });
                            }).catch(function(err) {
                                    response.json({
                                            code: 2,
                                            message: "Sequelize error",
                                            error: err
                                    });
                            });
                    }

                    else
                    {
                            response.json({
                                    code: 1,
                                    message : "No Pet detected at index " + request.body.id,
                                    result: false
                            });
                    }
                }).catch(function(err) {
                        response.json({
                                code: 2,
                                message: "Sequelize error",
                                error: err
                        });
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
    
    if(request.body.userId !== undefined && request.body.token !== undefined && request.body.id !== undefined)
    {
        var idRegex = /\d+/;
        if(request.body.id.match(idRegex))
        {
            authenticate(request, response, function() {
                User.findById(request.body.userId).then(function(result) {
                    result.getPets().then(function(r) {
                        response.json({
                            message: "Pet succesfully retrieved",
                            result: r
                        });
                    })
                    
                }).catch(function(error) {
                    console.log(error);
                    response.json({
                        message: "Pet failed to be retrieved",
                        error: error
                    });
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

module.exports = [addPet, addPetFriend, delPetFriend, delPet, showPet, showPetFriend];