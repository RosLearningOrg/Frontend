import { Rnd } from "react-rnd";
import "./Content.css";

const CodeEditorContent = () => {
	return (
		<div className="code-container">
			<Rnd
				bounds="parent"
				className="code-item"
				size={{ width: "100%", height: 70 }}
				dragGrid={[1, 70]}
				dragAxis="y"
				enableResizing={{
					bottom: false,
					bottomLeft: false,
					bottomRight: false,
					left: false,
					right: false,
					top: false,
					topLeft: false,
					topRight: false,
				}}
			>
				<div className="code-item-inner">1</div>
			</Rnd>
			<Rnd
				bounds="parent"
				className="code-item"
				size={{ width: "100%", height: 70 }}
				dragGrid={[1, 70]}
				dragAxis="y"
				enableResizing={{
					bottom: false,
					bottomLeft: false,
					bottomRight: false,
					left: false,
					right: false,
					top: false,
					topLeft: false,
					topRight: false,
				}}
			>
				<div className="code-item-inner">2</div>
			</Rnd>
		</div>
	);
};

export default CodeEditorContent;
