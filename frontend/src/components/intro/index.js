import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Bio from "./Bio";
import "./style.css";

export default function Intro({ detailss, visitor }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState(detailss);
  console.log({ details, detailss });
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos.bio ? 100 - infos.bio.length : 100);

  const handleBioChange = (e) => {
    setInfos({ ...infos, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };
  useEffect(() => {
    setDetails(detailss);
  }, [detailss]);
  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        { infos },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDetails(data.details);
      setShowBio(false);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">intro</div>
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edite Bio
            </button>
          )}
        </div>
      )}
      {showBio && (
        <Bio
          infos={details}
          handleBioChange={handleBioChange}
          max={max}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
        />
      )}

      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="/icons/job.png" alt="job" />
          Works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="/icons/job.png" alt="job" />
          Works as {details?.job}
        </div>
      ) : (
        !details?.job &&
        details?.workplace && (
          <div className="info_profile">
            <img src="/icons/job.png" alt="job" />
            Works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="/icons/relationship.png" alt="studies" />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="/icons/studies.png" alt="studies" />
          Studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="/icons/studies.png" alt="highSchool" />
          Studied at{details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="/icons/home.png" alt="highSchool" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="/icons/home.png" alt="highSchool" />
          From {details?.hometown}
        </div>
      )}
      {details?.instagram && (
        <div className="info_profile">
          <img src="/icons/instagram.png" alt="highSchool" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edite Details</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
}
