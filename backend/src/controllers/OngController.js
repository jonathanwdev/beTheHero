const generateUniqueId = require('../util/generateUniqueId');
const connection = require("../database/connection");

class OngController {

  async index(req,res) {
    const ongs = await connection("ongs").select("*");
    return res.json(ongs);
  }

  async store(req,res) {    
    const { name, email, city, uf, whatsapp } = req.body;
    const id = generateUniqueId();    
    await connection("ongs").insert({
      id,
      name, 
      email, 
      city, 
      uf, 
      whatsapp
    });  
    return res.json({id});
  } 
}


module.exports = new OngController();