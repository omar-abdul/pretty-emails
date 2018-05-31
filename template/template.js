/*
*
*Calls the compile method of engine
*
*/
const Handlebars = require("handlebars")
const Ejs = require("ejs")
const Pug =require("pug")






 async function compileTemplate(engine,source) {
     let compiledHtml = null

    switch(engine){
        case "handlebars":
            compiledHtml=  compileHandlebars(source)
            break
            
        case "ejs":
            compiledHtml=   compileEjs(source)
            break
            

        case "pug":
            compiledHtml=  compilePug(source)
            break
            

        default :
            compiledHtml=  compileHandlebars(source)
            break

    }

    return compiledHtml

}

  function compileHandlebars(template){
    

        var html =  Handlebars.compile(template)

        return  html
}


 function compileEjs(template){

        var html =  Ejs.compile(template)
        return  html
 
}
 function compilePug(template){

        var html =  Pug.compileFile(template)
        return  html
}

module.exports = compileTemplate