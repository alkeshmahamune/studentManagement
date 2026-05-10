const calculateDistance=(lat1,lon1,lat2,lon2)=>{
    const toRd= (value)=>(value*Math.PI)/180;

    const R=6371;
    const dLat= toRd(lat2-lat1);
    const dLon=toRd(lon2-lon1);
    
    const area= Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRd(lat1))*Math.cos(toRd(lat2))*Math.sin
    (dLon/2)*Math.sin(dLon/2);

    const c = 2* Math.atan2(Math.sqrt(area),Math.sqrt(1-area));
    
    return R*c;
}

export default calculateDistance;