import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import ReactJson from "react-json-view";
import axiosInstance from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  Canvas,
  Palette,
  state,
  registerPaletteElements,
} from "react-page-maker";

import { elements } from "../const";
import DraggableTextbox from "../elements/DraggableTextbox";
import DraggableLayoutR3C3 from "../elements/DraggableLayoutR3C3";
import DraggableLayoutR1C2 from "../elements/DraggableLayoutR1C2";
import DraggableDropdown from "../elements/DraggableDropdown";
import DraggableSlider from "../elements/DraggableSlider";
import DraggableHeader from "../elements/DraggableHeader";
import DraggableImagePicker from "../elements/DraggableImagePicker";
import DraggableVideoPicker from "../elements/DraggableVideo";

import "../App.css";
import Preview from "./Preview";
const Main = () => {
  // Register all palette elements
  registerPaletteElements([
    { type: elements.TEXTBOX, component: DraggableTextbox },
    { type: elements.DROPDOWN, component: DraggableDropdown },
    { type: elements.GRID_LAYOUT_3_3, component: DraggableLayoutR3C3 },
    { type: elements.GRID_LAYOUT_1_2, component: DraggableLayoutR1C2 },
    { type: elements.SLIDER, component: DraggableSlider },
    { type: elements.HEADER, component: DraggableHeader },
    { type: elements.IMAGEPICKER, component: DraggableImagePicker },
    { type: elements.VIDEOPICKER, component: DraggableVideoPicker },
  ]);

  const [activeTab, setActiveTab] = useState("1");
  const [currentState, setCurrentState] = useState([]);

  console.log({ currentState });
  useEffect(() => {
    const handleStateChange = (s) => {
      const newState = state.getStorableState();
      console.log({ newState });
      setCurrentState(newState);
      localStorage.setItem("initialElements", JSON.stringify(newState));
    };
    state.addEventListener("change", handleStateChange);

    return () => {
      state.removeEventListener("change", handleStateChange);
    };
  }, []);
  // Re-hydrate canvas state
  const initialElements = JSON.parse(localStorage.getItem("initialElements"));

  // Define all palette elements that you want to show
  const paletteItemsToBeRendered = [
    {
      type: elements.TEXTBOX,
      name: "Text Field",
      id: "f1",
      payload: { fname: "Manish", lname: "Keer" },
    },
    // { type: elements.DROPDOWN, name: "Dropdown Field", id: "f2" },
    // { type: elements.SLIDER, name: "Slider", id: "s1" },
    // { type: elements.HEADER, name: "Header", id: "h1" },
    { type: elements.IMAGEPICKER, name: "ImagePicker", id: "image1", file: {} },
    {
      type: elements.VIDEOPICKER,
      name: "Video Picker",
      id: "Video 1",
      file: {},
    },
    // {
    //   type: elements.GRID_LAYOUT_3_3,
    //   name: "3 by 3 Grid Layout",
    //   id: "3-3-grid",
    // },
    // {
    //   type: elements.GRID_LAYOUT_1_2,
    //   name: "1 by 2 Grid Layout",
    //   id: "1-2-grid",
    // },
  ];
  function generateRandomId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  // Usage example

  const onDrop = (data, cb) => {
    // No need to ask id and name again
    const uuid = generateRandomId(3);
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    let name = data.name;

    if (data.type === elements.TEXTBOX || data.type === elements.DROPDOWN) {
      name = uuid;
    }

    const id = uuid;

    cb({
      ...data,
      name,
      id,
      payload: { dropped: true },
    });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const clearState = () => {
    state.clearState();
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const Text = currentState.find((input) => input.type === "TEXTBOX");
    const Image = currentState.find((input) => input.type === "IMAGEPICKER");
    const Video = currentState.find((input) => input.type === "VIDEOPICKER");

    let data = new FormData();
    data.append("video", Video?.payload?.file);

    data.append("image", Image?.payload?.file);
    data.append("text", Text.name);
    data.append("data", JSON.stringify(currentState));

    await axiosInstance
      .post("userInfo", data)
      .then(async (response) => {
        console.log("RESPONSE from login success ", response);
      })
      .catch((err) => {
        console.log("RESPONSE from login error ", err);
      });
  };

  return (
    <div className="d-flex flex-column vh-99 w-100 px-4">
      <Nav tabs className="justify-content-md-center">
        <NavItem>
          <NavLink
            className={`${activeTab === "1" ? "active" : ""}`}
            onClick={() => toggleTab("1")}
          >
            Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${activeTab === "2" ? "active" : ""}`}
            onClick={() => toggleTab("2")}
          >
            Preview
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={`${activeTab === "3" ? "active" : ""}`}
            onClick={() => toggleTab("3")}
          >
            JSON
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="page-builder mt-3">
            <Col
              sm="3"
              style={{
                height: "90vh",
                gap: 10,
              }}
            >
              <Palette paletteElements={paletteItemsToBeRendered} />
              {/* <Trash /> */}
              <center>
                <Button
                  color="primary"
                  className="flex px-4 rounded-4 "
                  onClick={onSubmit}
                  style={{
                    bottom: 10,
                    right: 10,
                    border: "2px solid red !important",
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="danger"
                  className="flex px-4 rounded-4 "
                  onClick={clearState}
                  style={{
                    bottom: 10,
                    right: 10,
                    border: "2px solid red !important",
                  }}
                >
                  Reset
                </Button>
              </center>
            </Col>
            <Col sm="9" className="canvas-container">
              <Canvas
                onDrop={onDrop}
                initialElements={initialElements}
                placeholder="Drop Here"
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="mt-3">
            <Preview data={currentState} />
            {/* {({ children }) => <Container>{children}</Container>} */}
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row className="mt-3">
            <Col sm="12">
              <ReactJson src={currentState} collapsed theme="solarized" />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Main;
