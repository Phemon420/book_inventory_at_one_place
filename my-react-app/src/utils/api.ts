import axios from "axios"
import type { LoginFormValues, LoginResponse } from "./type"
import { getUserInfoFromToken } from "./token";

// API function for login using Axios

const Url : string = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function loginUser(data: LoginFormValues): Promise<LoginResponse> {
  //const response = await axios.post<LoginResponse>(Url+"/auth/login", data)
  const response = await axios.post<LoginResponse>(Url + "/auth/login", data, {
    withCredentials: true,
  });
  console.log(response)
  return response.data
}

export async function signupUser(data: LoginFormValues): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(Url+"/auth/signup", data)
  console.log(response)
  return response.data
}

export const fetchBookReviews = async (bookId) => {
  // const user = getUserInfoFromToken();
  // console.log("user id hain", user.id);
  const response = await axios.get(Url+`/books/reviews`, {
    params: {
      bookId: bookId,
    },
  });
  console.log(response);
  return response.data;
};


export const AddBookReview = async (BookId: string, rating: number, comment: string) => {
  const user = getUserInfoFromToken();
  console.log("user id hain", user.id);

  const response = await axios.post(Url + `/books/reviews`, {
    bookId: BookId,
    userId: user.id,
    rating: rating,
    comment: comment,
  });

  return response.data;
};

export const userProfile= async ()=>{
  const user = getUserInfoFromToken();
  // console.log("user id hain", user.id);
  const response = await axios.get(Url+`/userid`, {
    params: {
      userId: user.id,
    },
  });
  console.log(response);
  return response.data;
};


export const updateUser = async (updatedData: { name: string; email: string }) => {
  const user = getUserInfoFromToken();
  const response = await axios.put(`${Url}/update/user`, {
    userId: user.id,
    ...updatedData, // send name and email
  });

  return response.data;
};