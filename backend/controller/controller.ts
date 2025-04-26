import prisma from "../DB/db.config.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SignUp = {
  registerar: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const role="client";
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User with this email already exists",
        });
      }

      // Proceed to create the new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
          role
        },
      });

      // If successful, send a success response
      return res.status(201).json({
        success: true,
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      });
    } catch (error) {
      console.error("Registration error:", error);

      // Handle timeout errors
      if (error.message === "Database request timeout") {
        return res.status(503).json({
          success: false,
          error: "Database request timeout. Please try again.",
        });
      }

      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred during registration",
      });
    }
  }
}



const Login = {
  loggingin: async (Request, Response) => {
    console.log(Request.body);
    try {
      const { email, password } = Request.body;

      const user = await prisma.user.findUnique({
        where: { email: email }
      });
      
      if (!user) {
        return Response.status(400).json({
          success: false,
          error: "This user does not exist"
        });
      }

      // Compare password directly (⚠ Not secure, use bcrypt in production)
      if (user.password !== password) {
        return Response.status(401).json({
          success: false,
          error: "Username or password is wrong"
        });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, name:user.name, role:user.role },
        process.env.JWT_SECRET || "om is great", // Make sure to set this in your environment variables
        { expiresIn: '24h' } // Token expires in 24 hours
      );
      
      // Set the token as an HTTP-only cookie
      Response.cookie('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      });
      
      // If successful, send a success response (without including the token in the JSON response)
      return Response.status(200).json({
        success: true,
        user: { id: user.id, email: user.email }
      });
    }
    catch (error) {
      console.error("Login error:", error);
      
      // Handle timeout errors
      if (error.message === "Database request timeout") {
        return Response.status(503).json({
          success: false,
          error: "Database request timeout. Please try again."
        });
      }
    
      return Response.status(500).json({
        success: false,
        error: "An unexpected error occurred during login"
      });
    } 
  },

  userDetails: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const user = await prisma.user.findUnique({
        where: { id: String(userId) },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
  
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body; // Changed from req.query to req.body
      const { name, email } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: String(userId) },
        data: { name, email }, // Only name and email
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
  
      return res.status(200).json(updatedUser);
  
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  
  
}


 const Books={
    getAllBooks:async(req:Request,res:Response)=>{
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 30;
        const skip = (page - 1) * limit;
    
        // Fetch posts with pagination
        const posts = await prisma.book.findMany({
          skip,
          take: limit,
        });
    
        // Count total posts
        const totalPosts = await prisma.book.count();
        const totalPages = Math.ceil(totalPosts / limit);
    
        res.status(200).json({
          posts,
          totalPages,
          currentPage: page,
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' });
      }
    },

    getBookReviews: async (req: Request, res: Response) => {
      try {
        const { bookId } = req.query;
      
        if (!bookId) {
          return res.status(400).json({ message: "Missing bookId" });
        }
      
        console.log("Fetching reviews for Book ID:", bookId);
      
        // Fetch all reviews for the given bookId along with the user's name
        const bookReviews = await prisma.review.findMany({
          where: { bookId: String(bookId) },
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                name: true, // Get the reviewer's name
              },
            },
          },
        });
      
        return res.status(200).json({ bookReviews });
      
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    },
    
    addBookReview:async(req:Request,res:Response)=>{
      try {
        console.log(req.body);
        const { bookId, userId, rating, comment } = req.body;
    
        if (!bookId || !userId || rating == null || !comment) {
          return res.status(400).json({ message: "Missing required fields" });
        }
    
        // Create the review
        const newReview = await prisma.review.create({
          data: {
            rating,
            comment,
            book: { connect: { id: String(bookId) } },
            user: { connect: { id: String(userId) } },
          },
        });
    
        return res.status(201).json(newReview);
    
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    }
 }
        
 export {Login,SignUp,Books};