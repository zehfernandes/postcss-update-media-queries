const postcss = require('postcss');

module.exports = postcss.plugin('generateMediaQueries', opts => {
    opts = opts || {};
    let overwrite = opts.overwrite || false;
    let customMedia = opts.medias;

    return function (root) {

        let query = [];
        let media = [];

        // Get the mobile rule
        root.walkRules(rule => {

            if (!rule.parent.params) {
                let clone = rule.clone({ selector: rule.selector });
                query.push(clone);
            }

        });

        // Get Media queries from css
        root.walkAtRules('media', rule => {
            media.push(rule.params);

            if (overwrite === true) {
                rule.remove();
            }

        });

        // If doest exist media default overwrite
        if (media.length <= 0 && query.length !== 0) {
            overwrite = true;
        }

        // Create the rule with media querie
        for (let i = 0, len = customMedia.length; i < len; i++) {

            if (media.indexOf(customMedia[i].name) === -1 ||
                overwrite === true) {

                let t = postcss.parse('@media ' + customMedia[i].name + ' {}');

                let cloneQuery = query.map(obj => {
                    return obj.clone({
                        selector: obj.selector + customMedia[i].alias
                    });
                });

                t.walkAtRules('media', rule => {
                    rule.append(cloneQuery);
                });

                // Position --REVIEW
                if (overwrite === true) {
                    root.append(t);
                } else {
                    let position = 1;

                    root.walkAtRules('media', rule => {

                        if (i === 0 && position === 1) {
                            root.insertBefore(rule, t);
                        } else if (i === position) {
                            root.insertAfter(rule, t);
                        }

                        position++;
                    });
                }
                // Position --REVIEW

            }
        }

        // Comment
        root.walkComments(comment => {
            const regexComment = /(Media Query Extensions:)[\s-\w=\s]+/;

            if (comment.text.match(regexComment) !== null) {

                let mediaComent = 'Media Query Extensions:';
                for (let i = 0, len = customMedia.length; i < len; i++) {
                    mediaComent += '\n  ';
                    let name = customMedia[i].name
                        .replace('(--breakpoint-', '').slice(0, -1);

                    mediaComent = mediaComent + customMedia[i].alias +
                        ' = ' + name;
                }

                let commentText = comment.text.replace(regexComment, '');
                comment.text = commentText + mediaComent;
            }
        });

    };
});
