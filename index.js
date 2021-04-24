const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.on('ready', () => console.log("autorole fue cargado exitosamente!"))

client.on("message", message => {
const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase();
const db = require("megadb")
let autorole = new db.crearDB("Autorole")

if(command == ("autorole")) {

  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return; //aqui estamos definiendo el comando con que se va a poder establecer el autorole.
  let permisos = message.member.hasPermission("ADMINISTRATOR");
  if (!permisos){
let embed = new Discord.MessageEmbed()
.setDescription("<a:Negativo:798306467136274443> **|** Lo siento no tienes permisos para customizar el autorole")
.setFooter(`Comando ejecutado por: ${message.author.tag}`)
.setThumbnail("https://media.discordapp.net/attachments/807333114686079040/807369204239958046/a_9a5196de773b26114392ccccc28bc543.gif")
.setColor("ff0004")
    return message.channel.send(embed)
}
let role = message.mentions.roles.first() || message.guild.roles.resolve(args[0]);//Aqui estamos estableciendo que se obtenga el rol sea por mencion o por ID de cuyo rol.
if(!role) {
const embed1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription("<a:Negativo:798306467136274443> `|` Debes mencionar el rol o poner su ID")
return message.channel.send(embed1)
} //Aqui estamos estableciendo que si en el mensaje no se encuentra el role mencionado o la ID del rol retorne un mensaje.
autorole.establecer(message.guild.id, role.id) //Aqui estamos guardando la ID del servidor y la ID del rol que se establecio.
const embed2 = new Discord.MessageEmbed()
.setDescription(`<a:Positivo:798306463029788702> **|** El nuevo rol es: ${role}`)
.setColor("17ff00")
.setThumbnail("https://media.discordapp.net/attachments/807333114686079040/807386286469677056/check-gif.gif?width=652&height=489")
return message.channel.send(embed2)
}
client.on("guildMemberAdd", async member => { //Aqui estamos creando un evento
  if(!autorole.tiene(member.guild.id)) return; //Aqui decimos que si el servidor no tiene ningun autorole establecido retorne a nada.
  let ID = await autorole.obtener(member.guild.id) //Aqui estamos obteniendo la id del rol para que se lo ponga a un miembro al entrar al servidor.
  member.roles.add(ID) //Aqui estamos estableciendo que para que cuando el miembro entre, le ponga el rol establecido anteriormente.
  });
});
client.login(token);
