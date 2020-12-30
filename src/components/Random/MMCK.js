import { useState } from 'react';

  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
 
  const MMCK = ()=> {	
    const[Lamda , setLamda] = useState('');
    
    const[Mue, setMue] = useState('')
                        
    const[showGraph , setShowGraph] = useState(false)
    
    const[K , setK] = useState('')
    
    const[c , setc] = useState('')
    
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }
  
  

  let L , Lq , W , Wq , r , Pn , P0 , rho , LamdaDash ,rhoPowK ;
   




  if(Lamda !== '' && Mue !== '' && c !== ''){
   
    r = Lamda / Mue;
    rho = r / c;
    rhoPowK = Math.pow(rho, K);
    
    function fact(n) {
        if(n == 0) {
            return 1
        } else {
            return n * fact(n - 1);
        }
    } 
    

      function Pnot (){
        let sum = 0;
            if(c !== r){
                sum = 1.0 - Math.pow(rho,( K + 1.0 - c));
                sum *= Math.pow(r, c);
                sum /= parseFloat(fact(c) * (1.0 - rho));
            }else{
                sum = K + 1.0 - c;
                sum *= Math.pow(r, c);
                sum /= fact(c);
            }
            for(let i=0; i<c; i++){
                let numerator = Math.pow(r, i);
                let denominator = fact(i);
                sum += numerator / denominator;
            }
        return 1.0 / sum;
  }
 P0 = Pnot();
    function calcpn(n){
        let numerator, denominator;
        numerator = Math.pow(Lamda, n);
        
        if(n < c){
            denominator = fact(n) * Math.pow(Mue, n);

        }
        else{
            denominator = Math.pow(c, (n - c)) * fact(c) * Math.pow(Mue, n);
        }
        return P0 * (numerator / denominator);
    }
    Pn = Number(calcpn(K).toFixed(2))
   
    function calcLambda_dash() {
        return Lamda * (1 - calcpn(K));
    }  
    LamdaDash =  calcLambda_dash(); 
 


   
  
  
  
   function calclq(){
        let ans = Math.pow(rho, K-c) * (K + 1.0 - c) * (1.0 - rho);
        ans += Math.pow(rho, K + 1.0 - c);
        ans = 1.0 - ans;
        ans *= P0 * rho * Math.pow(r, c);
        ans /= ((1.0 - rho) * (1.0 - rho)) * fact(c);
        return (ans);
   }   
    Lq = Number(calclq().toFixed(2));
    function calcL(){
        let sum = 0;
        for(let i=0; i<c; i++){
            let numerator = (c - i) * Math.pow(r, i);
            let denominator = fact(i);
            sum += numerator / denominator;
        }
        return Math.round(Lq + c - P0 * sum);
    }
    L = Number(calcL().toFixed(2));
    function calcW(){
        return ( L / LamdaDash );
    }
    W = Number(calcW().toFixed(2));
    function calcWq(){
        return Lq / LamdaDash;
    }
    Wq = Number(calcWq().toFixed(2));
   }
  

    return (
      <Aux>
      <div className="input-group my-4 container">
          <span className="input-group-text mx-2 bg-info text-light" >λ</span>
          <input type="text" aria-label="First name" className="form-control rounded" onChange = {(e)=>setLamda(Number( fraction( e.target.value)))}/>
        
          <span className="input-group-text mx-2 bg-info text-light">μ</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setMue(Number( fraction( e.target.value)))}/>
          
          <span className="input-group-text mx-2 bg-info text-light">K </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setK(Number( fraction( e.target.value)))}/>

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
            <li className="list-group-item list-group-item-primary">P of number {K} = <strong>{Pn}</strong></li>
            
            

        </ul>
        }
      
      
      </Aux>
      );
    
  }

  export default MMCK;
