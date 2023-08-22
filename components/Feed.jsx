'use client'
import { useState, useEffect } from 'react'
import PromptCard from '@/components/PromptCard'
import axios from 'axios'

export function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  function handleSearchChange(e) {
    setSearchText(e.target.value)
  }

  function tagClick(tag) {
    
  }

  async function fetchPosts() {
    try {
      const res = await axios.get('/api/prompt')
      const _posts = res.data
      setPosts(_posts)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          >
          </input>
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={ tagClick }
        />
    </section>
  )
}


export default Feed