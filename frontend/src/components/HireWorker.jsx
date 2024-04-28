import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import axios from "axios"
import { Link } from 'react-router-dom';

const HireWorker = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfessionChange = (e) => {
    setSelectedProfession(e.target.value);
  }

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  }

  const fetchWorkers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:7000/api/workers/get/getAllWorkers", {
        params: {
          profession: selectedProfession,
          location: selectedLocation
        }
      });
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, [selectedProfession, selectedLocation]);

  return (
    <div className='mt-20 max-w-[1200px] min-h-[712px] mx-auto py-4 px-3'>
      <div className="container flex flex-col gap-5">
        <div>
          <h1 className='text-5xl text-[#25316D] font-semibold'>Hire A Nav-Naari</h1>
        </div>
        <div>
          <div className='w-full bg-[#25316D] text-white flex items-center justify-around px-3 py-4 rounded-md shadow-lg my-5'>
            <div>
              <select name="profession" value={selectedProfession} onChange={handleProfessionChange} className='bg-transparent outline-none border-2 border-white px-3 py-2 rounded-md w-[250px]'>
                <option value="">Profession</option>
                <option className='text-black' value="cooking">Cooking</option>
                <option className='text-black' value="arts">Arts</option>
                <option className='text-black' value="health">Health and Wellness</option>
                <option className='text-black' value="education">Education and Tutoring</option>
                <option className='text-black' value="lifestyle">Home And LifeStyle</option>
                <option className='text-black' value="consultation">Consultation Services</option>
                <option className='text-black' value="parenting">Child-Care and Parenting</option>
                <option className='text-black' value="fashion">Fashion and Beauty</option>
              </select>
            </div>
            <div>
              <select name="location" value={selectedLocation} onChange={handleLocationChange} className='bg-transparent outline-none border-2 border-white px-3 py-2 rounded-md w-[250px]'>
                <option value="">Location</option>
                <option className='text-black' value="JP Nagar">JP Nagar</option>
                <option className='text-black' value="Banshankari">Banshankari</option>
                <option className='text-black' value="RR Nagar">RR Nagar</option>
                  
              </select>
            </div>
            <button className='bg-white text-[#25316D] w-[250px] py-2 rounded-md text-lg font-semibold shadow-md' onClick={fetchWorkers}>Search</button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div className='flex flex-col gap-4'>
            {searchResults.map(worker => (
              <div key={worker.email} className='text-[#25316D] bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform'>
                <div className='flex gap-4 justify-between'>
                  <CgProfile size={52}/>
                  <div className='flex flex-col'>
                    <h1 className='font-semibold'>{worker.name}</h1>
                    <h1 className='font-semibold'>{worker.email}</h1>
                    <p className='font-semibold'>Location: {worker.location}</p>
                    
                  </div>
                 
                </div>
                <div className='flex items-center gap-2 justify-center'>
                    <div className='flex flex-col'>
                      <h1>Mob: {worker.phoneNumber}</h1>
                      <h1 className="text-transform: uppercase font-bold text">{worker.profession}</h1>
                    </div>
                    <div>
                      <Link to={`/workerhireddashboard/${worker.user}`} className='bg-[#25316D] text-white px-7 py-2 text-xl font-semibold'>View</Link>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HireWorker;
