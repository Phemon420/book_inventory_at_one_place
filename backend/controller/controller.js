import prisma from "../DB/db.config.js";

const SignUp={
  registerLoad:async(req,res)=>{
      try{

      }
      catch(err){
          console.log(err);
          res.status(500).send("Internal Server Error");
      }
  },

  register : async(req,res)=>{
      try{
        console.log(req.body);
      }
      catch(err){
          console.log(err);
          res.status(500).send("Internal Server Error");
      }
  }
}

const Login={
    loggingin:async(req,res)=>{
        console.log(req.body);
        try {
            const { email, password } = req.body;

              const user=await prisma.user.findUnique({
                where:{email:email}
              })
              
              //console.log(user);
              if (!user) {
                return res.status(400).json({
                  success: false,
                  error: "This user does not exists",
                });
              }
      
            // Compare password directly (⚠ Not secure, use bcrypt in production)
              if (user.password !== password) {
                return res.status(401).json({
                  success: false,
                  error: "Username or password is wrong",
                });
              }
            
              // If successful, send a success response
              return res.status(200).json({
                success: true,
                user: { id: user.id, email: user.email },
              });
            
            }
            catch (error) {
              console.error("Login error:", error);
              
              // Handle timeout errors
              if (error.message === "Database request timeout") {
                return res.status(503).json({
                  success: false,
                  error: "Database request timeout. Please try again.",
                });
              }
            
              return res.status(500).json({
                success: false,
                error: "An unexpected error occurred during login",
              });
            } 
        }
    }


        
export {SignUp,Login};