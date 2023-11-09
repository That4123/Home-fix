import React from "react";

export const DescriptionForm= ({ formData, handleChange })=> {
    return (
        <>
        <div className="informationForm-group">
            <label>Mô tả</label>
            <textarea 
            name="textDescription"
            rows="4"
            value={formData.textDescription}
            onChange={handleChange}
            placeholder="Mô tả"
            />
            
        </div>
        
        </>
    );
}

