export default class Lazy {
  /**
   * Lazy constructor need 3 params
   * @param {Object} with 3 params (Elem : Dom Element,
                                    type : Type of lazy "background/image",
                                    src :  image path )
   */

  constructor (opt = {
    type,
    src
  }) {
    this._options = opt
    this.elem = opt.elem || undefined
    this.type = opt.type || undefined
    this.src = opt.src || undefined
    if (this.type === undefined) return
    if (this.src === undefined) return
  }

  /**
   * Private
   * @param url, {String}
   */
  _load (url) {
    return new Promise(function (resolve, reject) {
      let element = document.createElement('img')

      element.onload = function () {
        resolve(url)
      }
      element.onerror = function () {
        reject(url)
      }
      element.src = url
    })
  }

  /**
   * Private
   * No @params
   */
  _lazyBackground () {
    this._load(this.src).then(_ => {
      this.elem.style = 'background-image : url(' + this.src + ')'
      if ('onLoaded' in this._options &&
      typeof this._options.onLoaded === 'function') {
        this._options.onLoaded()
      }
    }).catch(error => {
      throw new Error(error)
    })
  }

  /**
   * Private
   * No @params
   */
  _lazyImage () {
    this._load(this.src).then(_ => {
      this.elem.src = this.src
      if ('onLoaded' in this._options &&
      typeof this._options.onLoaded === 'function') {
        this._options.onLoaded()
      }
    }).catch(error => {
      throw new Error(error)
    })
  }

  /**
   * Public
   * No @params
   */
  start () {
    if ('onStart' in this._options &&
      typeof this._options.onStart === 'function') {
      this._options.onStart()
    }

    if (this.type === 'background') this._lazyBackground()
    else this._lazyImage()
  }
}
