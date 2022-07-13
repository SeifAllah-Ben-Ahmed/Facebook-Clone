import React from "react";

export default function Bio({
  infos,
  handleBioChange,
  max,
  updateDetails,
  setShowBio,
}) {
  return (
    <div className="add_bio_wrap">
      <textarea
        placeholder="Add Bio"
        name="bio"
        value={infos.bio}
        maxLength="100"
        onChange={handleBioChange}
        className="textarea_blue details_input"
      ></textarea>
      <div className="remaining"> {max} characters remaining</div>
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i> Public
        </div>
        <div className="flex flex_right">
          <div className="gray_btn" onClick={() => setShowBio(false)}>
            Cancel
          </div>
          <div className="blue_btn" onClick={updateDetails}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}
