const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async(req,res) => {
    try{
        const { username, password } = req.body
        const user = await User.find({ username: username }).limit(1);
        if(user.length === 0){
            return res.status(404).send('This account does not exist')
        }
        
        const userData = user[0]
        console.log(userData, user[0])
        const isValid = await bcrypt.compare(password, userData.password)
        if(!isValid){
            return res.status(401).send( 'Invalid credentials')
        }
        const access_token = await jwt.sign({ _id: userData._id }, 'secretKey', {
            expiresIn: '1y'
        })
        return res.status(200).json({
            message: 'Authorization successful',
            access_token
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send('Something went wrong, Please try again')
    }
}