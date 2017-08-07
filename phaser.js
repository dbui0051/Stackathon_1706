/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

}

function update() {


}
