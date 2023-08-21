'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

function Feed() {
  const [searchText, setSearchText] = useState('')

  function handleSearchChange(e) {
    setSearchText(e.target.value)
  }

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
    </section>
  )
}


export default Feed