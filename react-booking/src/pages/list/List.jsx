import './List.scss'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/SearchItem/SearchItem'
import useFetch from '../../hooks/useFetch'


const List = () => {
  const [openDate, setOpenDate] = useState(false)
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [options, setOptions] = useState(location.state.options)
  const [date, setDate] = useState(location.state.dates)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const { data, loading, error, reFetch } = useFetch(`hotels?city=${destination}&min=${min || 0}&max${max || 999}`)
  const handleClick = () => {
    reFetch();
   }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="ListContainer">
        <div className="ListWrapper">
          <div className="ListSearch">
            <h1 className='lsTitle'>Search</h1>
            <div className="lsItem">
              <label>Destination </label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)} >
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')} `}
              </span>
              {openDate ? <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                ranges={date}
              /> : ""}
            </div>
            <div className="lsItem">
              <label>Options </label>
              <div className='lsOptions'>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" className='lsOptionInput' onChange={e=>setMin(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input type="number" className='lsOptionInput'  onChange={e=>setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children </span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="ListResult">
            {loading ? <h5>loading...</h5> :
              <>{data.map(item => (<SearchItem item={item} key={item._id}/>))}

              </>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default List