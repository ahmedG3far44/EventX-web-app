import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft } from "lucide-react";

interface TicketType {
  name: string;
  price: number;
  available: number;
}

interface EventData {
  title: string;
  description: string;
  category: string;
  venue: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    capacity: number;
  };
  dateTime: string;
  emoji: string;
  ticketType: TicketType;
  status: string;
  tags: string[];
}

const EventForm = () => {
  const categories = [
    "Music",
    "Sports",
    "Arts & Culture",
    "Food & Drink",
    "Technology",
    "Business",
    "Health & Wellness",
    "Education",
    "Entertainment",
    "Fashion",
    "Travel",
    "Community",
  ];

  const eventEmojis = [
    "🎵",
    "🎤",
    "🎸",
    "🎹",
    "🎺",
    "🎷",
    "🥁",
    "🎻",
    "🎪",
    "🎭",
    "🎨",
    "🎬",
    "📚",
    "🏆",
    "🎯",
    "🎮",
    "🎲",
    "🎳",
    "🎊",
    "🎉",
    "🎈",
    "🎂",
    "🍕",
    "🍔",
    "🍰",
    "☕",
    "🍷",
    "🥂",
    "🎓",
    "💻",
    "🚀",
    "⭐",
    "🌟",
    "💫",
    "🎆",
    "🎇",
    "🔥",
    "💎",
    "🎁",
    "🏅",
  ];

  const getRandomEmoji = () => {
    return eventEmojis[Math.floor(Math.random() * eventEmojis.length)];
  };

  const [event, setEvent] = useState<EventData>({
    title: "",
    description: "",
    category: "",
    venue: {
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      capacity: 0,
    },
    dateTime: "",
    emoji: "",
    ticketType: { name: "General Admission", price: 0, available: 0 },
    status: "draft",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string | number) => {
    if (field.includes(".")) {
      const fields = field.split(".");
      if (fields[0] === "venue" && fields[1] === "address") {
        setEvent((prev) => ({
          ...prev,
          venue: {
            ...prev.venue,
            address: {
              ...prev.venue.address,
              [fields[2]]: value,
            },
          },
        }));
      } else if (fields[0] === "venue") {
        setEvent((prev) => ({
          ...prev,
          venue: {
            ...prev.venue,
            [fields[1]]: value,
          },
        }));
      }
    } else {
      setEvent((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTicketTypeChange = (field: string, value: string | number) => {
    setEvent((prev) => ({
      ...prev,
      ticketType: {
        ...prev.ticketType,
        [field]:
          field === "price" || field === "available" ? Number(value) : value,
      },
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !event.tags.includes(newTag.trim())) {
      setEvent((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEvent((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate random emoji and convert dateTime to ISO string
    const formattedEvent = {
      ...event,
      emoji: getRandomEmoji(),
      dateTime: new Date(event.dateTime).toISOString(),
    };


    console.log("Event Data:", JSON.stringify(formattedEvent, null, 2));
  };

  return (
    <div className="mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle className="text-2xl font-bold">
              Create New Event
            </CardTitle>
            <div></div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={event.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={event.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={event.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter event description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <div>
                    <Label htmlFor="dateTime">Date & Time</Label>
                    <Input
                      id="dateTime"
                      type="datetime-local"
                      value={event.dateTime}
                      onChange={(e) =>
                        handleInputChange("dateTime", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Event Status</Label>
                  <Select
                    value={event.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Venue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="venueName">Venue Name</Label>
                    <Input
                      id="venueName"
                      value={event.venue.name}
                      onChange={(e) =>
                        handleInputChange("venue.name", e.target.value)
                      }
                      placeholder="Venue name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={event.venue.capacity}
                      onChange={(e) =>
                        handleInputChange(
                          "venue.capacity",
                          Number(e.target.value)
                        )
                      }
                      placeholder="Venue capacity"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={event.venue.address.street}
                    onChange={(e) =>
                      handleInputChange("venue.address.street", e.target.value)
                    }
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={event.venue.address.city}
                      onChange={(e) =>
                        handleInputChange("venue.address.city", e.target.value)
                      }
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={event.venue.address.state}
                      onChange={(e) =>
                        handleInputChange("venue.address.state", e.target.value)
                      }
                      placeholder="State"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={event.venue.address.zipCode}
                      onChange={(e) =>
                        handleInputChange(
                          "venue.address.zipCode",
                          e.target.value
                        )
                      }
                      placeholder="Zip code"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="ticketName">Ticket Name</Label>
                    <Input
                      id="ticketName"
                      value={event.ticketType.name}
                      onChange={(e) =>
                        handleTicketTypeChange("name", e.target.value)
                      }
                      placeholder="e.g., General Admission"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ticketPrice">Price ($)</Label>
                    <Input
                      id="ticketPrice"
                      type="number"
                      step="0.01"
                      value={event.ticketType.price}
                      onChange={(e) =>
                        handleTicketTypeChange("price", e.target.value)
                      }
                      placeholder="99.99"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ticketAvailable">Available Tickets</Label>
                    <Input
                      id="ticketAvailable"
                      type="number"
                      value={event.ticketType.available}
                      onChange={(e) =>
                        handleTicketTypeChange("available", e.target.value)
                      }
                      placeholder="100"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">{event.emoji || "🎉"}</div>
                  <p className="text-sm text-gray-500 mb-2">
                    Event Emoji Preview
                  </p>
                  <p className="text-xs text-gray-400">
                    A random emoji will be assigned when the event is created
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      setEvent((prev) => ({ ...prev, emoji: getRandomEmoji() }))
                    }
                  >
                    Preview Random Emoji
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventForm;
