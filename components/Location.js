import {useState} from 'react'
import styles from '../styles/Location.module.css'

const Location = ({locations, setSelectedLocations}) => {
  const [searchList, setSearchList] = useState([]);

  const locationList = event => {

    if(event.target.value.length > 3 && locations.length > 0){
      
      let list = locations.filter(loc => {
        return loc.city.toLowerCase().includes(event.target.value.toLowerCase())
      }).slice(0, 10)
      
      setSearchList(list)
    }
  }

  const handleSelect = event => {
    const loc = locations.find(loc => loc.city == event.target.textContent)

    setSelectedLocations(loc)
    setSearchList([])
  }

  return ( <div className={styles.flexColumn}>
    <label htmlFor='location'>Select a Location</label>
    <input className={styles.input} name="location" type="text" onChange={locationList} />
    <div className={styles.locations}>
      {searchList.map(loc => {
        return <button key={loc.city} data={loc.city} onClick={handleSelect}>{loc.city}</button>
      })}
    </div>
  </div> );
}
 
export default Location;