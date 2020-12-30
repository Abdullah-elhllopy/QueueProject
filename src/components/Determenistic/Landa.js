  import { useState } from 'react';
  import CanvasJSReact from '../../canvasjs.react';
  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const Landa = ()=> {	
    const[Lamda , setLamda] = useState('');
    const[Mue, setMue] = useState('')
    const[time , settime] = useState('')                    
    const[showGraph , setShowGraph] = useState(false)
    const[numtime , setTime] = useState('')
    const[number , setNumber] = useState('')
    
  
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }


  var k = Number( time)+1
  var ti = 0
  ti = ((k *Lamda) - Mue)/ (Lamda *(Lamda-Mue))
  ti = Math.floor( Number( ti ))

  function findfristTi(ti,time){
  var fristTi = ti-time;
  var x = 0
    for(let i = 0 ; i < 7 ; i++){
      x = Math.floor( Lamda*fristTi ) - Math.floor((fristTi*Mue) - (Mue/Lamda))
      if(x!==time+1) break;
      else{ 
      
      fristTi = fristTi - time
  }}

  return fristTi
  } 
  
  if(time !== ''){
   var fristTi = findfristTi(ti,time);
  }
  function findGraph(fristTi ,time){
  var arr = [];
  var n ;
  for(let t =0 ;t<fristTi+2 ;t++ ){
    if(t< 1/Lamda) {
      n=0;
    }
    else if(t > 1/Lamda && t <= fristTi){
      n =  Math.floor( Lamda*t ) - Math.floor((t*Mue) - (Mue/Lamda))
    }
    else if(t >= fristTi){
      n= Number( time )-1 
      arr.push({ x: t, y: n })
      n= Number( time )-2 
      arr.push({ x: t, y: n })
      continue;
      
    }
    arr.push({ x: t, y: n })
  }
  return arr
  }
  var arr = findGraph(fristTi,time)

  function financial(x) {
  return Number.parseFloat(x).toFixed(1);
}

function FindNumOfT(){
 var num = 0;
  if(numtime < (1/Lamda)){
    num = 0
    return <p>{num}</p>
  } 
  else if(numtime > (1/Lamda) && numtime <= fristTi ){
    num = Math.floor( Lamda*numtime ) - Math.floor((numtime*Mue) - (Mue/Lamda))
    return <p>{num}</p>
  }
  else{
    num = time-1
    return <p>{num} or {num-1}</p>
  }
}

 



var num = FindNumOfT();
function FindWq(){
 var tim2 = 0
  var tim = 0;
  if(number ==0){
    tim = 0
    return <p>{tim}</p>
  } 
  else if(number <= (Lamda * fristTi) ){
    tim = Math.floor( (1/Mue) -(1/Lamda) )* (number-1)
    return <p>{tim}</p>
  }
  else{
    tim = Math.floor( (1/Mue) -(1/Lamda) )* (number-2)
    tim2 = Math.floor( (1/Mue) -(1/Lamda) )* (number-3)
    return <p>{tim} or {tim2}</p>
  }
}
var wq = FindWq()




  const options = {
        title: {
          text: "Graph of determenistic"
        },
        data: [{				
                  type: "stepArea",
                  dataPoints:  arr
        }]
    }
    

   

    return (
      <Aux>
      <div className="input-group my-4 container">
          <span className="input-group-text mx-2 bg-info text-light" >λ</span>
          <input type="text" aria-label="First name" className="form-control rounded" onChange = {(e)=>setLamda( fraction( e.target.value))}/>
        
          <span className="input-group-text mx-2 bg-info text-light">μ</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setMue(fraction( e.target.value))}/>
        
          <span className="input-group-text mx-2 bg-info text-light ">K-1</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>settime(fraction( e.target.value))}/>
          <span className="input-group-text mx-2 bg-info text-light">Time For n(t)</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setTime(fraction( e.target.value))}/>
          <span className="input-group-text mx-2 bg-info text-light">Number For wq(n) </span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setNumber(fraction( e.target.value))}/>
          
      </div>
      
      
    
        <div className ="">
            <button className="btn btn-info btn-lg " onClick = {()=>setShowGraph(true)}>Calculate</button>     
        </div> 
       {showGraph &&
        <ul className="list-group my-3">
           
            <li className="list-group-item list-group-item-primary ">n{numtime}  = <strong>{num}</strong> </li>
            <li className="list-group-item list-group-item-primary">wq{number} = <strong>{wq}</strong></li>
           

        </ul>
        }
      {showGraph&&
      <div>
      
       <CanvasJSChart options = {options} 
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
  }
      </Aux>
      );
    
  }

  export default Landa;
