const params = 'windSpeed,airTemperature,cloudCover';

export default function stormglass(req, res) {
  const {lat, lng} = req.query

  if(lat == undefined || lng == undefined){
    return res.status(402).json({error: 'missing lat and lng'})
  }

  fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
    headers: {
      'Authorization': process.env.STORMGLASS_API_TOKEN
    }
  }).then((response) => {
    res.status(200).json(response.body)
  }).catch(e => {
    res.status(502).json({ error: error.message })
  })
}