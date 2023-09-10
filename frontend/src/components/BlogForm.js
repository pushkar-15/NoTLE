import { useState } from 'react'
import { useBlogsContext } from "../hooks/useBlogsContext.js"

const BlogForm = () => {
  const { dispatch } = useBlogsContext()

  const [title, setTitle] = useState('')
  const [problem, setProblem] = useState('')
  const [approach, setApproach] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const blog = { title, problem, approach }

    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setProblem('')
      setApproach('')
      dispatch({ type: 'CREATE_BLOG', payload: json })
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Blog</h3>

      <label>Problem Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Problem Statement:</label>
      <input
        type="text"
        onChange={(e) => setProblem(e.target.value)}
        value={problem}
        className={emptyFields.includes('problem') ? 'error' : ''}
      />

      <label>Approach:</label>
      <input
        type="text"
        onChange={(e) => setApproach(e.target.value)}
        value={approach}
        className={emptyFields.includes('approach') ? 'error' : ''}
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm