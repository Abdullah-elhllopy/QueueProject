  import { useState } from 'react';
  import CanvasJSReact from '../../canvasjs.react';
  import Aux from '../../hoc/Auxiliary'
  var React = require('react');
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const Mue = ()=> {	
    const[Lamda , setLamda] = useState('');
    const[Mue, setMue] = useState('')
                        
    const[showGraph , setShowGraph] = useState(false)
    const[numtime , setTime] = useState('')
    const[number , setNumber] = useState('')
    const[M , setM] = useState(0)    
  
    function fraction(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
  }
  

 
  var ti ;
  if(showGraph == true){
    if(Lamda == Mue){
      ti = 0
    }
    else{
      ti = (M)/(Mue-Lamda)
      ti = Math.floor( Number( ti ))
    }
    
  }
  function findGraph(ti ){
  var arr = [];
  var n ;
  for(let t =0 ;t<ti+8 ;t++ ){
    if(Lamda == Mue){
      n = M
      arr.push({ x: t, y: n })
      continue
    }

    else if(t == ti) {
      n=0;
    }
    else if(t < ti){
      n =  M + Math.floor((t*Lamda)) - Math.floor((t* Mue))
    }
    else if(t >= ti){
      if(Math.floor(t * Lamda) == t * Lamda) {
       n = 1
      }
      else{
        n=0
      }

    }
    arr.push({ x: t, y: n })
  }
  return arr
  }
  var arr = findGraph(ti)

function FindNumOfT(){
 var num = 0;
 var num2 ; 
 if(Lamda == Mue){
    num = M
    return <p>{num}</p>
  }
  else if(numtime == ti){
    num = 0
    return <p>{num}</p>
  } 
  else if(numtime < ti ){
    num =  M + Math.floor((numtime*Lamda)) - Math.floor((numtime* Mue))
    return <p>{num}</p>
  }
  else{
    num = numtime *Lamda 
    if(Math.floor(num) == num) {
      num2 = 1
    }
    else{
      num2 = 0
    }
    return <p>{num2} </p>
  }
}
if(numtime !== ''){
 var num = FindNumOfT();

}

function FindWq(){
 
  var tim = 0;
  if(Lamda == Mue){
    tim =(M - 1) * (1/Mue)
     return <p>{tim} s</p>
  }
  
  else if(number ==0){
    tim = tim =(M - 1) / (2*Mue)
    return <p>{tim} s</p>
  } 
  else if(number <= Math.floor(Lamda *ti) ){
    tim = ((M-1+number)*(1/Mue)) - (number *(1/Lamda))
    return <p>{tim} s</p>
  }
  else{
    tim = 0
    
    return <p>{tim} s</p>
  }
}

if(number !== ''){
 var wq = FindWq();

}
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
            <span className="input-group-text mx-2 bg-info text-light">M</span>
          <input type="text" aria-label="Last name" className="form-control rounded" onChange = {(e)=>setM(Number( e.target.value))}/>
          
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

  export default Mue;
