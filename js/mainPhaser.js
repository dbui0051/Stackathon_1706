/* global Phaser */
window.onload = function() {
  var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update })


/*------------------------          PRELOAD         ------------------------*/

  function preload() {
    game.load.image('background', 'castleBackground.png')
    game.load.image('ground', 'ground2.png')
    game.load.image('pipesLevel', 'pipesLevel.png')
    game.load.image('star', 'star.png')
    game.load.image('lightning', 'lightning.png')
    game.load.image('pipe', 'pipeLong.png')
    game.load.image('pipeShort', 'pipeShort.png')
    game.load.image('block', 'block.png')
    game.load.image('invisibleBlock', 'invisibleBlock.png')
    game.load.image('blockItem', 'itemBlock.png')
    game.load.image('mushroom', 'mushroom1.png')
    game.load.spritesheet('clock', 'clock.png', 31, 36)
    game.load.image('diamond', 'diamond.png', 32, 28)
    game.load.spritesheet('player', 'dude.png', 41, 50)
    game.load.spritesheet('dustbunny', 'dustbunny.png', 104, 59)
    game.load.spritesheet('slime', 'slime.png', 47, 33)
    game.load.spritesheet('coins', 'coins.png', 34, 40)
    game.load.spritesheet('jellyFish', 'jellyFish.png', 64, 69)
    game.load.spritesheet('pointer', 'pointers.png', 32, 32)
    game.load.spritesheet('explosion', 'explode.png', 128, 128)
  }

  var player
  var cursors
  var ground
  var dustbunny
  var slime
  var star
  var lightning
  var coins
  var mushroom
  var pipe
  var clock
  var pointer
  var score = 0
  var lives = 2
  var death = 0
  var livesText
  var scoreText
  var finished = false
  var slime1
  var slime2
  var jellyFish1
  var jellyFish
  var deathPipe
  var explode
  var block
  var blockItem
  var invisibleBlock
  var invisibleBlock1
  var counter = 0
  var freeze = false
  var finalBlock
  var finalBlock1


