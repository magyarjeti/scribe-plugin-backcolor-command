import Element from 'scribe-common/src/element';

export default function() {
    return function(scribe) {
        var backColorCommand = new scribe.api.Command('backColor');

        var clean = function(root) {
            for (var i=0; i < root.childNodes.length; i++) {
                var node = root.childNodes[i];
                if (node.nodeType !== 1) {
                    continue;
                }

                node.style.backgroundColor = "";
                clean(node);

                if (node.attributes.length == 1 && !node.getAttribute('style')) {
                    Element.unwrap(root, node);
                    i--;
                }
            }
        };

        backColorCommand.execute = function(color) {
            var selection = new scribe.api.Selection();
            var range = selection.range;
            var rangeContent = range.extractContents();

            var wrapper = document.createElement("span");
            wrapper.style.backgroundColor = color;

            scribe.transactionManager.run(function () {
                clean(rangeContent);

                range.insertNode(rangeContent);
                range.surroundContents(wrapper);
            }.bind(this));
        };

        scribe.commands.backColor = backColorCommand;
    };
}
