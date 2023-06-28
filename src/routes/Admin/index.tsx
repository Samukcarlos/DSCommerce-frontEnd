import { Outlet } from "react-router-dom";
import HearderAdmin from "../../components/HeaderAdmin";

export default function Admin(){
    return(
        <> 
          <HearderAdmin />  
          <Outlet />
        </>
    )
}