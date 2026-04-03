import React, { useState } from "react";

const AddYearModal = ({ isOpen, onClose, data, onSubmit }) => {
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

    const calculateGroupTotal = (gIndex) => {
        return formValues[gIndex].reduce((sum, val) => {
            return sum + Number(val || 0);
        }, 0);
    };

    const calculateFinalTotal = () => {
        return formValues.reduce((total, group, gIndex) => {
            return total + calculateGroupTotal(gIndex);
        }, 0);
    };

    return (
        <div style={overlay} className="modal-overlay">
            <div style={modal} className="modal">

                {/* HEADER */}
                <div className="modal-header">
                    <h3>Add Financials (2025)</h3>
                </div>

                {/* BODY */}
                <div className="modal-body">
                    {data[0].groups.map((group, gIndex) => {

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
                                                placeholder="Enter amount"
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
                    <div className="modal-group total-highlight">
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
                </div>

                {/* FOOTER */}
                <div className="modal-actions">
                    <button className="btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
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
    padding: "30px",
    borderRadius: "8px",
    width: "520px",
    maxHeight: "85vh",
    overflowY: "auto",
};

export default AddYearModal;