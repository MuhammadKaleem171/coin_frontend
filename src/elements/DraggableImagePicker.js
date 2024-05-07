import React from "react";
import { Draggable, state } from "react-page-maker";
import { BlockPicker } from "react-color";

import { FormGroup, Label, Input, Col, Row } from "reactstrap";

class ImagePicker extends React.Component {
  state = {
    imageUrl: "", // State to store the selected image URL
  };

  handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.setState({ imageUrl });
      // Notify parent component about the selected image URL
      this.props.onSelect(imageUrl, file);
    }
  };

  render() {
    return (
      <FormGroup>
        <Label for="imagePicker" sm={2}>
          Choose Image
        </Label>
        <Col sm={10}>
          <Input
            type="file"
            name="imagePicker"
            id="imagePicker"
            accept="image/*" // Specify accepted file types (images)
            onChange={this.handleChange}
          />
          {this.state.imageUrl && (
            <img
              src={this.state.imageUrl}
              alt="Selected Image"
              style={{ marginTop: "10px", width: "100%", height: "250px" }}
            />
          )}
        </Col>
      </FormGroup>
    );
  }
}

class DraggableImagePicker extends React.Component {
  state = {
    showColorPicker: false,
    background: "",
    imageUrl: "", // State to store the selected image URL
  };

  handleChangeComplete = (color) => {
    const { id, dropzoneID, parentID } = this.props;
    this.setState({ background: color.hex }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { background: color.hex },
      });
    });
  };

  handleImageSelect = (imageUrl, file) => {
    const { id, dropzoneID, parentID } = this.props;
    this.setState({ imageUrl }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { imageUrl, file },
      });
    });
  };

  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  };

  render() {
    const {
      id,
      showBasicContent,
      showPreview,
      dropzoneID,
      parentID,
      name,
      payload,
    } = this.props;

    const background =
      this.state.background || (payload && payload.background) || "#37d67a";

    const imageUrl = this.state.imageUrl || (payload && payload.imageUrl) || ""; // Retrieve the image URL from state

    if (showBasicContent) {
      return (
        <Draggable {...this.props}>
          <span>Image Picker</span>
        </Draggable>
      );
    }

    if (showPreview) {
      return (
        <div style={{ background }}>
          <img src={imageUrl} alt="Preview" />
        </div>
      );
    }

    return (
      <Draggable {...this.props}>
        <ImagePicker onSelect={this.handleImageSelect} />
      </Draggable>
    );
  }
}

export default DraggableImagePicker;
