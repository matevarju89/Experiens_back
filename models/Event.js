const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//Creating Schema
const EventSchema=new Schema({
	name: {
		type:String,
		required:true,
	},

	description:{
		type:String,
	},

	organizer:{
		 type: Schema.Types.ObjectId,//associate the user by its ID
    	 ref: 'users',
	},

	location:{
		type:String,
		required:true,
	},

	timing:{
		type:Date,
		required:true,
	},
	
	publicity:{
		type:String,
		required:true,
	},

	tentative:{
		type:Boolean,
		required:true,
	},

	price:{
		type:String,
		required:true,
	},

	participants:[{
		name:{
			type:String,
		},
		avatar:{
			type:String,
		},
	}],

	maxParticipants:{
		type:Number,
	},

	messages:[{
		dateOfInsertion:{
			type:Date,
		},
		text:{
			type:String,
		},
	}],

	
});

module.exports=Event=mongoose.model("events", EventSchema)