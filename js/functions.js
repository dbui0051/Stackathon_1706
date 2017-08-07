/* global Crafty */

// function makePlatform(xLoc, yLoc, length = 500, color = 'green') {
// 	const floor = Crafty.e('Floor, 2D, Canvas, Color').attr({x: xLoc, y: yLoc, w: length, h: 10}).color(color)
// 	return floor
// }

// function makeEnemy(xLoc, yLoc) {
// 	const enemy = Crafty.e('2D, Canvas, dust_start, Gravity, SpriteAnimation')
// 	.attr({x: xLoc, y: yLoc})
// 	.gravity('Floor')
// 	.reel('walking', 1000, [
// 		[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
// 	])
// 	.animate('walking', -1)

// 	return enemy
// }

function makeObject(xLoc, yLoc, object, imageName, gravity, scale) {
      let newObject = object.create(xLoc, yLoc, imageName)
      newObject.body.gravity.y = gravity || 0
      newObject.scale.setTo(scale, scale)
      return newObject
    }

function makeBlock(xLoc, yLoc, num, movable, type, imageName) {
  for (let i = 0; i < num; i++){
    let newBlocks = type.create(xLoc + (i * 31 * 1.2), yLoc, imageName)
    newBlocks.body.gravity.y = 0
    newBlocks.scale.setTo(1.2, 1.2)
    if (imageName === 'blockItem') newBlocks.scale.setTo(0.32, 0.32)
    newBlocks.body.immovable = movable
  }
}

function makeItem(player, block, item, imageName) {
  if (player.body.y > block.body.y) {
    let newItem = coins.create(block.body.x, block.body.y - 55, 'coins')
    newItem.body.gravity.y = 45
  }
}

function makeCoin(xLoc, yLoc) {
  let newCoin = coins.create(xLoc, yLoc, 'coins')
  newCoin.body.gravity.y = 45

}

function makePipe(xLoc, yLoc, object, imageName) {
  let newPipe = object.create(xLoc, yLoc, imageName)
  newPipe.body.gravity.y = 0
  newPipe.body.immovable = true
  newPipe.body.moves = false
}

function makeEnemy(xLoc, yLoc, enemy, imageName, setScale) {
  let newEnemy = enemy.create(xLoc, yLoc, imageName)
  newEnemy.body.gravity.y = 150
  newEnemy.body.velocity.x = 100
  if (enemy === jellyFish) {
    newEnemy.body.gravity.y = -1750
    newEnemy.body.velocity.x = 0
  }
  newEnemy.scale.setTo(setScale, setScale)
}

function makeFloor(xLoc, yLoc) {
  let newFloor = ground.create(xLoc, yLoc, 'ground')
  newFloor.scale.setTo(1, 1)
  //newFloor.enableBody = true
  newFloor.body.immovable = true
}