const router = require('express').Router()
const User = require('../models/User')

//create

router.post('/create' , async(req,res)=>{
    const {name , email , password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({status : true , msg : "USer Already Exists!!"})
        }
        const user = await User.create({
            name ,
            email ,
            password
        })
        return res.status(200).json({status : true , msg : "User created successfully", data : user})
    }
    catch(err){
       return res.status(500).json({status : false , msg:err})
    }
})
//read
router.get('/all' , async(req,res)=>{
    try {
      const users = await User.find()
      
      return res
        .status(200)
        .json({ status: true, msg:"list of users", data: users });
    } catch (err) {
      return res.status(500).json({ status: false, msg: err });
    }
})
// 3 update 
router.put('/updatedUser/:id' , async(req,res)=>{
    let {id}=req.params
    const {name , email , password}=req.body
    try {
      const user = await User.findByIdAndUpdate(id , {...req.body} , {new:true});

      return res
        .status(200)
        .json({ status: true, msg: "List of users", data: user });
    } catch (err) {
      return res.status(500).json({ status: false, msg: err });
    }
})
//4 DELETE
router.delete("/deleteUser/:id", async (req, res) => {
    let { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(
        id
      );
  
      return res
        .status(200)
        .json({ status: true, msg: "User Deleted"});
    } catch (err) {
      return res.status(500).json({ status: false, msg: err });
    }
  });
  

















module.exports = router
