import React from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/finoscale-logo.png";

const TopBar = () => {
    return (
        <div className="topbar">

            {/* Left section */}
            <div className="topbar-left">
                <FaBars size={20} className="burger" />

                <div className="logo-box">
                    <div
                        className="logo-mask"
                        style={{
                            WebkitMaskImage: `url(${logo})`,
                            maskImage: `url(${logo})`,
                        }}
                    ><img src={logo} alt="logo" className="logo-img" /></div>
                </div>

                <span className="logo-text">finoscale</span>
            </div>

        </div>
    );
};

export default TopBar;