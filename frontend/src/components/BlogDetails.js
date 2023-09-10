import { useBlogsContext } from "../hooks/useBlogsContext.js"

// // date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BlogDetails = ({ blog }) => {
  const { dispatch } = useBlogsContext()

  const handleClick = async () => {
    const response = await fetch('/api/blogs/' + blog._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_BLOG', payload: json })
    }
  }

  return (
    <div className="blog-details">
      <h4>{blog.title}</h4>
      <p><strong>Problem Statement: </strong>{blog.problem}</p>
      <p><strong>Approach: </strong>{blog.approach}</p>
      {/* <p>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p> */}
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default BlogDetails