import React,{useState, useEffect} from 'react'
import './App.css'
import InstaPost from './InstaPost';
import Test from './Test'

function Home(){

    const [tokken, setTokken] = useState<string>('');
    const [hello, setHello]= useState<string>('')
    const short_live_token ='EAAmNvp7ZCK7kBADfZA31HMnCvsF5u7sEZCAevylnwVZBc69inQdXOipFCakRxTfq0DAxZAiimGsqcl1jcSLASVquTwQ5G8HNFmZBZBe3kny3fTMf3CaQr11CcauR5eIHZBWkc8xN1tT0z6ezrWWhpkCW5KimgTwVO041EuxaE3HQSqV4pfclvPFKCZA4VzK1DE2kZD'
    const long_life_fb_token ='EAAmNvp7ZCK7kBAFm1xECKSxZAkuEVY0N9kJdhii6DfkbrhmFHY52MHxQNFKL1UPbNFQh96RwaZBXUNdWfOj5HTvUuwQVZBUtUllEgZBeJaShC1BZBJ8MBRXm6I0yetVM1p0MrI9N3bcpvXtuZB5hfYVqVgw0oytzsKFQx8Cm2OkxwZDZD'
    async function fetchRails() {
      try {
        const res = await fetch('http://localhost:3000');
        const data = await res.json();
        setHello(data.hello);
      } catch (err) {
        console.error('this is the:', err);
      }
    }
  
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



  async function fetchData() {
    try {
      const res = await fetch('https://graph.facebook.com/v15.0/17841401901416928/insights?metric='+selectedValue+'&period=week&since='+date.start+'&until='+date.end+'&access_token='+long_life_fb_token);
      
      const data = await res.json();
      setData(data.data[0].values);
    } catch (err) {
      console.error(err);
    }
  }


  function handleChange(event : React.ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
  }

return (
    <div className='conatainer-main_instagram'>
  

    
   <div>
    <h1>Dashboard for social media </h1>
       
     
       <section className=' flex section-container-xl '>
    <div >
     
      <h6 className='text-color-green'>Soon all metrics will be available only account's reach and impressions  </h6>
        {/* <input type="password" value={tokken} onChange={handleInputChange} /> */}
     
       <div className='container'> 
            <div className='row'>
              <div className='col-sm'>
              <label>Metric</label>
              <select value={selectedValue} onChange={handleChange}>
              <option value="impressions">impressions</option>
              <option value="reach">Reach</option>
             </select>
              </div>
            <div className='col-sm'>
              <label  >Since:</label>  
              <input type="date"onChange={handleDateStart}/>
            </div>
            <div className='col-sm'>
              <label>Until:</label> 
              <input type="date"onChange={handleDateEnd}/>
            </div>
              <div className='col-sm'>
                <p >Since: {date.start}</p>
                <p>Until: {date.end}</p> 
              </div>
            </div>
          <button className='btn-test' onClick={()=>fetchData()}>Fetch data from Facebook</button>
       </div>
      {/*<button onClick={triggerLog} className='btn-test'>Test on console Log</button>*/}
    </div>
   <div> {data ? <>
    
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">Date </th>
          <th scope="col">{selectedValue}</th>
        </tr>
      </thead>
      <tbody>
      {data.map(({ end_time, value }) => (
        <tr key={end_time}>
        <td>{end_time.substring(0, end_time.length - 14)}</td>
        <td>{value}</td>
        </tr>
            ))}
      </tbody>
    </table>

  </>: <h2>tokken expired </h2> }</div>
            
              </section>

 
   </div>
   <section>
        <p>In order to retrieve data per post choose a date from 12-2014 to 12-2022</p>
        <div>
          <InstaPost />
        </div>
       </section>
  </div>
)

}

export default Home