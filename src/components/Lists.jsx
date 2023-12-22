import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// categories
const todoCategories = [
  {
    id: 'todo',
    name: 'Todo',
  },
  {
    id: 'ongoing',
    name: 'On Going',
  },
  {
    id: 'completed',
    name: 'Completed',
  },
  {
    id: 'notyet',
    name: 'Not Yet',
  },
];
// assume it's coming from database
let todos = {
  todo: [
    {
      id: '1',
      title: 'Do this',
      category: 'todo',
    },
  ],
  ongoing: [
    {
      id: '2',
      title: 'Do prayer',
      category: 'ongoing',
    },
  ],
  completed: [
    {
      id: '3',
      title: 'inform him',
      category: 'completed',
    },
  ],
};

function Lists() {
  const [observedTodos, setObservedTodos] = useState(() =>
    Object.assign({}, todos)
  );
  const [categories, setCategories] = useState(todoCategories);

  return (
    <div className="mt-10">
      <AddCategoryView setCategories={setCategories} />
      <AddTaskView categories={categories} />
      <DragDropContext
        onDragEnd={(res, provided) => {
          if (!res.destination) return;
          let draggedTodo = observedTodos[res.source.droppableId].splice(
            res.source.index,
            1
          )[0];
          draggedTodo.category = res.destination.droppableId;
          if (!observedTodos[res.destination.droppableId]) {
            observedTodos[res.destination.droppableId] = [];
          }
          observedTodos[res.destination.droppableId].splice(
            res.destination.index,
            0,
            draggedTodo
          );
          setObservedTodos(() => Object.assign({}, observedTodos));
        }}>
        <div className="grid grid-cols-3 gap-10">
          {Object.values(categories).map((category) => (
            <ListTaskCategory
              category={category}
              todos={observedTodos[category.id] ?? []}
              key={category.id}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

function AddTaskView({ categories }) {
  const [task, setTask] = useState({
    id: 0,
    title: '',
    category: '',
  });

  const addTask = () => {};

  return (
    <div className="w-full border-b pb-5 mb-5 flex flex-col max-w-2xl">
      <p className="font-medium">Add New Task</p>
      <input
        type="text"
        placeholder="e.g I wanna do..."
        className="border rounded-md py-2 px-5 outline-none mt-2"
        onChange={(e) =>
          setTask((task) => ({ ...task, title: e.target.value }))
        }
      />
      <select
        onChange={(e) =>
          setTask((task) => ({ ...task, category: e.target.value }))
        }
        className="mt-5 py-3 border rounded-lg px-4 focus:outline-none">
        <option>Select the category</option>
        {categories.map((category) => (
          <option value={category.id}>{category.name}</option>
        ))}
      </select>
      <button
        onClick={addTask}
        className="px-4 cursor-pointer py-2 bg-indigo-500 hover:bg-indigo-400 text-white transition-all rounded-full w-max mt-5">
        Add Task
      </button>
    </div>
  );
}

function AddCategoryView({ setCategories }) {
  const categoryNameRef = useRef(null);

  const addCategory = () => {
    if (!categoryNameRef.current) return;
    const name = categoryNameRef.current.value?.trim();
    if (name === '') return;
    const newCategory = {
      id: name.replaceAll(' ', '_').toLowerCase(),
      name,
    };
    setCategories((category) => [...category, newCategory]);
  };

  return (
    <div className="w-full border-b pb-5 mb-5 flex items-center gap-4">
      <input
        className="border rounded-md px-5 py-3 focus:outline-none"
        type="text"
        placeholder="Enter category name"
        ref={categoryNameRef}
      />
      <button
        onClick={addCategory}
        className="px-4 cursor-pointer py-2 bg-indigo-500 hover:bg-indigo-400 text-white transition-all rounded-full">
        Add
      </button>
    </div>
  );
}

function ListTaskCategory({ category, todos }) {
  return (
    <div className="border rounded-lg">
      <p className="text-lg font-medium p-5 bg-gray-50 rounded-lg border-b">
        {String(category.name).toUpperCase()}
      </p>
      <Droppable droppableId={category.id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="flex flex-col gap-2 py-5">
            {todos.map((todo, i) => {
              return <TodoView index={i} todo={todo} key={todo.id} />;
            })}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function TodoView({ todo, index }) {
  return (
    <Draggable index={index} draggableId={todo.id}>
      {(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="px-5 py-2">
          <p>{todo.title}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Lists;
