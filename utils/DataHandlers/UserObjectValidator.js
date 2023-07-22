const {publishData} = require("./DataManager"); 

class User{

    constructor(data, db){

        if(!data.username){
            throw(new UndefinedUsername()); 
        }

        this.username = data.username 
        this.firstName = data.firstName ?? ''
        this.lastName = data.lastName ?? ''
        this.displayName = data.displayName ?? ''
        this.doc = db.collection('users').doc(data.username); 
    }

    serialize(){
        return {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName, 
            displayName: this.displayName 
        }
    }

    documentReference(){
        return this.doc
    }

    async publish(){
        const userData = this.serialize()
        await publishData(this.doc, userData); 
        return userData; 
    }
} 
class UndefinedUsername extends Error{
    constructor(){
        super("cannot create user without username"); 
    }
}

module.exports = {
    User,
    UndefinedUsername
}
