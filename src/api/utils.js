import moment from 'moment'

moment.locale('zh-cn')
import _ from 'lodash'

/**
 * Utils工具类, 提供通用的Array, Collection, Date, Function, Lang, Math,
 * Number, Object, Seq, String, 及其他工具方法
 * base on moment.js^2.18.1, lodash.js^4.17.4
 */
const Utils = {
  test: function () {
    console.info('utils.test')
    // console.log(moment.locale())
  },
  // ======Array 工具方法 begin======
  concat: function (array, [values]) {
    return _.concat(array, [values])
  },
  indexOf: function (array, value, fromIndex = 0) {
    return _.indexOf(array, value, fromIndex)
  },
  /**
   * Removes all elements from array that predicate returns truthy for
   * and returns an array of the removed elements.
   * The predicate is invoked with three arguments: (value, index, array).
   */
  remove: function (arr, predicate) {
    return _.remove(arr, predicate)
  },
  // ======Array 工具方法 end========
  // ======Collection 工具方法 begin======
  // ======Collection 工具方法 end========
  // ======Date 工具方法 begin======
  curDateTime: function () {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  },
  curDate: function () {
    return moment().format('YYYY-MM-DD')
  },
  curTime: function () {
    return moment().format('HH:mm:ss')
  },
  // ======Date 工具方法 end========
  // ======Function 工具方法 begin======
  // ======Function 工具方法 end========
  // ======Lang 工具方法 begin======
  /**
   * Casts value as an array if it's not one.
   */
  castArray: function (value) {
    return _.castArray(value)
  },
  clone: function (value) {
    return _.clone(value)
  },
  cloneDeep: function (value) {
    return _.cloneDeep(value)
  },
  cloneDeepWith: function (value, customizer) {
    return _.cloneDeepWith(value, customizer)
  },
  cloneWith: function (value, customizer) {
    return _.cloneWith(value, customizer)
  },
  isArray: function (value) {
    return _.isArray(value)
  },
  isEmpty: function (value) {
    return _.isEmpty(value)
  },
  isObject: function (value) {
    // Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
    return _.isObject(value)
  },
  // ======Lang 工具方法 end========
  // ======Math 工具方法 begin======
  // ======Math 工具方法 end========
  // ======Number 工具方法 begin======
  // ======Number 工具方法 end========

  // ======Object 工具方法 begin======
  /**
   *
   *  _.forIn(new Foo, function(value, key) {
   *   console.log(key);
   * });
   */
  forIn: function (obj, iteratee) {
    return _.forIn(obj, iteratee)
  },
  /**
   * Creates an object composed of the picked object properties.
   * Arguments
   *    object (Object): The object to iterate over.
   *   [paths] (...(string|string[])): The property paths to pick.
   * Returns
   *   (Object): Returns the new object.
   *
   *   var object = { 'a': 1, 'b': '2', 'c': 3 };
   *   Utils.pick(object, ['a', 'c']);
   *   // => { 'a': 1, 'c': 3 }
   */
  pick: function (obj, porpArr) {
    return _.pick(obj, porpArr)
  }
  // ======Object 工具方法 end========
  // ======Seq 工具方法 begin======
  // ======Seq 工具方法 end========
  // ======String 工具方法 begin======
  // ======String 工具方法 end========
}
export default Utils
