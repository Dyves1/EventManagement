import Event from "../Models/event.js";

class eventController {
// Get all events
  static async getAllEvents(req, res) {
    try {
      const events= await Event.find()
      res.status(200).json({
        data:events
        
      });
    } catch (error) {

        return res.status(500).json({
            message: error.message
          });

    }
  };


  static async getUpcomingEvents  (req, res, next)  {
    try {
      
      const currentDate = new Date();
      const upcomingEvents = await Event.find({ date: { $gte: currentDate } }).sort({ date: 1 });
      res.json(upcomingEvents);
    } catch (err) {
      next(err);
    }
  };
  
  static async getMostRecentEvents  (req, res, next)  {
    try {
      const currentDate = new Date();
      const sevenDaysLater = new Date(currentDate);
      sevenDaysLater.setDate(currentDate.getDate() + 7);
  
      const recentEvents = await Event.find({ date: { $gte: currentDate, $lte: sevenDaysLater } }).sort({ date: 1 });
      res.json(recentEvents);
    } catch (err) {
      next(err);
    }
  };
// get one event
  static async getEvent(req, res) {
    try {
      const { id } = req.params; // using ES6
      const event = await Event.findById(req.params.id)
      if (!event) {
        return res.status(404).json({
          message: `Event with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          data: event
        });
      }
    } catch (error) {
        return res.status(500).json({
            message: error.message
          });
    }

  }

// create event



  static async createEvent(req, res) {
    const {title,location,date,tickets,description} =req.body
    if (!title || !location || !date || !tickets ) 
{return res.status(400).json({
  message:" Title, locatioin,date,tickets are all required"})}
  const dublicate = await Event.findOne({title:req.body.title});
  if (dublicate) {
 
     return res.status(400).json({
       message:"the Event is already found"
     })
   }
   else{
    try {
      const { title,location,date,tickets,description } = req.body;
      const newEvent = await Event.create({title, location,date,tickets,description});
             
          return res.status(201).json({
        message: "New Event created successfully",
        data: newEvent,
        ok:true
      })
    }
     catch (error) {
        return res.status(500).json({
            message: error.message
          });
    }
  
  }
  

  }


  static async updateEvent(req, res) {
    try {
      const { id } = req.params; // using ES6

      // body to be update
      const { title, location, date, tickets } = req.body;

      const _id= id
      const eventUpdated = await Event.findByIdAndUpdate(_id, {title,location,date,tickets},{new:true});

      if (!eventUpdated) {
        return res.status(404).json({
          message: `Event with id: ${id} was not found`
        });
      } else {
          
          return res.status(200).json({
          message: "Event updated Successfully",
          data: eventUpdated
        });
      }

    } catch (error) {
        return res.status(500).json({
            message: error.message
          });
    }
  }

//   // delete blog
  static async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      // find blog
      const _id =id
      const eventdeleted = await Event.findByIdAndDelete(_id);
      // condition
      if (eventdeleted === -1) {
        return res.status(404).json({
          message: `Event with id: ${id} was not found`
        });
      } else {
        if (!eventdeleted){
          return res.status(404).json({
            message:"this event is not found"
          })
        }
          return res.status(200).json({
          message: "Event deleted successfully",
          ok:true
        });
      }
    } catch (error) {
        return res.status(500).json({
            message: error.message
          });
    }
  }
}  

export default eventController;