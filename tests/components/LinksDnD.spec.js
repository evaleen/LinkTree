import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LinksDnD from "../../src/components/LinksDnD";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunc = () => {};

const links = [
  {
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
  },
  {
    id: 3113709,
    deleted: 0,
    active: 1,
    highlight: "wobble",
    unsafe: 0,
    url: "google.com",
    title: "My Second Link",
    position: 0,
    account: {},
    schedule_start: "2018-08-09T12:00:00+10:00",
    schedule_start_timezone: "",
    schedule_end: "2018-08-23T12:00:00+10:00",
    schedule_end_timezone: "",
    clicks: [],
    click_count: 0,
    created_at: "2018-07-07T17:51:12+10:00"
  }
];

describe("LinksDnD", () => {
  let wrapper;
  let repositionSpy;

  beforeEach(() => {
    repositionSpy = sinon.spy();
    wrapper = shallow(
      <LinksDnD
        links={links}
        update={emptyFunc}
        remove={emptyFunc}
        reposition={repositionSpy}
      />
    );
  });

  afterEach(() => {
    repositionSpy = null;
  });

  it("should call the reposition function onDragEnd", () => {
    const source = 0;
    const destination = 1;
    wrapper
      .find({ "data-test": "LinksDnD" })
      .props()
      .onDragEnd({
        source: { index: source },
        destination: { index: destination }
      });
    expect(repositionSpy.calledOnceWith(source, destination)).to.be.true;
  });

  it("should not call the reposition function onDragEnd if no destination is passed", () => {
    const source = 0;
    wrapper
      .find({ "data-test": "LinksDnD" })
      .props()
      .onDragEnd({ source: { index: source } });
    expect(repositionSpy.calledOnce).to.be.false;
  });
});
