const {User, Item, Outfit} = require('./DataHandlers');

module.exports = class FirestoreManager {
    constructor(db){
        this.db = db; 
    }

    async addUser(data){
        const user = new User(data, this.db); 
        const userDetails = await user.publish(); 
        return userDetails; 
    }

    async addItem(data){
        const item = new Item(data, this.db); 
        const itemDetails = await item.publish(); 
        return itemDetails; 
    }
    async addOutfit(data){
        const outfit = new Outfit(data, this.db); 
        const outfitDetails = await outfit.publish(); 
        return outfitDetails; 
    }
}