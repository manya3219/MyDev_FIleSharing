import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      // Simulate data fetching/loading process
      setTimeout(() => {
        setLoading(false); // Stop loading after content is ready
      }, 1000); // Adjust the delay if needed
    }
  }, [currentUser, navigate]);

  // Show loading spinner if the page is still loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="about">
      <div className=' bg-cover bg-[url(https://img.freepik.com/premium-photo/desk-artist-with-lots-stationery-objects_93675-34901.jpg?semt=ais_hybrid&w=740)] min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-6xl font font-bold  text-center my-7 bg-gradient-to-r text-transparent from-cyan-200 via-purple-500 to-gray-300 bg-clip-text shadow-lg'>
              About File Store
            </h1>
            <div className='text-md text-white flex flex-col gap-6'>
              <p><i>
                At File Store, your ultimate destination for all things tech! At File Store, we're passionate about technology and committed to empowering individuals with the knowledge they need to thrive in the digital age.
              </i></p>
              <p><i>
                Our extensive collection of notes covers a wide array of tech topics, serving as a valuable resource for students, professionals, and enthusiasts alike.
              </i></p>
              <p><i>
                Our mission is clear: to bridge the gap between complexity and understanding in the realm of technology.
              </i></p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What We Offer?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Notes Repository</h3>
              <p className="text-gray-700">Dive into our extensive collection of notes covering a wide range of tech subjects.</p>
            </div>
            <div className="feature bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Insightful Blog</h3>
              <p className="text-gray-700">Explore our blog section for valuable insights and perspectives on the latest trends in tech.</p>
            </div>
            <div className="feature bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">YouTube Channel</h3>
              <p className="text-gray-700">Engaging videos that bring tech concepts to life through multimedia content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="features py-16">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">JOIN US</h2>
        <div className="container mx-auto rounded-lg">
          <h1 className="mx-20 p-6 dark:text-white">
            Whether you're a student, a professional, or simply curious about the world of technology, we invite you to join our community at Notes Cluster. Explore our resources, participate in discussions, and embark on a journey of discovery and growth with us.
          </h1>
        </div>
      </section>
    </div>
  );
}