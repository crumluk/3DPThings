
let fs = require('fs');
let path = require('path');

let manifestTemplate = {
  "name":"",
  "customizable":false,
  "categories":["Project"],
  "reference":8,
  "description":"",
  "price":"0.00",
  "images":[],
  "video":[],
  "guide":"",
  "file":"cigar_holder",
  "buzz":""
};

let files = fs.readdirSync('.');

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function cloneObject(obj){
    return JSON.parse( JSON.stringify( obj ) );
}


files = files.filter(function(that,value,index) {
    return !(that.indexOf('.') > -1 || that.indexOf('LICENSE') > -1)
});

files.forEach(function(e,i){
    let oldPath = path.resolve(files[i]);
    let imgPath = path.join( path.dirname(oldPath) , files[i], 'images' );
    let manPath = path.join( path.dirname(oldPath) , files[i], 'project.json' );
    
    let manifest = cloneObject(manifestTemplate);

    manifest.name = path.basename(oldPath);
    
    let images = fs.readdirSync(imgPath);

    images.forEach(function(ima){
        manifest.images.push(ima);
    });

    manifest.file = path.basename(oldPath).replace(/ /g,'_').toLocaleLowerCase();  

    fs.writeFileSync(manPath,JSON.stringify(manifest),'utf8');
    
    console.log(manPath);

});

console.log('done');
