import { createContext,useState,useContext } from "react";

export const TypeContext = createContext(null);

export const useType = () =>{
    const type = useContext(TypeContext);
    return type;
}

export const TypeProvider = (props) =>{
    const [type,setType] = useState('restaurants');
    return(
        <TypeContext.Provider value={{type, setType}}>
            {props.children}
        </TypeContext.Provider>
    );
}