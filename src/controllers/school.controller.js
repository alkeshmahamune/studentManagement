import db from '../config/db.js'
import calculateDistance from '../utils/distanceCalculator.js'

// api for adding the school 
export const addSchool=(req,res)=>{
    // destructoring from req object 
    const {name,address,latitude,longitude} = req.body;

    //validation
    if(!name || !address|| latitude===undefined || longitude===undefined){
        return res.status(400).json({
            success:false,
            message:"All fields are required!"
        })
    }

    if(typeof latitude!=='number' || typeof longitude!=='number'){
        return res.status(400).json({
            success:false,
            message:"Latitude and Longitude must be numbers"
        })
    }

    //query for adding the data
    const query="INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)"

    db.query(
        query,
        [name,address,latitude,longitude],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    error:err.message
                })
            }

            res.status(201).json({
                success:true,
                message:"School added successfully",
                data: result
            })
        }
    )
}

// api for listing the schools 
export const listSchools=(req,res)=>{
    const {latitude,longitude}=req.query;
    if(!latitude || !longitude){
        return res.status(400).json({
            success:false,
            message:"User longitude and latitude required"
        })
    }
    db.query("SELECT * FROM schools",(err,result)=>{
        if(err){
            return res.status(500).json({
                success:false,
                error:err.message
            })
        }
        const userLat=parseFloat(latitude)
        const userLon=parseFloat(longitude)

        const schoolWithDistance=result.map((school)=>{
            const distance=calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            )
            return {
                ...school,
                distance:distance.toFixed(2)+" km"
            }
        })
        schoolWithDistance.sort(
            (a,b)=>parseFloat(a.distance)-parseFloat(b.distance)
        )

        res.status(200).json({
            success:true,
            count:schoolWithDistance.length,
            data:schoolWithDistance
        })
    })
}