/*------------------------          CREATE        ------------------------*/

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, 1200 * 4, 600)
    var groundHeight = game.world.height
    game.add.sprite(0, 0, 'background').scale.setTo(1, 1)


    ground = game.add.group()
    star = game.add.group()
    clock = game.add.group()
    dustbunny = game.add.group()
    slime = game.add.group()
    jellyFish = game.add.group()
    lightning = game.add.group()
    pipe = game.add.group()
    deathPipe = game.add.group()
    coins = game.add.group()
    mushroom = game.add.group()
    pointer = game.add.group()
    explode = game.add.group()
    block = game.add.group()
    blockItem = game.add.group()
    invisibleBlock = game.add.group()
    finalBlock = game.add.group()

    ground.enableBody = true
    star.enableBody = true
    clock.enableBody = true
    dustbunny.enableBody = true
    slime.enableBody = true
    jellyFish.enableBody = true
    lightning.enableBody = true
    pipe.enableBody = true
    deathPipe.enableBody = true
    coins.enableBody = true
    mushroom.enableBody = true
    pointer.enableBody = true
    block.enableBody = true
    blockItem.enableBody = true
    invisibleBlock.enableBody = true
    finalBlock.enableBody = true

    //slime.collideWorldBounds = true
    slime.setAll('body.collideWorldBounds', true)
    jellyFish.setAll('body.collideWorldBounds', true)
    block.setAll('body.collideWorldBounds', true)
    clock.setAll('body.collideWorldBounds', true)
    finalBlock.setAll('body.collideWorldBounds', true)
    deathPipe.setAll('body.collideWorldBounds', true)
    pipe.collideWorldBounds = true
    dustbunny.collideWorldBounds = true

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
        if (type === finalBlock) newBlocks.scale.setTo(1.5, 1.5)
        if (imageName === 'blockItem') newBlocks.scale.setTo(0.32, 0.32)
        newBlocks.body.immovable = movable
      }
    }

    function lastBlock(xLoc, yLoc, num, movable, type, imageName) {
      for (let i = 0; i < num; i++){
        let newBlocks = type.create(xLoc + (i * 31 * 1.2), yLoc, imageName)
        newBlocks.body.gravity.y = 0
        newBlocks.scale.setTo(1.2, 1.2)
        if (type === finalBlock) newBlocks.scale.setTo(1.5, 1.5)
        if (imageName === 'blockItem') newBlocks.scale.setTo(0.32, 0.32)
        newBlocks.body.immovable = movable
        return newBlocks
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

    function makeEnemy(xLoc, yLoc, enemy, imageName, setScale, direction) {
      direction = direction || 1
      let newEnemy = enemy.create(xLoc, yLoc, imageName)
      newEnemy.body.gravity.y = 150
      newEnemy.body.velocity.x = 100 * direction
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

    // Width 600px
    makeFloor(0, groundHeight - 44)  // 600
    makeFloor(600, groundHeight - 44)  // 1200
    makeFloor(1100, groundHeight - 44)  // 1700
    makeFloor(2000, groundHeight - 44)  // 2600 + 186 = 2786
    makeFloor(2786, groundHeight - 44)  // 3386
    makeFloor(3386, groundHeight - 44)  // 3986
    makeFloor(3486, groundHeight - 44)  // 3986

    makeCoin(500, groundHeight - 100)

    // Width 31px
    makeBlock(380, 430, 1, false, block, 'blockItem')
    makeBlock(500, 430, 6, true, block, 'block')
    makeBlock(600, 250, 1, true, blockItem, 'blockItem')
    makeBlock(1670, 400, 1, true, invisibleBlock, 'invisibleBlock')
    makeBlock(1705, 400, 1, true, invisibleBlock, 'invisibleBlock')
    makeBlock(2600, groundHeight - 44, 6, false, block, 'block')
    makeBlock(2600, groundHeight - 13, 6, false, block, 'block')
    finalBlock1 = lastBlock(4340, groundHeight - 34, 1, true, finalBlock, 'block')

    // Width 150px
    makePipe(900, groundHeight - 108, pipe, 'pipe')
    makePipe(1290, groundHeight - 148, deathPipe, 'pipe')
    makePipe(2300, groundHeight - 148, pipe, 'pipe')


    var pointDown1 = makeObject(1295, groundHeight - 290, pointer, 'pointer', 0, 2)
    pointDown1.animations.add('stay', [2], 10, true)
    pointDown1.animations.play('stay')

    // var newStar1 = makeObject(400, 400, star, 'star', 0)
    // newStar1.scale.setTo(2, 2)
    // newStar1.body.bounce.y = 1
    // newStar1.body.gravity.y = 0 // 300 by default
    // newStar1.body.velocity.x = -50

    makeEnemy(400, 400, dustbunny, 'dustbunny', 0.8)
    makeEnemy(1050, 400, dustbunny, 'dustbunny', 0.8)
    makeEnemy(700, 400, slime, 'slime', 1)

    makeObject(500, game.world.height - 110, coins, 'coins', 100, 1)
    makeObject(3100, game.world.height - 110, clock, 'clock', 100, 1)

/*------------------------          ANIMATIONS        ------------------------*/

    coins.callAll('animations.add', 'animations', 'coin', [0, 1, 2, 3], 5, true)
    slime.callAll('animations.add', 'animations', 'left', [0, 1, 2 ], 10, true)
    dustbunny.callAll('animations.add', 'animations', 'dustLeft', [0, 1, 2, 3, 4, 5, 6, 7 ], 10, true)
    clock.callAll('animations.add', 'animations', 'clock', [0, 1], 10, true)
    //slime.callAll('animations.add', 'animations', 'right', [5, 6, 7], 10, true)
    jellyFish.callAll('animations.add', 'animations', 'jellyFish', [0, 1], 10, true)


    player = game.add.sprite(32, game.world.height - 150, 'player')
    player.scale.setTo(0.8, 0.8)
    game.physics.arcade.enable(player)

    player.body.gravity.y = 1000
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
    player.animations.add('death', [9], 1000, true)


    cursors = game.input.keyboard.createCursorKeys()
    scoreText = game.add.text(1000, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })
    livesText = game.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' })
    game.camera.follow(player)
    //game.state.start('Game')
  }


/*------------------------          UPDATE        ------------------------*/

  function update() {
    game.physics.arcade.collide(player, ground)
    game.physics.arcade.collide(player, pipe)
    game.physics.arcade.collide(player, block)
    game.physics.arcade.collide(player, finalBlock)
    game.physics.arcade.collide(player, deathPipe, pipeDeath, null, this)
    game.physics.arcade.collide(player, blockItem, makeItem, null, this)
    game.physics.arcade.collide(player, invisibleBlock, makeCoin, null, this)


    game.physics.arcade.collide(star, ground)
    game.physics.arcade.collide(lightning, ground)
    game.physics.arcade.collide(pipe, ground)
    game.physics.arcade.collide(clock, ground)
    game.physics.arcade.collide(mushroom, ground)
    game.physics.arcade.collide(mushroom, block)
    game.physics.arcade.collide(mushroom, blockItem)
    game.physics.arcade.collide(dustbunny, ground)
    game.physics.arcade.collide(slime, ground)
    game.physics.arcade.collide(jellyFish, ground)
    game.physics.arcade.collide(jellyFish, pipe)
    game.physics.arcade.collide(coins, ground)
    game.physics.arcade.collide(coins, blockItem)
    game.physics.arcade.collide(coins, invisibleBlock)

/* ======================   TURN THESE ON IN FINAL PHASE      ============ */

    game.physics.arcade.overlap(player, star, killPlayer, null, this)
    game.physics.arcade.overlap(player, clock, freezePlayer, null, this)
    game.physics.arcade.overlap(player, slime, killEnemy, null, this)
    game.physics.arcade.overlap(player, dustbunny, killEnemy, null, this)
    game.physics.arcade.overlap(player, jellyFish, killPlayer, null, this)
    game.physics.arcade.overlap(player, mushroom, killPlayer, null, this)
    game.physics.arcade.overlap(player, coins, collectCoin, null, this)
    game.physics.arcade.overlap(slime, pipe, turnMonster, null, this)
    game.physics.arcade.overlap(dustbunny, pipe, turnMonster, null, this)
    game.physics.arcade.overlap(dustbunny, deathPipe, turnMonster, null, this)


    player.body.velocity.x = 0

    slime.callAll('animations.play', 'animations', 'left')
    dustbunny.callAll('animations.play', 'animations', 'dustLeft')
    jellyFish.callAll('animations.play', 'animations', 'jellyFish')
    clock.callAll('animations.play', 'animations', 'clock')
    //slime.callAll('animations.play', 'animations', 'right')
    coins.callAll('animations.play', 'animations', 'coin', true)

    if (player.body.x > 2200 && counter === 0) {
      makeEnemy(2300, 600 - 220, jellyFish, 'jellyFish', 1.1)
      counter++
    }

    if (player.body.x > 3000 && counter === 1) {
      makeEnemy(3500, 500, dustbunny, 'dustbunny', 1, -1)
      counter++
    }

    if (player.body.x > 4300 && counter === 2) {
      finalBlock1.kill()
      finalBlock1 = lastBlock(4420, 600 - 34, 1, true, finalBlock, 'block')
      counter++
    }

    if (player.body.onFloor()) killPlayer(player)

    if (cursors.left.isDown && !freeze) {
        player.body.velocity.x = -450
        player.animations.play('left')
    }
    else if (cursors.right.isDown && !freeze) {
        player.body.velocity.x = 450
        player.animations.play('right')
    }
    else {
        player.animations.stop()
        player.frame = 4
    }
    if (cursors.up.isDown && player.body.touching.down && !freeze) player.body.velocity.y = -600

  }

  function killPlayer (player, baddie) {
    if (death < 1) {
      player.kill()
      death++
      if (baddie) {
        baddie.body.velocity.y = -200
        baddie.scale.setTo(2, 2)
      }
      score -= 20
      lives -= 1
      livesText.text = 'Lives: ' + lives
      setTimeout(() => {gameOver()}, 3000)
    }
  }

  function killEnemy (player, baddie) {
    if (player.body.y < baddie.body.y) {
      baddie.kill()
      player.body.velocity.y = -600
      score += 20
      scoreText.text = 'Score: ' + score
    }
    else killPlayer(player, baddie)
  }

  function turnMonster (monster, objInstance) {
    monster.body.velocity.x = monster.body.velocity.x * -1
  }

  function pipeDeath (player, deathPipe) {
    if (cursors.down.isDown && death < 1) {
      player.body.velocity.y = -2500
      setTimeout(() => {
        killPlayer(player)
        death++
      }, 180)
    }
    // var explode1 = game.add.sprite(player.body.x, player.body.y, 'explosion')
    // explode1.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 20)
    // explode1.animations.play('explode')
  }

  function makeCoin(player, block) {
    if (player.body.y > block.body.y) {
      let newCoin = coins.create(block.body.x, block.body.y - 55, 'coins')
      newCoin.body.gravity.y = 45
    }
  }

  function makeBlock(xLoc, yLoc, num, movable, type, imageName) {
    for (let i = 0; i < num; i++){
      let newBlocks = type.create(xLoc + (i * 31 * 1.2), yLoc, imageName)
      newBlocks.body.gravity.y = 0
      newBlocks.scale.setTo(1.2, 1.2)
      if (type === finalBlock) newBlocks.scale.setTo(1.5, 1.5)
      if (imageName === 'blockItem') newBlocks.scale.setTo(0.32, 0.32)
      newBlocks.body.immovable = movable
    }
  }

  function makeItem(player, block) {
    let min = block.body.x - 20
    let max = block.body.x + 20
    if (player.body.y > block.body.y) {
      if (block.body.x > min && block.body.x < max) {
        let newItem = mushroom.create(block.body.x, block.body.y - 55, 'mushroom')
        newItem.body.gravity.y = 250
        newItem.body.velocity.x = -120
      }
    }
  }

  function lastBlock(xLoc, yLoc, num, movable, type, imageName) {
    for (let i = 0; i < num; i++){
      let newBlocks = type.create(xLoc + (i * 31 * 1.2), yLoc, imageName)
      newBlocks.body.gravity.y = 0
      newBlocks.scale.setTo(1.2, 1.2)
      if (type === finalBlock) newBlocks.scale.setTo(1.5, 1.5)
      if (imageName === 'blockItem') newBlocks.scale.setTo(0.32, 0.32)
      newBlocks.body.immovable = movable
      return newBlocks
    }
  }

  function makeStar(xLoc, yLoc) {
    let newCoin = coins.create(xLoc, yLoc, 'coins')
    newCoin.body.gravity.y = 2
  }

  function collectCoin (player, coins) {
    coins.kill()
    score += 10
    scoreText.text = 'Score: ' + score
  }

  function freezePlayer (player, clock) {
    clock.kill()
    player.animations.play('death')
    freeze = true
  }

  function makeEnemy(xLoc, yLoc, enemy, imageName, setScale, direction) {
    direction = direction || 1
    let newEnemy = enemy.create(xLoc, yLoc, imageName)
    newEnemy.body.gravity.y = 150
    newEnemy.body.velocity.x = 100 * direction
    if (enemy === jellyFish) {
      newEnemy.body.gravity.y = -1750
      newEnemy.body.velocity.x = 0
    }
    newEnemy.scale.setTo(setScale, setScale)
  }

  function gameOver () {
    freeze = false
    death = 0
    counter = 0
    create()
  }

}

// gameOver: function() {
//     this.game.state.start('Game')
//   },






