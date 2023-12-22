import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const type = ['todo', 'ongoing', 'completed'];

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
  return (
    <div className="mt-10">
      <DragDropContext
        onDragEnd={(res, provided) => {
          let draggedTodo = todos[res.source.droppableId].splice(
            res.source.index,
            1
          )[0];
          draggedTodo.category = res.destination.droppableId;
          todos[res.destination.droppableId].splice(
            res.destination.index,
            0,
            draggedTodo
          );
        }}>
        <div className="grid grid-cols-3 gap-10">
          {type.map((t) => (
            <ListType type={t} todos={todos[t]} key={t} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

function ListType({ type, todos }) {
  return (
    <div className="border rounded-lg">
      <p className="text-lg font-medium p-5 bg-gray-50 rounded-lg border-b">
        {String(type).toUpperCase()}
      </p>
      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="flex flex-col gap-2">
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
