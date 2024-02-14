const projects=require('../Models/projectschema');



exports.addUserProject=async(req,res)=>{
    console.log("Inside addUserProject");
    // get userId
    const userId=req.payload
    // get projectImage
    const projectImage=req.file.filename
    // get project details
    const{title,language,github,link,overview}=req.body
    console.log(userId,title,language,github,link,overview,projectImage);

    //  res.status(200).json("Add user project request recieved")
    // logic
    try{
        const exisitingProject=await projects.findOne({github})
        if(exisitingProject){
            res.status(402).json("Project already exists")
        }
        else{
            const newProject = new projects({title,language,github,link,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}


// get all user-project
exports.getAllUserProjects = async(req,res)=>{
    // get userId
    const userId=req.payload;
    // get all projects of particular user
    try{
        // api call
        const userProject=await projects.find({userId})
        res.status(200).json(userProject)
    }
    catch(err){
        res.status(401).json("Internal server error"+err.message);
    }
}

// get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey=req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)// send all projects to frontend
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message)
    }
}


// get home project
exports.getHomeProject =async(req,res)=>{
    try{
        const homeProject=await projects.find().limit(3)
        res.status(200).json(homeProject);
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);
    }
}

// Update project details
exports.UpdateProject=async(req,res)=>{
    const{title,language,github,link,overview,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    userId=req.payload
    const{pid}=req.params
    try{
        const UpdateProject=await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImage,userId})
        await UpdateProject.save()
        res.status(200).json(UpdateProject)
    }
    catch(err){
        res.status(401).json("Internal server error"+err.message);
    }
}

// delete user project
exports.DeleteProject=async(req,res)=>{
    const {pid}=req.params;
    try{
        const DeleteProject=await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(DeleteProject)
    }
    catch(err){
        res.status(401).json("Internal server error"+err.mesage);
    }
}