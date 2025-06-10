import { useEffect, useState } from 'react';

function LanguageStats({ username, repo }) {
    const [languages, setLanguages] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/languages/${username}/${repo}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch languages');
                return res.json();
            })
            .then(data => setLanguages(data.languages))
            .catch(err => console.error(err));
    }, [username, repo]);

    return (
        <div>
            <h3>Languages used in {repo}</h3>
            <ul>
                {Object.entries(languages).map(([lang, lines]) => (
                    <li key={lang}>
                        {lang}: {lines} lines
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LanguageStats;
