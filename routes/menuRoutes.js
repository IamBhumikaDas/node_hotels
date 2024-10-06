const express =require('express')
const router = express.Router()
const menuItem = require('./../models/MenuItem')

router.post('/',async(req,res)=>{
    try{
  const   menu = req.body;
 const newMenu = new menuItem(menu);
    await newMenu.save();
 console.log("new menu saved");
 res.status(200).json({newMenu});
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})

    }
})
router.get('/',async(req,res)=>{
    try{
        const menu= await menuItem.find();
        res.status(200).json(menu)

    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})

    }
})
router.get('/:taste',async(req,res)=>{
    try{
      const taste = req.params.taste;
      if(taste=='sweet' || taste =='spicy'|| taste =='sour' ){
   const response =  await menuItem.find({taste:taste});
   res.status(200).json(response)

      }else{
        res.status(404).json({error:"taste did not match"})
      }
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})

    }
})
router.put('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;
        const menuUpdated = req.body;
        
     const response = await menuItem.findByIdAndUpdate(menuId,menuUpdated,{
            new: true,
            runValidator:true
            
        })

        if(!response){
            res.status(404).json({error:"id did not match"})
            
        }else{
            res.status(200).json({response:"data updated successfully"})
            console.log("data updated")
        }


    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
     

    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const id = req.params.id;
     const response =  await menuItem.findByIdAndDelete(id)
if(!response){
    res.status(404).json({error:"id did not match"})
}else{
    res.status(200).json({response:"Data deleted successfully"})
}


    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
        
    }
})

module.exports = router;