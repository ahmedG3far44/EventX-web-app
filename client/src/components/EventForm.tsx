import { useState } from "react";
import Input from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const EventForm = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    venue: "",
    time: "",
    description: "",
    ticketPrice: "",
    popularity: "",
    availableSeats: 0,
    amountSeats: 0,
  });

  function handleChangeInput(prev: React.ChangeEvent<HTMLInputElement>) {
    if (prev) {
      setEvent({ ...event, [prev.target.name]: prev.target.value });
    }

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(event);
  }
  return (
    <Card className="w-3/4 m-auto p-8">
      <div className="flex items-center justify-center ">
        <Button className="mr-auto">back</Button>
        <h2 className="text-3xl font-bold text-center">Event Details</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start items-center gap-4 w-full">
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="eventTitle"
            name="title"
            type="text"
            placeholder="enter event title"
          />
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="date"
            name="date"
            type="date"
            placeholder="event date"
          />
        </div>

        <div className="flex justify-start items-center gap-4 w-full">
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="venue"
            name="venue"
            type="text"
            placeholder="venue address"
          />

          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="time"
            name="time"
            type="datetime-local"
            placeholder="select event time"
          />
        </div>

        <div className="w-full">
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="description"
            name="description"
            type="text"
            placeholder="enter event description"
          />
        </div>
        <div className="w-full flex justify-start gap-4 items-center">
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="ticketPrice"
            name="ticketPrice"
            type="number"
            placeholder="enter ticket price"
          />
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="availableSeats"
            name="availableSeats"
            type="number"
            placeholder="available event seats"
          />
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="amountSeats"
            name="amountSeats"
            type="number"
            placeholder="enter Seat Amount"
          />
          <Input
            disabled={false}
            onChangeFunc={handleChangeInput}
            id="popularity"
            name="popularity"
            type="text"
            placeholder="High popularity"
          />
        </div>
        <div className="flex items-center my-8 gap-8">
          <div>
            <div className="w-[800px] h-[400px] rounded-2xl border border-dashed bg-zinc-50">
              {}
            </div>
          </div>

          <div>
            <div className="w-[400px] h-[400px] rounded-2xl border border-dashed bg-zinc-50">
              qrCode
            </div>
          </div>
        </div>

        <div>
          <Button className="w-full" type="submit">Add Event</Button>
        </div>
      </form>
    </Card>
  );
};

export default EventForm;



// {
//   "title": "Summer Music Festival 2024",
//   "description": "The biggest music festival of the year featuring top artists from around the world. Three days of non-stop music, food, and fun!",
//   "category": "67b2c3d4e5f6789012345678", 
//   "venue": {
//     "name": "City Park Amphitheater",
//     "address": {
//       "street": "100 Music Lane",
//       "city": "Los Angeles",
//       "state": "CA",
//       "zipCode": "90001"
//     },
//     "capacity": 20000
//   },
//   "dateTime": "2024-07-15T18:00:00.000Z",
//   "organizer": "67a1b2c3d4e5f67890123456",
//   "image": "summer-festival-2024.jpg",
//   "ticketTypes": [
//     {
//       "name": "General Admission",
//       "price": 99.99,
//       "quantity": 15000,
//       "available": 15000
//     },
//     {
//       "name": "VIP Experience",
//       "price": 249.99,
//       "quantity": 2000,
//       "available": 2000
//     },
//     {
//       "name": "Platinum VIP",
//       "price": 499.99,
//       "quantity": 500,
//       "available": 500
//     }
//   ],
//   "status": "published",
//   "tags": ["music", "festival", "summer", "live"]
// }