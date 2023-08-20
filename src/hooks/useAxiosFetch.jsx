import { useEffect, useState } from "react";
import axios from 'axios';

export const useAxiosFetch = (URL,dependancyArray) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dependancyArray]);
  
    return { data, error, loading, fetchData };
}

