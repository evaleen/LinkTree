import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar, { links } from '../../src/components/NavBar';

Enzyme.configure({ adapter: new Adapter() });

describe('NavBar', () => {
  let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavBar />);
});

  it('should render a NavBar-NavLink for every item in lists', () => {
    expect(wrapper.find({ 'data-test': "NavBar-NavLink" })).to.have.length(links.length);
  });

  it('should set the state activeLink to the number passed as a parameter ', () => {
    const index = 2;
    wrapper.instance().updateActiveLink(index);
    wrapper.update();
    expect(wrapper.state().activeLink).to.eql(index);
  });
});