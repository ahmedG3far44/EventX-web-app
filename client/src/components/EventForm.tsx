import React, { useState } from "react";
import { Plus, Shuffle, MapPin, Tag, Ticket } from "lucide-react";
import { useEvents } from "@/contexts/EventsProvider";

export interface TicketType {
  name: string;
  type: "VIP" | "GENERAL";
  price: number;
}

export interface Address {
  city: string;
  state: string;
  zipCode: string;
  street: string;
}

export interface Venue {
  name: string;
  capacity: number;
  address: Address;
}

export interface EventFormData {
  name: string;
  description: string;
  emoji: string;
  category: string;
  tags: string[];
  datetime: string;
  organizer: string;
  popularity: string;
  ticketTypes: TicketType;
  venue: Venue;
}

interface FormErrors {
  [key: string]: string;
}

const EventForm: React.FC = () => {
  const { createEvent } = useEvents();
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    emoji: "🎉",
    category: "",
    tags: [],
    datetime: "",
    organizer: "",
    popularity: "",
    ticketTypes: { name: "", type: "GENERAL", price: 0 },
    venue: {
      name: "",
      capacity: 0,
      address: {
        city: "",
        state: "",
        zipCode: "",
        street: "",
      },
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    "Music & Arts",
    "Sports",
    "Technology",
    "Business",
    "Food & Drink",
    "Education",
    "Health & Wellness",
    "Entertainment",
    "E-Sports",
  ];

  const popularityOptions = [
    "Low Popularity",
    "Medium Popularity",
    "High Popularity",
    "Very High Popularity",
  ];

  const states = [
    "Alexandria",
    "Cairo",
    "Giza",
    "Sharjah",
    "Dubai",
    "Abu Dhabi",
  ];

  const cities = {
    Alexandria: ["AL-Mandara", "Sidi Gaber", "Stanley", "Gleem"],
    Cairo: ["Downtown", "Maadi", "Zamalek", "Heliopolis"],
    Sharjah: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
    Dubai: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
    AbuDhabi: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
  };

  const emojis = [
    "🎉",
    "🎵",
    "🎨",
    "🏀",
    "⚽",
    "🎸",
    "🎭",
    "🎪",
    "🎯",
    "🎲",
    "🎮",
    "🏆",
    "🌟",
    "💫",
    "🔥",
    "⭐",
    "🎊",
    "🎈",
  ];

  const generateRandomEmoji = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setFormData((prev) => ({ ...prev, emoji: randomEmoji }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic validation
    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.datetime) newErrors.datetime = "Date and time is required";
    if (!formData.organizer.trim())
      newErrors.organizer = "Organizer is required";
    if (!formData.popularity) newErrors.popularity = "Popularity is required";

    // Venue validation
    if (!formData.venue.name.trim())
      newErrors["venue.name"] = "Venue name is required";
    if (formData.venue.capacity <= 0)
      newErrors["venue.capacity"] = "Capacity must be greater than 0";
    if (!formData.venue.address.street.trim())
      newErrors["venue.address.street"] = "Street address is required";
    if (!formData.venue.address.city)
      newErrors["venue.address.city"] = "City is required";
    if (!formData.venue.address.state)
      newErrors["venue.address.state"] = "State is required";
    if (!formData.venue.address.zipCode.trim())
      newErrors["venue.address.zipCode"] = "ZIP code is required";

    if (!formData.ticketTypes.name.trim())
      newErrors["ticketTypes.name"] = "Ticket name is required";
    if (formData.ticketTypes.price <= 0)
      newErrors["ticketTypes.price"] = "Price must be greater than 0";

    if (formData.tags.length === 0)
      newErrors.tags = "At least one tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitSuccess(false);

      if (validateForm()) {
        // Create the properly formatted data object
        const eventData = {
          name: formData.name,
          description: formData.description,
          emoji: formData.emoji,
          category: formData.category,
          tags: formData.tags,
          datetime: formData.datetime,
          organizer: formData.organizer,
          popularity: formData.popularity,
          ticketTypes: formData.ticketTypes,
          venue: formData.venue,
        };
        console.log(formData);
        await createEvent(eventData);

        console.log("Event Data:", JSON.stringify(eventData, null, 2));
        setSubmitSuccess(true);

        // Reset form after successful submission
        setFormData({
          name: "",
          description: "",
          emoji: "🎉",
          category: "",
          tags: [],
          datetime: "",
          organizer: "",
          popularity: "",
          ticketTypes: { name: "", type: "GENERAL", price: 0 },
          venue: {
            name: "",
            capacity: 0,
            address: {
              city: "",
              state: "",
              zipCode: "",
              street: "",
            },
          },
        });
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTicketType = (
    field: keyof TicketType,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: { ...prev.ticketTypes, [field]: value },
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const getAvailableCities = () => {
    const selectedState = formData.venue.address.state || "Alexandria";
    const citiesList = Object.entries(cities).filter(
      ([Key]) => Key.toLocaleLowerCase() === selectedState.toLocaleLowerCase()
    );
    return citiesList[0][1] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Event
            </h1>
            <p className="text-gray-600">
              Fill in the details to create a new event
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Event created successfully!
              </p>
              <pre className="mt-2 text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter event name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emoji
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.emoji}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            emoji: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="🎉"
                      />
                      <button
                        type="button"
                        onClick={generateRandomEmoji}
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <Shuffle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? "border-red-300" : "border-gray-300"
                    }`}
                    rows={3}
                    placeholder="Describe your event"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.category ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popularity
                    </label>
                    <select
                      value={formData.popularity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          popularity: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.popularity ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select popularity</option>
                      {popularityOptions.map((pop) => (
                        <option key={pop} value={pop}>
                          {pop}
                        </option>
                      ))}
                    </select>
                    {errors.popularity && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.popularity}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.datetime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          datetime: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.datetime ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.datetime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.datetime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organizer
                    </label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          organizer: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.organizer ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter organizer name"
                    />
                    {errors.organizer && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.organizer}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                  )}
                </div>
              </div>

              {/* Venue Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Venue Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      value={formData.venue.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          venue: { ...prev.venue, name: e.target.value },
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors["venue.name"]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter venue name"
                    />
                    {errors["venue.name"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["venue.name"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={formData.venue.capacity || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          venue: {
                            ...prev.venue,
                            capacity: parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors["venue.capacity"]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter capacity"
                    />
                    {errors["venue.capacity"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["venue.capacity"]}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.venue.address.street}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        venue: {
                          ...prev.venue,
                          address: {
                            ...prev.venue.address,
                            street: e.target.value,
                          },
                        },
                      }))
                    }
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors["venue.address.street"]
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter street address"
                  />
                  {errors["venue.address.street"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["venue.address.street"]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Region
                    </label>
                    <select
                      value={formData.venue.address.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          venue: {
                            ...prev.venue,
                            address: {
                              ...prev.venue.address,
                              state: e.target.value,
                              city: "",
                            },
                          },
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors["venue.address.state"]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select state/region</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors["venue.address.state"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["venue.address.state"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      value={formData.venue.address.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          venue: {
                            ...prev.venue,
                            address: {
                              ...prev.venue.address,
                              city: e.target.value,
                            },
                          },
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors["venue.address.city"]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      disabled={!formData.venue.address.state}
                    >
                      <option value="">Select city</option>
                      {getAvailableCities().map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors["venue.address.city"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["venue.address.city"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.venue.address.zipCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          venue: {
                            ...prev.venue,
                            address: {
                              ...prev.venue.address,
                              zipCode: e.target.value,
                            },
                          },
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors["venue.address.zipCode"]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter ZIP code"
                    />
                    {errors["venue.address.zipCode"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["venue.address.zipCode"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Ticket Information
                </h2>

                <div className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Name
                      </label>
                      <input
                        type="text"
                        value={formData.ticketTypes.name}
                        onChange={(e) =>
                          updateTicketType("name", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors["ticketTypes.name"]
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter ticket name"
                      />
                      {errors["ticketTypes.name"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["ticketTypes.name"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={formData.ticketTypes.type}
                        onChange={(e) =>
                          updateTicketType("type", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="GENERAL">General</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={formData.ticketTypes.price || ""}
                        onChange={(e) =>
                          updateTicketType(
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors["ticketTypes.price"]
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                      />
                      {errors["ticketTypes.price"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["ticketTypes.price"]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
