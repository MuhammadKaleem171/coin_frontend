import React from "react";

const renderElement = (element) => {
  switch (element.type) {
    case "TEXTBOX":
      return (
        <div key={element.id}>
          <label htmlFor={element.id}>{element.name}</label>
          {/* <input type="text" id={element.id} value={element.name} /> */}
        </div>
      );
    case "IMAGEPICKER":
      return (
        <div key={element.id}>
          <label htmlFor={element.id}>{element.name}</label>
          <img
            src={element.payload.imageUrl}
            alt="Selected Image"
            style={{ marginTop: "10px", width: "100%", height: "250px" }}
          />
        </div>
      );
    case "VIDEOPICKER":
      return (
        <div key={element.id}>
          <label htmlFor={element.id}>{element.name}</label>
          <video controls width="100%" style={{ marginTop: "10px" }}>
            <source src={element.payload.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    default:
      return null;
  }
};

const renderUI = (elements) => {
  return elements.map((element) => renderElement(element));
};

const Preview = ({ data }) => {
  return <div>{renderUI(data)}</div>;
};

export default Preview;
