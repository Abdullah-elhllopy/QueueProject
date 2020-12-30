import { useState } from 'react';

  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
 
  const MMC = ()=> {	
    const[Lamda , setLamda] = useState('');
    
    const[Mue, setMue] = useState('')
                        
    const[showGraph , setShowGraph] = useState(false)
    
    const[number , setNumber] = useState('')
    
    const[c , setc] = useState('')
    
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }
  
  let L , Lq , W , Wq , r , Pn , P0 ;
   r = Lamda / Mue;
  
  if(Lamda !== '' && Mue !== '' && c !== ''){

  function fact(n) {
    if(n == 0) {
        return 1
    } else {
        return n * fact(n - 1);
    }
    } 
  function Pnot (){
    let sum = 0 ;
    if(c > r){
        for (let i = 0; i < c; i++) {
                sum += (Math.pow(r, i) / fact(i));
            }
        sum += (c * Math.pow(r, c) ) / (fact(c) * (c - r));
    }
    else {
            for (let i = 0; i < c; i++) {
                sum += (1 / fact(i)) * Math.pow(r, i) ;
            }
            sum+= (1 / fact(c)) * Math.pow(r, c) * ((c * Mue) /( (c * Mue) - Lamda));
    }
    return  1.0 / sum  ;
  }
   P0 = Pnot();
   console.log(P0)
   function calclq(){
        let numerator = Math.pow(r, c + 1) / c;
        let denominator = fact(c) * Math.pow((1 - r / c), 2);
        return (numerator / denominator) * P0;
   }   
    
    if(number !== ''){

    function calcpn(n){
            let numerator;
            let denominator;
            numerator = Math.pow(Lamda, n);
            if (n >= 0 && n < c) {
                denominator = fact(n) * Math.pow(Mue, n);
            } 
            else {
                denominator = Math.pow(c, n - c) * fact(c) * Math.pow(Mue, n);
            }

            return (numerator / denominator) * P0;
    }
    Pn = Number(calcpn(number).toFixed(2))

   }
    Lq = Number(calclq().toFixed(2));
   
    L =  Number((Lq + r).toFixed(2));
    Wq =  Number((Lq / Lamda).toFixed(2));
    W = Number((Wq + (1 / Mue)).toFixed(2));
   }
  

    return (
      <Aux>
      <div className="input-group my-4 container">
          <span className="input-group-text mx-2 bg-info text-light" >λ</span>
          <input type="text" aria-label="First name" className="form-control rounded" onChange = {(e)=>setLamda(Number( fraction( e.target.value)))}/>
        
          <span className="input-group-text mx-2 bg-info text-light">μ</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setMue(Number( fraction( e.target.value)))}/>
          
          <span className="input-group-text mx-2 bg-info text-light">number for P(n) </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setNumber(Number( fraction( e.target.value)))}/>

          <span className="input-group-text mx-2 bg-info text-light">c </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setc(Number( fraction( e.target.value)))}/>
          
      </div>
      
        <div className ="">
            <button className="btn btn-info btn-lg " onClick = {()=>setShowGraph(true)}>Calculate</button>     
        </div> 
        {showGraph &&
        <ul className="list-group mt-3">
           
            <li className="list-group-item list-group-item-primary">Averge number of customer for system (L) = <strong>{L}</strong> </li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (Lq) = <strong>{Lq}</strong></li>
            <li className="list-group-item list-group-item-primary">Averge wait of customer for system (W) = <strong>{W}</strong></li>
            <li className="list-group-item list-group-item-primary">Averge number of customer for queue (L) = <strong>{Wq}</strong></li>
            <li className="list-group-item list-group-item-primary">P of number {number} = <strong>{Pn}</strong></li>
            
            

        </ul>
        }
      
      
      </Aux>
      );
    
  }

  export default MMC;
