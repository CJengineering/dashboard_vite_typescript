import React,{useState, useEffect} from 'react'



function Test(tokken :any){
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
   
    <div>
      <h2>This part is for live streaming from Facebook </h2>
      <h3 className='text-color-red'>Under construnction </h3>
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
  </div>

   <p></p>
   <div> Engagement/impresions --{data ? <>
    
      <table>
      <thead>
        <tr>
          <th>Date </th>
          <th>{selectedValue}</th>
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

export default Test