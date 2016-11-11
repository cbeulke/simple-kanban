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
		serveViews: {
			directory: {
				path: 'views'
			}
		},
        serveClientApp: {
			directory: {
				path: 'app'
			}
		}
    }
}();