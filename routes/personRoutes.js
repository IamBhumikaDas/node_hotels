const express= require('express')
const router=  express.Router()
const Person=require('./../models/Person')
const {jwtMiddleware ,jwt_token_generate} = require('../jwt')

router.post('/signup',async(req,res)=>{
    try{
 data = req.body;
 const newPerson = new Person (data);

 const response = await newPerson.save();
     const payload = {
      id :  response.id,
       username: response.username
     }
   const token = jwt_token_generate(payload)
 res.status(200).json({ response: response ,token:token});
 console.log("data saved");

}
catch(err){
   res.status(500).json({error : 'internal server error'})
   console.log(err)
}
})

router.post('/login', async(req,res)=>{
    try{
    const username = req.body.username;
    const password = req.body.password;

  const response = await Person.findOne({username:username});
  
  if(!response){
     return res.status(404).json({error : 'user not found'})}
 
    const passwordCheck= await response.comparePassword(password);
    if(!passwordCheck) {
        return  res.status(401).json({error : 'incorrect password'})
    }else{
        const payload = {
            username:response.username,
            id:response.id
        }
        console.log(passwordCheck)
       const token = jwt_token_generate(payload)
       return res.status(200).json({token : token})
    }}catch(err){
        console.log(err)
        res.status(500).json({error : 'internal server error'})
    
    }
})
router.get('/profile',jwtMiddleware,async(req,res)=>{
    try{
    const user =req.user;
   const response =  Person.findById(user.id);
   return res.status(200).json(response)
     

    }
   catch(err){
    console.log(err) 
  return res.status(500).json({error : 'internal server error'})
  
   }

})


router.get('/',jwtMiddleware ,async(req,res)=>{
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
module.exports = router;