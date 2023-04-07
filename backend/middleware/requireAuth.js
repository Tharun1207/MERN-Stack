const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // Split the authorization string
    // - First part contains the word 'Bearer', second part after the space contains the JSON web token,
    //   which is what is wanted, hence the 2nd item is taken out of the split
    const token = authorization.split(' ')[1]

    try {
        // Decrypt the id from the encrypted token
        const {_id} = jwt.verify(token, process.env.SECRET)

        // Find user in DB and select the id property from that user
        // Resulting docuent is stored as a req.user property
        // - This property can be named anything, i.e. req.<name> and <name> can be anything deemed appropriate
        req.user = await User.findOne({ _id }).select('_id')
        
        // Invoke the next function in the workout controller
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth