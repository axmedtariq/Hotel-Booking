import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";


export const CreateHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const UpdateHotel = async (req, res) => {
  try {
    const UpdatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UpdatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const DeleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetSingleHotel = async (req, res) => {
  try {
    const Hotels = await Hotel.findById(req.params.id);
    res.status(200).json(Hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const GetAllHotel = async(req, res, next) => {
  const { min, max, ...others } = req.query
  

  try{
    const Hotels = await Hotel.find({...others, cheapestPrice: { $gt: min | 1, $lt: max || 999},
  }).limit(req.query.limit);
    res.status(200).json(Hotels);
  }catch(err) {
    next();
    
  }
}


export const CountHotelsByCity = async(req, res, next) => {

  const cities = req.query.cities.split(",");
  

  try{
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list);
  }catch(err) {
    res.status(500).json(err);
  }

}



export const countByType = async(req, res, next) => {
  try {
  const hotelCount = await Hotel.countDocuments({type: "Hotel"});
  const apartmentCount = await Hotel.countDocuments({type: "apartment"});
  const resortCount = await Hotel.countDocuments({type: "resort"});
  const villaCount = await Hotel.countDocuments({type: "villa"});
  const cabinCount = await Hotel.countDocuments({type: "cabin"});

    res.status(200).json([
      {type:"hotel", count: hotelCount},
      {type:"apartments", count: apartmentCount},
      {type:"resorts", count: resortCount},
      {type:"villas", count: villaCount},
      {type:"cabins", count: cabinCount},
    ]);
  }catch(err) {
    next();
  }

}



export const getHotelRooms = async (req, res, next) => {
  try{
    const hotel = await Hotel.findById(req.params.id);
    const List = await Promise.all(
      hotel.Room.map((room) => {
        return Room.findById(room);
      })
      );
    res.status(200).json(List);
  }catch (err) {
    next(err)
  }
}