class ServiceOrderDTO {
    constructor({
      orderId,
      itemType,
      specificItem,
      textDescription,
      imageDescription,
      province,
      district,
      town,
      street,
      timeRange,
      status,
      customerId,
      providerId,
    }) {
      this.orderId = orderId;
      this.itemType = itemType;
      this.specificItem = specificItem;
      this.textDescription = textDescription;
      this.imageDescription = imageDescription;
      this.province = province;
      this.district = district;
      this.town = town;
      this.street = street;
      this.timeRange = timeRange;
      this.status = status;
      this.customerId = customerId;
      this.providerId = providerId;
    }
  }
  
  export default ServiceOrderDTO;