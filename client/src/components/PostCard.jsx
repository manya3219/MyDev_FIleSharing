import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full max-w-[360px] mx-auto border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg transition-all sm:max-w-[430px]">
      {/* Image */}
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm text-gray-600">{post.category}</span>
      </div>

      {/* Hover Link */}
      <Link
        to={`/post/${post.slug}`}
        className="absolute bottom-[-100px] left-0 right-0 border border-teal-500 text-teal-500 bg-white hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 group-hover:bottom-4"
      >
        Read Article
      </Link>
    </div>
  );
}