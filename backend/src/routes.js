const express = require("express");
const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();


routes.post("/sessions", SessionController.store);

routes.get("/ongs", OngController.index);

routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.store);

routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), IncidentController.index);

routes.post("/incidents", IncidentController.store);

routes.delete("/incidents/:incident_id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    incident_id: Joi.number().required(),
  })
}), IncidentController.destroy);

routes.get("/profile", celebrate({
  [Segments.HEADERS]:Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileController.index);






module.exports = routes;