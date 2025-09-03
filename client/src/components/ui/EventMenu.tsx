import React, { useState } from "react";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  X,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";
import type { EventType } from "@/lib/types";
import { useEvents } from "@/contexts/EventsProvider";

// interface Event {
//   id: string;
//   title: string;
//   venue: string;
//   date: string;
//   time: string;
//   price: string;
//   trending: number;
//   attendees: number;
//   status?: 'pending' | 'canceled' | 'closed' | 'active';
// }

interface EventMenuProps {
  event: EventType;
  onStatusUpdate: (
    eventId: string,
    status: "pending" | "canceled" | "closed"
  ) => void;
  onDelete: (eventId: string) => void;
}

const EventMenu: React.FC<EventMenuProps> = ({
  event,
  onStatusUpdate,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const { getEventsList } = useEvents();

  const statusOptions = [
    {
      label: "Pending",
      value: "pending" as const,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "hover:bg-yellow-50",
    },
    {
      label: "Canceled",
      value: "canceled" as const,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "hover:bg-red-50",
    },
    {
      label: "Closed",
      value: "closed" as const,
      icon: CheckCircle,
      color: "text-gray-600",
      bgColor: "hover:bg-gray-50",
    },
  ];

  const handleStatusUpdate = (status: "pending" | "canceled" | "closed") => {
    onStatusUpdate(event?._id as string, status);
    setIsMenuOpen(false);
    setIsStatusMenuOpen(false);
    getEventsList();
  };

  const handleDelete = () => {
    onDelete(event?._id as string);
    setIsMenuOpen(false);
    getEventsList();
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    setIsStatusMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>

      {/* Main Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={handleClose} />

          {/* Menu Content */}
          <div className="absolute right-0 top-8 z-20 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {/* Update Option with Submenu */}
            <div
              className="relative"
              onMouseEnter={() => setIsStatusMenuOpen(true)}
              onMouseLeave={() => setIsStatusMenuOpen(false)}
            >
              <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  <span>Update</span>
                </div>
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Status Submenu */}
              {isStatusMenuOpen && (
                <div className="absolute left-full top-0 ml-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {statusOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleStatusUpdate(option.value)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${option.bgColor} ${option.color}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delete Option */}
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>

            {/* Close Option */}
            <button
              onClick={handleClose}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Close</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventMenu;

// Demo Component showing the EventMenu in use
// const EventCard: React.FC = () => {
//   const [event, setEvent] = useState<Event>({
//     id: '1',
//     title: 'Hamlet - The Classic Play',
//     venue: 'Hamlet - The Classic Play',
//     date: '05/10/2025',
//     time: '3:43:00 pm',
//     price: '26 EGP',
//     trending: 4,
//     attendees: 36,
//     status: 'active'
//   });

//   const handleStatusUpdate = async (eventId: string, status: 'pending' | 'canceled' | 'closed') => {
//     try {
//       // API call to update event status
//       const response = await fetch(`/api/events/${eventId}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (response.ok) {
//         setEvent(prev => ({ ...prev, status }));
//         console.log(`Event ${eventId} status updated to ${status}`);
//       } else {
//         console.error('Failed to update event status');
//       }
//     } catch (error) {
//       console.error('Error updating event status:', error);
//     }
//   };

//   const handleDelete = async (eventId: string) => {
//     try {
//       const response = await fetch(`/api/events/${eventId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         console.log(`Event ${eventId} deleted`);
//         // Handle event deletion (e.g., remove from list, redirect, etc.)
//       } else {
//         console.error('Failed to delete event');
//       }
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     }
//   };

//   const getStatusBadge = (status?: string) => {
//     switch (status) {
//       case 'pending':
//         return (
//           <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
//             <Clock className="h-3 w-3" />
//             Pending
//           </div>
//         );
//       case 'canceled':
//         return (
//           <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
//             <XCircle className="h-3 w-3" />
//             Canceled
//           </div>
//         );
//       case 'closed':
//         return (
//           <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
//             <CheckCircle className="h-3 w-3" />
//             Closed
//           </div>
//         );
//       default:
//         return (
//           <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
//             <CheckCircle className="h-3 w-3" />
//             Active
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <span className="text-lg">🏆</span>
//             <h3 className="font-semibold text-gray-900">{event.title}</h3>
//           </div>
//           <EventMenu
//             event={event}
//             onStatusUpdate={handleStatusUpdate}
//             onDelete={handleDelete}
//           />
//         </div>

//         <div className="space-y-2 text-sm text-gray-600 mb-4">
//           <div className="flex items-center gap-2">
//             <span>📍</span>
//             <span>Venue: {event.venue}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span>📅</span>
//             <span>Date: {event.date}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span>⏰</span>
//             <span>Time: {event.time}</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <span className="font-semibold text-green-600">{event.price}</span>
//             <div className="flex items-center gap-1 text-red-500">
//               <span>📈</span>
//               <span>{event.trending}</span>
//             </div>
//             <div className="flex items-center gap-1 text-purple-500">
//               <span>👥</span>
//               <span>{event.attendees}</span>
//             </div>
//           </div>
//           {getStatusBadge(event.status)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
