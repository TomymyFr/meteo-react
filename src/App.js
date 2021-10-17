import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar }  from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  saut: {
      marginTop: 10 + 'px',
      marginBottom: 10 + 'px',
  },
}));

const api = {
  key: "KEY",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState({});
  
  function getData() {
    if (query !== '') {

      fetch(`${api.base}weather?q=${query},fr&units=metric&APPID=${api.key}&lang=fr`)
        .then(res => res.json())
          .then(res => {
            setResponse(res);
            setQuery('');
            console.log(res);
            console.log(window.location.search.substr(1));   
      });
    }
  };
  function deleteData() {
    setQuery('');
  }


 //Converti le format Unix en h:min
 function convertUnixtoHuman(string) {
  let unix_timestamp = string;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var hours_CET = hours + 1;
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours_CET + 'h' + minutes.substr(-2);

  return formattedTime;
  }

  //Met la première lettre du mot en majuscule
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  var Country;

  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static">
          <Toolbar>
          <Typography variant="h6">
          <i className="fas fa-cloud-sun"></i> Météo de la ville
          </Typography>
          </Toolbar>
        </AppBar>
      <main>
      <Card>
            <CardContent>
            <form noValidate autoComplete="off">
                <FormControl variant="filled">
                <TextField id="standard-basic" label="Ville" value={query} onChange={e => setQuery(e.target.value)}/>
                </FormControl>
                <div style={{margintop: '10px', marginBottom: '10px'}}></div>
                <FormControl variant="filled" style={{width:'200px'}}>
                <InputLabel>Pays (bientot)</InputLabel>
                <Select value={Country} disabled={true}>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                    <MenuItem>C</MenuItem>
                </Select>
                </FormControl>
                <div style={{margintop: '10px', marginBottom: '10px'}}></div>
                <Button variant="contained" color="primary" style={{textTransform: "capitalize", marginRight: '5px'}} onClick={getData} startIcon={<SearchIcon />}>Rechercher</Button>
                <Button variant="contained" color="secondary" style={{textTransform: "capitalize"}} onClick={deleteData} startIcon={<HighlightOffIcon />}>Supprimer</Button>
            </form>
            </CardContent>
            </Card>
      <div style={{margintop: '10px', marginBottom: '10px'}}></div>
      {(typeof response.main != "undefined") ? (
        <Card>
          <CardContent style={{margin: '8px'}}>
              <List id="resultat" style={{padding: "8px"}}>
                  <ListItemText id="city">Ville : {response.name}</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="temps">Temps : {capitalizeFirstLetter(response.weather[0].description)}</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="temperature">Température : {response.main.temp} °C</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="pression">Pression : {response.main.pressure} Hpa</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="wind_speed">Puissance du vent : {response.wind.speed} km/h</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="wind_direction">Direction du vent : {response.wind.deg} °</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="sunrise">Heure de lever du soleil (Heure CET) : {convertUnixtoHuman(response.sys.sunrise)}</ListItemText>
                  <Divider className={classes.saut}/>
                  <ListItemText id="sunset">Heure de coucher du soleil (Heure CET) : {convertUnixtoHuman(response.sys.sunset)}</ListItemText>
              </List>
          </CardContent>
        </Card>
      ) : ('')}
      </main>
    </div>
  );
}

export default App;
