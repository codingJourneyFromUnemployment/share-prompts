"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState("");

  async function handleCopyBtn() {
    setCopied(post.prompt)
    await navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000);
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start space-x-5'>
        <div className='flex flex-1 justify-start items-center space-x-3 cursor-pointer'>
          <Image 
            src={post.creator.image}
            alt="user profile picture"
            width={40}
            height={40}
            className='rounded-full object-contain'
            />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
              </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p> 
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopyBtn}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p 
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
        {post.tag}
      </p>
    </div>
  )
}

export default PromptCard