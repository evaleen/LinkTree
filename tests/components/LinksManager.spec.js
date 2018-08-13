import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinksManager from '../../src/components/LinksManager';
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunc = () => {};

const links = [{
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
}];

describe('LinksManager', () => {
  let wrapper;
  let createSpy;

  beforeEach(() => {
    createSpy = sinon.spy();
    wrapper = mount(
      <LinksManager
        links={links}
        create={createSpy}
        update={emptyFunc}
        remove={emptyFunc}
        reposition={emptyFunc}
      />);
  });

  afterEach(() => {
    createSpy = null;
  })

  it('should render a NavBar-NavLink for every item in lists', () => {
    wrapper.find({ 'data-test': "AddNewLinkButton" }).simulate('click');
    expect(createSpy.calledOnce).to.be.true;
  });

  it('should render a LinksManager-EmptyLinksMessage if the links list passed  as a prop is empty', () => {
    wrapper.setProps({ links: [] });
    expect(wrapper.find({ 'data-test': "LinksManager-EmptyLinksMessage" }).exists()).to.be.true;
  });

  it('should not render a LinksManager-EmptyLinksMessage if the links list passed  as a prop is not empty', () => {
    wrapper.setProps({ links });
    expect(wrapper.find({ 'data-test': "LinksManager-EmptyLinksMessage" }).exists()).to.be.false;
  });

  it('should render a LinksManager-LinksDnD if the links list passed  as a prop is not empty', () => {
    wrapper.setProps({ links });
    expect(wrapper.find({ 'data-test': "LinksManager-LinksDnD" }).exists()).to.be.true;
  });

  it('should not render a LinksManager-LinksDnD if the links list passed  as a prop is empty', () => {
    wrapper.setProps({ links: [] });
    expect(wrapper.find({ 'data-test': "LinksManager-LinksDnD" }).exists()).to.be.false;
  });
});