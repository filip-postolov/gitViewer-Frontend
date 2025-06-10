import { useEffect, useState } from 'react';

function RepoList({ username }) {
    const [repos, setRepos] = useState([]);
    const [sort, setSort] = useState("name");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/github/${username}?sort=${sort}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Error fetching repos: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                setRepos(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [username, sort]);

    if (loading) return <p>Loading repositories...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!repos.length) return <p>No repositories found for user {username}</p>;

    return (
        <div>
            <h2>Repositories for {username}</h2>

            <label htmlFor="sort-select">Sort by: </label>
            <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ marginBottom: '1rem' }}
            >
                <option value="name">Name</option>
                <option value="created">Created Date</option>
                <option value="updated">Updated Date</option>
                <option value="language">Language</option>
                <option value="watchers">Watchers</option>
            </select>

            <ul>
                {repos.map((repo) => (
                    <li key={repo.name}>
                        <strong>
                            <a href={repo.htmlUrl} target="_blank" rel="noreferrer">
                                {repo.name}
                            </a>
                        </strong>
                        <br />
                        Language: {repo.language ?? 'Unknown'} <br />
                        Created: {new Date(repo.createdAt).toLocaleDateString()} <br />
                        Updated: {new Date(repo.updatedAt).toLocaleDateString()} <br />
                        Watchers: {repo.watchers}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepoList;
