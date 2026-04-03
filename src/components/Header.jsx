import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Header = ({ onAddClick }) => {
    return (
        <div className="header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="head-text">
                {/* ICON */}
                <FaCheckCircle color="#22c55e" size={20} />

                {/* TEXT */}
                <h2 style={{ margin: 0 }}>
                    FLEMING LABORATORIES LIMITED
                </h2>
            </div>

            {/* BUTTON */}
            <button className="add-btn" onClick={onAddClick}>
                Add Latest Year Financials
            </button>
        </div>

    );
};

export default Header;