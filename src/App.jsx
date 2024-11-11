import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Editor from "./routes/Editor";
import NotFound from "./routes/NotFound";
import Courses from "./routes/Courses";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <NotFound />,
	},
	{
		path: "/editor",
		element: <Editor />,
	},
	{
		path: "/courses",
		element: <Courses />,
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
