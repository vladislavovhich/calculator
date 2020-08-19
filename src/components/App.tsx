import React from "react";
import Calculator from "./Calculator/Calculator";
import Header from "./Header";

type PropsType = {};

const App: React.FC<PropsType> = (props) => {
    return (
        <div className="App d-flex flex-column align-items-center">
            <Header />
            <div className="mt-3">
                <Calculator />
            </div>
        </div>
    )
};

export default App;