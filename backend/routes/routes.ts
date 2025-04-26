import { Router } from "express";
import { Login,SignUp,Books } from '../controller/controller.ts';


const useRoute=Router();

//books
useRoute.get('/books',Books.getAllBooks)
useRoute.get('/books/reviews',Books.getBookReviews)
useRoute.post('/books/reviews',Books.addBookReview)
// useRoute.post('/new_book/')

//users signup
useRoute.post('/auth/signup', SignUp.registerar)


//users login
useRoute.post('/auth/login', Login.loggingin)
useRoute.get('/userid',Login.userDetails)
useRoute.put('/update/user',Login.updateUser)


export default useRoute;