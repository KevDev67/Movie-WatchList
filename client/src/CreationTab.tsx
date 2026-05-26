import "./CreationTab.css";
import icon from "./assets/3d-glasses.png";
import fileDrop from "./assets/fileupload.png";
import { useState, type ChangeEvent } from "react";

function CreationTab() {
  const [image, setImage] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  return (
    <div>
      <div className="header-container">
        <div className="left-side-container">
          <img className="glasses-icon" src={icon} />
          <p className="title">Create</p>
        </div>
      </div>

      <div className="creation-container">
        <div className="left-side">
          <div
            className="file-drop-container"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={handleDrop}
          >
            <div>
              <img className="file-drop-img" src={fileDrop} />
            </div>
            <p className="title2">Drag Movie Cover</p>
            <p className="title3">----OR----</p>
            <label className="upload-file">
              Browse Files
              <input type="file" hidden onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <div className="right-side">
          <input placeholder="Movie Title" />
          {image && <img src={image} />}
        </div>
      </div>
    </div>
  );
}

export default CreationTab;
