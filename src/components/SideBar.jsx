import React from "react";

const Sidebar = () => {
    const icons = [
        "flag",
        "domain",
        "groups",
        "currency_rupee",
        "star",
        "bar_chart", // active
        "description",
        "schedule",
        "account_tree",
        "balance",
        "fact_check",
        "picture_as_pdf",
        "memory",
    ];

    return (
        <div className="sidebar">
            {icons.map((icon, index) => (
                <div
                    key={index}
                    className={`icon ${index === 5 ? "active" : ""}`}
                >
                    <span className="material-symbols-rounded">
                        {icon}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;