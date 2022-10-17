import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './Reserve.scss'

const Reserve = ({ setOpen, hotelId }) => {
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  console.log(data)

  const [selectedRooms, setSelectedRooms] = useState([])
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
  }
  const { dates } = useContext(SearchContext)
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };


  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const navigate = useNavigate()
  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map(roomID => {
        const res = axios.put(`/rooms/availability/${roomID}`, { dates: alldates })
        return res.data
      }))
      setOpen(false);
      navigate("/")
    } catch (error) {

    }


  }
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  console.log(selectedRooms)
  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map(item => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">Title : <b>{item.title}</b></div>
              <div className="rDesc">Description : <b>{item.desc}</b></div>
              <div className="rMax">Max People :<b>{item.maxPeople}</b></div>
              <div className="rPrice">Price : <b>{item.price}</b></div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map(roomNumber => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>Reserve Now !!</button>
      </div>
    </div>
  )
}

export default Reserve