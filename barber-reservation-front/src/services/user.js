import http from "./httpService";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../config";

const registerApiEndpoint = `${apiUrl}/api/auth/register`;
const loginApiEndpoint = `${apiUrl}/api/auth/authenticate`;
const tokenKey = "token";

export async function register(user) {
  try {
    return await http.post(registerApiEndpoint, {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("User already exists with this email");
    }
    throw error;
  }
}

export async function login(email, password) {
  const responce = await http.post(loginApiEndpoint, { email, password });
  localStorage.setItem(tokenKey, responce.data.token);
  return responce;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("decoding ....", jwt);
    let user = jwtDecode(jwt);
    console.log("user ....", user);
    return user;
  } catch (ex) {
    console.log("decodingExeption");
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
