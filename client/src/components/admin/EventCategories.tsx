import React, { useState, useEffect } from "react";
import { Plus, Tag, Trash2, Shuffle } from "lucide-react";
import { env } from "configs/env";
import { useAuth } from "@/contexts/AuthProvider";

interface Category {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

const BASE_URL = env.BASE_URL;

const categoryEmojis = [
  "🏠", "🍕", "🚗", "🎬", "💰", "🛒", "⚕️", "📚", "🎵", "🏃",
  "💻", "🎨", "🧳", "💡", "🔧", "🎯", "📱", "🌟", "🎪", "🏆",
  "📝", "🎮", "☕", "🌍", "📊", "🎭", "🏖️", "💼", "🍰", "🎸",
  "🏊", "📷", "🛏️", "🌸", "🔥", "❤️", "✨", "🌈", "🎉", "📖",
  "🍎", "🌞", "🌙", "⭐", "🎢", "🎡", "🎠",
];

const EventCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuth();
  const [formData, setFormData] = useState({ name: "", emoji: "" });
  const [errors, setErrors] = useState({ name: "", emoji: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.data);
    } catch {
      // ignore
    }
  };

  const generateRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * categoryEmojis.length);
    setFormData((prev) => ({ ...prev, emoji: categoryEmojis[randomIndex] }));
    if (errors.emoji) {
      setErrors((prev) => ({ ...prev, emoji: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", emoji: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.emoji.trim()) {
      newErrors.emoji = "Emoji is required";
      isValid = false;
    }

    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === formData.name.trim().toLowerCase()
      )
    ) {
      newErrors.name = "Category name already exists";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          emoji: formData.emoji.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create category");

      setFormData({ name: "", emoji: "" });
      setErrors({ name: "", emoji: "" });
      await fetchCategories();
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch {
      // ignore
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Category Manager
          </h1>
          <p className="text-muted-foreground">
            Add and manage your categories with emojis
          </p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Category
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                  Category Name
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`flex h-10 w-full rounded-md border pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-input"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="emoji" className="text-sm font-medium leading-none">
                  Emoji
                </label>
                <div className="flex gap-2">
                  <input
                    id="emoji"
                    type="text"
                    placeholder="🏷️"
                    value={formData.emoji}
                    onChange={(e) => handleInputChange("emoji", e.target.value)}
                    className={`flex h-10 flex-1 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center text-lg ${
                      errors.emoji ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={generateRandomEmoji}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-3"
                    title="Generate random emoji"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                </div>
                {errors.emoji && (
                  <p className="text-sm text-red-600">{errors.emoji}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2"
            >
              <Plus className="h-4 w-4" />
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Tag className="h-5 w-5" />
              All Categories ({categories.length})
            </h2>
          </div>

          <div className="p-6">
            {categories.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No categories added yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first category above
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="relative group border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.description || "📁"}</span>
                        <div>
                          <h3 className="font-medium text-sm">
                            {category.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(category._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-md text-red-600 hover:text-red-700"
                        title="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategory;