import { createContext,useState,useContext } from "react";

export const CenterContext = createContext(null);

export const useCenter = () =>{
    const center = useContext(CenterContext);
    return center;
}

export const CenterProvider = (props) =>{
    const [center,setCenter] = useState({lat:0,lng:0});
    return(
        <CenterContext.Provider value={{center, setCenter}}>
            {props.children}
        </CenterContext.Provider>
    );
}