const { response } = require('express');

const Event = require('../models/event-model');

const createEvent = async ( req, res = response ) => {

	const event = new Event( req.body );

	try {
		event.user = req.uid;

		const savedEvent = await event.save();

		res.status(200).json({
			ok: true,
			message: 'Event created successfully',
			event: savedEvent,
		});

	} catch (error) {	

		console.log(error);
		return res.status(400).json({
			ok: false,
			message: 'Error creating event',
			error: error
		});

	}
}

const getEvent = async ( req, res = response ) => {

	
	try {

		const events = await Event.find().populate('user', 'name');
		
		res.status(200).json({
			ok: true,
			message: 'The event was successfully obtained',
			events
		});

	} catch (error) {

		console.log(error);
		return res.status(400).json({
			ok: false,
			message: 'Error obtaining event',
			error: error
		});

	}

}

const updateEvent = async ( req, res = response ) => {

	const eventId = req.params.id;

	try {

		const event = await Event.findById(eventId);

		if ( !event ) return res.status(404).json({
			ok: false,
			message: 'Event not found',
		});

		if ( event.user.toString() !== req.uid.toString() ) return  res.status(401).json({
			ok: false,
			message: 'You are not authorized to update this event',
		});

		const newEvent = {
			...req.body,
			user: req.uid,
		}

		const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

		res.status(200).json({
			ok: true,
			message: 'Event updated successfully',
			event: updatedEvent,
		});

	} catch (error) {

		console.log(error);
		return res.status(400).json({
			ok: false,
			message: 'Error obtaining event',
			error: error
		});
	}
}

const deleteEvent = async ( req, res = response ) => {

	const eventId = req.params.id;

	try {

		const event = await Event.findById(eventId);

		if ( !event ) return res.status(404).json({
			ok: false,
			message: 'Event not found',
		});

		if ( event.user.toString() !== req.uid.toString() ) return res.status(401).json({
			ok: false,
			message: 'You are not authorized to delete this event',
		});

		await Event.findByIdAndDelete(event);

		res.status(200).json({
			ok: true,
			message: 'Event deleted successfully',
		});
	} catch (error) {

		console.log(error);
		return res.status(400).json({
			ok: false,
			message: 'Error deleting event',
			error: error
		});
	}
}

module.exports = {
	createEvent,
	getEvent,
	updateEvent,
	deleteEvent,
};