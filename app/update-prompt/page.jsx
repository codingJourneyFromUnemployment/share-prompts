'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"
import axios from "axios"

function EditPrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  async function getPromptDetails() {
    try {
      const res = await axios.get(`/api/prompt/${promptId}`)
      const _post = res.data
      setPost(_post)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (promptId) {
      getPromptDetails()
    }
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

export default EditPrompt