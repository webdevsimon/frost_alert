import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AlertSetup from '../components/AlertSetup'
import Location from '../components/Location'
import { useEffect, useState } from 'react'

interface Location {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
};

export default function Home() {
  const baseUrl = 'http://localhost:3000'
  const [locations, setLocations] = useState([]);
  const [forecast, setForecast] = useState(null)
  const [selectedLocations, setSelectedLocations] = useState<null|Location>(null);

  useEffect(() => {
    fetch(`${baseUrl}/data/gb.json`)
    .then(res => res.json())
    .then(data => {
      setLocations(data)
      // setSelectedLocations(data.find(loc => loc.city == 'Telford'))
    })
    .catch(e => setLocations([]))

  }, [])
  useEffect(() => {

    if(selectedLocations){
      const {lat, lng} : Location = selectedLocations

      // fetch(`${baseUrl}/data/stormglass.json?lat=${lat}&lng=${lng}`)
      fetch(`${baseUrl}/data/stormglass.json`) // static file
      .then(res => res.json())
      .then(data => setForecast(data))
      .catch(e => setForecast(null))

    }
  }, [selectedLocations])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Front Alert</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          APP_NAME
        </h1>
        <p className={styles.description}>
          Setup a Frost Alert notication
        </p>        

        <div className={styles.grid}>
          <Location locations={locations} setSelectedLocations={setSelectedLocations} />
          {selectedLocations && <AlertSetup location={selectedLocations} forecast={forecast} />} 
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
