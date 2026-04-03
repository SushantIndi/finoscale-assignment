import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FinancialTable from "./components/FinancialTable";
import AddYearModal from "./components/AddYearModal";
import data from "./data/financialData.json";
import jsPDF from "jspdf";
import "./styles/styles.css";

/* 🔥 TRANSFORM FUNCTION (API → UI FORMAT) */
const transformData = (apiData) => {
    const years = apiData.map(item => item.year.slice(0, 4));

    const getValue = (key) => {
        const obj = {};
        apiData.forEach((item, index) => {
            obj[years[index]] = item.bs.assets[key] ?? 0;
        });
        return obj;
    };

    const getSubTotal = (key) => {
        const obj = {};
        apiData.forEach((item, index) => {
            obj[years[index]] = item.bs.subTotals[key] ?? 0;
        });
        return obj;
    };



    return [
        {
            section: "Assets",
            groups: [
                {
                    groupName: "Net Fixed Assets",
                    items: [
                        { label: "Tangible Assets", values: getValue("tangible_assets") },
                        { label: "Intangible Assets", values: getValue("intangible_assets") },
                        { label: "Total Net Fixed Assets", isTotal: true, values: getSubTotal("net_fixed_assets") },
                    ],
                },
                {
                    groupName: "Capital Work In Progress",
                    items: [
                        { label: "Capital Work In Progress", values: getSubTotal("capital_wip") },
                    ],
                },
                {
                    groupName: "Other Non Current Assets",
                    items: [
                        { label: "Non Current Investments", values: getValue("noncurrent_investments") },
                        { label: "Net Deferred Tax Assets", values: getValue("deferred_tax_assets_net") },
                        { label: "Long Term Loans And Advances", values: getValue("long_term_loans_and_advances") },
                        { label: "Other Non Current Assets", values: getValue("other_noncurrent_assets") },
                        { label: "Total Other Non Current Assets", isTotal: true, values: getSubTotal("total_other_non_current_assets") },
                    ],
                },
                {
                    groupName: "Current Assets",
                    items: [
                        { label: "Inventories", values: getValue("inventories") },
                        { label: "Trade Receivables", values: getValue("trade_receivables") },
                        { label: "Cash And Bank Balances", values: getValue("cash_and_bank_balances") },
                        { label: "Short Term Loans And Advances", values: getValue("short_term_loans_and_advances") },
                        { label: "Other Current Assets", values: getValue("other_current_assets") },
                        { label: "Total Current Assets", isTotal: true, values: getSubTotal("total_current_assets") },
                    ],
                },
                {
                    groupName: "Total Assets",
                    items: [
                        { label: "Total Assets", isTotal: true, values: getValue("given_assets_total") },
                    ],
                },
            ],
        },
    ];
};

function App() {
    // 🔥 Use transformed data instead of raw JSON
    const [financialData, setFinancialData] = useState(transformData(data));
    const [open, setOpen] = useState(false);

    const handleAddYear = (values) => {
        const newYear = "2025";

        const updatedData = JSON.parse(JSON.stringify(financialData));

        let finalTotal = 0;

        updatedData[0].groups.forEach((group, gIndex) => {
            let groupTotal = 0;

            group.items.forEach((item, iIndex) => {
                const val = Number(values[gIndex][iIndex] || 0);

                const isTotal =
                    item.isTotal ||
                    item.label.toLowerCase().includes("total");

                if (!item.values) {
                    item.values = {};
                }

                if (!isTotal) {
                    item.values[newYear] = val;
                    groupTotal += val;
                } else {
                    item.values[newYear] = groupTotal;
                }
            });

            finalTotal += groupTotal;
        });

        // 🔥 Update Total Assets group
        updatedData[0].groups.forEach((group) => {
            if (group.groupName.toLowerCase().includes("total assets")) {
                group.items.forEach((item) => {
                    if (!item.values) item.values = {};
                    item.values[newYear] = finalTotal;
                });
            }
        });

        setFinancialData(updatedData);
    };

    const handleDownloadYear = (year) => {
        const pdf = new jsPDF();

        let y = 10;

        pdf.setFontSize(14);
        pdf.text(`Financial Data - ${year}`, 10, y);
        y += 10;

        financialData[0].groups.forEach((group) => {
            pdf.setFontSize(12);
            pdf.text(group.groupName, 10, y);
            y += 6;

            group.items.forEach((item) => {
                const value = item.values[year] ?? 0;

                pdf.setFontSize(10);
                pdf.text(
                    `${item.label}: ${new Intl.NumberFormat("en-IN").format(value)}`,
                    10,
                    y
                );

                y += 5;

                // page break
                if (y > 280) {
                    pdf.addPage();
                    y = 10;
                }
            });

            y += 5;
        });

        pdf.save(`Financial_${year}.pdf`);
    };

    return (
        <div>
            <TopBar />

            <div className="layout">
                <Sidebar />

                <div className="content">
                    <Header onAddClick={() => setOpen(true)} />

                    <FinancialTable data={financialData} onDownloadYear={handleDownloadYear} />
                </div>
            </div>

            <AddYearModal
                isOpen={open}
                onClose={() => setOpen(false)}
                data={financialData}
                onSubmit={handleAddYear}
            />
        </div>
    );
}

export default App;