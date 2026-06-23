from moviepy import VideoFileClip
import os

# Input video
video_path = r"C:\Users\Ai Night team\Downloads\Gulshan Dynasty.mov"

# Cut section
start_time = 2 * 60 + 14   # 2:14 = 134 seconds
end_time = 2 * 60 + 44     # 2:44 = 164 seconds

# Output file
output_path = os.path.join(
    os.path.dirname(video_path),
    "Gulshan Dynasty_cut.mp4"
)

# Load video
clip = VideoFileClip(video_path)

# Ensure end time doesn't exceed video length
end_time = min(end_time, clip.duration)

# Cut the clip
cut_clip = clip.subclipped(start_time, end_time)

# Export
cut_clip.write_videofile(
    output_path,
    codec="libx264",
    audio_codec="aac"
)

# Clean up
clip.close()
cut_clip.close()

print(f"Done! Saved to:\n{output_path}")