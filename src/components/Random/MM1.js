import { useState } from 'react';

  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
 
  const MM1 = ()=> {	
    const[Lamda , setLamda] = useState('');
    const[Mue, setMue] = useState('')
                        
    const[showGraph , setShowGraph] = useState(false)
    
    const[number , setNumber] = useState('')
     
  
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }
  
  let L , W , Lq , Wq , Pn;
  if(Lamda !==''&& Mue !==''){
      L = Math.round((Lamda)/(Mue-Lamda));
      W = Number((1 / (Mue-Lamda) ).toFixed(2));
      Lq = Number(((Lamda * Lamda)/ (Mue*(Mue-Lamda))).toFixed(0));
      Wq = Number(((Lamda)/(Mue* (Mue-Lamda)) ).toFixed(2)); 
    }
  if(Lamda !==''&& Mue !=='' && number !==''){
      Pn = ((( Math.pow((Lamda / Mue) ,number)) *(1-(Lamda/Mue)))*100).toFixed(0)
      
    }
    
    return (
      <Aux>
      <div className="input-group my-4 container">
          <span className="input-group-text mx-2 bg-info text-light" >λ</span>
          <input type="text" aria-label="First name" className="form-control rounded" onChange = {(e)=>setLamda( fraction( e.target.value))}/>
        
          <span className="input-group-text mx-2 bg-info text-light">μ</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setMue(fraction( e.target.value))}/>
          
          <span className="input-group-text mx-2 bg-info text-light">Number For Pn </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setNumber(fraction( e.target.value))}/>
          
      </div>
      
        <div className ="">
            <button className="btn btn-info btn-lg " onClick = {()=>setShowGraph(true)}>Calculate</button>     
        </div> 
        {showGraph &&
        <ul className="list-group mt-3">
           
            <li className="list-group-item list-group-item-primary">Averge number of customer for system (L) = <strong>{L}</strong> </li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (Lq) = <strong>{Lq}</strong></li>
            <li className="list-group-item list-group-item-primary">Averge wait of customer for system (W) = <strong>{W} S</strong></li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (wq) = <strong>{Wq} S</strong></li>
            <li className="list-group-item list-group-item-primary"> P{number} = <strong>{Pn} %</strong> </li>
    
        </ul>
        }
      
      
      </Aux>
      );
    
  }

  export default MM1;
