import React from 'react';
import NotesList from './NotesList';
import { getInitialData } from '../utils';
import NotesInput from './NotesInput';
import NotesNavbar from './NotesNavbar';

class NotesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            search_note: '',
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onActionHandler = this.onActionHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);

    }

    onDeleteHandler(data) {
        if (!data?.id) return;

        const notes = this.state.notes.filter(note => note.id !== data.id);
        this.setState({ notes });
    }


    onActionHandler(data) {
        this.setState((prev) => {
            return {
                notes: prev.notes.map((note) =>
                    note.id === data.id ? { ...note, archived: !note.archived } : note
                ),
            };
        });
    }

    onAddNoteHandler(note) {
        if (!note || typeof note !== 'object') return;

        this.setState((prev) => ({
            notes: [...prev.notes, note]
        }));
    }


    onSearchHandler(search) {
        this.setState((prev) => ({ ...prev, search_note: search }));
    }

    render() {

        const activedNotes = this.state.notes.filter(({ archived }) => !archived).filter((note) => note.title.toLowerCase().includes(this.state.search_note.toLowerCase()));
        const archivedNotes = this.state.notes.filter(({ archived }) => archived).filter((note) => note.title.toLowerCase().includes(this.state.search_note.toLowerCase()));

        return (
            <>
                <NotesNavbar onSearch={this.onSearchHandler} />

                <div className='note-app__body'>
                    <NotesInput onSubmit={(e) => this.onAddNoteHandler(e)} />

                    <h2>Catatan Aktif</h2>
                    {activedNotes.length > 0 ?
                        <NotesList
                            notes={activedNotes}
                            onDelete={(note) => this.onDeleteHandler(note)}
                            onAction={(note) => this.onActionHandler(note)}
                        />
                        :
                        <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }

                    <h2>Catatan Arsip</h2>
                    {archivedNotes.length > 0 ?
                        <NotesList
                            notes={archivedNotes}
                            onDelete={(note) => this.onDeleteHandler(note)}
                            onAction={(note) => this.onActionHandler(note)}
                        />
                        :
                        <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }
                </div>
            </>
        );
    }

}

export default NotesComponent;