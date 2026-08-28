// Process Post for sending to Workflow

// Create backup draft prior to processing
var d = Draft.create();
d.content = draft.processTemplate("[[draft]]");
d.update();

//Update the current draft text converted to HTML

var content = draft.content;
var conv = draft.processTemplate("%%[[draft]]%%");
draft.content = conv;
draft.update();

// Add id tags to HTML headers based on their content

var newContent = content.replace(/<h(\d)>(.*?)<\/h\d>/gi, '<h$1 id="$2">$2</h$1>');

// make the ids lowercase and hyphenated

newContent = newContent.replace(/id=".*?"/gi, function makeID(a){
	a = a.replace(/\s/g, "-");
	a = a.toLowerCase();
	return a;
});
draft.update();

// Add changes to HTML <img> tags

var content = draft.content;

newContent = content.replace(/img src/gi, "img class=\"aligncenter\" style=\"maxwidth:1136\" src");

draft.content = newContent
draft.update();