import express from 'express';
const router = express.Router();
import Playlist from '../models/Playlist.js';// Use import instead of require



// Get all playlists
router.get('/', async (req, res) => {
  const playlists = await Playlist.find();
  res.json(playlists);
});

// Create a new playlist
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newPlaylist = new Playlist({ name, videos: [] });
  await newPlaylist.save();
  res.json(newPlaylist);
});

// Add video to a playlist
router.post('/:id/videos', async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  const playlist = await Playlist.findById(id);
  playlist.videos.push({ url });
  await playlist.save();
  res.json(playlist);
});

// Delete video from a playlist
router.delete('/:id/videos/:videoIndex', async (req, res) => {
  const { id, videoIndex } = req.params;
  const playlist = await Playlist.findById(id);
  playlist.videos.splice(videoIndex, 1);
  await playlist.save();
  res.json(playlist);
});
// Delete a playlist
router.delete('/:id', async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
});

export default router; // Use export default to make it compatible with ESM
