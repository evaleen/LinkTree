import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActionButton from "../../src/components/LinkEditor/ActionButton";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const type = "schedule";

describe("LinkEditor", () => {
  let wrapper;
  let onClickSpy;

  beforeEach(() => {
    onClickSpy = sinon.spy();
    wrapper = shallow(
      <ActionButton
        type={type}
        isActive={true}
        onClick={onClickSpy}
      />
    );
  });

  afterEach(() => {
    onClickSpy = null;
  })

  it("should set the class name of ActionButton to include action-button-active if isActive is passed true", () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper.find({ "data-test": "ActionButton" }).hasClass('action-button-active'))
      .to.be.true;
  });

  it("should not set the class name of ActionButton to include action-button-active if isActive is passed false", () => {
    wrapper.setProps({ isActive: false });
    expect(wrapper.find({ "data-test": "ActionButton" }).hasClass('action-button-active'))
      .to.be.false;
  });

  it("should call the onClick function passed as a prop with the type as a parameter when the button is clicked", () => {
    wrapper.find({ "data-test": "ActionButton" }).simulate('click');
    expect(onClickSpy.calledOnceWith(type)).to.be.true;
  });
});
