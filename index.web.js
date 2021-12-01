function component() {
  const element = document.createElement('div');

  element.innerHTML = ['Hi', 'webpack'].join(' ');

  return element;
}

document.body.appendChild(component());
