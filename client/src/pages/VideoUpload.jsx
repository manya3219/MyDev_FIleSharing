import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VideoUpload() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const { currentUser } = useSelector((state) => state.user);


  const navigate = useNavigate();


  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    axios.get('/api/playlists').then(response => setPlaylists(response.data));
  }, []);

  const createPlaylist = async () => {
    if (!newPlaylist.trim() || !currentUser?.isAdmin) return;
    try {
      const response = await axios.post('/api/playlists', { name: newPlaylist });
      setPlaylists([...playlists, response.data]);
      setNewPlaylist('');
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  const convertToEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/|\/embed\/)([\w-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  const addVideo = async () => {
    if (!selectedPlaylist || !videoUrl.trim() || !currentUser?.isAdmin) return;
    const embedUrl = convertToEmbedUrl(videoUrl);
    try {
      const response = await axios.post(`/api/playlists/${selectedPlaylist._id}/videos`, { url: embedUrl });
      const updatedPlaylist = response.data;
      const updatedPlaylists = playlists.map(p => (p._id === selectedPlaylist._id ? updatedPlaylist : p));
      setPlaylists(updatedPlaylists);
      setSelectedPlaylist(updatedPlaylist);
      setVideoUrl('');
    } catch (err) {
      console.error('Error adding video:', err);
    }
  };

  const deleteVideo = async (videoIndex) => {
    if (!currentUser?.isAdmin) return;
    try {
      const response = await axios.delete(`/api/playlists/${selectedPlaylist._id}/videos/${videoIndex}`);
      const updatedPlaylist = response.data;
      const updatedPlaylists = playlists.map(p => (p._id === selectedPlaylist._id ? updatedPlaylist : p));
      setPlaylists(updatedPlaylists);
      setSelectedPlaylist(updatedPlaylist);
    } catch (err) {
      console.error('Error deleting video:', err);
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!currentUser?.isAdmin) return;
    try {
      await axios.delete(`/api/playlists/${playlistId}`);
      setPlaylists(playlists.filter(p => p._id !== playlistId));
      if (selectedPlaylist?._id === playlistId) setSelectedPlaylist(null);
    } catch (err) {
      console.error('Error deleting playlist:', err);
    }
  };

  return (
    <div className="p-4 bg-white  text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Video Playlist </h1>

      {/* Create Playlist */}
      {currentUser?.isAdmin && (
        <div className="mb-4 flex justify-center gap-2">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylist}
            onChange={e => setNewPlaylist(e.target.value)}
            className="p-2 border rounded-lg text-black"
          />
          <button onClick={createPlaylist} className="text-xl p-2 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300 rounded-lg  hover:bg-blue-700 rounded">Create Playlist</button>
        </div>
      )}

      {/* Playlist Selection */}
      <h2 className="text-xl font-semibold mb-2 text-center">Select Playlist</h2>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <div key={playlist._id} className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPlaylist(playlist)}
                className={`p-2 border rounded ${selectedPlaylist?._id === playlist._id ? 'bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300 rounded-lg text-2xl text-white' : 'bg-gray-400 text-white text-xl'}`}
              >
                {playlist.name}
              </button>
              {currentUser?.isAdmin && (
                <button
                  onClick={() => deletePlaylist(playlist._id)}
                  className="p-2 bg-red-50 hover:bg-red-500 rounded"
                >
                  🗑
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No playlists yet. Create one!</p>
        )}
      </div>

      {/* Add Video */}
      {selectedPlaylist && currentUser?.isAdmin && (
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold mb-2">Add Video to {selectedPlaylist.name}</h2>
          <input
            type="text"
            placeholder="Video URL (e.g., YouTube link)"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            className="p-2 border rounded-lg text-black"
          />
          <button onClick={addVideo} className="ml-2 p-2 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300 rounded-lg  hover:bg-green-700 ">Add Video</button>
        </div>
      )}

      {/* Display Videos */}
      {selectedPlaylist && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Videos in {selectedPlaylist.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedPlaylist.videos.length > 0 ? (
              selectedPlaylist.videos.map((video, index) => (
                <div key={index} className="mb-4">
                  <iframe
                    width="100%"
                    height="200"
                    src={video.url}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                  ></iframe>
                  {currentUser?.isAdmin && (
                    <div className="mt-2">
                      <button onClick={() => deleteVideo(index)} className="p-2 bg-red-100 hover:bg-red-500 rounded-lg text-black">Delete</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No videos in this playlist yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;