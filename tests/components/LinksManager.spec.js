import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinksManager from '../../src/components/LinksManager';
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunc = () => {};


describe('LinksManager', () => {
  let wrapper;
  let createSpy;

  beforeEach(() => {
    createSpy = sinon.spy();
    wrapper = mount(
      <LinksManager
        links={[]}
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
});