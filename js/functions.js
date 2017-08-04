/* global Crafty */

function makePlatform(xLoc, yLoc, length = 500, color = 'green') {
	const floor = Crafty.e('Floor, 2D, Canvas, Color').attr({x: xLoc, y: yLoc, w: length, h: 10}).color(color)
	return floor
}

function makeEnemy(xLoc, yLoc) {
	const enemy = Crafty.e('2D, Canvas, dust_start, Gravity, SpriteAnimation')
	.attr({x: xLoc, y: yLoc})
	.gravity('Floor')
	.reel('walking', 1000, [
		[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
	])
	.animate('walking', -1)

	return enemy
}

// function makeStar(xLoc, yLoc) {
// 	let newStar = game.add.sprite(xLoc, yLoc, 'star')
// 	game.physics.arcade.enable(star)
// 	star.body.gravity.y = 150
// 	star.collideWorldBounds = true
// 	star.body.bounce.y = 0.7
// 	return newStar
// }
