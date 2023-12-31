"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import Profile from '@components/Profile'

function MyProfile() {
  const { data: session , status } = useSession()
  const [posts, setPosts] = useState([])
  const router = useRouter()

  async function fetchPosts() {
    try {
      const res = await axios.get(`/api/users/${session.user.id}/posts`)
      const _posts = res.data
      setPosts(_posts)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (status === "authenticated"){
      fetchPosts()
    }
  }, [])

  async function handleTagClick(post) {
    try{
      const res = await axios.get(`/api/prompt/search/${encodeURIComponent(post.tag)}`)
      const _posts = res.data.prompts
      setPosts(_posts)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Profile
      name="My" 
      desc="Welcome to your personal profile page."
      data={posts}
      handleTagClick={handleTagClick}
    />
  )
}

export default MyProfile;