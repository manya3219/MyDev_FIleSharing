import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({ url: String });

const playlistSchema = new mongoose.Schema({
  name: String,
  videos: [videoSchema],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist; // ✅ Ensure it's exported as default
