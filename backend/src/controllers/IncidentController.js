const connection = require("../database/connection");
const crypto = require("crypto");


class IncidentController{

  async index(req,res) {
    const { page = 1} = req.query;

    const [count] = await connection("incidents").count();
    res.header("X-Total-Count", count["count(*)"]);
    
    const incidents = await connection("incidents")
    .join("ongs", "ongs.id", "=", "incidents.ong_id")
    .limit(5)
    .offset((page - 1) * 5)
    .orderBy('id', 'desc')
    .select(["incidents.*",
    "ongs.name",
    "ongs.email",
    "ongs.whatsapp",
    "ongs.city",
    "ongs.uf"]);

    return res.json(incidents);
  }


  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({id})
  }

  async destroy(req, res) {
    const { incident_id } = req.params;
    const ong_id = req.headers.authorization;
    const incident = await connection("incidents")
      .where("id", incident_id)
      .select("ong_id")
      .first();
    
    if(incident.ong_id !== ong_id) {
      return res.status(401).json({error: "Não autorizado"});
    }
    
    await connection("incidents").where("id", incident_id).delete();
    return res.status(204).send();
  }
}


module.exports = new IncidentController();