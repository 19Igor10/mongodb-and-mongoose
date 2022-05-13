require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
})

const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {

  let daniel = new Person({
    name: "Daniel",
    age: 30,
    favoriteFoods: ["Pizza"]
  })

  daniel.save((error, data) => {
    if(error) {
      console.log(error)
    }
    else {
      done(null, data)
    }
  })
};

let arrayOfPeople = [{
    name: "Dominik",
    age: 25,
    favoriteFoods: ["Kebab"]
  },
  {
    name: "Agata",
    age: 18,
    favoriteFoods: ["Pizza"]
  } 
  ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
      if(error) {
        console.log(error)
      }
      else {
        done(null,data)
      }
    })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data) => {
    if(error) {
      console.log(error)
    } else {
      done(null , data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods: food}, (error, data) => {
    if(error) {
      console,log(error)
    } else {
      done(null, data);
    }
  })

};

const findPersonById = (personId, done) => {
  Person.findById({personId}, (error, data) => {
  if(error){
    console.log(error)
  } else {
    done(null, data);
  } 
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (error, Person) => {
    if(error){
      console.log(error)
    } else {
      Person.favoriteFoods.push(foodToAdd);
      Person.save((error, data) => {
        if(error){
          console.log(error)
        } else {
          done(null, data);
        }
      });
    }
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new:true }, (error, data) => {
    if(error){
      console.log(error)
    } else {
      done(null , data);
    }
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (error, data) => {
    if(error){
      console.log(error)
    } else {
      done(null, data);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, response) => {
    if(error) return console.log(error);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec((error, data) => {
    if(error){
      console.log(error)
    } else {
      done(null, data);
    }
  })
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
