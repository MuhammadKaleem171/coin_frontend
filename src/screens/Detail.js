import React, { useState, useEffect } from "react";
import axiosInstance from "../api";

const Detail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState();
  const [videos, setVideos] = useState();

  // console.log("hello", data);
  console.log("images", images);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("getUserInfo");
        if (response.result.user) {
          fetch(`http://localhost:4000/${response.result.user.imageUrl}`)
            .then((response) => response.blob())
            .then((data) => {
              const imageUrl = URL.createObjectURL(data);
              setImages(imageUrl);
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
          fetch(`http://localhost:4000/${response.result.user.videoUrl}`)
            .then((response) => response.blob())
            .then((data) => {
              const videoUrl = URL.createObjectURL(data);
              setVideos(videoUrl);
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        }
        setData(response.result.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup code here
    };
  }, []);

  const renderElement = (element, data) => {
    console.log(element);
    switch (element.type) {
      case "TEXTBOX":
        return (
          <div key={element.id} className="border py-2 px-2 mt-2 ">
            <label htmlFor={element.id}>{element.name}</label>
            {/* <input type="text" id={element.id} value={element.name} /> */}
          </div>
        );
      case "IMAGEPICKER":
        return (
          <div key={element.id}>
            <label htmlFor={element.id}>{element.name}</label>
            <img
              src={images}
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
              <source src={videos} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return null;
    }
  };

  const renderUI = (elements) => {
    return elements?.data.map((value) => renderElement(value, elements));
  };

  return <div>{data && data.data && renderUI(data)}</div>;
};

export default Detail;
