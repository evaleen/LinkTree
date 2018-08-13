import 'jsdom-global/register';
import React from "react";
import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActionContent from "../../src/components/LinkEditor/ActionContent";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const content = {
  title: "schedule",
  description: "Action content desc"
};

describe("LinkEditor", () => {
  let wrapper;
  let onCloseSpy;
  let actionSpy;

  beforeEach(() => {
    onCloseSpy = sinon.spy();
    actionSpy = sinon.spy();
    wrapper = mount(
      <ActionContent
      content={content}
      onClose={onCloseSpy}
      action={false}
      id={0}
    />
  );
});

  afterEach(() => {
    onCloseSpy = null;
    actionSpy = null;
  })

  it("should display the title text passed through the content prop in the ActionContent header", () => {
    expect(wrapper.find({ "data-test": "ActionContent-header" }).text().includes(content.title))
      .to.be.true;
  });


  it("should display the description text passed through the content prop in the ActionContent body", () => {
    expect(wrapper.find({ "data-test": "ActionContent-body" }).text().includes(content.description))
      .to.be.true;
  });


  it("should render the upgrade button if the action prop is passed a false", () => {
    wrapper.setProps({ action: false });
    expect(wrapper.find({ "data-test": "ActionContent-UpgradeButton" }).exists())
      .to.be.true;
  });

  it("should render action buttons if the action prop is passed a function", () => {
    wrapper.setProps({ action: actionSpy });
    expect(wrapper.find({ "data-test": "ActionContent-ActionButtons" }).exists())
      .to.be.true;
  });

  it("should call the onClose function passed as a prop when the close button is clicked", () => {
    wrapper.find({ "data-test": "ActionContent-close-button" }).simulate('click');
    expect(onCloseSpy.calledOnce).to.be.true;
  });

  it("should call the onClose function passed as a prop when the first action button is clicked and an action function has been passed as a prop", () => {
    wrapper.setProps({ action: actionSpy });
    wrapper.find({ "data-test": "ActionButton" }).at(0).simulate('click');
    expect(onCloseSpy.calledOnce).to.be.true;
  });

  it("should call the action function passed as a prop when the second action button is clicked", () => {
    wrapper.setProps({ action: actionSpy });
    wrapper.find({ "data-test": "ActionButton" }).at(1).simulate('click');
    expect(actionSpy.calledOnce).to.be.true;
  });
});
