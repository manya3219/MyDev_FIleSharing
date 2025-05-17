import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  
  // Get current user from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // If the user is not logged in, redirect immediately
    if (!currentUser) {
      navigate('/');
    } else {
      // Fetch posts if user is authenticated
      const fetchPosts = async () => {
        try {
          const res = await fetch('/api/post/getPosts');
          const data = await res.json();
          setPosts(data.posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false); // Stop loading once posts are fetched
        }
      };
      fetchPosts();
    }
  }, [currentUser, navigate]);

  // If still loading, show a loading spinner in the center of the screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Blog Section</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto px-3 flex flex-col gap-8 py-7">
  {posts && posts.length > 0 && (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
      {/* Responsive Grid Layout for Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-4 w-full max-w-[320px] mx-auto"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <Link
        to={'/search'}
        className="text-lg text-teal-500 hover:underline text-center"
      >
        View all posts
      </Link>
    </div>
  )}
</div>


    </div>
  );
}