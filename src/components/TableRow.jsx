import React from "react";

const TableRow = ({ label, values, years }) => {
    return (
        <tr>
            <td style={{ padding: "8px", fontWeight: "500" }}>{label}</td>
            {years.map((year) => (
                <td
                    key={year}
                    style={{ padding: "8px", textAlign: "right" }}
                >
                    {values[year] ?? "-"}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;