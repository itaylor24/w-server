async function publishData(doc, data){
    await doc.set(data); 
}
async function updateData(doc, data){
    await doc.update(data); 
}
async function existsItem(item,pathRef){
    const itemDoc = await pathRef.doc(item).get(); 
    return itemDoc.exists; 
}


module.exports = {
    publishData, 
    updateData, 
    existsItem,
}