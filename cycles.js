let exampleCount = 0
const examples = document.getElementById('examples')

function addExample (name, initialSource) {
  exampleCount += 1

  const exampleContainer = document.createElement('div')
  exampleContainer.classList.add('example')
  examples.appendChild(exampleContainer)

  const titleElement = document.createElement('div')
  titleElement.classList.add('title')
  titleElement.innerText = name

  exampleContainer.appendChild(titleElement)

  const sourceElement = document.createElement('div')
  sourceElement.classList.add('source')

  const editor = ace.edit(sourceElement);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  exampleContainer.appendChild(sourceElement)

  const appElement = document.createElement('div')
  appElement.setAttribute('id', 'app1')
  exampleContainer.appendChild(appElement)

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

