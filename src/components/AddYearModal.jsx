import React, { useState } from "react";

const AddYearModal = ({ isOpen, onClose, data, onSubmit }) => {
    // Initialize state based on groups/items
    const initialState = data[0].groups.map(group =>
        group.items.map(() => "")
    );

    const [formValues, setFormValues] = useState(initialState);

    if (!isOpen) return null;

    const handleChange = (gIndex, iIndex, value) => {
        const updated = [...formValues];
        updated[gIndex][iIndex] = value;
        setFormValues(updated);
    };

    const handleSubmit = () => {
        onSubmit(formValues);
        onClose();
    };

    // Calculate group total (excluding total row itself)
    const calculateGroupTotal = (gIndex) => {
        return formValues[gIndex].reduce((sum, val) => {
            return sum + Number(val || 0);
        }, 0);
    };

    // Calculate final total (sum of all groups)
    const calculateFinalTotal = () => {
        return formValues.reduce((total, group, gIndex) => {
            return total + calculateGroupTotal(gIndex);
        }, 0);
    };

    return (
        <div style={overlay}>
            <div style={modal}>
                <h3>Add Financials (2025)</h3>

                {data[0].groups.map((group, gIndex) => {
                    // ❌ Skip "Total Assets" group from JSON
                    if (group.groupName.toLowerCase().includes("total assets")) {
                        return null;
                    }

                    return (
                        <div key={gIndex} className="modal-group">
                            <h4>{group.groupName}</h4>

                            {group.items.map((item, iIndex) => {
                                const isTotal =
                                    item.isTotal ||
                                    item.label.toLowerCase().includes("total");

                                return (
                                    <div key={iIndex} className="modal-row">
                                        <label>{item.label}</label>

                                        <input
                                            type="number"
                                            value={
                                                isTotal
                                                    ? calculateGroupTotal(gIndex)
                                                    : formValues[gIndex][iIndex]
                                            }
                                            disabled={isTotal}
                                            onChange={(e) =>
                                                handleChange(gIndex, iIndex, e.target.value)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                {/* FINAL TOTAL */}
                <div className="modal-group">
                    <h4>Total Assets</h4>

                    <div className="modal-row">
                        <label>Total Assets</label>
                        <input
                            type="number"
                            value={calculateFinalTotal()}
                            disabled
                        />
                    </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose} style={{ marginLeft: "10px" }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
};

const modal = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
};

export default AddYearModal;