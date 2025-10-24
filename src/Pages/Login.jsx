import React from "react";
export default function Login({t}){
    return(
        <div>
            <h1>{t?.Login?.title || "Login"} </h1>
            <h1>{t?.Login?.description || "Please login to continue"} </h1>
        </div>
    );
}