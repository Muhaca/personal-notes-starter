import React from 'react';

class NotesNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onInputHandler = this.onInputHandler.bind(this);
    }

    onInputHandler(e) {
        this.setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    render() {

        const { onSearch } = this.props;

        return (
            <div className='note-app__header'>
                <h1>Notes</h1>
                <input
                    placeholder='Cari catatan...'
                    name='search'
                    type="text"
                    value={this.state.search}
                    onChange={(e) => { this.onInputHandler(e); onSearch(e.target.value); }}
                />
            </div>
        );
    }

}

export default NotesNavbar;