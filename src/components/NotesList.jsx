import React from 'react';
import { showFormattedDate } from '../utils';

class NotesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { notes, onDelete, onAction } = this.props;

        return (
            <div className='notes-list'>
                {notes || notes.lenght > 0 ? notes.map(note => (
                    <div key={note?.id} className='note-item'>
                        <div className='note-item__content'>
                            <h3 className="note-item__title">{note?.title || ''}</h3>
                            <p className="note-item__date">{showFormattedDate(note?.createdAt || '')}</p>
                            <p className="note-item__body">
                                {note?.body || ''}
                            </p>
                        </div>
                        <div className="note-item__action">
                            <button className="note-item__delete-button" onClick={() => onDelete(note)}>Delete</button>
                            {!note.archived ?
                                <button className="note-item__archive-button" onClick={() => onAction(note)}>Arsipkan</button>
                                :
                                <button className="note-item__archive-button" onClick={() => onAction(note)}>Pindahkan</button>
                            }
                        </div>
                    </div>
                )) : null}

            </div>
        );
    }

}

export default NotesList;