/* global Phaser */
window.onload = function() {
	var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { render: render, preload: preload, create: create, update: update })

	function preload() {
		game.load.image('background', 'background.png')
		game.load.image('ground', 'ground2.png')
		game.load.image('star', 'star.png')
    game.load.image('diamond', 'diamond.png', 32, 28)
    game.load.spritesheet('player', 'dude.png', 32, 48)
	}
	var player
	var cursors
	var ground
	var platforms
	var enemy
	var star
	var score = 0
	var scoreText
	var finished = false
	var diamond

	function create() {
		function makeStar(xLoc, yLoc) {
			let newStar = game.add.sprite(xLoc, yLoc, 'star')
			game.physics.arcade.enable(newStar)
			newStar.body.gravity.y = 150
			newStar.collideWorldBounds = true
			newStar.body.bounce.y = 0.7
			return newStar
		}

		game.physics.startSystem(Phaser.Physics.ARCADE)
		game.add.sprite(0, 60, 'background')

		ground = game.add.group()
		ground.enableBody = true
		star = game.add.group()
		star.enableBody = true

		let floor = ground.create(0, game.world.height - 60, 'ground')
		floor.fixedToCamera = true
		floor.scale.setTo(2, 1)
		floor.enableBody = true
		floor.body.immovable = true


		star = makeStar(400, 200)

		player = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(player)

    player.body.gravity.y = 1000
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)

    cursors = game.input.keyboard.createCursorKeys()
    game.camera.follow(player)
	}

	function update() {
		game.physics.arcade.collide(player, ground)
    game.physics.arcade.collide(star, ground)
    game.physics.arcade.collide(enemy, ground)
    player.body.velocity.x = 0
    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    }
    else {
        player.animations.stop()
        player.frame = 4
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -500
    }
	}

	function render() {
	}
}








