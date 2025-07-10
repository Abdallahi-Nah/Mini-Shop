import React, { useContext, useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import { User } from '../../context/UserContext';
import axios from 'axios';
import Loading from '../../components/utils/Loading';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const user = useContext(User);
  const token = user.auth.token;
  const [isLoading, setIsLoading] = useState(true);

  const cookies = new Cookies();
  const tokenCookie = cookies.get("Bearer");

 useEffect(() => {
   // Fonction asynchrone classique
   async function getRefreshToken() {
     try {
       const res = await axios.post("http://127.0.0.1:8000/api/refresh", null, {
         headers: {
           Authorization: `Bearer ${tokenCookie}`,
         },
       });
       console.log("New Token:", res.data.token);
       cookies.set("Bearer", res.data.token);
       user.setAuth(function (prev) {
         return { ...prev, token: res.data.token };
       });
     } catch (error) {
       console.log("Error refreshing token:", error);
     }
   }

   // Fonction principale exécutée dans useEffect
   async function run() {
     try {
       if (!token) {
         await getRefreshToken(); // attendre avant de continuer
       }
     } catch (error) {
       console.log(error);
     } finally {
       setIsLoading(false); // maintenant on enlève le loading
     }
   }

   run(); // appel
 }, []);
// exécuté au montage uniquement

  return isLoading ? <Loading /> : <Outlet />;
}

export default PersistLogin
