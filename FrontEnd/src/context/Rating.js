import { createContext,useState,useContext } from "react";

export const RatingContext = createContext(null);

export const useRating = () =>{
    const rating = useContext(RatingContext);
    return rating;
}

export const RatingProvider = (props) =>{
    const [rating,setRating] = useState('');
    return(
        <RatingContext.Provider value={{rating, setRating}}>
            {props.children}
        </RatingContext.Provider>
    );
}