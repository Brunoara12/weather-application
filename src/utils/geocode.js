const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYnJ1bm9hcmExMiIsImEiOiJjazg5OGMyaDcwNGFqM2xudDJxcGtzc21nIn0.5eyUVKbD8cjUzyQfIrx34A&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to GeoCode service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location for GeoCode!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode