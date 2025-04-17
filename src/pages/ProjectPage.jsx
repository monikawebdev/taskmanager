import React, { useState } from 'react';

const ProjectPage = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'College',
            tasks: ['Finish research paper', 'Study for exam'],
        },
        {
            id: 2,
            name: 'Personal',
            tasks: ['Buy groceries', 'Call plumber'],
        },
        {
            id: 3,
            name: 'Freelance',
            tasks: ['Update portfolio', 'Submit invoice'],
        },
    ]);

    const addProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: `New Project ${projects.length + 1}`,
            tasks: [],
        };
        setProjects([...projects, newProject]);
    };

    const deleteProject = (id) => {
        setProjects(projects.filter((project) => project.id !== id));
    };

    const editProject = (id) => {
        const projectName = prompt('Enter the new project name:');
        if (projectName) {
            setProjects(
                projects.map((project) =>
                    project.id === id ? { ...project, name: projectName } : project
                )
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-300 to-purple-400 flex justify-center items-center p-10">
            <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-7xl">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-purple-800">Projects</h1>
                    <button
                        onClick={addProject}
                        className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
                    >
                        + New Project
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-8 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{project.name}</h2>
                                <div className="space-x-4">
                                    <button
                                        onClick={() => editProject(project.id)}
                                        className="text-white hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="text-red-300 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <ul className="list-disc list-inside">
                                {project.tasks.map((task, index) => (
                                    <li key={index} className="text-white/90">
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;