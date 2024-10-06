const express= require('express')
const router=  express.Router()
const Person=require('./../models/Person')

router.post('/',async(req,res)=>{
    try{
 data = req.body;
 const newPerson = new Person (data);

 const response = await newPerson.save();
 res.status(200).json(response);
 console.log("data saved");

}
catch(err){
   res.status(500).json({error : 'internal server error'})
   console.log(err)
}
})
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        res.status(200).json(data)
        console.log("data fetched")

    }catch(err){
        res.status(500).json({error : 'internal server error'})
    console.log(err)
    }
})
router.get("/:workType",async(req,res)=>{
    try{
       const workType = req.params.workType;
       if(workType =='chef'|| workType =='manager'||workType =='waiter'){
         const response = await Person.find({work:workType})
         res.status(200).json({response})
    
       }else{
        res.status(404).json({error:"workType not found"})
       }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }
    })
    router.put('/:id',async(req,res)=>{
    try{
      const personId = req.params.id;
      const personUpdatedData = req.body;
    response =  await Person.findByIdAndUpdate(personId,personUpdatedData,{
        new :true,
        runValidator: true
      });
      if(!response){
        res.status(404).json({error: "id did not matched"})

      }
      res.status(200).json(response);
      console.log("data updated");
      

    }catch(err){
        res.status(500).json({error : 'internal server error'})
        console.log(err)
    }
    })
    router.delete('/:id',async(req,res)=>{
        try{
       const personId = req.params.id;
  const response= await Person.findByIdAndDelete(personId);
      if(!response){
        res.status(404).json({error:"id did not matched"})
      }else{
       res.status(200).json({
       response: "data deleted"
       })

       console.log("data deleted")}
    }catch(err){
        res.status(500).json({error:"internal server error"})
        console.log(err)
    }
    })

/*const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.post('/signup', async (req,res)=>{
     
   
    try{
          const data=req.body//Assuming the request body contains the person data
      const newPerson=new Person(data);
      const response = await newPerson.save();
       console.log('data saved')

       const payload = {
        id : response.id ,
        username: response.username
       }

       const token = generateToken(payload)
       console.log("token is :", token, 
       )

       res.status(200).json({response :response,token: token});
 
      }catch(err){
  console.log(err)
  res.status(500).json({error:'internal server error'})
      }
 
  })

  router.post('/login', async(req,res)=>{
    try{
        //extract username and password from request body
        const {username ,password} = req.body;
        //find the user by username 
        const user = await Person.findOne({username : username})

        //if user does not exit or password does not match , return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'})
        }

        //generate token
        const payload = {
            id : user.id,
            username: user.username
        }
        const token = generateToken(payload)

        //return token as response
        res.json({token})
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
  })
  //profile route 
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData = req.user;
        console.log("userdata :", userData)
        const userId = userData.id;
        const user = await Person.findById(userId)
        res.status(200).json({user})
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
})
  router.get('/',async(req,res)=>{
    try{
    const data= await Person.find()
    console.log("data fetched")
    res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
    })
    router.get('/:workType',async (req,res)=>{
        try{
    const workType=req.params.workType;
    if(workType=='chef'|| workType=='manager'||workType=='waiter'){
       const response = await Person.find({work:workType})
       console.log("response fetched")
       res.status(200).json({response})
    }
    else{
        res.status(404).json({error:"invalid work type"})
    }
        }catch(err){
            console.log(err)
    res.status(500).json({error:'internal server error'})
        }
     })

     router.put('/:id', async (req,res)=>{
        try{
const personId = req.params.id;
const updatedPersonData= req.body
const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
    
        new: true,
        runValidators:true,
    })
    if(!response){
        res.status(404).json({error:'person not found'})
    }
    console.log('data updated')
    res.status(200).json(response)

        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'internal server error'})

        }

     })
     router.delete('/:id',async(req,res)=>{
        try{
const personId = req.params.id;
const response = await Person.findByIdAndDelete(personId)
if(!response){
    res.status(404).json({error: 'person not found'})
}
console.log("data deleted")
res.status(200).json({message : 'person deleted'})
        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'internal server error'})
        }
     })*/
     module.exports = router;