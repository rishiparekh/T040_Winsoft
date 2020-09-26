import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MainNav from '../components/MainNav'
import { map } from '../config'
import Positions from './Positions'

const encrypted = "Cnwvtus KuaiTaa rlodeeurethn  an Ia_mrhs baer oag ndC_a aeoat dLj lLdio_me  p  hagZLngan _"

const useStyles = makeStyles(() => ({
  content:{
    marginTop:10,
    
  },
  gmap:{
    marginTop:10,
    marginBottom:10
  },
  heading:{
    fontWeight: 700,
    marginBottom: 10
  }
}))

function Home() {
  const classes = useStyles();
  const [keyVal, setKeyVal] = useState('');
  const [encryptedMess, setencryptedMess] = useState(encrypted);
  const [decrypted, setdecrypted] = useState(null);
  const [enemyLocations, setenemyLocations] = useState(null);
  const [desired_location, setdesired_location] = useState(null);
  const [gmarkers, setgmarkers] = useState(null);
  const [mapData, setmapData] = useState(null)
  

  const decrypt = async() => {
    const postData = JSON.stringify({
      key: keyVal,
      encrypted_message: encryptedMess,
      all_camp_names: Object.keys(map)
    })
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: postData
    };
    const data = await fetch("/api/decryption/",requestOptions)
    const result = await data.json();
    console.log(result);
    setdecrypted(result && result.decrypted_message);
    setenemyLocations(result && result.enemy_camps)
  }

  const getLocation = async() => {
    console.log('iniMap',map);
    // let filterdMap = Object.assign({}, map);
    // enemyLocations.forEach(loc => {
    //   delete filterdMap[loc];
    // })
    // Object.keys(filterdMap).forEach(loc => {
    //   delete filterdMap[loc].coordinates;
    // })
    const postData = JSON.stringify({
      enemies:enemyLocations,
      map
    })
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: postData
    };
    const data = await fetch("/api/map/get-desired-location",requestOptions)
    const result = await data.json();
    console.log(result);
    if(result && result.desired_location) {
      setdesired_location(result.desired_location);
      let markers = [{
        name:result.desired_location,
        coordinates:map[result.desired_location]["coordinates"],
        enemy:false
      }]
      enemyLocations.forEach(loc => {
        markers.push({
          name:loc,
          coordinates:map[loc].coordinates,
          enemy:true,
        })
      })
      console.log(markers);
      setgmarkers(markers);
      //map data from endpoint
      let mapped = mapData.map_details.map;
      Object.keys(mapped).forEach(node => {
        if(enemyLocations.includes(node)) {
          mapped[node].enemy=true;
        } else {
          mapped[node].enemy=false;
        }
      })
      mapped[result.desired_location].desirable = true;
      fillCanvas(mapped);
      console.log('canvas in',mapped);
    }
    
  }

  useEffect(() => {
    const collect = async() => {
      const result = await fetch("/api/map/5f6fbb503de7822a2c26836a",{
        method:"GET",
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data =await result.json();
      console.log(data);
      setmapData(data);
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      
      let mapped = data.map_details.map;
      fillCanvas(mapped);
    }
    collect();
  },[])
  

  const fillCanvas= (canvasmapdata) => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    // context.translate(canvas.width / 10, canvas.height / 4);
    let mapped = canvasmapdata;
    const offset =25;
    Object.keys(mapped).forEach(node => {
      context.beginPath();
      context.arc((mapped[node].coordinates[0]*10)+offset, (mapped[node].coordinates[1]*10)+offset, 10, 0, 2 * Math.PI);
      if(mapped[node].enemy) {
        context.fillStyle = "red";
      } else if(mapped[node].desirable) {
        context.fillStyle = "green";
      } else {
        context.fillStyle = "blue";
      }
      
      context.fill();
      mapped[node].neighbours.map(ng => {
        context.moveTo((mapped[node].coordinates[0]*10)+offset,(mapped[node].coordinates[1]*10)+offset);
        context.lineTo((mapped[ng].coordinates[0]*10)+offset, (mapped[ng].coordinates[1]*10)+offset);
        context.stroke();
      })
      context.stroke();
    })
  }

  return (
    <div>
      <MainNav/>
      <Container maxWidth="md">
        <div className={classes.content}>
          <Typography align="center" variant="h5" component="div" className={classes.heading}>
            Enter Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <TextField 
              id="outlined-basic" 
              label="Enter Key" 
              variant="outlined"
              value={keyVal}
              fullWidth
              onChange={e => setKeyVal(e.target.value)} 
              />
            </Grid>
            <Grid item md={12} xs={12}>
            
              <TextField 
                id="outlined-basic" 
                label="Enter encrypted Message" 
                variant="outlined"
                fullWidth
                multiline
                rows="6"
                value={encryptedMess}
                onChange={e => setencryptedMess(e.target.value)} 
                />
              
            </Grid>
            <Grid item md={12} xs={12} container direction="row" justify="flex-end">
              <Button  
                variant="contained"  
                color="primary"
                onClick={decrypt}
                >
                Decrypt
              </Button>
            </Grid>
            <Grid item md={12} xs={12}>
              {decrypted ? <>
                 <strong>Decrypted Message</strong> : {decrypted}
              </>:null}
            </Grid>
            <Grid item md={12} xs={12}>
              {
                enemyLocations?enemyLocations.length?<>
                <strong>Enemy locations found at :</strong> {enemyLocations.join()}
                <div>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={getLocation}
                  >
                    Get Desirable Position
                  </Button>
                </div>
                </>:'No Enemy Locations Found':null
              }
              
            </Grid>
            <Grid item md={12} xs={12}>
              {desired_location ? <>
                 <strong>Desired Position</strong> : {desired_location}
              </>:null}
            </Grid>
          </Grid>
          <Grid container spacing ={2}>
            <Grid item xs={12} md={12} classname={classes.graph}>
              <div style={{transform: 'scaleY(-1)',textAlign:'center',overflowX:'auto'}}>
                <canvas id="canvas" width="600" height="300" ></canvas>
              </div>
            </Grid>
            <Grid item xs={12} md={12} className={classes.gmap}>
              { gmarkers && 
                <Positions markers={gmarkers}/>
              }
              </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Home
