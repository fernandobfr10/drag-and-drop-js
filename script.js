const items = document.querySelectorAll('.item')
let areas = document.querySelectorAll('.area')
const neutralArea = document.querySelector('.neutralArea')

let areasName = {
  a: null,
  b: null,
  c: null
}

items.forEach(item => {
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragend', dragEnd)
})

areas.forEach(area => {
  // Evento que será executado quando o item arrastado passar por cima da área dropável
  area.addEventListener('dragover', dragOver)

  // Evento que será executado quando estamos na área que o elemento pode ser solto, mas saímos da área dropável
  area.addEventListener('dragleave', dragLeave)

  // Evento que será executado quando de fato soltamos o item dentro da área dropável
  // Só funciona se o dragOver permitir que o item seja dropado
  area.addEventListener('drop', drop)
})

neutralArea.addEventListener('dragover', dragOverNeutral)
neutralArea.addEventListener('dragleave', dragLeaveNeutral)
neutralArea.addEventListener('drop', dropNeutral)

// Functions Item
function dragStart (event) {
  event.currentTarget.classList.add('dragging')
}

function dragEnd (event) {
  event.currentTarget.classList.remove('dragging')
}

// Functions Area
function dragOver (event) {
  if (!event.currentTarget.querySelector('.item')) {
    event.preventDefault()

    event.currentTarget.classList.add('hover')
  }
}

function dragLeave (event) {
  event.currentTarget.classList.remove('hover')
}

function drop (event) {
  event.currentTarget.classList.remove('hover')

  if (!event.currentTarget.querySelector('.item')) {
    let dragItem = document.querySelector('.item.dragging')

    event.currentTarget.appendChild(dragItem)

    updateAreasName()
  }
}

// Functions Neutral Area
function dragOverNeutral (event) {
  event.preventDefault()

  event.currentTarget.classList.add('hover')
}

function dragLeaveNeutral (event) {
  event.currentTarget.classList.remove('hover')
}

function dropNeutral (event) {
  event.currentTarget.classList.remove('hover')

  let dragItem = document.querySelector('.item.dragging')

  event.currentTarget.appendChild(dragItem)

  updateAreasName()
}

// Logic Functions

function updateAreasName () {
  areas.forEach(area => {
    let areaName = area.getAttribute('data-name')

    if (area.querySelector('.item')) {
      areasName[areaName] = area.querySelector('.item').innerHTML
      return
    }
    areasName[areaName] = null
  })

  const correctSequence = areasName.a === '1' && areasName.b === '2' && areasName.c === '3'

  if (correctSequence) {
    document.querySelector('.areas').classList.add('correct')
    return
  }
  document.querySelector('.areas').classList.remove('correct')
}