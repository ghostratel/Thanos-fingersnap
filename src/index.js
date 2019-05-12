import './thanos.css'
import html2canvas from 'html2canvas'
import snabbt from 'snabbt.js'
import { getRandomInteger, data2canvas, getRandomNumber } from './utils'

const html2canvasOptions = {
	useCORS: true,
	backgroundColor: null,
	// prevent bug
	scale: 1,
	logging: false
}

function Thanos(opt) {
	this._init(opt)
}

Thanos.prototype._toggleChildren = function (flag) {
	Array.prototype.forEach.call(this.$el.children, el => {
		el.animate(
			[
				{ opacity: 1, filter: 'blur(0) grayscale(0)' },
				{ opacity: 0, filter: 'blur(3px) grayscale(1)' }
			],
			{
				duration: 1200,
				easing: 'ease',
				direction: flag ? 'normal' : 'reverse',
				fill: 'forwards'
			}
		)
	})
}

Thanos.prototype._init = function (opt) {
	this.$el =
		typeof opt.el === 'string' ? document.querySelector(opt.el) : opt.el

	if (!this.$el) {
		throw new Error(`Element ${opt.el} is invalid.`)
	}

	this.$el.style = 'position: relative;'

	this.width = this.$el.getBoundingClientRect().width
	this.height = this.$el.getBoundingClientRect().height

	this.count = opt.count || 10

	html2canvas(this.$el, html2canvasOptions).then(canvas => {
		this.$canvas = canvas
		this.$originImageData = this.$canvas
			.getContext('2d')
			.getImageData(0, 0, this.width, this.height).data

		const template = this.$originImageData.slice().fill(0)
		this.$imageDataArray = Array.from({ length: this.count }, () =>
			template.slice()
		)

		for (let i = 0; i < this.$originImageData.length; i += 4) {
			let n = getRandomInteger(0, this.count)
			this.$imageDataArray[n][i] = this.$originImageData[i]
			this.$imageDataArray[n][i + 1] = this.$originImageData[i + 1]
			this.$imageDataArray[n][i + 2] = this.$originImageData[i + 2]
			this.$imageDataArray[n][i + 3] = this.$originImageData[i + 3]
		}
	})
}

Thanos.prototype.snap = function () {
	this._toggleChildren(true)

	for (let i = 0; i < this.$imageDataArray.length; i++) {
		let canvas = data2canvas(this.$imageDataArray[i], this.width, this.height)
		canvas.classList.add('Thanos')
		this.$el.appendChild(canvas)
		let scale = getRandomNumber(1, 1.2)
		snabbt(canvas, {
			position: [getRandomInteger(150, 400), getRandomInteger(-200, 200), 0],
			rotation: [0, 0, -Math.PI / getRandomInteger(12, 15)],
			scale: [scale, scale],
			opacity: 0,
			duration: 2000,
			delay: i * this.count,
			easing: 'easeIn',
			fromOpacity: 1
		})
		setTimeout(() => {
			this.$el.removeChild(canvas)
		}, 2000 + i * this.count)
	}
}

Thanos.prototype.restore = function () {
	this._toggleChildren(false)
}

export default Thanos
