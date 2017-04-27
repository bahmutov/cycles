const inputExample = `
// grabs @cycle/run and @cycle/dom "magically"
const {run: Run, dom: DOM } = window.packs
const {run} = Run
const {div, label, input, hr, h1, makeDOMDriver} = DOM
function main({DOM}) {
  const input$ = DOM.select('.field').events('input')
  const name$ = input$.map(ev => ev.target.value).startWith('')
  const vdom$ = name$.map(name =>
    div([
      label('Name:'),
      input('.field', {attrs: {
        type: 'text', placeholder: 'Type your name'}
      }),
      h1('Hello ' + (name || 'stranger') + '!'),
    ])
  )

  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app1') })
`
