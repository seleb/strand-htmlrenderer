// basic html-renderer

import Strand from "strand";

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
		document.body.innerHTML = "";

		const input = document.createElement("section");
		const code = document.createElement("pre");
		code.innerText = passage.body;
		input.appendChild(code);

		const output = document.createElement("section");

		const program = this.strand.execute(passage.program);
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
		document.body.appendChild(document.createElement("br"));
		document.body.appendChild(input);

		return Promise.resolve();
	}
}
