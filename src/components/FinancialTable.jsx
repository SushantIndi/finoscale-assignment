import React from "react";

const FinancialTable = ({ data, onDownloadYear }) => {

    const formatNumber = (num) => {
        return new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num || 0);
    };

    const years = Object.keys(data[0].groups[0].items[0].values);

    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Particulars</th>
                        {years.map((year) => (
                            <th
                                key={year}
                                onClick={() => onDownloadYear(year)}
                                style={{ cursor: "pointer" }}
                            >
                                📄 31 MAR {year}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data[0].groups.map((group, gIndex) => (
                        <React.Fragment key={gIndex}>

                            {/* Group Header */}
                            <tr className="group-row">
                                <td colSpan={years.length + 1}>
                                    {group.groupName}
                                </td>
                            </tr>

                            {/* Items */}
                            {group.items.map((item, iIndex) => (
                                <tr
                                    key={iIndex}
                                    className={item.isTotal ? "total-row" : ""}
                                >
                                    <td className="label">{item.label}</td>

                                    {years.map((year) => (
                                        <td key={year} className="value">
                                            {item.values[year] !== undefined
                                                ? formatNumber(item.values[year])
                                                : "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinancialTable;