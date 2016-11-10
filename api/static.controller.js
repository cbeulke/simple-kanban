module.exports = function() {
    return {
        serveMainPage: (req, res) => {
			res.file('index.html');
		},
        serveVendorModules: {
			directory: {
				path: 'node_modules'
			}
		},
        serveClientApp: {
			directory: {
				path: 'app'
			}
		}
    }
}();