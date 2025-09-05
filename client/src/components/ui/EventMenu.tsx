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
  
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>

      
      {isMenuOpen && (
        <>
        
          <div className="fixed inset-0 z-10" onClick={handleClose} />

      
          <div className="absolute right-0 top-8 z-20 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            
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

            
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>

            
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
