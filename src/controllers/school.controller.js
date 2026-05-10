import db from '../config/db.js'
import calculateDistance from '../utils/distanceCalculator.js'

// api for adding the school 
export const addSchool = async (req, res) => {
    try {
        // destructoring from req object 
        const { name, address, latitude, longitude } = req.body;

        //validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude must be numbers"
            })
        }

        //query for adding the data
        const query = "INSERT INTO Schools (name,address,latitude,longitude) VALUES (?,?,?,?)"

        const [result] = await db.query(query, [name, address, latitude, longitude])

        res.status(201).json({
            success: true,
            message: "School added successfully",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// api for listing the Schools 
export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "User longitude and latitude required"
            })
        }

        const [result] = await db.query("SELECT * FROM Schools")

        const userLat = parseFloat(latitude)
        const userLon = parseFloat(longitude)

        const schoolWithDistance = result.map((school) => {
            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            )
            return {
                ...school,
                distance: distance.toFixed(2) + " km"
            }
        })

        schoolWithDistance.sort(
            (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
        )

        res.status(200).json({
            success: true,
            count: schoolWithDistance.length,
            data: schoolWithDistance
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}