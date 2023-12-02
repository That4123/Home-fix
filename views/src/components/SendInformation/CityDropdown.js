import React, { useState, useEffect } from 'react';
import cityData from './position.json';

const Dropdown = ({ items, onSelect, label }) => {
  if (items === null) {
    return (
      <select disabled>
        <option value="">Loading {label}...</option>
      </select>
    );
  } else {
    return (
      <select
        onChange={(e) => {
          const parsedValue = e.target.value ? JSON.parse(e.target.value) : null;
          onSelect(parsedValue);
        }}
      >
        <option value="">Chọn {label}</option>
        {items.map((item) => (
          <option key={item.code} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
};

const CityDropdown = ({ cities, onSelectCity }) => (
  <Dropdown items={cities} onSelect={onSelectCity} label="Tỉnh" />
);

const DistrictDropdown = ({ districts, onSelectDistrict }) => (
  <Dropdown items={districts} onSelect={onSelectDistrict} label="Quận huyện" />
);

const WardDropdown = ({ wards, onSelectWard }) => (
  <Dropdown items={wards} onSelect={onSelectWard} label="Thị xã" />
);

const PositionForm = ({ onLocationChange }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [street, setStreet] = useState('');

  const handleCityChange = (city) => {
    setSelectedCity(city != null ? city : '');
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district != null ? district : '');
    setSelectedWard(null);
  };

  const handleWardChange = (ward) => {
    setSelectedWard(ward != null ? ward : '');
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  useEffect(() => {
    onLocationChange({
      province: selectedCity,
      district: selectedDistrict,
      town: selectedWard,
      street: street,
    });
  }, [selectedCity, selectedDistrict, selectedWard, street]);

  return (
    <>
      {cityData && <CityDropdown cities={cityData} onSelectCity={handleCityChange} />}
      {selectedCity && (
        <DistrictDropdown districts={selectedCity.districts} onSelectDistrict={handleDistrictChange} />
      )}
      {selectedDistrict && (
        <WardDropdown wards={selectedDistrict.wards} onSelectWard={handleWardChange} />
      )}
      {selectedWard && (
        <>
          <input type="text" placeholder='số nhà, đường' value={street} onChange={handleStreetChange} />
        </>
      )}
    </>
  );
};

export { PositionForm };