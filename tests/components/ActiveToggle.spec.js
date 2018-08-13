import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActiveToggle from "../../src/components/LinkEditor/ActiveToggle";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const id = 0;

describe("LinkEditor", () => {
  let wrapper;
  let updateSpy;

  beforeEach(() => {
    updateSpy = sinon.spy();
    wrapper = shallow(
      <ActiveToggle id={id} isActive={true} isSafe={true} update={updateSpy} />
    );
  });

  afterEach(() => {
    updateSpy = null;
  });

  it("should render the unsafe warning if isAtcive is true and isSafe is false", () => {
    wrapper.setProps({ isActive: true, isSafe: false });
    expect(
      wrapper.find({ "data-test": "ActiveToggle-unsafe-warning" }).exists()
    ).to.be.true;
  });

  it("should not render the unsafe warning if isActive is false", () => {
    wrapper.setProps({ isActive: false });
    expect(
      wrapper.find({ "data-test": "ActiveToggle-unsafe-warning" }).exists()
    ).to.be.false;
  });

  it("should render the unsafe warning if isActive is true and isSafe is true", () => {
    wrapper.setProps({ isActive: true, isSafe: true });
    expect(
      wrapper.find({ "data-test": "ActiveToggle-unsafe-warning" }).exists()
    ).to.be.false;
  });

  it("should pass the class name inactive to toggle-bg if the active prop is passed false", () => {
    wrapper.setProps({ isActive: false });
    expect(
      wrapper
        .find({ "data-test": "ActiveToggle-toggle-bg" })
        .hasClass("toggle-bg-inactive")
    ).to.be.true;
  });

  it("should pass the class name active to toggle-bg if the isActive prop is true and isSafe is true", () => {
    wrapper.setProps({ isActive: true, isSafe: true });
    expect(
      wrapper
        .find({ "data-test": "ActiveToggle-toggle-bg" })
        .hasClass("toggle-bg-active")
    ).to.be.true;
  });

  it("should pass the class name unsafe to toggle-bg if the isActive prop is true and isSafe is false", () => {
    wrapper.setProps({ isActive: true, isSafe: false });
    expect(
      wrapper
        .find({ "data-test": "ActiveToggle-toggle-bg" })
        .hasClass("toggle-bg-unsafe")
    ).to.be.true;
  });

  it("should call the update function with active 1 if isActive is passed the prop false on click", () => {
    wrapper.setProps({ isActive: false });
    wrapper.find({ "data-test": "ActiveToggle-toggle-bg" }).simulate("click");
    expect(updateSpy.calledOnceWith(id, { active: 1 })).to.be.true;
  });

  it("should call the update function with active 0 if isActive is passed the prop true on click", () => {
    wrapper.setProps({ isActive: true });
    wrapper.find({ "data-test": "ActiveToggle-toggle-bg" }).simulate("click");
    expect(updateSpy.calledOnceWith(id, { active: 0 })).to.be.true;
  });

  it("should pass the class name toggle-on to toggle if the isActive prop is true", () => {
    wrapper.setProps({ isActive: true });
    expect(
      wrapper.find({ "data-test": "ActiveToggle-toggle" }).hasClass("toggle-on")
    ).to.be.true;
  });

  it("should pass the class name toggle-off to toggle if the isActive prop is false", () => {
    wrapper.setProps({ isActive: false });
    expect(
      wrapper
        .find({ "data-test": "ActiveToggle-toggle" })
        .hasClass("toggle-off")
    ).to.be.true;
  });
});
