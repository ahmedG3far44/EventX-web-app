import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Users,
  Shield,
  ShieldOff,
  Eye,
  MoreHorizontal,
  Calendar,
  Mail,
  User,
  Filter,
} from "lucide-react";
import { env } from "configs/env";
import { useAuth } from "@/contexts/AuthProvider";

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
  status?: "active" | "blocked";
  role: "user" | "admin";
}

const BASE_URL = env.BASE_URL;

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "user" | "admin" 
  >("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("connection error check your network !!");
        }

        const data = await response.json();

        setUsers(data.data);

        return data.data;
      } catch {
        // ignore
      }
    }
    getAllUsers();
  }, []);
  
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, statusFilter, roleFilter]);

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></div>
        Blocked
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      admin: "bg-purple-50 text-purple-700 ring-purple-600/20",
      moderator: "bg-blue-50 text-blue-700 ring-blue-600/20",
      user: "bg-gray-50 text-gray-700 ring-gray-600/20",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
          roleStyles[role as keyof typeof roleStyles]
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
              Manage and monitor user accounts ({filteredUsers.length} of{" "}
              {users.length} users)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {users.filter((u) => u.status === "active").length} active
              </span>
              <span>•</span>
              <span>
                {users.filter((u) => u.status === "blocked").length} blocked
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "all" | "active" | "blocked"
                  )
                }
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            
            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value as "admin" | "user" | "all")
                }
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <div className="flex items-center gap-2">
                        {user.status && getStatusBadge(user.status)}
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                  </div>

                  <button className="p-1 hover:bg-gray-100 rounded-md">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

    
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.age} years old</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(new Date(user.createdAt))}</span>
                  </div>
                </div>

                
                <div className="flex items-center gap-2 pt-4 border-t">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                      user.status === "active"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {user.status === "active" ? (
                      <>
                        <ShieldOff className="h-4 w-4" />
                        Block
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        Unblock
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No users found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">User Details</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>

                <div className="text-center mb-6">
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {selectedUser.status && getStatusBadge(selectedUser.status)}
                    {getRoleBadge(selectedUser.role)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <p className="text-sm">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Age
                    </label>
                    <p className="text-sm">{selectedUser.age} years old</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Join Date
                    </label>
                    <p className="text-sm">
                      {formatDate(new Date(selectedUser.createdAt))}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      User ID
                    </label>
                    <p className="text-sm font-mono">{selectedUser._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
