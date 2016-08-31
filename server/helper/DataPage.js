/**
 * 功能描述：分页实体类
 * @namespace
 * @param options {Object}
 * options 可选属性有：
 > * pageSize 每页显示的记录数
 > * currentPage 当前页
 > * nextPage 下一页
 > * lastPage 是否为最后一页
 > * pageCount 总页码
 > * totalCount 记录总数
 > * items 分页结果集

 * @constructor
 */

class DataPage {
  constructor(options = {}) {
    this.pageSize = options.pageSize || 20; //默认每页显示20条记录
    this.currentPage = options.currentPage || 1;
  }

  /**
   * 设置分页属性值
   * @param options
   */
  setPageOptions(options) {
    Object.assign(this, options);
  }
}

export default DataPage;
