const {Item, UndefinedItemName} = require("./ItemObjectValidator"); 
const {User, UndefinedUsername} = require("./UserObjectValidator"); 
const {Outfit, UndefinedOutfitName} = require('./OutfitObjectValidator'); 


module.exports = {
    Item, 
    User,
    Outfit,
}