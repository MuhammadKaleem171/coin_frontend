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
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  Canvas,
  Palette,
  state,
  Trash,
  core,
  // Preview,
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

import "./App.css";
import Preview from "./lib/Preview";

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
  console.log({ currentState });
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
    { type: elements.IMAGEPICKER, name: "ImagePicker", id: "image1" },
    { type: elements.VIDEOPICKER, name: "Video Picker", id: "Video 1" },
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

  const onDrop = (data, cb) => {
    // No need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    let name = data.name;

    if (data.type === elements.TEXTBOX || data.type === elements.DROPDOWN) {
      name = window.prompt("Enter name of field");
    }

    const id = window.prompt("Please enter unique ID");

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

  return (
    <div className="d-flex flex-column vh-99 w-100 px-4">
      <Nav tabs className="justify-content-md-center">
        <NavItem>
          <NavLink
            className={`${activeTab === "1" ? "active" : ""}`}
            onClick={() => toggleTab("1")}
          >
            Canvas
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
        <NavItem>
          <NavLink
            className={`${activeTab === "3" ? "active" : ""}`}
            onClick={() => toggleTab("3")}
          >
            JSON
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="page-builder mt-3">
            <Col sm="9" className="canvas-container">
              <Canvas
                onDrop={onDrop}
                initialElements={initialElements}
                placeholder="Drop Here"
              />
            </Col>
            <Col sm="3" style={{ height: "90vh", gap: 10 }}>
              <Palette paletteElements={paletteItemsToBeRendered} />
              {/* <Trash /> */}
              <Button color="danger" className="mt-4" onClick={clearState}>
                Flush Canvas
              </Button>
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
