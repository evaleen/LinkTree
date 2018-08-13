import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LinkEditor, { actionTypes } from "../../src/components/LinkEditor";

Enzyme.configure({ adapter: new Adapter() });

const updateFunc = () => {};
const removeFunc = () => {};

const link = {
  id: 3113708,
  deleted: 0,
  active: 1,
  highlight: "wobble",
  unsafe: 0,
  url: "http://facebook.com",
  title: "My First Link",
  position: 0,
  account: {},
  schedule_start: "2018-08-09T12:00:00+10:00",
  schedule_start_timezone: "",
  schedule_end: "2018-08-23T12:00:00+10:00",
  schedule_end_timezone: "",
  clicks: [],
  click_count: 0,
  created_at: "2018-07-07T17:51:12+10:00"
};

describe("LinkEditor", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LinkEditor
        link={link}
        update={updateFunc}
        remove={removeFunc}
        position={0}
      />
    );
  });

  it("should not render ActionContent component by default", () => {
    expect(wrapper.find({ "data-test": "LinkEditor-ActionContent" }).exists())
      .to.be.false;
  });

  it("should render the ActionContent when the content state is set", () => {
    wrapper.setState({ content: Object.keys(actionTypes)[0] });
    expect(wrapper.find({ "data-test": "LinkEditor-ActionContent" }).exists())
      .to.be.true;
  });

  it("should pass the remove function as the action prop to ActiveToggle if the content is delete", () => {
    wrapper.setState({ content: "delete" });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActionContent" }).props().action
    ).to.eql(removeFunc);
  });

  it("should pass the false as the action prop to ActiveToggle if the content is not delete", () => {
    wrapper.setState({ content: "schedule" });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActionContent" }).props().action
    ).to.be.false;
  });

  it("should set the isActive prop to true if the active value in the link passed as a prop is 1", () => {
    wrapper.setProps({ link: { ...link, active: 1 } });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActiveToggle" }).props().isActive
    ).to.be.true;
  });

  it("should set the isActive prop to false if the active value in the link passed as a prop is 0", () => {
    wrapper.setProps({ link: { ...link, active: 0 } });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActiveToggle" }).props().isActive
    ).to.be.false;
  });

  it("should set the isSafe prop to true if the unsafe value in the link passed as a prop is 0", () => {
    wrapper.setProps({ link: { ...link, unsafe: 0 } });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActiveToggle" }).props().isSafe
    ).to.be.true;
  });

  it("should set the isSafe prop to false if the unsafe value in the link passed as a prop is 1", () => {
    wrapper.setProps({ link: { ...link, unsafe: 1 } });
    expect(
      wrapper.find({ "data-test": "LinkEditor-ActiveToggle" }).props().isSafe
    ).to.be.false;
  });
});
