import React,{useState, useEffect} from 'react'
import './App.css'

function Home(){

    const [tokken, setTokken] = useState<string>('');

  
  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setTokken(event.target.value);
  };
  
  const triggerLog=()=>{
    console.log(
      'tokken :', tokken, 'start date:', date.start,'end date:', date.end,'data:', data
    )
  }
  interface Data {
    end_time: string;
    value: number;
  }
  const [data, setData] = useState<Data[]>([]);

  const [selectedValue, setSelectedValue] = useState<string>('impressions');
  const [date, setDate] = useState({
     'start': '',
     'end': ''
  });


  const handleDateStart = (e : React.ChangeEvent<HTMLInputElement>) => {
    setDate({...date,
      'start': e.target.value
  });
};

const handleDateEnd = (e : React.ChangeEvent<HTMLInputElement>) => {
  setDate({...date,
    'end': e.target.value
});
};

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://graph.facebook.com/v15.0/17841401901416928/insights?metric='+selectedValue+'&period=week&since='+date.start+'&until='+date.end+'&access_token='+tokken);
        const data = await res.json();
        setData(data.data[0].values);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [tokken, selectedValue,date]);


  function handleChange(event : React.ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
  }

return (
    <div className='conatainer-main_instagram'>
  

    
   <div>
    <h1>Dashboard for social media </h1>
    <div>
        <input type="password" value={tokken} onChange={handleInputChange} />
        <select value={selectedValue} onChange={handleChange}>
            <option value="impressions">impressions</option>
            <option value="reach">Reach</option>
      </select>
       
       <div>   
            <input type="date"onChange={handleDateStart}/>
            <input type="date"onChange={handleDateEnd}/>
            <p>Selected Date: {date.start}</p>
            <p>Selected Date: {date.end}</p>    
      </div>
      <button onClick={triggerLog}>Test on console Log</button>
  </div>

   <p></p>
   <div> Engagement/impresions --{data ? <>
    {data.map(({ end_time, value }) => (
      <p key={end_time}> Date  <span className='text-color-green '>{end_time.substring(0, end_time.length - 14)}</span> ---- Community Jameel {selectedValue}:  <span className='text-color-blue'>{value}</span> </p>
    ))}
  </>: <h2>tokken expired </h2> }</div>

    <ul>
      <li>Instagram</li>
      <li>Twitter</li>
      <li>Linkedin</li>
      <li>Youtube</li>
    </ul>
   </div>
  </div>
)

}

export default Home