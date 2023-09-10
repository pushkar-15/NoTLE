import { useEffect } from "react"
import { useBlogsContext } from "../hooks/useBlogsContext.js"

// components
import BlogDetails from "../components/BlogDetails.js"
import BlogForm from "../components/BlogForm.js"

const Home = () => {
    const { blogs, dispatch } = useBlogsContext()

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/api/blogs')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BLOGS', payload: json})
            }
        }

        fetchBlogs()
    }, [])

    return (
        <div className="home">
            <div className="blogs">
                {blogs && blogs.map(blog => (
                    <BlogDetails blog={blog} key={blog._id} />
                ))}
            </div>
            <BlogForm />
        </div>
    )
}

export default Home