/*



███╗░░░███╗██╗███╗░░██╗███████╗░█████╗░██████╗░░█████╗░███████╗████████╗  ░██████╗██╗░░░██╗
████╗░████║██║████╗░██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝  ██╔════╝██║░░░██║
██╔████╔██║██║██╔██╗██║█████╗░░██║░░╚═╝██████╔╝███████║█████╗░░░░░██║░░░  ╚█████╗░╚██╗░██╔╝
██║╚██╔╝██║██║██║╚████║██╔══╝░░██║░░██╗██╔══██╗██╔══██║██╔══╝░░░░░██║░░░  ░╚═══██╗░╚████╔╝░
██║░╚═╝░██║██║██║░╚███║███████╗╚█████╔╝██║░░██║██║░░██║██║░░░░░░░░██║░░░  ██████╔╝░░╚██╔╝░░
╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░░░░╚═╝░░░  ╚═════╝░░░░╚═╝░░░

░██████╗████████╗░█████╗░████████╗░██████╗
██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
╚█████╗░░░░██║░░░███████║░░░██║░░░╚█████╗░
░╚═══██╗░░░██║░░░██╔══██║░░░██║░░░░╚═══██╗
██████╔╝░░░██║░░░██║░░██║░░░██║░░░██████╔╝
╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░


*/
const express = require("express")
const ejs = require("ejs")
const path = require("path")
const app = express();
const PORT = 3000;
const ping = require("ping")
const Gamedig = require("gamedig")
const bodyparser = require("body-parser")
const status = require('minecraft-server-status');
app.use(express.static('/web'))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("index")
console.log(`User connected or reloaded website in port ${PORT}`)



  })


  app.post('/submit-form', (req, res) => {
    const host = req.body.host

   Gamedig.query({
    type: 'minecraft',
    host: host
}).then((state) => {
    console.log(`User entered get info for server ${host}`);
    res.redirect(`/server/${host}`)
}).catch((error) => {
   res.send(`
   
   <strong>404: Server not found or it's offline, please make sure this server exists </strong>
 <p> We are redirecting you to the home page</p>
 <meta http-equiv="refresh" content="4; URL=/" />



   
   
   `)
});
  })

  app.get("/server/:hostname", function(req,res) {
let hostname = req.params.hostname


Gamedig.query({
    type: 'minecraft',
    host: hostname
}).then((state) => {
  

    status(hostname, 25565, response => {
  
    



    res.render('server', {
        users: `${response.players.now} / ${state.maxplayers}`,
        ping: ping,
        name:  state.name,
        requeriment: response.server.name,
        hostname: hostname


    });
    });
}).catch((error) => {
    res.send(`
    
    <strong>404: Server not found or it's offline, please make sure this server exists </strong>
  <p> We are redirecting you to the home page</p>
  <meta http-equiv="refresh" content="4; URL=/" />
 
 
 
    
    
    `)
 });



  });
  
  app.listen(PORT, function() {
    console.log(`All this website is in port: ${PORT}`)
  })

  