const jwt = require('jsonwebtoken');
const JWT_SECRET='Shahrukh$heikh';

const fetchuser=(req,res,next)=>{
// get user from the jwt token
const token=req.header("auth-token");
if(!token){
    res.status(401).send({error:"Please authenticate using valid token"})
}
try {
    const data=jwt.verify(token,JWT_SECRET)
   req.user=data.user;
    next()
} catch (error) {
    console.error(error.message);
    res.status(401).send("some error occured");
  }

}

module.exports=fetchuser;