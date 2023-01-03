// basic html-renderer

import Strand from "strand-core";

export default class {
	constructor(source) {
		this.strand = new Strand({
			renderer: this,
			source
		});

		this.strand.goto("start");
	}

	preprocessText(text){
		return String(text).replace(/\n/g,"<br>");
	}

	displayPassage(passage) {
		// clear the old page
		document.body.innerHTML = "";

		const output = document.createElement("section");

		// execute the passage
		const program = this.strand.execute(passage.program);

		// parse the returned program into plain text and interactive action elements
		for (let node of program) {
			switch (node.name) {
				case "text":
					const span = document.createElement("span");
					span.innerHTML = this.preprocessText(node.value);
					output.appendChild(span);
					break;
				case "action":
					const a = document.createElement("a");
					a.innerHTML = this.preprocessText(node.value.text);
					a.href = "#";
					a.onclick = () => {
						this.strand.eval(node.value.action);
					};
					output.appendChild(a);
					break;
				default:
					throw new Error(
						`Unrecognized program node type: ${node.name}`
					);
			}
		}

		document.body.appendChild(output);

		// also include the passage source for demo purposes
		const input = document.createElement("section");
		const code = document.createElement("pre");
		code.innerText = passage.body;
		input.appendChild(code);
		document.body.appendChild(input);

		return Promise.resolve();
	}
}
