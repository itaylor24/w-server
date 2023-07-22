const createId = require('./IdManager.js');
const {publishData, updateData} = require("./DataManager.js"); 

class Item{
    constructor(data, db){
        
        if(!data.name){
            throw(new UndefinedItemName())
        }

        this.name = data.name; 
        this.description = data.description ?? "";
        this.id = createId(data.username, data.name); 
        this.doc = db.collection('users').doc(data.username).collection('items').doc(this.id);
    }
    
    serialize(){
        return {
            name: this.name, 
            description: this.description
        }
    }

    documentReference(){
        return this.doc; 
    }

    async publish(){
        const itemData = this.serialize(); 
        await publishData(this.doc, itemData); 
        return itemData; 
    }
}

class UndefinedItemName extends Error{
    constructor(){
        super("cannot create item without name"); 
    }
    
}

module.exports = {
    Item, 
    UndefinedItemName, 
}