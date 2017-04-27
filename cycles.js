let exampleCount = 0

function addExample (name, initialSource) {
  exampleCount += 1

  let sourceElement = document.createElement('div')
  sourceElement.classList.add('source')

  let editor = ace.edit(sourceElement);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  const examples = document.getElementById('examples')
  examples.appendChild(sourceElement)

  let appElement = document.createElement('div')
  appElement.setAttribute('id', 'app1')
  examples.appendChild(appElement)

  editor.getSession().on('change', function(e) {
    const source = packs.stripIndent(editor.getValue())
    try {
      console.log('Evaluating example')
      eval(source)
    } catch (e) {
      // do nothing
    }
  })
  editor.setValue(initialSource.trim())
  editor.getSelection().clearSelection()
}

