import React, { useState, useEffect} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 34.2787, lng: 77.6047 }}
  >
    {props.isMarkerShown && <Marker key={7} label="Enemy" position={{ lat: 34.2787, lng: 77.6047 }} />}
    <Marker key={8} label="Desired" position={{ lat: 35.0417, lng: 77.7367 }} />
  </GoogleMap>
))

function Sandbox() {
    useEffect(() => {
        console.log('called')
    }, [])
    return (
        <React.Fragment>
            <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </React.Fragment>
    )
}

export default Sandbox
