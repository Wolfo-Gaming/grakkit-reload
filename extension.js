// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios').default;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "grakkit-autoreload" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('grakkit-autoreload.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from grakkit-autoreload!');
	});
	let output = vscode.window.createOutputChannel("Grakkit");
	let save = vscode.workspace.onDidSaveTextDocument((document) => {
		let config = vscode.workspace.getConfiguration("grakkit")
		if (config.get("enableReload") == true) {
			if (document.fileName.endsWith(".js") || document.fileName.endsWith(".json") || document.fileName.endsWith(".ts") || document.fileName.endsWith(".jsx") || document.fileName.endsWith(".tsx")) {
				console.log(config.get("endpoint"))

				console.log(document.languageId)
				axios.post(config.get("endpoint"), {
					filename: document.fileName,
					language: document.languageId
				}).then(() => {
					console.log("Success")
				}).catch((error) => {
					vscode.window.showErrorMessage("Error occurred while reaching: " + config.get("endpoint") + " see output for more information.")
					output.appendLine("Error while reaching endpoint: " + error)
					console.log("Error")
				})
				console.log(document.fileName)
			}

		}
	})
	context.subscriptions.push(save)
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
