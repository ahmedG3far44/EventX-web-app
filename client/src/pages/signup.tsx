/* eslint-disable no-useless-escape */
import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Link, Navigate } from "react-router-dom";

interface Address {
  area: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  gender: "male" | "female";
  age: number;
  phone?: string;
  address: Address;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  profileImage?: string;
  gender?: string;
  age?: string;
  phone?: string;
  address?: {
    area?: string;
    state?: string;
    street?: string;
    zipCode?: string;
  };
  acceptTerms?: string;
}

const egyptianStates = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Fayyum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr el-Sheikh",
  "Luxor",
  "Matruh",
  "Minya",
  "Monufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sharqia",
  "Sohag",
  "South Sinai",
  "Suez",
];

const areasByState: Record<string, string[]> = {
  Alexandria: [
    "EL Mandara",
    "Montaza",
    "Raml Station",
    "Sidi Gaber",
    "Sporting",
    "Stanley",
  ],
  Cairo: [
    "Nasr City",
    "Heliopolis",
    "Maadi",
    "Zamalek",
    "Downtown",
    "New Cairo",
  ],
  Giza: ["Dokki", "Mohandessin", "Agouza", "6th of October", "Sheikh Zayed"],
};

export default function SignupPage() {
  const { register, loading, isAuthenticated, isAdmin } = useAuth();

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    gender: "male",
    age: 0,
    phone: "",
    address: {
      area: "",
      state: "",
      street: "",
      zipCode: "",
    },
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Profile image validation
    if (!formData.profileImage.trim()) {
      newErrors.profileImage = "Profile image URL is required";
    } else {
      try {
        new URL(formData.profileImage);
      } catch {
        newErrors.profileImage = "Please enter a valid URL";
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Age validation
    if (!formData.age || formData.age < 1) {
      newErrors.age = "Please enter a valid age";
    } else if (formData.age < 13) {
      newErrors.age = "You must be at least 13 years old";
    } else if (formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }

    // Phone validation (optional)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Address validation
    newErrors.address = {};
    if (!formData.address.state) {
      newErrors.address.state = "State is required";
    }
    if (!formData.address.area) {
      newErrors.address.area = "Area is required";
    }
    if (!formData.address.street.trim()) {
      newErrors.address.street = "Street address is required";
    }
    if (!formData.address.zipCode.trim()) {
      newErrors.address.zipCode = "ZIP code is required";
    } else if (!/^\d{5}$/.test(formData.address.zipCode)) {
      newErrors.address.zipCode = "ZIP code must be 5 digits";
    }

    // Remove address errors if all are empty
    if (Object.keys(newErrors.address).length === 0) {
      delete newErrors.address;
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/dashboard/insights" : "/events"} />;
  }
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const result = await register(formData);
      return <Navigate to={`${result?.redirect as string}`} />;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const updateField = (
    field: keyof SignupData,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    setErrors((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: undefined },
    }));
  };

  const availableAreas = formData.address.state
    ? areasByState[formData.address.state] || []
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">Sign up to get started</p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Profile Image URL
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="url"
                value={formData.profileImage}
                onChange={(e) => updateField("profileImage", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.profileImage ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {errors.profileImage && (
              <p className="text-xs text-red-600 mt-1">{errors.profileImage}</p>
            )}
          </div>

          {/* Gender & Age Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Age
              </label>
              <input
                type="number"
                value={formData.age || ""}
                onChange={(e) => updateField("age", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.age ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Age"
                min="1"
                max="120"
              />
              {errors.age && (
                <p className="text-xs text-red-600 mt-1">{errors.age}</p>
              )}
            </div>
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Phone Number{" "}
              <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+20 123 456 7890"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address Section */}
          <div className="border-t pt-4">
            <div className="flex items-center mb-3">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Address Information
              </h3>
            </div>

            {/* State & Area Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  State
                </label>
                <select
                  value={formData.address.state}
                  onChange={(e) => {
                    updateAddress("state", e.target.value);
                    // Reset area when state changes
                    updateAddress("area", "");
                  }}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address?.state ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select state</option>
                  {egyptianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.address?.state && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.address.state}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Area
                </label>
                <select
                  value={formData.address.area}
                  onChange={(e) => updateAddress("area", e.target.value)}
                  disabled={!formData.address.state}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 ${
                    errors.address?.area ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select area</option>
                  {availableAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.address?.area && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.address.area}
                  </p>
                )}
              </div>
            </div>

            {/* Street */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address?.street ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="23 st, building 98034"
              />
              {errors.address?.street && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.address.street}
                </p>
              )}
            </div>

            {/* ZIP Code */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => updateAddress("zipCode", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address?.zipCode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="21520"
                maxLength={5}
              />
              {errors.address?.zipCode && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.address.zipCode}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              // checked={formData.acceptTerms}
              onChange={(e) =>
                updateField("acceptTerms", e.target.checked ? true : false)
              }
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-red-600">{errors.acceptTerms}</p>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
