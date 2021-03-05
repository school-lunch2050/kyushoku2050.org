export default {
  functional: true,
  render: createElement => createElement('div', {}, [
    createElement('script', {
      attrs: {
        lang: 'javascript'
      },
      domProps: {
        innerHTML: `
          var err = false
          try {
            if ((new Function ('return {...{ok:1}}'))().ok !== 1) err = true
          } catch (e) {
            err = true
          }
          if (err) {
            var node = document.getElementById('outdated-browser')
            if (!node) {
              node = document.createElement('div')
              node.id = 'outdated-browser'
              node.innerHTML =
                '<p lang="en">This website does not support your browser. Please install a modern browser!</p>' +
                '<p lang="ja">このサイトは利用しているブラウザーを不対応です。モダンばブラウザーをインストールして使ってください！</p>'
              document.body.appendChild(node)
            }
          }
        `
      }
    }),
    createElement('noscript', {
      domProps: {
        innerHTML: `
        <p lang="en">Please enable JavaScript to use this Website</p>
        <p lang="ja">このサイトのために JavaScript が必要です！</p>
        `
      }
    })
  ])
}
