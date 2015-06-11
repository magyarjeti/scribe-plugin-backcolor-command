define("scribe-plugin-backcolor-command", ['element'], function($__0) {
  "use strict";
  var __moduleName = "scribe-plugin-backcolor-command";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Element = $__0.default;
  var $__default = function() {
    return function(scribe) {
      var backColorCommand = new scribe.api.Command('backColor');
      var clean = function(root) {
        for (var i = 0; i < root.childNodes.length; i++) {
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
        scribe.transactionManager.run(function() {
          clean(rangeContent);
          range.insertNode(rangeContent);
          range.surroundContents(wrapper);
        }.bind(this));
      };
      scribe.commands.backColor = backColorCommand;
    };
  };
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
