import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MM1 from './MM1'
import MM1K from './MM1K'
import MMC from './MMC'
import MMCK from './MMCK'


const randmain = () => (
   <Router>
   
   <div className = "d-flex mt-3 container  " >
     <span className = "  fst-normal display-6 text-light  "style ={{marginLeft : 140}} ><strong> Select Type of Random :</strong></span>
           <div > 
            <div>

            <Link to='/mm1' className = "btn  text-light" style = {{width :300,height :50 ,fontSize :25 ,marginLeft:50}}><strong >M/M/1</strong> </Link>

            <Link to='/mm1k' className = "btn  text-light" style = {{width :300,height :50 ,fontSize :25 ,marginLeft:30}}><strong>M/M/1/K </strong> </Link>
            </div>
      
            <div>
            <Link to='/mmc' className = "btn  text-light" style = {{width :300,height :50 ,fontSize :25 ,marginLeft:50}}><strong>M/M/C</strong> </Link>

            <Link to='/mmck' className = "btn  text-light" style = {{width :300,height :50 ,fontSize :25 ,marginLeft:30}}><strong>M/M/C/K </strong> </Link>
            </div>
     </div>
     </div> 
 
     
    <Switch>
        <Route exact path='/mm1'>
          <MM1/>
        </Route>
        <Route path='/mm1k'>
          <MM1K />
        </Route>
        <Route path='/mmc'>
          <MMC />
        </Route>
        <Route path='/mmck'>
          <MMCK />
        </Route>
        
      </Switch>
    </Router>
  );



export default randmain;