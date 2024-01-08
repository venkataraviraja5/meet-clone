import './App.css';
import Chat from './components/Chat';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';

function App() {
 
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/:id",
      element:<Chat />
    }
  ])

  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
