const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f99de8116c2909f97f1855450b304524&query=' + lat + ',' + long + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is curently ' + body.current.temperature + ' degrees out. It feels like '
            + body.current.feelslike)
        }
    })
}

module.exports = forecast