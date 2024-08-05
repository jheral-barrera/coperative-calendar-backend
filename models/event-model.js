const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
    },
});

/* 
	* De esta manera se puede modificar la vista
	* que se obtiene en la respuesta del endpoint
*/
// eventSchema.method('toJSON', function () {
// 	const { __v, _id, ...object } = this.toObject();
// 	object.id = _id;
// 	return object;
// });

module.exports = model('Event', EventSchema);