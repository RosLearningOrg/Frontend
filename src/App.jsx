import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Editor from "./routes/Editor";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
    {
        path: "/editor",
        element: <Editor />,
        errorElement: <NotFound />
    }
])

const App = () => {
	return (
		<div className="app">
           <RouterProvider router={router} />
		</div>
	);
};

export default App;
