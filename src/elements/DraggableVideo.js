import React from "react";
import { Draggable, state } from "react-page-maker";
import { FormGroup, Label, Input, Col } from "reactstrap";

class VideoPicker extends React.Component {
  state = {
    videoUrl: "", // State to store the selected video URL
  };

  handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const videoUrl = URL.createObjectURL(file);
      const videoUrl =
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      this.setState({ videoUrl });
      // Notify parent component about the selected video URL
      this.props.onSelect(videoUrl);
    }
  };

  render() {
    return (
      <FormGroup>
        <Label for="videoPicker" sm={2}>
          Choose Video
        </Label>
        <Col sm={10}>
          <Input
            type="file"
            name="videoPicker"
            id="videoPicker"
            accept="video/*" // Specify accepted file types (videos)
            onChange={this.handleChange}
          />
          {this.state.videoUrl && (
            <video controls width="100%" style={{ marginTop: "10px" }}>
              <source src={this.state.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Col>
      </FormGroup>
    );
  }
}

class DraggableVideoPicker extends React.Component {
  handleVideoSelect = (videoUrl) => {
    const { id, dropzoneID, parentID } = this.props;
    state.updateElement(id, dropzoneID, parentID, {
      payload: { videoUrl },
    });
  };

  render() {
    const { id, showBasicContent, showPreview } = this.props;

    if (showBasicContent) {
      return (
        <Draggable {...this.props}>
          <span>Video Picker</span>
        </Draggable>
      );
    }

    if (showPreview) {
      return (
        <div>
          <VideoPicker onSelect={this.handleVideoSelect} />
        </div>
      );
    }

    return (
      <Draggable {...this.props}>
        <VideoPicker onSelect={this.handleVideoSelect} />
      </Draggable>
    );
  }
}

export default DraggableVideoPicker;
