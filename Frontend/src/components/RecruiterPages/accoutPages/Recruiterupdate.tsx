import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

interface UserProfile {
  username: string
  image: string
  currentCompany: string
  currentRole: string
}

const Recruiterupdate = () => {
  const [formData, setFormData] = useState<UserProfile>({
    username: '',
    image: '',
    currentCompany: '',
    currentRole: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found')
        }        const response = await fetch('https://hirequest-portel-1.onrender.com/recruiter/profile', {
          method: 'GET',
          headers: { 
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile')
        }

        if (data.success && data.data) {
          setFormData({
            username: data.data.username || '',
            image: data.data.image || '',
            currentCompany: data.data.currentCompany || '',
            currentRole: data.data.currentRole || ''
          })
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch profile'
        toast({
          variant: "destructive",
          title: "Error",
          description: message
        })
        navigate('/recruiter/account')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }      const response = await fetch('https://hirequest-portel-1.onrender.com/recruiter/userprofile', {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      if (data.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully"
        })
        navigate('/recruiter/account')
      } else {
        throw new Error(data.message || 'Failed to update profile')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile'
      toast({
        variant: "destructive",
        title: "Error",
        description: message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (isLoading && !formData.username) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter profile image URL"
          />
        </div>
        <div>
          <Label htmlFor="currentCompany">Current Company</Label>
          <Input
            id="currentCompany"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
            placeholder="Enter your current company"
            required
          />
        </div>
        <div>
          <Label htmlFor="currentRole">Current Role</Label>
          <Input
            id="currentRole"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
            placeholder="Enter your current role"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  )
}

export default Recruiterupdate