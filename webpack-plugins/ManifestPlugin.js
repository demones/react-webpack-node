import path from 'path';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

/**
 * 参考 https://www.npmjs.com/package/webpack-manifest-plugin 实现
 * 原来的实现，对于 extract-text-webpack-plugin 定义的文件有点问题，改进了一下
 * 后期考虑开源
 */
class ManifestPlugin {
  constructor(opts = {}) {
    const defaultOpts = {
      basePath: '',
      fileName: 'manifest.json',
      stripSrc: null,
      transformExtensions: /^(gz|map)$/i,
      cache: null
    };

    this.opts = Object.assign(defaultOpts, opts);
  }

  getFileType(str) {
    const _str = str.replace(/\?.*/, '');
    const split = _str.split('.');
    let ext = split.pop();
    if (this.opts.transformExtensions.test(ext)) {
      ext = `${split.pop()}.${ext}`;
    }
    return ext;
  }

  apply(compiler) {
    const outputName = this.opts.fileName;
    let cache = this.opts.cache || {};
    const moduleAssets = {};

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('module-asset', (module, file) => {
        moduleAssets[file] = path.join(
          path.dirname(file),
          path.basename(module.userRequest)
        );
      });
    });

    compiler.plugin('emit', (compilation, compileCallback) => {
      const stats = compilation.getStats().toJson();
      const manifest = {};

      merge(cache, compilation.chunks.reduce((memo, chunk) => {
        const chunkName = chunk.name ? chunk.name.replace(this.opts.stripSrc, '') : null;
        // Map original chunk name to output files.
        // For nameless chunks, just map the files directly.
        /*eslint-disable prefer-template*/
        return chunk.files.reduce((memo, file) => {
          const fileType = this.getFileType(file);
          if (memo[chunkName + '.' + fileType]) {
            let fileName = file;
            fileName = fileName.split('/');
            fileName = fileName[fileName.length - 1];//取最后一个
            fileName = fileName.replace(fileType, '').replace(chunk.renderedHash, '');
            fileName = fileName.replace(/\.+$/, '');
            memo[fileName + '.' + fileType] = file;
          } else if (chunkName) {
            memo[chunkName + '.' + fileType] = file;
          } else {
            memo[file] = file;
          }
          return memo;
        }, memo);
      }, {}));

      // module assets don't show up in assetsByChunkName.
      // we're getting them this way;
      merge(cache, stats.assets.reduce((memo, asset) => {
        const name = moduleAssets[asset.name];
        if (name) {
          memo[name] = asset.name;
        }
        return memo;
      }, {}));

      // Append optional basepath onto all references.
      // This allows output path to be reflected in the manifest.
      console.info('this.opts.basePath', this.opts);
      if (this.opts.basePath) {
        cache = reduce(cache, (memo, value, key) => {
          memo[this.opts.basePath + key] = this.opts.basePath + value;
          return memo;
        }, {});
      }

      Object.keys(cache).sort().forEach((key) => {
        manifest[key] = cache[key];
      });

      const json = JSON.stringify(manifest, null, 2);

      compilation.assets[outputName] = {
        source () {
          return json;
        },
        size () {
          return json.length;
        }
      };

      compileCallback();

    });
  }
}

export default ManifestPlugin;
