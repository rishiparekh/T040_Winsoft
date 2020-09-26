import { Container } from '@material-ui/core'
import React, {useState} from 'react'
import MainNav from '../components/MainNav'

function Maps() {
  const [maps, setmaps] = useState([]);
  const [mapData, setmapData] = useState(null);
  React.useEffect(() => {
    const collect = async() => {
      const result = await fetch("/api/maps",{
        method:'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await result.json();
      setmaps(data);
    }
    collect();
  },[])

  const newMap = async() => {

  }
  return (
    <div>
      <MainNav/>
      <Container maxWidth="md">

      </Container>
    </div>
  )
}

export default Maps
