import React from "react";
import { useNavigate } from 'react-router-dom'
import { $resetUser } from "../../auth/user";

function Logout() {
    const navigate = useNavigate();

    React.useEffect(()=>{
        $resetUser();
        navigate("/");
    },[])

    return(
        <div></div>
    );
}

export default Logout;
