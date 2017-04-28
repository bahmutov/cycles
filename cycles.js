/* global ace, packs */
let exampleCount = 0
const examples = document.getElementById('examples')

function addExample (name, initialSource) { // eslint-disable-line no-unused-vars
  exampleCount += 1
  const outputLabel = 'app' + exampleCount

  function setOutputId (source) {
    const defaultId = 'app1'
    return source.replace(defaultId, outputLabel)
  }

  const exampleContainer = document.createElement('div')
  exampleContainer.classList.add('example')
  examples.appendChild(exampleContainer)

  const titleElement = document.createElement('div')
  titleElement.classList.add('title')
  titleElement.innerText = name

  exampleContainer.appendChild(titleElement)

  const panelElement = document.createElement('div')
  panelElement.classList.add('panel')

  const sideBySideElement = document.createElement('div')
  sideBySideElement.classList.add('side-by-side')
  panelElement.appendChild(sideBySideElement)

  exampleContainer.appendChild(panelElement)

  const sourceElement = document.createElement('div')
  sourceElement.classList.add('source')
  sourceElement.classList.add('side-by-side-half')

  const editor = ace.edit(sourceElement)
  editor.setTheme('ace/theme/monokai')
  editor.getSession().setMode('ace/mode/javascript')
  sideBySideElement.appendChild(sourceElement)

  const appElement = document.createElement('div')
  appElement.setAttribute('id', outputLabel)
  appElement.classList.add('app')
  appElement.classList.add('side-by-side-half')
  sideBySideElement.appendChild(appElement)

  const prepareSource = text => packs.stripIndent(setOutputId(text.trim()))

  editor.getSession().on('change', function (e) {
    const source = prepareSource(editor.getValue())
    try {
      eval(source) // eslint-disable-line no-eval
    } catch (e) {
      console.error(e.message)
    }
  })
  editor.setValue(prepareSource(initialSource))
  editor.getSelection().clearSelection()
}
