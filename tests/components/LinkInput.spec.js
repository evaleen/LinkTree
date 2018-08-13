import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LinkInput from "../../src/components/LinkEditor/LinkInput";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const value = "My website";
const placeholder = "title";
const type = "title";
const id = 1;

const regexValue = "https://google.ie";
const regexPlaceholder = "Url";
const regexType = "url";
const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;

describe("LinkEditor - no regex checking", () => {
  let wrapper;
  let updateSpy;

  beforeEach(() => {
    updateSpy = sinon.spy();
    wrapper = shallow(
      <LinkInput
        value={value}
        placeholder={placeholder}
        type={type}
        id={id}
        update={updateSpy}
      />
    );
  });

  afterEach(() => {
    updateSpy = null;
  });

  it("should render the LinkInput-text if the isEditing state is false", () => {
    wrapper.setState({ isEditing: false });
    expect(wrapper.find({ "data-test": "LinkInput-text" }).exists()).to.be.true;
  });

  it("should put the placeholder prop in the LinkInput-text if the value passed as a prop is empty", () => {
    wrapper.setProps({ value: "" });
    wrapper.setState({ isEditing: false });
    expect(wrapper.find({ "data-test": "LinkInput-text" }).text().includes(placeholder)).to.be.true;
  });

  it("should put the value prop in the LinkInput-text if the value passed as a prop is not empty", () => {
    wrapper.setProps({ value });
    wrapper.setState({ isEditing: false });
    expect(wrapper.find({ "data-test": "LinkInput-text" }).text().includes(value)).to.be.true;
  });

  it("should render the LinkInput-input if the isEditing state is true", () => {
    wrapper.setState({ isEditing: true });
    expect(wrapper.find({ "data-test": "LinkInput-input" }).exists()).to.be.true;
  });

  it("should render the LinkInput-edit-button if the isEditing state is false", () => {
    wrapper.setState({ isEditing: false });
    expect(wrapper.find({ "data-test": "LinkInput-edit-button" }).exists()).to.be.true;
  });

  it("should not render the LinkInput-edit-button if the isEditing state is true", () => {
    wrapper.setState({ isEditing: true });
    expect(wrapper.find({ "data-test": "LinkInput-edit-button" }).exists()).to.be.false;
  });

  it("should set the isEditing state to true when the edit button is clicked", () => {
    wrapper.setState({ isEditing: false });
    wrapper.find({ "data-test": "LinkInput-edit-button" }).simulate('click');
    expect(wrapper.state().isEditing).to.be.true;
  });

  it("should set the class of LinkInput to link-input-empty if no value is passed as a prop", () => {
    wrapper.setProps({ value: "" });
    expect(wrapper.find({ "data-test": "LinkInput" }).hasClass('link-input-empty')).to.be.true;
  });

  it("should not set the class of LinkInput to link-input-empty if a value is passed as a prop", () => {
    wrapper.setProps({ value });
    expect(wrapper.find({ "data-test": "LinkInput" }).hasClass('link-input-empty')).to.be.false;
  });

  it("should set the class of LinkInput to link-input-error if hasError state is true", () => {
    wrapper.setState({ hasError: true });
    expect(wrapper.find({ "data-test": "LinkInput" }).hasClass('link-input-error')).to.be.true;
  });

  it("should not set the class of LinkInput to link-input-error if hasError state is false", () => {
    wrapper.setState({ hasError: false });
    expect(wrapper.find({ "data-test": "LinkInput" }).hasClass('link-input-error')).to.be.false;
  });

  it("should call the update function when isEditing and an onChange event occurs", () => {
    wrapper.setState({ isEditing: true });
    wrapper.find({ "data-test": "LinkInput-input" }).simulate('change', { target: { value } })
    expect(updateSpy.calledOnceWith(id, { [type]: value })).to.be.true;
  });
});


describe("LinkEditor - regex checking", () => {
  let wrapper;
  let updateSpy;

  beforeEach(() => {
    updateSpy = sinon.spy();
    wrapper = shallow(
      <LinkInput
        value={regexValue}
        placeholder={regexPlaceholder}
        type={regexType}
        id={id}
        update={updateSpy}
        regex={regex}
      />
    );
  });

  afterEach(() => {
    updateSpy = null;
  });

  it("should set the hasError state if a value that doesn't match the regex is passed in onChange", () => {
    wrapper.setState({ isEditing: true });
    wrapper.find({ "data-test": "LinkInput-input" }).simulate('change', { target: { value: 'no-a-url' } });
    expect(wrapper.state().hasError).to.be.true;
  });

  it("should not set the hasError state if a value that doesn match the regex is passed in onChange", () => {
    wrapper.setState({ isEditing: true });
    wrapper.find({ "data-test": "LinkInput-input" }).simulate('change', { target: { value: regexValue } });
    expect(wrapper.state().hasError).to.be.false;
  });

  it("should call the update function with the unsafe value as 1 if hasError is true", () => {
    const notAUrl = 'not-a-url';
    wrapper.setState({ isEditing: true });
    wrapper.find({ "data-test": "LinkInput-input" }).simulate('change', { target: { value: notAUrl } });
    expect(updateSpy.calledOnceWith(id, { [regexType]: notAUrl, unsafe: 1 })).to.be.true;
  });

  it("should call the update function with the unsafe value as 0 if hasError is true", () => {
    wrapper.setState({ isEditing: true });
    wrapper.find({ "data-test": "LinkInput-input" }).simulate('change', { target: { value: regexValue } });
    expect(updateSpy.calledOnceWith(id, { [regexType]: regexValue, unsafe: 0 })).to.be.true;
  });
});