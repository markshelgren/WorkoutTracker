const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date, default: () => new Date() ,
    unique:true
  },
  exercises: [{
    type: {
      type: String
    },
    name: {
      type: String
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number
    },
    reps: {
      type: Number
    },
    sets: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]
},

  {
    toJSON:{
      virtuals: true
    }
  });
  WorkoutSchema.virtual('totalDuration').get(function () {
    let sum = 0;
     for (let iteration = 0; iteration < this.exercises.length; iteration++) {
      sum += this.exercises[iteration].duration;
    }
    return sum;
  }); 
  

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;