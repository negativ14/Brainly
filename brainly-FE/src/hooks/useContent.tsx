import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useContent = () => {
    const [apiContent, setApiContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);  // Set to false initially
    const [error, setError] = useState<string | null>(null);
    const jwt = localStorage.getItem("Authorization");

    const fetchContent = async () => {
        if (!jwt) {
            setError("Token not Found");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/get-content`, {
                headers: {
                    Authorization: jwt
                }
            });
            setApiContent(response.data.content);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error fetching content");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [jwt]);  

    const refresh = () => fetchContent();

    return { apiContent, loading, error, refresh };
};
