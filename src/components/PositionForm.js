import React from "react";

export const PositionForm= ({ formData, handleChange })=> {
    return (
        <div className="informationForm-group">
        <label>Vị trí</label>
            <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Vị trí"
            />
        </div>
    );
}


