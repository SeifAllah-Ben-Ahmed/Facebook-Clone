export default function Story({ story }) {
  return (
    <div className="story">
      <img className="story_img" src={story.image} alt="story" />
      <div className="story_profile_pic">
        <img src={story.profile_picture} alt="story" />
      </div>
      <div className="story_profile_name">{story.profile_name}</div>
    </div>
  );
}
