// Export Actions as Detailed JSON — for Drafts (Script step)
//
// Drafts' scripting API has no method to enumerate every installed
// action or action group, so this script works from a list of action
// names you provide. It decodes each one's `installURL` (which embeds
// the action's full JSON definition — steps, icon, color, keyboard
// shortcut, etc.) and compiles them into one JSON document.
//
// Usage: paste the exact action names below (case-sensitive), one per
// line, in the prompt that appears when you run this.

function decodeActionJSON(action) {
	// installURL looks like: drafts://action?data=<url-encoded JSON>
	const marker = "?data=";
	const idx = action.installURL.indexOf(marker);
	if (idx === -1) {
		throw new Error("Unexpected installURL format");
	}
	const encoded = action.installURL.substring(idx + marker.length);
	return JSON.parse(decodeURIComponent(encoded));
}

// --- Prompt for the list of action names ---
let p = Prompt.create();
p.title = "Export Actions as JSON";
p.message = "Enter action names to export, one per line (must match exactly).";
p.addTextView("names", "Action Names", "", { height: 200 });
p.addButton("Export");

if (!p.show() || p.buttonPressed !== "Export") {
	context.cancel("Cancelled");
} else {
	const raw = p.fieldValues["names"] || "";
	const actionNames = raw
		.split("\n")
		.map((s) => s.trim())
		.filter((s) => s.length > 0);

	let exported = [];
	let missing = [];

	for (const name of actionNames) {
		const a = Action.find(name);
		if (!a) {
			missing.push(name + " (not found)");
			continue;
		}
		try {
			exported.push(decodeActionJSON(a));
		} catch (e) {
			missing.push(name + " (decode error: " + e.message + ")");
		}
	}

	const output = {
		exportedAt: new Date().toISOString(),
		count: exported.length,
		actions: exported,
	};

	const json = JSON.stringify(output, null, 2);

	// Write to a new draft
	let d = new Draft();
	d.content = json;
	d.addTag("actions-export");
	d.update();

	// Also write to a file in iCloud Drive/Drafts
	let fm = FileManager.createCloud();
	const filename =
		"actions-export-" + new Date().toISOString().slice(0, 10) + ".json";
	fm.writeString(filename, json);

	if (missing.length > 0) {
		alert(
			"Exported " +
				exported.length +
				" action(s).\n\nCould not export:\n" +
				missing.join("\n")
		);
	} else {
		app.displaySuccessMessage(
			"Exported " + exported.length + " action(s) to " + filename
		);
	}
}
