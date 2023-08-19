import { useEffect } from "react";

export const useAxiosFetchSetState = (newData, setState) => {
    useEffect(() => {
        if (newData) {
            setState(newData);
        }
    }, [newData, setState]);
}