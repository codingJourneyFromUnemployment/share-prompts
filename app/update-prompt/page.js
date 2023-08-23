'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"
import axios from "axios"

function EditPrompt() {
  const { data: session } = useSession()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  useEffect(() => {

  }, [promptId])

  async function createPost(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('/api/prompt/new', {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      })
      if (res.status === 200) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePrompt