import Lists from './components/Lists';

function App() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-medium">Task List</h1>
      <Lists />
    </div>
  );
}

export default App;
