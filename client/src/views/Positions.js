import React, { useState, useEffect} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={
      props.gmarkers?props.gmarkers[0]?{lat:props.gmarkers[0].coordinates[0],lng:props.gmarkers[0].coordinates[1]}:{}:{}
    }
  >
    {/* {props.isMarkerShown && <Marker key={7} label="Enemy" position={{ lat: 34.2787, lng: 77.6047 }} />}
    <Marker key={8} label="Desired" position={{ lat: 35.0417, lng: 77.7367 }} /> */}
    {
      props.gmarkers.map(marker => {
        return <Marker
          key={marker.name}
          label={marker.enemy?'Enemy':'Desired Location'}
          position={{lat:marker.coordinates[0],lng:marker.coordinates[1]}}
        />
      })
    }
  </GoogleMap>
))

function Positions(props) {
    useEffect(() => {
        console.log('called gmap')
    }, [])
    return (
        <React.Fragment>
            <MyMapComponent
              gmarkers={props.markers}
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        </React.Fragment>
    )
}

export default Positions
