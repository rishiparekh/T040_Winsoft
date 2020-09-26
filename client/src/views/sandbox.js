import React, { useState, useEffect}   from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <Marker position={{ lat: 34.2787, lng: 77.6047 }} />
  </GoogleMap>
))

function Sandbox() {
    useEffect(() => {
        console.log('called')
    }, [])
    return (
        <div>
            jojojojdf
            <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default Sandbox
