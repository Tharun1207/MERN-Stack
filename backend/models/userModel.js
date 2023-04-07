const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled!')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid!')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough!')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use!')
  }

  // Salt: random string of characters that is added to the data that is going to be encrypted
  // before it gets hashed
  // - Extra layer of security
  // - Parameters:
  //     - cost of salt: Higher the number, more secure it is (default == 10)
  const salt = await bcrypt.genSalt(10)

  // Bcrypt is hashing the password that is created by the user, which is stored in the 'hash' variable
  const hash = await bcrypt.hash(password, salt)

  // Store email and hashed password in DB
  const user = await this.create({ email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)










// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const validator = require('validator')

// const Schema = mongoose.Schema

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

// // Static signup method
// userSchema.statics.signup = async function(email, password) {
    
//     // Validation
//     if (!email || !password) {
//         throw Error('All fields must be filled!')
//     }
//     if (!validator.isEmail(email)) {
//         throw Error('Email is invalid!')
//     }
//     if (!validator.isStrongPassword(password)) {
//         throw Error('Password is not strong enough!')
//     }

//     const exists = await this.findOne({ email })

//     if (exists) {
//         throw Error('Email already in use!')
//     }

//     // Salt: random string of characters that is added to the data that is going to be encrypted
//     // before it gets hashed
//     // - Extra layer of security
//     // - Parameters:
//     //     - cost of salt: Higher the number, more secure it is (default == 10)
//     const salt = await bcrypt.genSalt(10)

//     // Bcrypt is hashing the password that is created by the user, which is stored in the 'hash' variable
//     const hash = await bcrypt.hash(password, salt)

//     // Store email and hashed password in DB
//     const user = await this.create({ email, password: hash })

//     // Return user object
//     return user
// }

// // Static login method
// userSchema.statics.login = async function(email, password) {
//     // Validation
//     if (!email || !password) {
//         throw Error('All fields must be filled!')
//     }

//     // Find the user with the email inputted in the login page from the DB
//     const user = await this.findOne({ email })

//     // If cannot find, throw error
//     if (!user) {
//         throw Error('Incorrect email!')
//     }

//     // Compare the keyed in password (first arg) to the hashed password (second arg) in DB
//     const match = await bcrypt.compare(password, user.password)

//     // If no match, throw error
//     if (!match) {
//         throw Error('Incorrect password!')
//     }

//     // If everything matches, authentication complete and return the user object
//     return user
// }

// module.exports = mongoose.model('User', userSchema)