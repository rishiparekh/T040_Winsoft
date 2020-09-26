import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MainNav from '../components/MainNav'

const encrypted = "Cnwvtus KuaiTaa rlodeeurethn  an Ia_mrhs baer oag ndC_a aeoat dLj lLdio_me  p  hagZLngan _"

const map = {
  "Khardung La": {
      coordinates: [0, 10],
      enemy: true,
      neighbours: ["Lachulung La", "Gyong La"]
  },
  "Lachulung La": {
      coordinates: [10, 20],
      enemy: false,
      neighbours: ["Lachulung La", "Sia La"]
  },
  "Sasser Pass": {
      coordinates: [10, 10],
      enemy: false,
      neighbours: ["Khardung La", "Sia La", "Zoji La"]
  },
  "Gyong La": {
      coordinates: [10, 0],
      enemy: false,
      neighbours: ["Khardung La", "Zoji La", "Indira Col"]
  },
  "Sia La": {
      coordinates: [20, 20],
      enemy: false,
      neighbours: ["Sasser Pass", "Rezang La"]
  },
  "Zoji La": {
      coordinates: [20, 10],
      enemy: true,
      neighbours: ["Sasser Pass", "Gyong La"]
  },
  "Indira Col": {
      coordinates: [20, 0],
      enemy: true,
      neighbours: ["Gyong La", "Rezang La"]
  },
  "Rezang La": {
      coordinates: [30, 10],
      enemy: false,
      neighbours: ["Sia La", "Indira Col", "Tanglang La", "Pensi La"]
  },
  "Tanglang La": {
      coordinates: [40, 20],
      enemy: true,
      neighbours: ["Tanglang La", "Marsimik La"]
  },
  "Pensi La": {
      coordinates: [40, 0],
      enemy: false,
      neighbours: ["Rezang La", "Marsimik La"]
  },
  "Marsimik La": {
      coordinates: [50, 10],
      enemy: false,
      neighbours: ["Tanglang La", "Pensi La"]
  }
}

const useStyles = makeStyles(() => ({
  content:{
    marginTop:10,
    
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
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Home
