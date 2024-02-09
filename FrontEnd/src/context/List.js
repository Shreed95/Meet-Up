import { createContext,useState,useContext } from "react";

export const ListContext = createContext(null);

export const useList = () =>{
    const list = useContext(ListContext);
    return list;
}

export const ListProvider = (props) =>{
    const [list,setList] = useState([]);
    return(
        <ListContext.Provider value={{list, setList}}>
            {props.children}
        </ListContext.Provider>
    );
}