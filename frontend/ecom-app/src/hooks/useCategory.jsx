import axios from "axios";
import { useEffect, useState } from "react";


  export default function useCategory(){
    const [categories, setCategories] = useState([])

    //FOR GETTING CATEGORIES
    const getCategories = async()=>{
        try{
            const {data} = await axios.get('https://pear-worried-bonobo.cyclic.app/api/v1/category/get-category')
            setCategories(data?.category)
        }catch(err){ 
            console.log(err)
        }
    };
    useEffect(() =>{
        getCategories()
      },[]);
      return categories;
  };
