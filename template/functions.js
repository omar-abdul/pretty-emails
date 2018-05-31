/*
*
*Class responsible for compiling the html and adding data
*
*/

const TemplateCompiler = require("./template") 
const fs = require("fs")
const _path = require("path")

let engine = "handlebars"


function getRootPath (){
    var root= _path.dirname(require.main.filename) || process.cwd()
    
    return root
}

function getFilePath(filepath){
    const root = getRootPath()
    filepath = filepath.split(/\/(.+)/)[1]
    let pathWithoutExtension =""
    for(let i =0; i<filepath.length;i++){
        pathWithoutExtension += filepath[i]
    }
   
    const fullpath = root+"/"+pathWithoutExtension+"."+getFileExtension()

    return fullpath


    

 
}

function getFileExtension(){
    switch(engine){
        case "handlebars":
            return "handlebars"
            
        case "ejs":
            return "ejs"
            
        case "pug":
            return "pug"
            
        default :
            return "handlebars"                    
    }

}

async function putData(template,data){
    let html =  template(data)
    return html
}

 async function compiletoHtml(source, engine){
    const template =  TemplateCompiler(engine,source)
    return template
}




var readHTMLFile =   function(path, callback) {

    
	fs.readFile(path, {encoding: 'utf-8'},  async function (err, html) {
		if (err) {
			throw err;

        }
        else{
            callback(null, html)
        }

    });

};




 class Template {
     constructor(engine){
         this.engine = engine
     }
     output(options , data){

       
        
       
        engine = this.engine
        const filePath = getFilePath(options.file)
    

        const promise = new Promise((resolve,reject)=>{
            readHTMLFile(filePath, async function (err, source){
                if (err) {reject(err) }
               
                const template= await compiletoHtml(source,engine)
  
                const compiled = putData(template,data)
                 resolve(compiled)
                
    
    
            })
        })
        return promise.then((html)=>{

            return html


        })
        .catch(e=>new Error(e))



    }


}

module.exports = Template

