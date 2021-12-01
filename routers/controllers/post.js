const postmodel =require("../../db/models/post");



const creatpost =(req,res,next) => {
    const {img,desc,isDelet}= req.body;
    const newpose = new postmodel({img,desc,isDelet,user:req.token.id});
    newpose
    .save()
    .then((result)=>{
        res.status(201).json(resul);

    })
    .catch((error)=>{
        res.status(400).json(error);
    })

};