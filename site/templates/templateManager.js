var app = app || {};
app.TemplateManager = {
	templates: {},
	get: function(id, callback) {
		var template = this.templates[id];

		if (template) {
			callback(template);
		} else  {
			$.get('/templates/' + id + '.html', function(text) {
				callback(text);
			}.bind(this));
		}
	}
}