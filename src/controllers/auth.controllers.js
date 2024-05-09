const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// function to register a user
exports.register = async(req, res, next)=>{
    try{
        const {fullname, email, password} = req.body
        
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            res.status(402).json({message: 'Email already exist'})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          fullname,
            email,
            password: hashPassword,
        })

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Successfully registered',
    user: {
        userId: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
     }
    })


    }catch(error){
        next(error)
    }
}


//  Login logic
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Issue access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    // Respond with access token
    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


exports.logout = (req, res) => {
  try {
    
    // For JWT-based authentication, logging out typically involves client-side actions like removing the access token from local storage

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

