const {User, Item, Outfit} = require('./DataHandlers');
const compressItemImage = require('./ImageCompressor'); 

module.exports = class FirestoreManager {
    constructor(db){
        this.db = db; 
    }

    async createUser(data){
        const user = new User(data, this.db); 
        const userDetails = await user.publish(); 
        return userDetails; 
    }

    async createItem(data){
        const item = new Item(data, this.db); 
        const itemDetails = await item.publish(); 
        return itemDetails; 
    }

    async createOutfit(data){
        const outfit = new Outfit(data, this.db); 
        const outfitDetails = await outfit.publish(); 
        return outfitDetails; 
    }

    async uploadImageForItem(req, bucket){
        const dateTime = Date.now().toString();
        const fileRef = `item-images/${req.file.originalname}-${dateTime}`; 
        const metadata = {contentType: req.file.mimetype}; 
        const file = bucket.file(fileRef); 
        await file.save(await compressItemImage(req.file.buffer)); 
        await file.setMetadata(metadata); 
        return {file: file, ref: fileRef}
    }

    
}