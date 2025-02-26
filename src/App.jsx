import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Editor from "./routes/Editor";
import NotFound from "./routes/NotFound";
import Courses from "./routes/Courses";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NotFound />,
		errorElement: <NotFound />,
	},
	{
		path: "/courses",
		element: <Courses />,
	},
	{
		path: "/editor",
		element: <Editor />,
	},
]);

const App = () => {
	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
