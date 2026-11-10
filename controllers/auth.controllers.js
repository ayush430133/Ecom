import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup user //
export const signupUser = async (req, res) => {
     try{
          const {name,email,password} = req.body ?? {};

          if (!name || !email || !password) {
                return res.status(400).json({message: "Name, email, and password are required"});
          }

          // Check if user already exists
          const userExists = await User.findOne({email});

          if(userExists){
                return res.status(400).json({message: "User already exists"});
          }
          
          // Hash the password
          const hashPassword = await bcrypt.hash(password,10);

          // Create the user
          await User.create({
                name,
                email,
                password: hashPassword
          });

          res.status(201).json({message: "User created successfully"});

     } catch (error) {
        console.error("Signup failed:", error);
        res.status(500).json({message: "Internal server error"});
     }
}

// Login user //

export const loginUser = async (req, res) => {
      try{
            const {email,password} = req.body ?? {};

            if (!email || !password) {
                  return res.status(400).json({message: "Email and password are required"});
            }

            // Check if user exists//
             const foundUser = await User.findOne({email});
             if(!foundUser){
                  return res.status(400).json({message: "User  not found"});
             }

             // Compare the password
                  const match = await bcrypt.compare(password,foundUser.password);
                  if(!match){
                        return res.status(400).json({message: "Invalid password"});
                  }

                  // Create a token
                  const token = jwt.sign(
                        {id: foundUser._id},
                        process.env.JWT_SECRET,
                        {expiresIn: "7d"}
                  );
                  res.json(
                        {message: "Login successful", token,
                              user: {
                                    id: foundUser._id,
                                    name: foundUser.name,
                                    email: foundUser.email
                              }
                        }
                  );

      }catch(error){
            console.error("Login failed:", error);
            res.status(500).json({message: "Internal server error"});
      }

};
