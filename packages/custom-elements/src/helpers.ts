const html = (strings, ...props) => {
  const N = props.length;
  let out = '';
  for (let i=0; i<N;i++) {
   out += strings[i] + props[i];
  }
  out += strings[N];
  return out;
}

export {html}