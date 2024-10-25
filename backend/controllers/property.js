const pool = require("../models/db")

const addProperty = (req,res) =>{
    const userId = req.token.userId
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
        MarkAsRented
    } = req.body

    const query = `INSERT INTO properties (
    user_id,
    property_national_number,
    description,
    title,
    address,
    location,
    area,
    is_furnished,
    floor_num,
    bedroom_num,
    bathroom_num,
    property_age,
    water_meter_subscription_number,
    electricity_meter_reference_number,
    price,
    rental_period,
    mark_as_rented) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17);`

    const placeholder = [
        userId,
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
        MarkAsRented
    ]

    pool
    .query(query,placeholder)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "listed successfully",
          result: result.rows[0],
        });
      })
    .catch((err)=>{
        res.status(500).json({
            success : false,
            message : 'property cant be listed',
            err : err  
        })
        console.log(err);
    })
}


const getAllProperties = (req,res) =>{
    const query = `SELECT * FROM properties`
    
    pool
    .query(query)
    .then((result)=>{
        res.status(200).json({
            success: true,
            message : "All properties ",
            result : result.rows
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success : false,
            message : 'failed to load properties',
            err : err  
        })
        console.log(err);
        
    })
}

module.exports = { addProperty, getAllProperties };