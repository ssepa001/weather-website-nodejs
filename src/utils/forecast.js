const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0614ff1a2c3a1ed487fa4131d32737ac/' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temp = body.currently.temperature;
            const rain = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;
            const data = summary + ' It is curently ' + temp + ' degrees out. There is a ' + rain*100 + '% chance of rain.' +
                'Today\'s high is ' + body.daily.data[0].temperatureHigh + ' and the low is ' + body.daily.data[0].temperatureLow + 
                ' degrees. Humidity is at ' + body.currently.humidity*100 + '%.'

            callback(undefined, data)
        }
    })
}

module.exports = forecast