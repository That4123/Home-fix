
import React from "react";

export const ProviderForm= ({ formData, handleChange })=> {
    return (
        <div className="form-group provider">
            <label>Nhà sửa chữa 
                <input 
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Nhà sửa chữa"
                />
            </label>
            <button>Tìm kiếm</button>
        </div>
    );
}

