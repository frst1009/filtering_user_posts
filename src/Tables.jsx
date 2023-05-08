import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';


function FilteringUserPostsApp() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filteredPosts = selectedUserId ? posts.filter(post => post.userId === selectedUserId) : posts;

    return (
        <div>
            <h1>Filtering User Posts</h1>
            <div>
                    <select value={selectedUserId} onChange={(event) => setSelectedUserId(parseInt(event.target.value))}>
                        <option value={null}>All Users</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            </div>
        </div>
    );
}

export default FilteringUserPostsApp;
