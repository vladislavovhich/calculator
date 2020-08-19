import React from "react";

import "../scss/Header.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type PropsType = {};

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className="Header w-100">
            <div className="container d-flex align-items-center justify-content-center h-100">
                <div className="Logo d-flex flex-row align-items-center">
                    <div className="mr-1">Calculator</div>
                    <FontAwesomeIcon icon="calculator" fixedWidth={true}/>
                </div>
            </div>
        </header>
    )
};

export default Header;