import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <FloatingActionButton>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}