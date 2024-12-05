import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useContent = () => {
    const [apiContent, setApiContent] = useState([]);

    useEffect(() => {
        axios.get(BACKEND_URL + "/api/v1/get-content",{
            headers:{
                Authorization: localStorage.getItem("Authorization")
            }
        }).then((response) => {
            setApiContent(response.data.content)
        })
    },[])

    return apiContent;
}

