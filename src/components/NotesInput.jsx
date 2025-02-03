import React from 'react';

class NotesInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            id: null,
            createdAt: null,
            archived: false
        };

        this.onInputHandler = this.onInputHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputHandler(e) {
        const { name, value } = e.target;

        if (name === 'title' && value.length > 50) return;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit({
                id: +new Date(),
                title: this.state.title,
                body: this.state.body,
                createdAt: new Date().toISOString(),
                archived: false,
            });

            this.setState({ title: '', body: '' });
        }
    }

    render() {

        return (
            <div className='note-input'>
                <h2>Buat catatan</h2>
                <form onSubmit={this.handleSubmit}>
                    <p className="note-input__title__char-limit">{`Sisa karakter: ${50 - this.state.title.length}`}</p>
                    <input
                        className="note-input__title"
                        name='title'
                        type="text"
                        placeholder="Ini adalah judul ..."
                        required={true}
                        value={this.state.title}
                        onChange={this.onInputHandler}
                    />
                    <textarea
                        className="note-input__body"
                        name='body'
                        type="text"
                        placeholder="Tuliskan catatanmu di sini ..."
                        required={true}
                        value={this.state.body}
                        onChange={this.onInputHandler}
                    />
                    <button type="submit">Buat</button>
                </form>
            </div>
        );
    }

}

export default NotesInput;