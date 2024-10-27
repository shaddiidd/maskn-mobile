const Property = require("../models/properties")

const createProperty = (property, user_id) =>{
   
    const {
        propertyNationalNumber,
        description,
        title,
        address,
        location,
        area,        
        isFurnished,
        floorNum,
        bedroomNum,
        bathroomNum,
        propertyAge,
        waterMeterSubscriptionNumber,
        electricityrMeterReferanceNumber,
        price,
        rentalPeriod,
        MarkAsRented,
    } = property

    const newProperty = Property.create({
        propertyNationalNumber,
        user_id,
        description,
        title,
        address,
        location,
        area,        
        isFurnished,
        floorNum,
        bedroomNum,
        bathroomNum,
        propertyAge,
        waterMeterSubscriptionNumber,
        electricityrMeterReferanceNumber,
        price,
        rentalPeriod,
        MarkAsRented,
    })

    return newProperty

}

module.exports = {createProperty}