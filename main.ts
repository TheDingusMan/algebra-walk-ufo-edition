namespace SpriteKind {
    export const Portal = SpriteKind.create()
    export const SizePortal = SpriteKind.create()
    export const GravityPortal = SpriteKind.create()
}
function returnPhysics () {
    cube.vy = list[0]
    cube.ay = list[1]
    miniMenu.close(myMenu)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.GravityPortal, function (sprite, otherSprite) {
    if (otherSprite.rotationDegrees < 360) {
        cube.ay = cube.ay * -1
        gravity = gravity * -1
        cube.vy = -50 * gravity
        otherSprite.rotationDegrees += 360
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (otherSprite.image.equals(assets.image`shipPortal`)) {
        count = 0
        count2 = 0
        changeGamemode("ship")
        mode = "ship"
        effects.clearParticles(cube)
        cube.startEffect(effects.spray)
        cube.startEffect(effects.spray)
    } else if (otherSprite.image.equals(assets.image`cubePortal`)) {
        changeGamemode("cube")
        mode = "cube"
        effects.clearParticles(cube)
    } else if (otherSprite.image.equals(assets.image`wavePortal`)) {
        changeGamemode("wave")
        mode = "wave"
        effects.clearParticles(cube)
        for (let index = 0; index < 5; index++) {
            cube.startEffect(effects.spray)
        }
    } else if (otherSprite.image.equals(assets.image`ballPortal`)) {
        count = 0
        count2 = 0
        changeGamemode("ball")
        mode = "ball"
        effects.clearParticles(cube)
    } else if (otherSprite.image.equals(assets.image`ufoPortal`)) {
        count = 0
        count2 = 0
        changeGamemode("ufo")
        mode = "ufo"
        effects.clearParticles(cube)
        cube.startEffect(effects.trail)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    aPressed = true
    aBuffer = true
    if (mode == "ufo") {
        cube.vy = (-100 * cube.scale - 75) * gravity
        count = 0
        count2 = 0
        jumping = true
        cube.startEffect(effects.spray, 500)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    aPressed = false
    aBuffer = false
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    upPressed = false
    upBuffer = false
})
function openMenu (title: string) {
    miniMenu.setTitle(myMenu, title)
    miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Width, 100)
    miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Height, 125)
    miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
    4,
    0,
    0,
    0
    ))
    miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Margin, miniMenu.createBorderBox(
    0,
    0,
    0,
    2
    ))
    miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Default, miniMenu.StyleProperty.BorderColor, 11)
    miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 4)
    miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 12)
    myMenu.setPosition(cube.x, cube.y - 35)
}
function changeCubeColours () {
    color.setPalette(
    color.originalPalette
    )
    if (!(blockSettings.readString("colour1") == "")) {
        color.setColor(7, color.parseColorString(blockSettings.readString("colour1")))
    }
    if (!(blockSettings.readString("colour2") == "")) {
        color.setColor(6, color.parseColorString(blockSettings.readString("colour2")))
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    jakDoesSnaks = !(jakDoesSnaks)
    if (jakDoesSnaks) {
        returnPhysics()
    } else {
        list = [cube.vy, cube.ay]
        cube.vy = 0
        cube.ay = 0
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Unpause"),
        miniMenu.createMenuItem("Change Cube Colors"),
        miniMenu.createMenuItem("Reset Game")
        )
        openMenu("Paused")
        miniMenu.onButtonPressed(myMenu, miniMenu.Button.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                jakDoesSnaks = true
                returnPhysics()
            } else if (selectedIndex == 1) {
                miniMenu.close(myMenu)
                blockSettings.writeString("colour1", game.askForString("Currently setting hex color 1", 7))
                blockSettings.writeString("colour2", game.askForString("Currently setting hex color 2", 7))
                changeCubeColours()
                jakDoesSnaks = true
                returnPhysics()
            } else {
                game.reset()
            }
        })
        miniMenu.onButtonPressed(myMenu, miniMenu.Button.B, function (selection, selectedIndex) {
            jakDoesSnaks = true
            returnPhysics()
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SizePortal, function (sprite, otherSprite) {
    if (otherSprite.image.equals(assets.image`miniPortal1`)) {
        cube.scale = 0.5
        if (mode == "cube" || mode == "ufo") {
            cube.ay = 312.5 * gravity
        } else if (mode == "ball") {
            cube.ay = 700 * gravity
        }
    } else if (otherSprite.image.equals(assets.image`miniPortal2`)) {
        cube.scale = 1
        if (mode == "cube" || mode == "ufo") {
            cube.ay = 625 * gravity
        } else if (mode == "ball") {
            cube.ay = 625 * gravity
        }
    }
})
function changeGamemode (mode: string) {
    if (mode == "cube") {
        cube.setImage(assets.image`cube4`)
        cube.ay = 625 * cube.scale * gravity
    } else if (mode == "ship") {
        cube.setImage(assets.image`ship1`)
        cube.ay = 0
    } else if (mode == "wave") {
        cube.setImage(assets.image`wave2`)
        cube.ay = 0
    } else if (mode == "ball") {
        cube.setImage(assets.image`ball1`)
        if (cube.scale == 1) {
            cube.ay = 625 * gravity
        } else if (cube.scale == 0.5) {
            cube.ay = 700 * gravity
        }
    } else if (mode == "ufo") {
        cube.setImage(assets.image`ufo1`)
        cube.ay = 625 * cube.scale * gravity
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    upPressed = true
    upBuffer = true
    if (mode == "ufo") {
        cube.vy = (-100 * cube.scale - 75) * gravity
        count = 0
        count2 = 0
        jumping = true
        cube.startEffect(effects.spray, 500)
    }
})
let currentTilemap = 0
let count2 = 0
let count = 0
let myMenu: Sprite = null
let gravity = 0
let mode = ""
let cube: Sprite = null
let list: number[] = []
let jumping = false
let upBuffer = false
let aBuffer = false
let upPressed = false
let aPressed = false
let jakDoesSnaks = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 160
}
game.setGameOverPlayable(false, music.createSong(assets.song`death`), false)
game.setGameOverPlayable(true, music.createSong(assets.song`win`), false)
scene.setBackgroundColor(5)
jakDoesSnaks = true
let on_floor = true
aPressed = false
upPressed = false
aBuffer = false
upBuffer = false
jumping = false
list = []
cube = sprites.create(assets.image`cube4`, SpriteKind.Player)
let shipPortal = sprites.create(assets.image`shipPortal`, SpriteKind.Portal)
let wavePortal = sprites.create(assets.image`ufoPortal`, SpriteKind.Portal)
let cubePortal = sprites.create(assets.image`cubePortal`, SpriteKind.Portal)
let ballPortal = sprites.create(assets.image`ballPortal`, SpriteKind.Portal)
let miniPortal = sprites.create(assets.image`miniPortal1`, SpriteKind.SizePortal)
let normalPortal = sprites.create(assets.image`miniPortal2`, SpriteKind.SizePortal)
let flipPortal = sprites.create(assets.image`flipPortal`, SpriteKind.GravityPortal)
let flipPortal2 = sprites.create(assets.image`flipPortal`, SpriteKind.GravityPortal)
let flipPortal3 = sprites.create(assets.image`flipPortal`, SpriteKind.GravityPortal)
mode = "cube"
gravity = 1
cube.ay = 625
cube.setPosition(28, 235)
tiles.setCurrentTilemap(tilemap`level`)
tiles.placeOnTile(shipPortal, tiles.getTileLocation(123, 6))
tiles.placeOnTile(cubePortal, tiles.getTileLocation(158, 3))
tiles.placeOnTile(wavePortal, tiles.getTileLocation(222, 5))
tiles.placeOnTile(miniPortal, tiles.getTileLocation(138, 8))
tiles.placeOnTile(normalPortal, tiles.getTileLocation(180, 6))
tiles.placeOnTile(ballPortal, tiles.getTileLocation(180, 6))
tiles.placeOnTile(flipPortal, tiles.getTileLocation(197, 7))
tiles.placeOnTile(flipPortal2, tiles.getTileLocation(215, 6))
tiles.placeOnTile(flipPortal3, tiles.getTileLocation(222, 5))
scene.cameraFollowSprite(cube)
changeCubeColours()
for (let index = 0; index < 10; index++) {
    pause(100)
    music.play(music.createSong(assets.song`stereoMadnent`), music.PlaybackMode.InBackground)
}
game.onUpdate(function () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color1`)) {
        scene.setBackgroundColor(1)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color2`)) {
        scene.setBackgroundColor(2)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color3`)) {
        scene.setBackgroundColor(3)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color4`)) {
        scene.setBackgroundColor(4)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color5`)) {
        scene.setBackgroundColor(5)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color6`)) {
        scene.setBackgroundColor(6)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color7`)) {
        scene.setBackgroundColor(7)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color8`)) {
        scene.setBackgroundColor(8)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color9`)) {
        scene.setBackgroundColor(9)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color10`)) {
        scene.setBackgroundColor(10)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color11`)) {
        scene.setBackgroundColor(11)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color12`)) {
        scene.setBackgroundColor(12)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color13`)) {
        scene.setBackgroundColor(13)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color14`)) {
        scene.setBackgroundColor(14)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(cube.tilemapLocation().column, 0), assets.tile`color15`)) {
        scene.setBackgroundColor(15)
    }
})
forever(function () {
    if (jakDoesSnaks) {
        if (mode == "cube" && (aPressed || upPressed) && on_floor) {
            on_floor = false
            cube.vy = -200 * cube.scale * gravity
        } else if (mode == "ship") {
            if (gravity == 1) {
                if (aPressed || upPressed) {
                    if (cube.vy < -200 / cube.scale) {
                        cube.vy = -200 / cube.scale
                    } else {
                        cube.vy += -7 / cube.scale
                    }
                } else {
                    if (cube.vy > 200 / cube.scale) {
                        cube.vy = 200 / cube.scale
                    } else {
                        cube.vy += 7 / cube.scale
                    }
                }
            } else if (gravity == -1) {
                if (aPressed || upPressed) {
                    if (cube.vy > 200 / cube.scale) {
                        cube.vy = 200 / cube.scale
                    } else {
                        cube.vy += 7 / cube.scale
                    }
                } else {
                    if (cube.vy < -200 / cube.scale) {
                        cube.vy = -200 / cube.scale
                    } else {
                        cube.vy += -7 / cube.scale
                    }
                }
            }
        } else if (mode == "wave") {
            if (aPressed || upPressed) {
                cube.vy = -0.01 * gravity
                cube.y += -4.5 / cube.scale * gravity
            } else {
                cube.vy = 0.01 * gravity
                cube.y += 4.5 / cube.scale * gravity
            }
        } else if (mode == "ball" && (on_floor && (aBuffer || upBuffer))) {
            cube.ay = cube.ay * -1
            gravity = gravity * -1
            cube.vy = 50 / cube.scale * gravity
            aBuffer = false
            upBuffer = false
        }
    }
})
forever(function () {
    if (jakDoesSnaks) {
        if (mode == "cube" && !(on_floor)) {
            count += 1
            if (count == 4) {
                count = 0
                count2 += 1
                if (count2 == 1) {
                    if (gravity == 1) {
                        cube.setImage(assets.image`cube1`)
                    } else if (gravity == -1) {
                        cube.setImage(assets.image`cube3`)
                    }
                } else if (count2 == 2) {
                    cube.setImage(assets.image`cube2`)
                } else if (count2 == 3) {
                    if (gravity == 1) {
                        cube.setImage(assets.image`cube3`)
                    } else if (gravity == -1) {
                        cube.setImage(assets.image`cube1`)
                    }
                } else {
                    count2 = 0
                    cube.setImage(assets.image`cube4`)
                }
            }
        } else if (mode == "ship") {
            if (cube.vy < -100) {
                if (gravity == 1) {
                    cube.setImage(assets.image`ship3`)
                } else if (gravity == -1) {
                    cube.setImage(assets.image`flipship2`)
                }
            } else if (cube.vy > 100) {
                if (gravity == 1) {
                    cube.setImage(assets.image`ship2`)
                } else if (gravity == -1) {
                    cube.setImage(assets.image`flipship3`)
                }
            } else {
                if (gravity == 1) {
                    cube.setImage(assets.image`ship1`)
                } else if (gravity == -1) {
                    cube.setImage(assets.image`flipship1`)
                }
            }
        } else if (mode == "wave") {
            if (cube.vy < 0) {
                cube.setImage(assets.image`wave1`)
            } else if (cube.vy > 0) {
                cube.setImage(assets.image`wave2`)
            } else {
                cube.setImage(assets.image`wave0`)
            }
            cube.vy = 0
        } else if (mode == "ball") {
            count += 1
            if (count == 3) {
                count = 0
                count2 += 1
                if (count2 == 1) {
                    cube.setImage(assets.image`ball2`)
                } else {
                    count2 = 0
                    cube.setImage(assets.image`ball1`)
                }
            }
        } else if (mode == "ufo") {
            if (jumping) {
                count += 1
                if (count == 5) {
                    count = 0
                    jumping = false
                }
                if (gravity == 1) {
                    cube.setImage(assets.image`ufo2`)
                } else if (gravity == -1) {
                    cube.setImage(assets.image`flipufo2`)
                }
            } else {
                if (gravity == 1) {
                    cube.setImage(assets.image`ufo1`)
                } else if (gravity == -1) {
                    cube.setImage(assets.image`flipufo1`)
                }
            }
        }
    }
})
forever(function () {
    if (jakDoesSnaks) {
        if (cube.tileKindAt(TileDirection.Center, assets.tile`block`) || (cube.tileKindAt(TileDirection.Center, assets.tile`spike`) || (cube.tileKindAt(TileDirection.Center, assets.tile`spikeLeft`) || cube.tileKindAt(TileDirection.Center, assets.tile`spikeDown`)))) {
            music.stopAllSounds()
            game.gameOver(false)
        }
        if (mode == "cube") {
            if (gravity == 1 && cube.isHittingTile(CollisionDirection.Top)) {
                music.stopAllSounds()
                game.gameOver(false)
            } else if (gravity == -1 && cube.isHittingTile(CollisionDirection.Bottom)) {
                music.stopAllSounds()
                game.gameOver(false)
            }
        }
        if (cube.tileKindAt(TileDirection.Center, assets.tile`goal`)) {
            scene.cameraShake(8, 1000)
            sprites.destroy(cube)
            pause(1000)
            game.gameOver(true)
        }
        cube.x += 4.5
        if (cube.tilemapLocation().column == 255) {
            cube.x = 0
            currentTilemap += 1
            if (currentTilemap == 1) {
                tiles.setCurrentTilemap(tilemap`level2`)
            }
        }
        if (gravity == 1) {
            if (cube.isHittingTile(CollisionDirection.Bottom)) {
                on_floor = true
                if (mode == "cube") {
                    count = 0
                    count2 = 0
                    cube.setImage(assets.image`cube4`)
                }
            } else {
                on_floor = false
            }
        } else if (gravity == -1) {
            if (cube.isHittingTile(CollisionDirection.Top)) {
                on_floor = true
                if (mode == "cube") {
                    count = 0
                    count2 = 0
                    cube.setImage(assets.image`cube4`)
                }
            } else {
                on_floor = false
            }
        }
    }
})
