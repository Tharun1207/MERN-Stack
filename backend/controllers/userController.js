const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  // Signing the tokens
  // - First argument: represents payload of object
  // - Second argument: Secret string from .env file
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    // Pass the token back to the browser as the JSON web token
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    // Pass the token back to the browser as the JSON web token
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }






// const User = require('../models/userModel')
// const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//     // Signing the tokens
//     // - First argument: represents payload of object
//     // - Second argument: Secret string from .env file
//     return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

// // Login user
// const loginUser = async (req, res) => {
//     const {email, password} = req.body

//     try {
//         const user = await User.login(email, password)

//         // Creating a token
//         const token = createToken(user._id)

//         // Pass the token back to the browser as the JSON web token
//         res.status(200).json({email, token})
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// // Signup user
// const signupUser = async (req, res) => {
//     const { email, password } = req.body

//     try {
//         const user = await User.signup(email, password)

//         // Creating a token
//         const token = createToken(user._id)

//         // Pass the token back to the browser as the JSON web token
//         res.status(200).json({email, token})
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// module.exports = { signupUser, loginUser }