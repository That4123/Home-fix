import React from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export const ProviderForm= ({ formData, handleChange })=> {
    const providers = [
        {
            id: 1,
            name: "Dịch vụ sửa chữa An Phúc",
            type: "Thiết bị gia dụng, điện máy",
            address: "Thủ Đức, Hồ Chí Minh",
            rating: 4.8,
            activity: "24/7",
            contact: "0737520698",
        },
        {
            id: 2,
            name: "Cửa hàng điện tử Minh Khang",
            type: "Thiết bị điện tử",
            address: "Thủ Đức, Hồ Chí Minh",
            rating: 4.5,
            activity: "T2-T6",
            contact: "0737520698",
        },
        {
            id: 3,
            name: "Nguyễn Văn An",
            type: "Máy giặt",
            address: "Biên Hòa, Đồng Nai",
            rating: 4.7,
            activity: "T2-CN",
            contact: "0902365896",
        },
        {
            id: 4,
            name: "Nguyễn Văn B",
            type: "Máy giặt",
            address: "Biên Hòa, Đồng Nai",
            rating: 4.7,
            activity: "T2-CN",
            contact: "0902365896",
        },
        {
            id: 5,
            name: "Nguyễn Văn C",
            type: "Máy giặt",
            address: "Biên Hòa, Đồng Nai",
            rating: 4.7,
            activity: "T2-CN",
            contact: "0902365896",
        },
    ];
    return (
        <div className="informationForm-group providerForm">
            <label>Nhà sửa chữa </label>
            <input className="providerName"
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            placeholder="Nhà sửa chữa"
            />
            
            <Popup trigger={<button className="provider-search-button">Tìm kiếm</button>}
                modal nested>
                {
                    close => (
                        <div>
                            <h3 className="text-center my-4">Nhà cung cấp dịch vụ</h3>
                            <div className="row justify-content-center m-4">
                                <div className="col-sm-2 mx-2">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Search by</option>
                                        <option value="1">Tên</option>
                                        <option value="2">Vị trí</option>
                                        <option value="3">Hoạt động</option>
                                    </select>
                                </div>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control" placeholder="Nhập từ khóa" />
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary">Search</button>
                                </div>
                                <div className="col-sm-2 mx-2">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Sort</option>
                                        <option value="1">Vị trí</option>
                                        <option value="2">Đánh giá</option>
                                        <option value="3">Hoạt động</option>
                                    </select>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary">Sort</button>
                                </div>
                            </div>
                            <table className="table table-hover m-3">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên nhà cung cấp dịch vụ</th>
                                    <th>Loại sửa chữa</th>
                                    <th>Địa chỉ</th>
                                    <th>Đánh giá</th>
                                    <th>Hoạt động</th>
                                    <th>Liên hệ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {providers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.address}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.activity}</td>
                                        <td>{item.contact}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button onClick={() => close()}>Close</button>
                        </div>
                    )
                }
            </Popup>
        </div>
    );
}

