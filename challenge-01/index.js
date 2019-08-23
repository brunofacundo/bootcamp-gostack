const express = require('express');

const server = express();

const projects = [];
let numberOfRequests = 0;

server.use(express.json());

function checkProjectExists(req, res, next) {
    const { id } = req.params;

    let project = projects.find(project => project.id == id);
    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

server.use((req, res, next) => {
    console.log('Number of requests:', ++numberOfRequests);
    return next();
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    let project = {
        id,
        title,
        tasks: []
    };
    projects.push(project);

    return res.json(project);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project = projects.find(project => project.id == id);
    project.title = title;

    return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    let index = projects.findIndex(project => project.id == id);
    projects.splice(index, 1);

    return res.json({ message: 'Project deleted.' });
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project = projects.find(project => project.id == id);
    project.tasks.push(title);

    return res.json(project);
});

server.listen(3333);
