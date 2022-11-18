const User = require("../models/usersmodel");


const Register = async(req,res) => {

    try {

        const {email, password} = req.body;

        if (!email || !password) 
               return res.status(400).json({message : "Please fill appropriately"});
        
        let user = await User.findOne({email});
        if (user)
                return res.status(400).json({error: "User already exists"});    

         user = await User.create({
            email,
            password,
            role: req.body.role,
            username: req.body.username,
        });

        const token = User.generateJwtToken();

        return res.status(200).json({
            success: true,
            token,
        });
 
    


    }
     catch(err){
        console.log(err);
    }
}