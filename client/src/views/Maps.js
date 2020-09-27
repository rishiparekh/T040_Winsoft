import { Container, Typography } from '@material-ui/core'
import React, {useState} from 'react'
import MainNav from '../components/MainNav'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  TableContainer:{
    marginTop:20,
    marginBottom:20
  },
  heading:{
    margin:20
  }
});


function Maps() {
  const [maps, setmaps] = useState([]);
  const classes = useStyles();
  React.useEffect(() => {
    const collect = async() => {
      const result = await fetch("/api/decryption/history",{
        method:'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await result.json();
      
      console.log(data);
      // let data=[
      //   {decrypted_message:'dfdf issiffifie',desired_location:'Gong skd',date:new Date().toLocaleDateString()},
      //   {decrypted_message:'fgfhghghghgdfdf issiffifie',desired_location:'Gongdgfgfg skd',date:new Date().toLocaleDateString()}
      
      // ]
      setmaps(data.history);
    }
    collect();
  },[])


  return (
    <div>
      <MainNav/>
    
      <Container maxWidth="md">
        <Typography align="center" variant="h5" component="div" className={classes.heading}>
            Previous Executions    
        </Typography>
        <TableContainer component={Paper} className={classes.TableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Decrypted Message</strong></TableCell>
                <TableCell align="right">
                  <strong>
                    Desired Location
                  </strong>
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {maps.map((row,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.decrypted}
                  </TableCell>
                  <TableCell align="right">{row.desired_location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default Maps
