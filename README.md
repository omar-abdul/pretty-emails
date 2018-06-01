**Pretty-email** is just that, a package to help you write your html emails. No need to embed HTML tags inside strings.

## Installation
`npm install pretty-emails`

## Usage

Pretty-email supports three template engines nameley :-
* Handlebars
* Ejs
* and Pug

 I wanted to add more but wanted to keep it as lightweight as possible

 **Setting up config** 

``` javascript
    const pretty = require("pretty-emails");
     pretty.config({
      service:"Mailgun",
      auth:{
       user:"mysmptusername",
       pass:"mysmptpassword"

      },
      templateEngine:"handlebars" //or ejs/pug
      templateFile:"/views/myPrettyEmail" //no extension needed
    })
```


**Configurations**
  * **service** : well known smtp service that are supported by nodemailer
  * **auth** : credentials used to login to the service provider  
  * **templateEngine**: Type of template engine to render, options include **handlebars**, **ejs**, **pug**
  * **templateFile**: Path to the template file. No need to add the extension.

**NOTE** : `templateFile` needs the first `/` to determine exactly where the file  for instance
`templateFile:"/mysubfolder/templateName" ` or  `templateFile:/templateName` will work  but `templateFile:subfolder/file` will not

Since pretty-email uses nodemailer, most of the options available with nodemailer can be used with pretty-email as well such as 

* **port**
* **smtp**

for a complete list of configurations you can check out [nodemailer ](https://github.com/nodemailer/nodemailer)

**MailOptions**
After you configure your mail transport settings simply put in the options of the reciepent and sender in the `mailOptions` settings


```javascript
    pretty.mailOptions({
     to:"liamneeson@gmail.com",
     from:"Forest whitaker <forrestwhitaker@fans.com>"
     subject:"Welcome to Jurrasic Park",
     data:{
      variable1:"value",
      variable2:"value2"
     }

    }) 
```

 The `data` property holds the optional variables you want to change in the html markup, this can be useful when sending multiple emails and would like to dynamically change some fields 

 An example in handlebars would be:

```html
    <h2>How are you doing {{person}}</h2>
    Just wanted to invite you to our yearly {{name}} conference Don't miss it
```

 The corresponding `data` object would be 

```javascript
    pretty.mailOptions({
    ...
     data:{
      person:"Spiderman",
      name:"Comicon"
     }
    ...
    })                                            
```




As with `config` most of the options that come with node-mailer can be used such as :-
 * attachments
 * header
 * messageId

 for a complete list of options you can check out [nodemailer ](https://github.com/nodemailer/nodemailer)


 And finally 

```javascript
    pretty.send();
```                

 and that's pretty much it
 Feel free to contribute to this package and lets make emails pretty again!!               