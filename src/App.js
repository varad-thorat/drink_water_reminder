import { useEffect, useState } from 'react';
import './App.css'
import drinkImage from './drink.png';
function App() {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [period,setPeriod] = useState('PM')
  const [reminder, setReminder] = useState(false)
  let ctime;
  const repeatHours = ()=>{
    const options = [];
    let i;
    for(i=1;i<=12;i++){
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return options;
  }

  const repeatMins = ()=>{
    const options = [];
    let i;
    for(i=0;i<=59;i++){
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return options;
  }

  // const handleSelectedOption = (event)=>{
  //   const {name, value} = event.target;

  //   if(name==='hours'){
  //     setHours(value)
  //   }else if(name==='minutes'){
  //     setMinutes(value);
  //   }else if(name==='period'){
  //     setPeriod(value);
  //   }

  // };
  const handleHoursChange = (event) =>{
    setHours(event.target.value);
  }
  const handleMinutesChange = (event) =>{
    setMinutes(event.target.value);
  }
  const handlePeriodChange = (event) =>{
    setPeriod(event.target.value);
  }

  const handleFormSubmit = (event) =>{
    event.preventDefault();

      const reminderTime = new Date();
      const currentTime = new Date();

      const reminderHours = parseInt(hours);
      const reminderMinutes = parseInt(minutes);

      if(period === 'PM' && reminderHours!==12){
        reminderTime.setHours(reminderHours+12);
      }else if(period === 'AM' && reminderHours===12){
        reminderTime.setHours(0);
      }else{
        reminderTime.setHours(reminderHours);
      }
      reminderTime.setMinutes(reminderMinutes);
      reminderTime.setSeconds(0);

      if(reminderTime>currentTime){
        const timeDifference = reminderTime.getTime() - currentTime.getTime();

        setTimeout(()=>{
          setReminder(true)
        }, timeDifference);
      }else{
        alert("Enter time in future")
      }
  }

  const [time,setTime] = useState(ctime);
  useEffect(()=>{
    
      const interval = setInterval(()=>{
        ctime = new Date().toLocaleTimeString();
        setTime(ctime);
      },1000);
      
    return () => clearInterval(interval);
  },[time]);
  return (
    <div>
    <div className='container'>
      <div className='c-top'>
      <div className='top'>
        <p><h1>"Our body consists</h1></p>
        <p><h1>of 80% of water."</h1></p> 
      </div>
      <div className='image'>
      <img src={drinkImage} alt='bro' className='image'></img>
      </div>
      </div>
      <div className='middle'>
        <h2>Schedule</h2>
        <h2>{time}</h2>
        <form onSubmit={handleFormSubmit}>
          <select name='hours' value={hours} onChange={handleHoursChange}>
            <option value=''>Select Hour</option>
            {repeatHours()}
          </select>
          <select name='minutes' value={minutes} onChange={handleMinutesChange}>
            <option value=''>Select Min</option>
            {repeatMins()}
          </select>
          {/* <input type='number' placeholder='Hours' name='hours' value={hours} onChange={handleHoursChange}></input>
          <input type='number' placeholder='Minutes' name='minutes' value={minutes} onChange={handleMinutesChange}></input> */}
          <select name='period' value={period} onChange={handlePeriodChange}>
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          <button value='submit'>Set</button>
        </form>
      </div>
      <div className='bottom'>
        <hr></hr>
      </div>
    </div>  
    <div className='reminder'>
      {reminder && <p>It's time to drink water dear!</p>}
    </div>      
    </div>  
  );
}

export default App;
