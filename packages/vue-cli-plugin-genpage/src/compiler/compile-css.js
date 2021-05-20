import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import CleanCss from 'clean-css'

const cleanCss = new CleanCss()

module.exports.compileCss = async (source) => {
  const config = await postcssrc({}, {
    plugins: {
      autoprefixer: {}
    }
  })
  const { css } = await postcss(config.plugins).process(source, {
    from: undefined
  })

  return cleanCss.minify(css).styles
}
