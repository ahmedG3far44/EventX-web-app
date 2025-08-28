import React, { useState, useMemo } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  profilePicture: string;
  joinDate: Date;
  status: "active" | "blocked";
  role: "user" | "admin" | "moderator";
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      age: 28,
      profilePicture:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2023-01-15"),
      status: "active",
      role: "admin",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      age: 34,
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2023-03-22"),
      status: "active",
      role: "user",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@example.com",
      age: 31,
      profilePicture:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2022-11-08"),
      status: "blocked",
      role: "user",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@example.com",
      age: 29,
      profilePicture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2023-05-10"),
      status: "active",
      role: "moderator",
    },
    {
      id: "5",
      name: "Emma Brown",
      email: "emma.brown@example.com",
      age: 26,
      profilePicture:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2023-07-18"),
      status: "active",
      role: "user",
    },
    {
      id: "6",
      name: "Frank Miller",
      email: "frank.miller@example.com",
      age: 42,
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date("2022-09-03"),
      status: "active",
      role: "user",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "user" | "admin" | "moderator"
  >("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter and search users
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
        user.id === userId
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
        {/* Header */}
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

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.profilePicture}
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
                        {getStatusBadge(user.status)}
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                  </div>

                  <button className="p-1 hover:bg-gray-100 rounded-md">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* User Details */}
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
                    <span>Joined {formatDate(user.joinDate)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  <button
                    onClick={() => toggleUserStatus(user.id)}
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

        {/* No Results */}
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

        {/* User Detail Modal (Simple overlay) */}
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
                    src={selectedUser.profilePicture}
                    alt={selectedUser.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {getStatusBadge(selectedUser.status)}
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
                      {formatDate(selectedUser.joinDate)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      User ID
                    </label>
                    <p className="text-sm font-mono">{selectedUser.id}</p>
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
