module.exports = function createId(username, name){
        return username+'_'+name.split(" ").map((word)=>word.toLowerCase()).join("_"); 
    }


