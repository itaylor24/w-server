const {publishData, existsItem} = require("./DataManager"); 
const createId = require('./IdManager'); 


class Outfit{

    constructor(data, db){

        if(!data.username){
            throw(new UndefinedUsername()); 
        }

        this.username = data.username; 
        this.name = data.name;
        this.id = createId(data.username, data.name); 
        this.items = data.items.map(item=>this.username+'_'+item);
        this.db = db; 
        

        
        this.description = data.description ?? ''; 
        this.doc = db.collection('users').doc(data.username).collection('outfits').doc(this.id);
        
    }

    async serialize(){
        return {
            name: this.name,
            items: await this.getItemRefs(),
            description: this.description
        }
    }

    documentReference(){
        return this.doc
    }

    async getItemRefs(){
        const pathRef = this.db.collection('users').doc(this.username).collection('items'); 
        const verify = await this.items.map(async (item)=>await existsItem(item, pathRef)).reduce((a,b)=>a&&b);

        if(!verify){
            throw(new ItemExistenceError()); 
        }
        const itemReferences = this.items.map((item)=>pathRef.doc(item));
        return itemReferences; 
    }

    async publish(){
        const outfitData = await this.serialize(); 
        await publishData(this.doc, outfitData); 
        return outfitData; 
    }
} 
class UndefinedOutfitName extends Error{
    constructor(){
        super("cannot create outfit without name"); 
    }
}
class ItemExistenceError extends Error{
    constructor(){
        super("cannot create outfit with undefined item"); 
    }
}

module.exports = {
    Outfit,
    UndefinedOutfitName
}
