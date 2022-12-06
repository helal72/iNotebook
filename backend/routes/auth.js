const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//router.use(express.json())
const JWT_SECRET ="helalisgoodb$oy"
//Creat a User using '/api/auth/createuser'
router.post('/createuser', [
    body('name' , 'Enter a valid name').isLength({ min: 3 }),
    body('email' , 'enter a valid email').isEmail(),
    body('password','Password must at lest 6 characture').isLength({ min: 6 }),
],async ( req, res )=>{
    const errors = validationResult(req);
    let success =false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try{
    let user = await User.findOne({ email: req.body.email})
    if(user){
        return res.status(400).json({success, error:"Sorry! Email already axist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password , salt) 

     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success =true;
    res.json({success, authToken})

}catch(error){
    console.error(error.message);
    res.status(500).json("some error ocured")
}
    // .then (user => res.json(user))
    // .catch(err => { console.log(err)
    // res.json({error:"Enter an unique Email"})})
   
})
// router.post('/', async(req, res)=>{ 
//     const user = User(req.body);
//     await user.save()
//     res.send(req.body);
// } );

//Creat a User using '/api/auth/createlogin'
router.post('/createlogin', [
    body('email' , 'enter a valid email').isEmail(),
    body('password','password cantot be blank').exists()
],async ( req, res )=>{
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email , password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success =false;
            return res.status(400).json({success, error: "Invalid Authentication"})
        }
        let passwordCompare = await bcrypt.compare(password , user.password)
        if(!passwordCompare){
            success =false;
            return res.status(400).json({success, error: "Invalid Authentication"}) 
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success =true;
        res.json({success, authToken})
    } catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }
})

//fetch a User using post '/api/auth/getuser'
router.post('/getuser', fetchuser, async ( req, res )=>{
    try {
       let userId = req.user.id;
       const user = await User.findById(userId).select("-password")
       res.send(user);

    } catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router