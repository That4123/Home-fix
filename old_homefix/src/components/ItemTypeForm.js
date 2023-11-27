import React from "react";

export const ItemTypeForm= ({ formData, handleChange })=> {
    const itemTypes = ['Máy giặt', 'Điều hòa', 'Đường ống nước', 'Đồ bếp', '1', '2'];

    return (
        <div className="informationForm-group">
            <label>Loại vật dụng </label>
            <select  name="itemType" value={formData.itemType} onChange={handleChange}>
                {itemTypes.map((itemType) => (
                    <option key={itemType} value={itemType}>
                        {itemType}
                    </option>
                ))}
            </select>
        
        </div>
    );
}

