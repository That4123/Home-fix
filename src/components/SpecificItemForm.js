import React from "react";

export const SpecificItemForm= ({ formData, handleChange })=> {
    return (
        <div className="form-group">
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

