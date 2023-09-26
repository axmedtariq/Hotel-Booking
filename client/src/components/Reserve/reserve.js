import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"; // Correct the icon name
import './reserve.css';
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const Reserve = ({setOpen, hotelId}) => {
	const [selectedRooms, setSelectedRooms] = useState([])
	const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
	const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());
  let list = [];

  while (date <= end) {
    list.push(new Date(date).getTime()); // Push the date object
    date.setDate(date.getDate() + 1);
  }

  return list;
};


 const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (item, roomNumber) => {
    const isUnAvailable = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isUnAvailable;
  };



	const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };



  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const results = await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/room/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      console.log("Results:", results);
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
	 return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.RoomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(item,roomNumber)}
                  />
                </div> 
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;