// the output element id '#app1' will be replaced with actual dynamic
// element id when adding to the page

const counterExample = `
// grabs @cycle/run, @cycle/dom, xstream "magically"
const {run: Run, dom: DOM } = window.packs;
const xs = window.packs.xstream.default;
const {run} = Run;
const {h1, makeDOMDriver} = DOM;
function main() {
  const sinks = {
    DOM: xs.periodic(1000).map(i =>
      h1('' + i + ' seconds elapsed')
    )
  };
  return sinks;
}
run(main, { DOM: makeDOMDriver('#app1') });
`

const inputExample = `
const {run: Run, dom: DOM } = window.packs;
const {run} = Run;
const {div, label, input, hr, h1, makeDOMDriver} = DOM;
function main({DOM}) {
  const input$ = DOM.select('.field').events('input');
  const name$ = input$.map(ev => ev.target.value).startWith('');
  const vdom$ = name$.map(name =>
    div([
      label('Name:'),
      input('.field', {attrs: {
        type: 'text', placeholder: 'Type your name'}
      }),
      h1('Hello ' + (name || 'stranger') + '!'),
    ])
  );
  return { DOM: vdom$ };
}
run(main, { DOM: makeDOMDriver('#app1') });
`

// add each example to the page
addExample('Counter', counterExample)
addExample('Input example 2', inputExample)
