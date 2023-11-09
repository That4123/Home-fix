import React from "react";

export const SpecificItemForm= ({ formData, handleChange })=> {
    return (
        <div className="informationForm-group">
            <label>Tên vật dụng</label>
            <input
                type="text"
                name="specificItem"
                value={formData.specificItem}
                onChange={handleChange}
                placeholder="tên vật dụng"
                />
        </div>
    );
}

