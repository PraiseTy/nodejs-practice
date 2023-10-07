const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhaXNldHR0IiwiYSI6ImNsbWlvcWtvMzBmZngzcG5ycGU5NGRlNncifQ.ky6MaL-2diDxbbg01_IihA'

    request({url, json: true}, (error, { body }) =>{
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1].toFixed(4),
                longitude: body.features[0].center[0].toFixed(4),
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode