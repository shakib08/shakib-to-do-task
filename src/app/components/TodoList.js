// TodoList.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/actions';

const TodoList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = () => {
    dispatch(editTask(editingTask, { title: editedTitle, description: editedDescription }));
    setEditingTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  return (
    <ul className="divide-y divide-gray-300">
      {tasks.map((task) => (
        <li key={task.id} className="py-4">
          {editingTask === task.id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
              ></textarea>
              <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2">
                Save
              </button>
              <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <button onClick={() => handleEdit(task)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={() => dispatch(deleteTask(task.id))} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
