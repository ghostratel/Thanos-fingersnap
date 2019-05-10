const getRandomInteger = (min = 0, max = 9) =>
  Math.floor(Math.random() * (+max - +min)) + +min

const getRandomNumber = (min = 0, max = 9) =>
  (Math.random() * (+max - +min)) + +min


const data2canvas = (imageData, width, height) => {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  let ctx = canvas.getContext('2d')
  ctx.putImageData(new ImageData(imageData, width, height), 0, 0)
  return canvas
}

const canvas2Image = canvas => {
  let img = new Image()
  img.src = canvas.toDataURL('image/png')
  return img
}

const getCanvasAnimateAttr = () => (
  [
    {
      transform: 'translate3d(0,0,0) rotate(0)',
      opacity: 1,
      filter: 'blur(0px) grayscale(0)'
    },
    {
      transform: `translate3d(${getRandomInteger(
        150,
        400
      )}px, ${getRandomInteger(
        -200,
        20
      )}px, 0) rotate(${getRandomInteger(-15, 15)}deg)`,
      opacity: 0,
      filter: 'blur(2px) grayscale(1)'
    }
  ]
)

export {getRandomInteger, data2canvas, canvas2Image, getCanvasAnimateAttr, getRandomNumber}