import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import ExternalModule from 'webpack/lib/ExternalModule';

/**
 * 参考 https://www.npmjs.com/package/webpack-externals-plugin
 * 因为 webpack-externals-plugin 不支持最新的 webpack
 * 后续可以把该插件开源
 */
class ExternalsPlugin {
  constructor(opts) {
    this.opts = opts;
  }

  apply(compiler) {
    const opts = this.opts;
    compiler.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('factory', (factory) => {
        return (data, callback) => {
          factory(data, (err, module) => {
            if (err) {
              return callback(err);
            }
            if (ModuleFilenameHelpers.matchObject(opts, module.resource)) {
              return callback(null, new ExternalModule(
                data.request,
                opts.type || compiler.options.output.libraryTarget
              ));
            }
            callback(null, module);
          });
        };
      });
    });
  }
}

export default ExternalsPlugin;