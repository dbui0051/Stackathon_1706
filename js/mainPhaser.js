/* global Phaser */
window.onload = function() {
	var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update })


/*------------------------          PRELOAD 				------------------------*/

	function preload() {
		game.load.image('background', 'background.png')
		game.load.image('ground', 'ground2.png')
		game.load.image('star', 'star.png')
		game.load.image('lightning', 'lightning.png')
		game.load.image('pipe', 'pipe.png')
		game.load.image('pipeShort', 'pipeShort.png')
    game.load.image('diamond', 'diamond.png', 32, 28)
    game.load.spritesheet('player', 'dude.png', 32, 48)
    game.load.spritesheet('dustbunny', 'dustbunny.png', 104, 59)
    game.load.spritesheet('slime', 'slime.png', 30, 22)
	}

	var player
	var cursors
	var ground
	var dustbunny
	var slime
	var star
	var lightning
	var pipe
	var pipeShort
	var score = 0
	var lives = 2
	var livesText
	var scoreText
	var finished = false
	var slime1


/*------------------------          CREATE 				------------------------*/

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE)
		game.world.setBounds(0, 0, 1200 * 4, 600)
		game.add.sprite(0, 0, 'background').scale.setTo(1, 1.2)

		var groundHeight = game.world.height - 60

		ground = game.add.group()
		star = game.add.group()
		dustbunny = game.add.group()
		slime = game.add.group()
		lightning = game.add.group()
		pipe = game.add.group()
		pipeShort = game.add.group()

		ground.enableBody = true
		star.enableBody = true
		dustbunny.enableBody = true
		slime.enableBody = true
		lightning.enableBody = true
		pipe.enableBody = true
		pipeShort.enableBody = true

		function makeObject(xLoc, yLoc, object, imageName) {
			let newObject = object.create(xLoc, yLoc, imageName)
			newObject.body.gravity.y = 80
			return newObject
		}

		function makeEnemy(xLoc, yLoc, enemy, imageName, setScale) {
			let newEnemy = enemy.create(xLoc, yLoc, imageName)
			newEnemy.body.gravity.y = 150
			newEnemy.body.velocity.x = -100
			newEnemy.scale.setTo(setScale, setScale)
			return newEnemy
		}

		function makeFloor(xLoc, yLoc) {
			let newFloor = ground.create(xLoc, yLoc, 'ground')
			newFloor.scale.setTo(2, 1)
			newFloor.enableBody = true
			newFloor.body.immovable = true
			return newFloor
		}

		makeFloor(0, groundHeight)

		var newStar1 = makeObject(400, 400, star, 'star')
		newStar1.body.bounce.y = 1
		newStar1.body.gravity.y = 300
		newStar1.body.velocity.x = -50

		makeEnemy(600, 400, dustbunny, 'dustbunny', 0.8)
		slime1 = makeEnemy(900, 400, slime, 'slime', 2)
		slime1.animations.add('left', [0, 1, 2 ], 10, true)
    slime1.animations.add('right', [5, 6, 7], 10, true)
		var pipe1 = makeObject(1000, groundHeight - 72, pipeShort, 'pipeShort')
		pipe1.body.gravity.y = 0
		pipe1.body.immovable = true

		player = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(player)

    player.body.gravity.y = 1000
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)

    cursors = game.input.keyboard.createCursorKeys()
    scoreText = game.add.text(1050, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })
    livesText = game.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' })
    game.camera.follow(player)
    game.state.start('Game')
	}


/*------------------------          UPDATE 				------------------------*/
	function update() {
		game.physics.arcade.collide(player, ground)
		game.physics.arcade.collide(player, pipe)
    game.physics.arcade.collide(player, pipeShort)
    game.physics.arcade.collide(player, dustbunny)
    game.physics.arcade.collide(player, slime)

    game.physics.arcade.collide(star, ground)
    game.physics.arcade.collide(lightning, ground)
    game.physics.arcade.collide(pipe, ground)
    game.physics.arcade.collide(pipeShort, ground)
    game.physics.arcade.collide(dustbunny, ground)
    game.physics.arcade.collide(slime, ground)

    game.physics.arcade.overlap(player, star, killPlayer, null, this)

    player.body.velocity.x = 0

    slime1.body.velocity.x < 0 ? slime1.animations.play('left') : slime1.animations.play('right')

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

	function killPlayer (player, baddie) {
		player.kill()
    baddie.body.velocity.y = -1000
    score -= 20
    lives -= 1
    livesText.text = 'Lives: ' + lives
    gameOver()
	}

	function gameOver () {
    setTimeout(function () {
      game.state.start('Game')
    }, 3500)
    // if (value === 'win'){
    //     finished = true
    //     setTimeout(function () {
    //         window.location.replace('/')
    //     }, 3500)
    // }
	}

}

// gameOver: function() {
//     this.game.state.start('Game');
//   },






