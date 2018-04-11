import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import AddItem from '../../src/components/addItem';


describe('Add Item', () => {
    let wrapper;
    const context = 'card';
    beforeEach(() => {
        wrapper = shallow(<AddItem context={context} />)
    });
    it('in add item', () => {
        expect(true).toBeTruthy();
    });
});