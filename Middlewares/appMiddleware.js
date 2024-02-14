const appMiddleware=(req,res,next)=>{
    console.log("Inside Application middleware");
    next();
}

module.exports=appMiddleware