const express = require("express");
const router = express.Router();
const User = require("../models/userSchema")



// router.get("/",(req,res)=>{ 
//     console.log("connect");
// })



router.post("/register",async(req,res)=>{ 
    const {name,email,age,mobile,work,add,des} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !des){
        res.status(422).json("plz fill data")
    }

    try{
        const preuser = await User.findOne({email:email})
        console.log(preuser);

        if(preuser){
            res.status(422).json("this user is already present")
        }else{
            const adduser = new User({
                name,email,age,mobile,work,add,des
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch(error) {
        res.status(422).json(error)
    }
    console.log("connect");
})

router.get("/getdata",async(req,res)=>{
    try {
        
        const userdata = await User.find();
        res.status(201).json(userdata)
        console.log(userdata);


    } catch (error) {
        res.status(422).json(error)
        
    }
})


router.get("/getuser/:id",async(req,res)=>{
    try {
        
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await User.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error)
    }
})



router.patch("/updateuser/:id",async(req,res)=>{
    try {
        
        const {id} = req.params;

        const updateuser = await User.findByIdAndUpdate(id,req.body,{
            new : true  
        })
        res.status(201).json(updateuser)

    } catch (error) {
        res.status(422).json(error)
    }
})


router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        
        const {id} = req.params;

        const deleteuser = await User.findByIdAndDelete({_id:id})
        
        res.status(201).json(deleteuser)

    } catch (error) {
        res.status(422).json(error)
    }
})
module.exports = router