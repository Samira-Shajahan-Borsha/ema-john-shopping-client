import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import './App.css';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
