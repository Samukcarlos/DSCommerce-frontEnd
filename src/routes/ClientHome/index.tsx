import { Outlet } from "react-router-dom";
import HearderClient from "../../components/HeaderClient";

export default function ClientHome(){
    return(
        <> 
          <HearderClient />  
          <Outlet />
        </>
    )
}