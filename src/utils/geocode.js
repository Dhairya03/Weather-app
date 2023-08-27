
const axios=require('axios')


const geocode=(address,callback)=>{ 
    const url='https://api.openweathermap.org/geo/1.0/direct?q='+address+'&appid=80893f2d3e9c054d3fcd643658249b11'
    //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+ '.json?access_token-pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjolY2pzbml20692MGN2MTQ0cGd3bjVheTFuayJ9.hbZJE6qEZHEsL5QXVF4vtw&limit=1'
    //console.log(url)
    // axios.get({url,json:true},(error,{body})=>{
    //     console.log("body",body)
    //     if(error){
    //         callback('Unable to connect to location services!!',undefined)
    //     }else if(body.length===0){
    //         callback('Unable to find location. Try another search.',undefined)
    //     }else{
    //         callback(undefined,{
    //             latitude : body.lat,
    //             longitude : body.lon,
    //             location : body.state+','+body.country
    //         })
    //     }
    // })
    axios.get(url).then((response)=>{
       // console.log(response.data)
        if(response.data.length){
        const body=response.data[0]
        callback(undefined,{
            latitude : body.lat,
            longitude : body.lon,
            location : body.state+','+body.country
            })
        }else{
            callback('Unable to find location. Try another search.',undefined)
        }
    }).catch((error)=>{
       // console.log(error)
        callback('Unable to connect to location services!!',undefined)
    })
}

module.exports=geocode