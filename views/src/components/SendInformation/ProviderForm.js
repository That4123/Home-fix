import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import axios from "axios";

export const ProviderForm= ({ formData, onProviderChange })=> {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [sortOption, setSortOption] = useState("");

    const handleFindClick = (e) => {
        e.preventDefault();
        axios.post("/api/sendInformation/getProviders")
        .then((res) => {
            setProviders(res.data.providers);
        })
        .catch((err) => {
            console.log(err);
        });
        console.log("Find button clicked");
        setModalIsOpen(true);
    };

    const closeSearchResultsModal = () => {
        setModalIsOpen(false);
    };

    const chooseProvider = () => {
        onProviderChange({
            target: {
                name: "provider",
                value: selectedProvider,
            },
        });
        setModalIsOpen(false);
    }

    return (
        <div className="informationForm-group providerForm">
            <label>Nhà sửa chữa </label>
            <input className="providerName" disabled
            id="provider"
            type="text"
            name="provider"
            value={formData.provider}
            onChange={onProviderChange}
            placeholder="Nhà sửa chữa"
            />
            
            <button
                className="provider-search-button"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handleFindClick}
            >
                Tìm kiếm
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeSearchResultsModal}
                contentLabel="Search Results"
            >
                <div>
                    <h3 className="text-center my-4">Nhà cung cấp dịch vụ</h3>
                    <div className="row justify-content-center m-4">
                        <div className="col-sm-2 p-1">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Search by</option>
                                <option value="1">Tên</option>
                                <option value="2">Vị trí</option>
                                <option value="3">Hoạt động</option>
                            </select>
                        </div>
                        <div className="col-sm-2 p-2">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa" />
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary" style={{backgroundColor: "black", color: "white", borderColor: "black"}}>Search</button>
                        </div>
                        <div className="col-sm-2 p-1">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Sort</option>
                                <option value="1">Vị trí</option>
                                <option value="2">Đánh giá</option>
                                <option value="3">Hoạt động</option>
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary" style={{backgroundColor: "black", color: "white", borderColor: "black"}}>Sort</button>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên nhà sửa chữa</th>
                            <th>Loại sửa chữa</th>
                            <th>Địa chỉ</th>
                            <th>Đánh giá</th>
                            <th>Liên hệ</th>
                            <th>Chọn</th>   
                        </tr>
                        </thead>
                        <tbody>
                        {providers.map((item, index) => (
                            <tr key={index}>
                                <td>{item.provider_id}</td>
                                <td>{item.name}</td>
                                <td>{item.repair_type}</td>
                                <td>{item.street + ' ' + item.town + ' ' + item.district + ' ' + item.province}</td>
                                <td>{item.rate}</td>
                                <td>{item.phone_number}</td>
                                <td>
                                    <input type="radio" name="provider" onChange={() => setSelectedProvider(item)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button className="btn btn-danger m-3" onClick={closeSearchResultsModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={chooseProvider}>
                        Xác nhận
                    </button>
                </div>
            </Modal>

        </div>
    );
}
