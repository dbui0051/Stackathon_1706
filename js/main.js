/* global Crafty twoway gravity */
window.onload = function() {
	// Create stage
  Crafty.init(1400, 700, document.getElementById('game'))

  Crafty.e('Floor, 2D, Canvas, Color').attr({x: 0, y: 600, w: 500, h: 10}).color('green')
  Crafty.e('Floor, 2D, Canvas, Color').attr({x: 800, y: 600, w: 450, h: 10}).color('green')
	Crafty.load(dustbunny, makeEnemy)
  const addScore = function(points){ score.text('Score: ' + points)}
	const editLives = function(life){ lives.text('Lives: ' + life)}

  // Create players and enemies
	const player = Crafty.e('2D, Canvas, Color, Twoway, Gravity').attr({x: 0, y: 0, w: 50, h: 50}).color('red').twoway(200).gravity('Floor')
	const enemy = makeEnemy(800, 15)
	const score = Crafty.e('2D, DOM, Text').attr({ x: 1100, y: 10 }).text('Score: ').textFont({ size: '40px', weight: 'bold' })
	const lives = Crafty.e('2D, DOM, Text').attr({ x: 10, y: 10 }).text('Lives: ').textFont({ size: '40px', weight: 'bold' })
	Crafty.viewport.follow(player, 0, 0);
	const changeColor = function(eventData){ this.color(eventData.color) }
  player.bind('changeColor', changeColor)
  player.trigger('changeColor', {color: 'blue'})


	}
