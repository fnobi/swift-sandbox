var config = require('config');
var fs = require('fs');
var child_process = require('child_process');

module.exports = {
    index: function (req, res) {
        res.render('index', config.options);
    },
    run: function (req, res) {
        var filename = req.param('filename');
        var source = req.param('source');

        if (!filename) {
            return res.json({
                error: 'give filename!'
            });
        }

        if (!/^[a-zA-Z\-_0-1]+$/.test(filename)) {
            return res.json({
                error: 'invalid filename.'
            });
        }

        if (!source) {
            return res.json({
                error: 'source is empty!'
            });
            
        }

        var sourcePath = 'sources/' + filename + '.swift';

        fs.writeFile(sourcePath, source, function (err) {
            if (err) {
                return res.json({
                    error: 'fail to write source.'
                });
            }

            child_process.exec('swift -i ' + sourcePath, function (err, stdout, stderr) {
                if (err) {
                    return res.json({
                        error: [
                            'exec error.',
                            err
                        ].join('\n')
                    });
                }

                res.json({
                    result: stdout + stderr
                });
            });
        });
    }
};
