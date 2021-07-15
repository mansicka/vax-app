function makeId(){

//generate random string 
function generate(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};
var id = generate(8) + '-' + generate(4) + '-' + generate(4) + '-' + generate(12);
console.log(id);
return id;
}