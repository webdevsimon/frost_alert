import styles from '../styles/Location.module.css'
import dayjs from 'dayjs'
import {useRef, useState} from 'react'

const AlertSetup = ({location, forecast}) => {
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState(null);

  const time = useRef(null)

  const frost = ({airTemperature, cloudCover, windSpeed}) => {

    if(airTemperature.dwd < 5.0 && cloudCover < 11.0 && windSpeed < 10.0){
      return true
    }

    return false
  }

  const handleSet = () => {

    if(time.current.value == '') {
      setError("Missing time")
    } else {
      setError(null)
      const [ hour, _mins ] = time.current.value.split(':').map(d =>  parseInt(d) )

      const lastThreeHours = Array.from([0, 1, 2], (x) => { return hour - x });

      const dataSet = forecast.hours.filter(hourForecast => {
        const dateTime = dayjs(hourForecast.time, 'yyyy-mm-ddthh:mm:ss+00:00')

        return lastThreeHours.includes(dateTime.hour()) && dateTime.date() == 6
      })

      const frostForecast = dataSet.map(data => frost(data))

      console.log(frostForecast)

      if(frostForecast[0] == true){
        setAlert("Likely to be frost at this time!")
      }
      setAlert("No Frost!")
    }
  }

  return (
    <div className={styles.flexColumn}>
      <h2>{location.city}</h2>

      <div className={styles.error}>{error}</div>

      <label>Select a time</label>
      <input ref={time} type="time" />
      <button type="button" onClick={handleSet}>set</button>

      {alert && <div className={styles.alert}>{alert}</div>}
    </div> 
  );
}
 
export default AlertSetup;