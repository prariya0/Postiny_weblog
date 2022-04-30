import React from "react";
import "../css/gobackbtn.css"

export default function GoBackBtn(props) {
    return (
        <div className="goback-btn">
            <a href={props.path}>&lt; back</a>
        </div>
    );
}