import { Router } from "express";
import { SignUp, Login } from '../controller/controller.js';


const useRoute=Router();

//books
useRoute.get('/books',)
useRoute.get('/books/:<>',)
useRoute.post('/books',)
useRoute.get('/books/reviews/')
useRoute.post('/books/reviews/')

//users signup
useRoute.get('/users/:<>',)
useRoute.put('/users/:<>',)
useRoute.post('/users',)

//users login
useRoute.get('/users/login/',)
useRoute.post('/users/login/',)

export default useRoute;