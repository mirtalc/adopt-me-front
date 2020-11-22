module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Adopt me! Pet shelter'
      return args
    })
  }
}
