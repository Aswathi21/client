import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [data,setData] = useState('');
  const [page, setPage] = useState(1);
  
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: new Headers({ 'Content-type': 'application/json'})
    }
    fetch(`http://localhost:5000/${page}`,options).then(response => response.json()).then(data => setData(data));  
  },[page]) 

  const handleScroll = async() => {
     if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
        setPage((prev) => prev + 1);
      } 
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <h1>Orkes UI</h1>
      {data && data.map((item,key) => <div key={key} className='main-container'>
        <div className='indivitual-container'>
        <a href={item.path}>
          <img className="image" src={item.field_photo_image_section} alt={item.title}/>
        </a>
        <span className='title'>{item.title}</span>
        </div>
      </div>)} 
    </div>
  );
}

export default App;
