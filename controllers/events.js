const { response } = require('express'); // LLama la express
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events,
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

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para editar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    // Actualizar
    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      eventId,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const deleteEvent = (req, res = response) => {
  return res.json({
    // 123431235
    ok: true,
    msg: 'eliminar evento',
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
