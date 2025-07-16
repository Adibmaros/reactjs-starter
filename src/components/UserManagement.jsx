// src/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Plus, Edit2, Trash2, Users, X } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [userForm, setUserForm] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      // Handle both old and new API response formats
      const usersData = response.data.users || response.data;
      setUsers(usersData);
    } catch (err) {
      setError('Failed to fetch users. Please make sure you are logged in.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      if (isEditing) {
        await userService.update(editingUser.id, userForm);
        setSuccess('User updated successfully!');
        setIsEditing(false);
        setEditingUser(null);
      } else {
        await userService.create(userForm);
        setSuccess('User created successfully!');
      }
      
      setUserForm({ name: '', email: '' });
      fetchUsers(); // Refresh users list
    } catch (err) {
      setError(isEditing ? 'Failed to update user' : 'Failed to create user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setUserForm({ name: user.name, email: user.email });
    setEditingUser(user);
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setUserForm({ name: '', email: '' });
    setEditingUser(null);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        setLoading(true);
        setError('');
        await userService.delete(userId);
        setSuccess('User deleted successfully!');
        fetchUsers(); // Refresh users list
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              User Management
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your users with full CRUD operations
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="max-w-2xl mx-auto border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - Fixed width on desktop */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {isEditing ? (
                        <>
                          <Edit2 className="h-4 w-4" />
                          Edit User
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Create User
                        </>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {isEditing ? 'Update user information' : 'Add a new user to the system'}
                    </CardDescription>
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelEdit}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter full name"
                      value={userForm.name}
                      onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 min-h-[40px] cursor-pointer"
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {loading 
                        ? (isEditing ? 'Updating...' : 'Creating...') 
                        : (isEditing ? 'Update User' : 'Create User')
                      }
                    </Button>
                    
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="min-h-[40px] sm:w-auto w-full"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Users List Section - Expandable */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      All Users
                    </CardTitle>
                    <CardDescription>
                      Total {users.length} user{users.length !== 1 ? 's' : ''} registered
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {users.length} Users
                  </Badge>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-3">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                      <p className="text-gray-500">Loading users...</p>
                    </div>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-300 mb-4 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first user.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {users.map(user => (
                      <Card key={user.id} className="transition-all hover:shadow-md border border-gray-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {user.name}
                              </h3>
                              <p className="text-sm text-gray-600 truncate">
                                {user.email}
                              </p>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex flex-col xs:flex-row gap-2">
                              <Button
                                size="md"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                                className="flex-1 h-12 text-sm cursor-pointer"
                              >
                                <Edit2 className="mr-1 h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                size="md"
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id, user.name)}
                                className="flex-1 h-12 text-sm cursor-pointer"
                              >
                                <Trash2 className="mr-1 h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}