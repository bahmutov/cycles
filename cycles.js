let editor = ace.edit("source1");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().on('change', function(e) {
  const source = packs.stripIndent(editor.getValue())
  try {
    eval(source)
  } catch (e) {
    // do nothing
  }
})
editor.setValue(inputExample.trim())
editor.getSelection().clearSelection()
