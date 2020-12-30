import { useState } from 'react';

  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
 
  const MM1K = ()=> {	
    const[Lamda , setLamda] = useState('');
    const[Mue, setMue] = useState('')
                        
    const[showGraph , setShowGraph] = useState(false)
    
    const[number , setNumber] = useState('')
      
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }
  
  let R , LamdaDash , Pk ;

  R = Number((Lamda/Mue).toFixed(2));
  
  if(R === 1 ){
      Pk = Number((1/(number+1)).toFixed(2));
  }
  else{
      Pk = Number((Math.pow(R,number) *( ((1-R)/(1-Math.pow(R,(number+1)))))).toFixed(2));
  }
  LamdaDash = Number( (Lamda * (1-Pk)).toFixed(2))
 
  let L , W , Lq , Wq ;
   if(Lamda !==''&& Mue !=='' && number !==''){
    if(R === 1){
      L = number/2
   
     }
    else{
       L = Number(R * ((1- ((number+1)*(Math.pow(R,number)) + (number*Math.pow(R ,(number+1))) )) / ((1-R)*(1- Math.pow(R, number+1)) )).toFixed(2)) ;
       
    }
    W =  Number((L/LamdaDash).toFixed(2))
    
    Wq = Number((W- (1/Mue)).toFixed(2) )
    
    Lq = Number((LamdaDash * Wq).toFixed(1))
}
    return (
      <Aux>
      <div className="input-group my-4 container">
          <span className="input-group-text mx-2 bg-info text-light" >λ</span>
          <input type="text" aria-label="First name" className="form-control rounded" onChange = {(e)=>setLamda(Number( fraction( e.target.value)))}/>
        
          <span className="input-group-text mx-2 bg-info text-light">μ</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setMue(Number( fraction( e.target.value)))}/>
          
          <span className="input-group-text mx-2 bg-info text-light">K </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setNumber(Number( fraction( e.target.value)))}/>
          
      </div>
      
        <div className ="">
            <button className="btn btn-info btn-lg " onClick = {()=>setShowGraph(true)}>Calculate</button>     
        </div> 
        {showGraph &&
        <ul className="list-group mt-3">
           
            <li className="list-group-item list-group-item-primary">Averge number of customer for system (L) = <strong>{L}</strong> </li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (Lq) = <strong>{Lq}</strong></li>
            <li className="list-group-item list-group-item-primary">Averge wait of customer for system (W) = <strong>{W} S</strong></li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (Wq) = <strong>{Wq} S</strong></li>
  
        </ul>
        }
      </Aux>
      );
    
  }

  export default MM1K;
