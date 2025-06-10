import { useState } from 'react';
import RepoList from './RepoList.jsx';
import LanguageStats from './LanguageStats.jsx';

function UsernameForm({ onSubmit }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            <button type="submit">Load Repos</button>
        </form>
    );
}

function App() {
    const [username, setUsername] = useState('filip-postolov');

    return (
        <div className="App">
            <UsernameForm onSubmit={setUsername} />
            <RepoList username={username} />
            {/* Optionally update LanguageStats props dynamically as well */}
            {/* <LanguageStats username={username} repo="gitViewer" /> */}
        </div>
    );
}

export default App;
