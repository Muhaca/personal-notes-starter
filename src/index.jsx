import React from 'react';
import { createRoot } from 'react-dom/client';

// import style
import './styles/style.css';
import NotesComponent from './components/NotesComponent';

const root = createRoot(document.getElementById('root'));
root.render(<NotesComponent />);