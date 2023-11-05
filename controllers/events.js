const { response } = require('express'); // LLama la express
const Event = require('../models/Event');

const getEvents = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'obtener eventos',
  });
};

const createEvent = async (req, res = response) => {
  // Verificar que tenga el evento
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();
    res.json({
      ok: true,
      event: eventSaved,
      msg: 'crear evento',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = (req, res = response) => {
  return res.json({
    // 123431235
    ok: true,
    msg: 'actualizar evento',
  });
};

const deleteEvent = (req, res = response) => {
  return res.json({
    // 123431235
    ok: true,
    msg: 'eliminar evento',
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
