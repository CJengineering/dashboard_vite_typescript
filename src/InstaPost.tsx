import React, { useState } from 'react';

interface Props {}

const InstaPost: React.FC<Props> = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const[data, setData]=useState< []| null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/insta_posts?date_start=${startDate}&date_end=${endDate}&commit=Save+`);
      const data = await response.json();
      setData(data);
      console.log('this is the data',data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate || ''}
        onChange={e => setStartDate(e.target.value)}
      />
      <br />
      <label htmlFor="end-date">End Date: </label>
      <input
        type="date"
        id="end-date"
        value={endDate || ''}
        onChange={e => setEndDate(e.target.value)}
      />
      <br />
      <button type="submit" className='btn-test'>Submit</button>
    </form>
    <div className='table-container'>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Likes count</th>
          <th>Comments count</th>
          <th>Date</th>
          <th>Media type</th>
        </tr>
      </thead>
      <tbody>
        {data ? data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.like_count}</td>
            <td>{item.comments_count}</td>
            <td>{item.timestamp}</td>
            <td>{item.media_type}</td>
          </tr>
        )) : <><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></> }
      </tbody>
    </table>
    </div>
    </>
  );
};

export default InstaPost;
