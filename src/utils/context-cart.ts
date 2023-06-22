import { createContext } from "react";



export type ContexCartCountType = {
    contexCartCount: number;
    setContexCartCount: (contexCartCount: number) => void;
}

export const ContexCartCount = createContext<ContexCartCountType>({
    contexCartCount: 0,
    setContexCartCount: ()=>{}
})