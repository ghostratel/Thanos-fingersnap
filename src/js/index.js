import html2canvas from 'html2canvas'
import { getRandomNumber, data2canvas } from './utils'

const html2canvasOptions = {
  useCORS: true,
  backgroundColor: null
}

function Thanos(opt) {
  this._init(opt)
}

Thanos.prototype._init = function(opt) {
  this.$el =
		typeof opt.el === 'string' ? document.querySelector(opt.el) : opt.el
  this.$el.style = 'position: relative;'

  html2canvas(this.$el, html2canvasOptions).then(canvas => {
    this.$canvas = canvas
  })

  this.$originCanvas = null
  this.count = opt.count || 30
  this.width = this.$el.getBoundingClientRect().width
  this.height = this.$el.getBoundingClientRect().height
}

Thanos.prototype._toggleChildren = function(flag) {
  Array.prototype.forEach.call(this.$el.children, el => {
    el.animate([{ opacity: 1, filter: 'blur(0) grayscale(0)' }, { opacity: 0, filter: 'blur(3px) grayscale(1)' }], {
      duration: 1200,
      easing: 'ease',
      direction: flag ? 'normal' : 'reverse',
      fill: 'forwards'
    })
  })
}

Thanos.prototype.snap = function() {
  const ctx = this.$canvas.getContext('2d')
  const originImageData = (this.$originCanvas = ctx.getImageData(
    0,
    0,
    this.width,
    this.height
  ).data)

  this._toggleChildren(true)

  const template = originImageData.slice().fill(0)
  const imageDataArray = Array.from({ length: this.count }, () =>
    template.slice()
  )

  for (let i = 0; i < originImageData.length; i += 4) {
    let n = getRandomNumber(0, this.count)
    imageDataArray[n][i] = originImageData[i]
    imageDataArray[n][i + 1] = originImageData[i + 1]
    imageDataArray[n][i + 2] = originImageData[i + 2]
    imageDataArray[n][i + 3] = originImageData[i + 3]
  }

  for (let i = 0; i < imageDataArray.length; i++) {
    let canvas = data2canvas(imageDataArray[i], this.width, this.height)
    this.$el.appendChild(canvas)
    canvas.style = 'position: absolute;left: 0;top: 0;'
    canvas.animate(
      [
        {
          transform: 'translate3d(0,0,0) rotate(0)',
          opacity: 1,
          filter: 'blur(0px)'
        },
        {
          transform: `translate3d(${getRandomNumber(
            150,
            400
          )}px, ${getRandomNumber(
            -50,
            -200
          )}px, 0) rotate(${getRandomNumber(-15, 15)}deg)`,
          opacity: 0,
          filter: 'blur(1px)'
        }
      ],
      {
        duration: 2000,
        easing: 'ease-in',
        fill: 'forwards',
        delay: i * this.count
      }
    )
    setTimeout(() => {
      this.$el.removeChild(canvas)
    }, 2000 + i * this.count)
  }
}

Thanos.prototype.restore = function() {
  this._toggleChildren(false)
}

var thanos = new Thanos({
  el: '#wrapper',
  count: 30
})

document.getElementById('snap').addEventListener('click', function() {
  thanos.snap()
})

document.getElementById('restore').addEventListener('click', function() {
  thanos.restore()
})
