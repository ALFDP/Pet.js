var smartRequire = require("smart-require");
var Route = smartRequire("utils/web/Route");
var Pet = smartRequire("entities/Pet");
var Post = smartRequire("entities/Post");
var authenticate = smartRequire("utils/Session/authenticate");

var addPost = new Route("/post", "put", function(request, response){
    
    if(request.body.message !== undefined && request.body.userId !== undefined && request.body.petId !== undefined)
    {
        var messageRegex = /.{1,255}/;
        var userIdRegex = /\d+/;
        var petIdRegex = /\d+/;
        if(request.body.message.match(messageRegex) && request.body.userId.match(userIdRegex)
                 && request.body.petId.match(petIdRegex))
        {
            authenticate(request, response, function() {
                var post = Post.build({
                    message: request.body.name,
                    date : Date.now(),
                    userId: request.body.userId
                });
                Pet.findById(request.body.petId).then(function(pet){
                    if(pet)
                    {
                        pet.getPosts.then(function(results) {

                            post.save().then(function() {
                                response.json({
                                    message: "Post succesfully added",
                                    results : results
                                });
                            });
                        });
                    }
                    else
                    {
                        response.json({
                                message: "Post failed to be added",
                                error: "No pet at index " + request.body.petId
                            });
                    }
                });
            });
            
        }
        else
        {
            response.json({
                message: "Post failed to be added",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Post failed to be added",
            error: "A field is empty"
        });
    }
});

var showPost = new Route("/post", "get", function(request, response){
    
    if(request.body.message !== undefined && request.body.userId !== undefined && request.body.petId !== undefined)
    {
        var userIdRegex = /\d+/;
        var petIdRegex = /\d+/;
        if(request.body.userId.match(userIdRegex) && request.body.petId.match(petIdRegex))
        {
            authenticate(request, response, function() {
                Pet.findById(request.body.petId).then(function(pet){
                    if(pet)
                    {
                        response.json({
                                message: "Post retrieved",
                                error: pet.getPosts()
                            });
                    }
                    else
                    {
                        response.json({
                                message: "Post failed to be retrieved",
                                error: "No pet at index " + request.body.petId
                            });
                    }
                });
            });
            
        }
        else
        {
            response.json({
                message: "Post failed to be retrieved",
                error : "A field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "Post failed to be retrieved",
            error: "A field is empty"
        });
    }
});

module.exports = [addPost, showPost];