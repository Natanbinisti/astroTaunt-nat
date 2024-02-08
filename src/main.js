import kaboom from "kaboom";

kaboom({

    scale:1,
    font: "upheavtt",
})

setBackground(Color.fromHex("#24323F"))
setGravity(600)
//////////////////////////////////MUSIC /////////////////////////



loadSound('boss2', 'sounds/Arcade_Boss_2.wav')

///////////////////////////////////////////////////////////////////

// ########################### SPRITE ################################
//

// loadSprite('astronaut','wunHyEq.png')
loadSprite('block','https://i.imgur.com/M6rwarW.png')
loadSprite('gun', 'https://i.imgur.com/12IgStq.png')
loadSprite('boss','https://i.imgur.com/bdCKcXh.png')
loadSprite('spike', 'https://i.imgur.com/vPnz1At.png')
loadSprite('hole', 'https://i.imgur.com/8RJSXey.png')

//Player
loadSprite("astro", "https://i.imgur.com/Q0FRlty.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 15,
    // Define animations
    anims: {
        "idle": 0,

        "run": {
            from: 0,
            to: 3,
            speed: 10,
            //loop: true,
        },
        // This animation only has 1 frame
        "jump": 7,
    },
})

loadSound("battery", "sounds/coin-flip-88793.mp3")


//image de fond :
loadSprite('bg-beginning', 'https://i.imgur.com/SutOjg4.png')
loadSprite('bg-levels', 'https://i.imgur.com/sM0Q2AA.png')
loadSprite('bg-death', 'https://i.imgur.com/fMJvDkf.png')
// NATAN
loadFont("upheavtt", "font/upheavtt.ttf")
loadSprite('logo', 'https://i.imgur.com/MqUYiI6.png')


loadSprite('beam', 'https://i.imgur.com/fUwX4Jc.png')
loadSprite('crate', 'https://i.imgur.com/Uz51WxL.png')
loadSprite('crate2', 'https://i.imgur.com/UPq5A74.png')
loadSprite('droplets', 'https://i.imgur.com/r13H16o.png')
loadSprite('editorblock', 'https://i.imgur.com/8cM0Be2.png')
loadSprite('jet', 'https://i.imgur.com/vaegfFS.png')
loadSprite('jet2', 'https://i.imgur.com/qtajq2q.png')
loadSprite('jet3', 'https://i.imgur.com/jtSXoc2.png')
loadSprite('pod1', 'https://i.imgur.com/ylskanF.png')
loadSprite('portrait', 'https://i.imgur.com/gXUjnJr.png')



/////////////////////////////SPRITE AVEC PLUSIEURS TILES///////////////////

loadSprite('battery', 'https://i.imgur.com/bOX5EXQ.png',{sliceX: 4, sliceY: 1,})
loadSprite('explosion', 'https://i.imgur.com/NTmk76G.png', {sliceX: 17, sliceY: 1,})
loadSprite('explosion2', 'https://i.imgur.com/lOrfZSj.png',{sliceX: 17, sliceY: 1,})
loadSprite('smoke', 'https://i.imgur.com/sjIQbV0.png',{sliceX: 11, sliceY: 1,})
loadSprite('timerswitch', 'https://i.imgur.com/UGMGRMu.png',{sliceX: 5, sliceY: 1,})
loadSprite('button', 'https://i.imgur.com/ThnSicB.png',{sliceX: 2, sliceY: 1,})
loadSprite('powerlight', 'https://i.imgur.com/uq3DEGN.png',{sliceX: 2, sliceY: 1,})
loadSprite('shipbits', 'https://i.imgur.com/oD1VIw6.png',{sliceX: 5, sliceY: 1,})
loadSprite('pit', 'https://i.imgur.com/DFAfOnt.png', {sliceX: 2, sliceY: 3,})
loadSprite('pod', 'https://i.imgur.com/fnH45mO.png', {sliceX: 4, sliceY: 1,})
loadSprite('messagebox', 'https://i.imgur.com/gUvvVXW.png', {sliceX: 3, sliceY: 3,})
loadSprite('rocks', 'https://i.imgur.com/QzTqlac.png', {sliceX: 8, sliceY: 3,})
loadSprite('map', 'https://i.imgur.com/asb3EeB.png',{sliceX:20, sliceY:20,})




//TODO ############################ SCENE LOSE ################################"
scene('lose',()=>{

    add([
        sprite("bg-death")
    ])
    add([
        text('you lose'),
        anchor('center'),
        scale(5),
        pos(width()/2, height()/2)
    ])
})

//TODO #################### SCENE MENU ###############################

let isGamepadConnected = false
scene("menu",()=>{



    add([
        sprite("bg-beginning"),
        scale(1)
    ]),

        add([
            sprite("logo"),
            area(),
            anchor("center"),
            pos(center().x, center().y),
            scale(1),
        ]),

        add([
            text('upheavtt'),
            area(),
            anchor("center"),
            pos(center().x, 600),
            outline(4),
            text("Taper sur [ ENTRER ] ou appuyer sur [x] de la manette pour commencer à jouer", {
                size: 30,
                opacity: 0.3
            }),
        ]);

    onKeyRelease("enter", () => {
        go("chooseLevel");
    })

    // onGamepadDisconnect(()=>{
    const textGamepadDisconnected = add([
        text("Gamepad not found", {
            width: width() - 30,
            align: "center",
            size: 25,
        }),
        pos(center().x,700),
        anchor("center"),
    ])
    // })
    onGamepadConnect(()=>{
        add([
            text("Gamepad Connected", {
                width: width() - 180,
                align: "center",
            }),
            pos(center().x,700),
            anchor("center"),
            color(50,205,50),
        ])
        isGamepadConnected = true
        onGamepadButtonRelease("south", () => {
            go("chooseLevel");
        })
    })

    onUpdate(()=>{
        if(isGamepadConnected == true) {
            // destroy(onGamepadDisconnect)
            destroy(textGamepadDisconnected)
        }
    })


})

scene("chooseLevel", () => {


    add([
        sprite("bg-levels"),
        scale(1)
    ])
    function addButton(txt, p, f) {


        const btn = add([
            rect(240, 80, { radius: 8 }),
            pos(p),
            area(),
            scale(1),
            anchor("center"),
            outline(4),
        ])


        btn.add([
            text(txt),
            anchor("center"),
            color(0, 0, 0),
        ])

        btn.onHoverUpdate(() => {
            const t = time() * 10
            btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
            btn.scale = vec2(1.2)
            setCursor("pointer")
        })

        btn.onHoverEnd(() => {
            btn.scale = vec2(1)
            btn.color = rgb()
        })

        btn.onClick(f)

        return btn

    }

    addButton("Level 1",vec2(center().x,center().y-100),()=> go("level1"))
    addButton("Level 2",vec2(center().x,center().y),()=> go("level2"))
    addButton("Level 3",vec2(center().x,center().y+100),()=> go("level3"))

    add([
        text("Choisissez un niveau !",  {
            size: 60,
            outline: 4
        }),
        anchor("center"),
        pos(center().x,80)
    ]);
});


// ########################### SCENE GAME ################################


// ############################ SCENE LVL1 ################################"
scene('level1',()=> {

    loadSound('part1', 'sounds/Arcade_Partie_1.mp3')

    play('part1',{
        volume:0.3,
        loop: true
    })

    const level1 = [
        addLevel(

            [

                ////////////////FOND BLEU ///////////////////////

                '                                                     ',
                '                    de        de                     ',
                '  nnnnnnnn            nnnnnnnn            nnnnnnnnn  ',
                '          n       nnnn        nnnn       n           ',
                '                                                     ',
                '                nn                nn                 ',
                '                                                     ',
                '                                    nnnnn            ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                     bbbbbbbb                        ',
                '                    bddddddddbb                      ',
                '                   bdddddddddddd                     ',
                '                   dddddddddddd                      ',
                '                     ddddddddd                       ',
                '                      abdddab                        ',
                '                      dedddde                        ',
                '                       ddddd                         ',
                '                       ddddd                         ',
                '                       ddddd                         ',
                '  bbddbb               ddddd                 bddbbb  ',
                '  b ddd                ddddd                  ddd b  ',
                '  d ddd                ddddd                  ddd d  ',
                '  d ddd                                       ddd d  ',
                '  d ddd                                       ddd d  ',
                '  d ddd                                       ddd d  ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                              ddd d  ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
                '                                                     ',
///////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {



                    "a": () => [sprite("map", {frame:0}),scale(1)],
                    "b": () => [sprite("map", {frame:1}),scale(1)],
                    "c": () => [sprite("map", {frame:2}),scale(1)],
                    "d": () => [sprite("map", {frame:3}),scale(1)],
                    "e": () => [sprite("map", {frame:4}),scale(1)],
                    "f": () => [sprite("map", {frame:5}),scale(1)],
                    "g": () => [sprite("map", {frame:6}),scale(1)],
                    "h": () => [sprite("map", {frame:7}),scale(1)],
                    "i": () => [sprite("map", {frame:8}),scale(1)],
                    "j": () => [sprite("map", {frame:9}),scale(1)],
                    "k": () => [sprite("map", {frame:10}),scale(1)],
                    "l": () => [sprite("map", {frame:11}),scale(1)],
                    "m": () => [sprite("map", {frame:12}),scale(1)],
                    "n": () => [sprite("map", {frame:20}),scale(1)],
                    "o": () => [sprite("map", {frame:21}),scale(1)],
                    "p": () => [sprite("map", {frame:22}),scale(1)],
                    "q": () => [sprite("map", {frame:23}),scale(1)],
                    "r": () => [sprite("map", {frame:24}),scale(1)],
                    "s": () => [sprite("map", {frame:25}),scale(1)],
                    "t": () => [sprite("map", {frame:26}),scale(1)],
                    "u": () => [sprite("map", {frame:27}),scale(1)],
                    "v": () => [sprite("map", {frame:28}),scale(1)],
                    "w": () => [sprite("map", {frame:29}),scale(1)],
                    "x": () => [sprite("map", {frame:30}),scale(1)],
                    "y": () => [sprite("map", {frame:31}),scale(1)],
                    "!": () => [sprite("map", {frame:40}),scale(1)],
                    ":": () => [sprite("map", {frame:41}),scale(1)],
                    ";": () => [sprite("map", {frame:42}),scale(1)],
                    "*": () => [sprite("map", {frame:43}),scale(1)],
                    "ù": () => [sprite("map", {frame:44}),scale(1)],
                    "$": () => [sprite("map", {frame:45}),scale(1)],


                    "/": () => [
                        sprite("gun"),
                        area(),
                        body({ isStatic: true }),
                        scale(1),
                        'gun',]
                },
            }),
        addLevel(
            [

                //////////////// PLATEFORM ///////////////////////

                '                                                     ',
                ' ccccccccc          deccccccccde          cccccccccc ',
                ' c        c      ccccc        ccccc      c         c ',
                ' c         c     c    $$          c     c $$$$$    c ',
                ' c         c   ccc$$$$$$          ccc   c          c ',
                ' c         c   c  $$$$$$     *      c   c          c ',
                ' c         cccccffffffff            ccccc       $$$c ',
                ' cc                                             ffcc ',
                '  c                                               c  ',
                '  c          ffff                                 c  ',
                '  c                               fffff  *        c  ',
                '  c                                               c  ',
                '  cccccc             cccccccc                cccccc  ',
                '       c            c$$  $$$ cc              c       ',
                '       c           c  $ $ $ $$ c         fff c       ',
                '       c          c    $ $      c            c       ',
                '       c          c--      $$$ c             c       ',
                '       c          ccc      $  c              c       ',
                '       c             cab   abc     ff        c       ',
                '       c              de  fde                c       ',
                '       c              c     c                c       ',
                '       c              c     c                c       ',
                ' ccccccc              cf    c           fffffccccccc ',
                ' c                    c     c                      c ',
                ' c                    c     c                      c ',
                ' c                    c     c    fffff             c ',
                ' c                        fff                      c ',
                ' c    *                                            c ',
                ' c $$$$$$$                                    $$$$$c ',
                ' ccccccccccccccff                    ffccccccccccccc ',
                '              c                     f  c             ',
                '              c                    f   c             ',
                '              c        fffffff         c             ',
                '              c                        c             ',
                '              c                        c             ',
                ' ccccccc      c     *          ffffffffc     ccccccc ',
                ' c     c      c                        c     c  $$$c ',
                ' c     c      c             ff         c     c     c ',
                ' c     c      c                        c     c$    c ',
                ' c     c      c     $$$$               c     cf    c ',
                ' c     cccccccc    ffffff              ccccccc     c ',
                ' c                                                 c ',
                ' c                                                 c ',
                ' c                             fffff              fc ',
                ' c                                                 c ',
                ' c      $$$                                     ___c ',
                ' cccccccfffffff       ffffff             ffffccccccc ',
                '       c                                     c       ',
                '       c                                     c       ',
                '       c     *                   fffff       c       ',
                '       c                                  ___c       ',
                '       ccccccccccccccccccccccccccccccccccccccc       ',
                '                                                     ',
//////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {


                    "a": () => [sprite("map", {frame:33}),scale(1), area(),body({isStatic:true}),"block" ],
                    "b": () => [sprite("map", {frame:34}),scale(1), area(),body({isStatic:true}),"block" ],
                    "c": () => [sprite("map", {frame:52}),scale(1), area(),body({isStatic:true}),"block" ],
                    "d": () => [sprite("map", {frame:53}),scale(1), area(),body({isStatic:true}),"block" ],
                    "e": () => [sprite("map", {frame:54}),scale(1), area(),body({isStatic:true}),"block" ],
                    "f": () => [sprite("map", {frame:180}),scale(1), area(),body({isStatic:true}),"block" ],
                    "g": () => [sprite("map", {frame:181}),scale(1), area(),body({isStatic:true}),"block" ],
                    "h": () => [sprite("map", {frame:182}),scale(1), area(),body({isStatic:true}),"block" ],
                    "i": () => [sprite("map", {frame:183}),scale(1), area(),body({isStatic:true}),"block" ],
                    "j": () => [sprite("map", {frame:184}),scale(1), area(),body({isStatic:true}),"block" ],
                    "k": () => [sprite("map", {frame:185}),scale(1), area(),body({isStatic:true}),"block" ],
                    "l": () => [sprite("map", {frame:186}),scale(1), area(),body({isStatic:true}),"block" ],
                    "m": () => [sprite("map", {frame:187}),scale(1), area(),body({isStatic:true}),"block" ],
                    "n": () => [sprite("map", {frame:188}),scale(1), area(),body({isStatic:true}),"block" ],
                    "o": () => [sprite("map", {frame:189}),scale(1), area(),body({isStatic:true}),"block" ],
                    "p": () => [sprite("map", {frame:190}),scale(1), area(),body({isStatic:true}),"block" ],
                    "_": () => [sprite("spike"),scale(1),area(),  "dangerous"],
                    "$": () => [sprite("battery", {frame:1}),scale(2.5),area(), "battery"],
                    "*": () => [sprite("pod", {frame:3}),scale(2.5), anchor("bot"), patrol(), offscreen({ hide: true }),  area(), "dangerous"],
                },
            }),

        addLevel(
            [

                ///////////////  DECORATION BLEU  ///////////////////////

                'crrrrrrrrrcchiccchichirrrrrrrrhichicchicccrrrrrrrrrrc',
                'j         rjpqjrrpqrpq        pqrpqrrpqjjr          j',
                'j          rccjhi                  hiccjr           j',
                'j           rrjpq                  pqrrj            j',
                'j           hij                      hij            j',
                'j           pqr                      pqr            j',
                'j                                                   j',
                'r                                                   r',
                'hi                                                 hi',
                'pq                                                 pq',
                'cc                                                 cc',
                'rr                                                 rr',
                'hi                                                 hi',
                'pqrrccc                                       cccrrpq',
                'cchijjj                                       jjjhicc',
                'jjpqrrj                                       jrrpqjj',
                'jjcchij                                       jhiccjj',
                'jjrrpqj                                       jpqrrjj',
                'jjhiccj                                       jcchijj',
                'rrpqrrj                                       jpqrrjj',
                'hicchij                                       jrrpqrr',
                'pqrrpqr                                       jhicchi',
                'j                                                   c',
                'j                                                   j',
                'j  c   c                                     c   c  j',
                'j  j   j                                     j   j  j',
                'j  j   j                                     j   j  j',
                'j  j   j                                     j   j  j',
                'j  r   r                                     r   r  j',
                'j                                                   j',
                'jhicchicchiccc                          hicchijjhijjj',
                'jpqrrpqrrpqrrj                          pqrrpqrrpqrrj',
                'jrrrrrrrrrrrrj                          rrrrrrrrrrrrr',
                'jjjhijjhijjhij                          jjhijjhijjhij',
                'jrrpqrrpqrrpqj                          rrpqrrpqrrpqj',
                'j       jhijjj                          hijjj    c  j',
                'j       jpqjjj                          pqjjj    j  j',
                'j       jjjhij                          jjhij    j  j',
                'j       jjjpqj                          jjpqj    j  j',
                'j       rrrrrr                          rrrrr    j  j',
                'j                                                j  j',
                'j                                            c   j  j',
                'j                                            j   j  j',
                'j                                            j   j  j',
                'j                                            j   j  j',
                'j                                            r   r  j',
                'j                                                   j',
                'jhicchi                                       hicchij',
                'jpqrrpq                                       pqrrpqj',
                'jcchicc                                       rrhirrj',
                'jrrpqrr                                       rrpqrrj',
                'jhirrrr                                       rrrrhij',
                'rpqrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrpqr',
/////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {


                    "a": () => [sprite("map", {frame:13}),scale(1)],
                    "b": () => [sprite("map", {frame:14}),scale(1)],
                    "c": () => [sprite("map", {frame:15}),scale(1)],
                    "d": () => [sprite("map", {frame:16}),scale(1)],
                    "e": () => [sprite("map", {frame:17}),scale(1)],
                    "f": () => [sprite("map", {frame:18}),scale(1)],
                    "g": () => [sprite("map", {frame:19}),scale(1)],
                    "h": () => [sprite("map", {frame:33}),scale(1)],
                    "i": () => [sprite("map", {frame:34}),scale(1)],
                    "j": () => [sprite("map", {frame:35}),scale(1)],
                    "k": () => [sprite("map", {frame:36}),scale(1)],
                    "l": () => [sprite("map", {frame:37}),scale(1)],
                    "m": () => [sprite("map", {frame:38}),scale(1)],
                    "n": () => [sprite("map", {frame:39}),scale(1)],
                    "o": () => [sprite("map", {frame:52}),scale(1)],
                    "p": () => [sprite("map", {frame:53}),scale(1)],
                    "q": () => [sprite("map", {frame:54}),scale(1)],
                    "r": () => [sprite("map", {frame:55}),scale(1)],
                    "s": () => [sprite("map", {frame:56}),scale(1)],
                    "t": () => [sprite("map", {frame:57}),scale(1)],
                    "u": () => [sprite("map", {frame:58}),scale(1)],
                    "v": () => [sprite("map", {frame:59}),scale(1)],
                },
            })

    ]

    // ######################## PLAYER #########################

    const SPEED = 250
    let JUMP_FORCE = 350
    const ENEMY_SPEED = 60
    const BULLET_SPEED = 200
    let PLAYER_HEALTH = 100

    const player = add([
        sprite('astro'),
        scale(5),
        anchor("center"),
        pos(100,1600),
        area(),
        body({jumpForce: JUMP_FORCE}),
        health(PLAYER_HEALTH),
        doubleJump(),
        z(49),
        "player"
    ])

    //######################### MOUVEMENT ###########################

    // Switch to "idle" or "run" animation when player hits ground
    player.onGround(() => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        } else {
            player.play("run")
        }
    })

    // ########################## DASH ##############################

    let isDashAvailable = true
    player.onGround(()=>{
        isDashAvailable = true
    })
    function Dash(dashX,dashY){
        isDashAvailable = false
        const t = tween(player.pos,vec2((player.pos.x)+dashX,(player.pos.y)+dashY),0.3,(p) => player.pos = p,easings.easeOutSine)
        onUpdate(()=>{
            player.onCollide("block",()=>{
                t.cancel()
            })
        })
    }

    // ########################## KEYBOARD CONTROL #############################
    let dirX = 0
    let dirY = 0
    if(!isGamepadConnected){

        onUpdate(()=> {
            onKeyDown("z", () => {
                gun.angle = -90
                dirX = 0
                dirY = 0
            })
            onKeyDown("s", () => {
                gun.angle = 90
                dirX = 0
                dirY = 0
            })

            onKeyDown("q", () => {
                gun.angle = 180
                dirX = -200
                dirY = 0
            })

            onKeyDown("d", () => {
                gun.angle = 0
                dirX = 200
                dirY = 0
            })

            if (isKeyDown("z") && isKeyDown("d")) {
                console.log("up right")
                gun.angle = -45
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("z") && isKeyDown("q")) {
                console.log("up left")
                gun.angle = -135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("q")) {
                console.log("down left")
                gun.angle = 135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("d")) {
                console.log("down right")
                gun.angle = 45
                dirX = 0
                dirY = 0
            }
        })

        onKeyDown("d",()=>{
            player.move(SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        onKeyDown("q",()=>{
            player.move(-SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        let canJump  = true
        onKeyPress("space", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onKeyPress("m",(position)=> {

            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }


        })

        onKeyPress("l",()=>{
            if(!player.isGrounded()){
                if(isDashAvailable){
                    isDashing = true
                    Dash(dirX,dirY)
                }
            }
        })
    }


    // ##################################################################

    // ########################## GAMEPAD CONTROL #######################

    if(isGamepadConnected){
        // setGravity(1500)
        onGamepadStick("left", (v) => {
            player.move(v.x * 250, 0)
            onUpdate(()=>{
                if (v.x > 0 && v.y === 0){
                    gun.angle= 0
                    dirX = 200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y > 0){
                    gun.angle= 90
                    dirX = 0
                    dirY = 0
                }
                if (v.x < 0 && v.y === 0){
                    gun.angle= 180
                    dirX = -200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y < 0){
                    gun.angle= -90
                    dirX = 0
                    dirY = 0
                }
            })
        })

        let canJump  = true
        onGamepadButtonPress("south", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onGamepadButtonPress("west",(position)=> {
            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }
        })

        onGamepadButtonPress("east",()=>{
            if(!player.isGrounded()){
                if(!player.isGrounded()){
                    if(isDashAvailable){
                        isDashing = true
                        Dash(dirX,dirY)
                    }
                }
            }
        })

    }


    // #########################################################

    //######################### CAMERA ##########################

    player.onUpdate(()=>{
        camPos(player.pos)
    })

    //###########################################################

    // ###################### GUN ##############################

    const gun = add([
        // rect(35, 8),
        sprite("gun"),
        scale(0.04),
        pos(player.pos.x,player.pos.y),
        // pos(500,500),
        anchor(vec2(0,0)),
        area(),
        rotate(0),
        color(204, 230, 244),
        z(50),
        // z(49),
        "gun",
    ])

    onUpdate(() => {
        gun.pos = player.pos
    })

    let isDashing = false

    function spawnBullet(bulletposX, bulletPosY, direction) {

        add([
            rect(12,10),
            outline(2,rgb(0,0,0)),
            pos(gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))),
            anchor("top"),
            color(255,255,0),
            area(),
            move(Vec2.fromAngle(gun.angle), 400),
            z(20),
            //layer("game"),
            rotate(gun.angle),
            "playerBullet",
            "danger"
        ]);
    }

    // ###############################################################


    // ######################## ENEMY #########################

    function patrol(speed = 100, dir = 1) {
        let changeDirectionTimeout;

        function changeDirection() {
            dir = -dir; // Change la direction
            // Réinitialise le délai pour le prochain changement de direction
            changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes
        }

        return {
            id: "patrol",
            require: ["pos", "area"],
            add() {
                // Lance le délai initial pour le premier changement de direction
                changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes

                this.on("collide", (obj, col) => {
                    if (col.isLeft() || col.isRight()) {
                        dir = -dir;
                    }
                });
            },
            update() {
                this.move(speed * dir, 0);
            },
        };
    }


    //#############################################################

    // ---------------- COLLIDE -----------------


    onCollide("player", "battery", (p, battery) => {
        destroy(battery)
        score.value += 10
        score.text = "score: " + score.value
        play("battery")

    })


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })

    onCollide("playerBullet","block",(pb,b)=>{
        destroy(pb)
    })



    // ########################### SCORE #############################

    const score = add([
        fixed(),
        text("score: 0"),
        pos(width()-200,20),
        {
            value:0,
        }
    ])

    // ####################################################################

    // ############################# TIMER ###############################

    // const timer = add([
    // 	text("0"),
    // 	pos(width()-200,60),
    // 	{
    // 		value:0,
    // 	},
    // ])
    //
    // loop(1,()=>{
    // 	timer.value ++
    // 	timer.text = timer.value
    // })

    // ###############################################################

    // ########################## Health ############################

    const healthBar = add([

        fixed(),
        text("❤️❤️❤️❤️❤️"),
        pos(width() / 15, 20),
        {
            value: 100,
        }
    ])

    player.onCollide("dangerous", () => {
        player.hurt(20);
        healthBar.value -= 20;
        updateHealthBar();
        if (healthBar.value <= 0) {
            go('lose');
            wait(2, () => {
                go('scene');
            });
        }
    });

    function updateHealthBar() {
        let remainingStars = Math.ceil(healthBar.value / 20);
        healthBar.text = "❤️".repeat(remainingStars);
        console.log(healthBar.value);
    }


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })

    //################################################################


})

// ############################ SCENE LVL2 ################################"
scene('level2',()=> {

    loadSound('part2', 'sounds/Arcade_Partie_2.wav')

    play('part2',{
        volume: 0.3,
        loop: true,
    })

    const level2 = [
        addLevel(
            [
                '                                                                                                                 ',
                '             nnnnnnnnnnnnnnn                                                                                     ',
                '             ddddddddddddddd                                                                                     ',
                '             ddddddddddddddd                   nnnnnnnnnnn                                                       ',
                '     nnnnnnnnddddddddddddddd                  ndddddddddddn                                                      ',
                '             ddddddddddddddd                 ndddddddddddddn                                                     ',
                '                     ddddddd               ndddddddddddddddddn                                                   ',
                '                      dddddd              ndddddddddddddddddddn                                                  ',
                '                       ddddd             ndddddddddddddddddddddn                                                 ',
                '                                         dddddddddddddddddddddddd                                                ',
                '                                         dddddddddddddddddddddddd                                                ',
                '                                         dddddddddddddddddddddddd                                                ',
                '                                           ddddddddddddddddddd                                                   ',
                '                                           ddddddddddddddddddd                                                   ',
                '                                             ddddddddddddddd               dddddddddddd                          ',
                '                                              ddddddddddddd               dddddddddddddd                         ',
                '                                                                         ddddddddddddddddddddd                   ',
                '                                                                        dddddddddddddddddddddd                   ',
                '                                                                        ddddddddddddddddddd                      ',
                '                                                                        dddddddddddddddddd                       ',
                '                                                                        ddddddddddddddddd                        ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',
                '                                                                                                                 ',

///////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    /////////////// /FOND ORANGE ///////////////////////

                    "a": () => [sprite("map", {frame:60}),scale(1)],
                    "b": () => [sprite("map", {frame:61}),scale(1)],
                    "c": () => [sprite("map", {frame:62}),scale(1)],
                    "d": () => [sprite("map", {frame:63}),scale(1)],
                    "e": () => [sprite("map", {frame:64}),scale(1)],
                    "f": () => [sprite("map", {frame:65}),scale(1)],
                    "g": () => [sprite("map", {frame:66}),scale(1)],
                    "h": () => [sprite("map", {frame:67}),scale(1)],
                    "i": () => [sprite("map", {frame:68}),scale(1)],
                    "j": () => [sprite("map", {frame:69}),scale(1)],
                    "k": () => [sprite("map", {frame:70}),scale(1)],
                    "l": () => [sprite("map", {frame:71}),scale(1)],
                    "m": () => [sprite("map", {frame:72}),scale(1)],
                    "n": () => [sprite("map", {frame:80}),scale(1)],
                    "o": () => [sprite("map", {frame:81}),scale(1)],
                    "p": () => [sprite("map", {frame:82}),scale(1)],
                    "q": () => [sprite("map", {frame:83}),scale(1)],
                    "r": () => [sprite("map", {frame:84}),scale(1)],
                    "s": () => [sprite("map", {frame:85}),scale(1)],
                    "t": () => [sprite("map", {frame:86}),scale(1)],
                    "u": () => [sprite("map", {frame:87}),scale(1)],
                    "v": () => [sprite("map", {frame:88}),scale(1)],
                    "w": () => [sprite("map", {frame:89}),scale(1)],
                    "x": () => [sprite("map", {frame:90}),scale(1)],
                    "y": () => [sprite("map", {frame:91}),scale(1)],
                },
            }),
        addLevel(
            [
                'kccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccck',
                'k   k   k   k               k       k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k',
                'k   k   k   k               k       k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k   k',
                'kkk kkk kkk k               k       k   k   k               k   k   kabababababababababababab   k   k   k   k   k',
                'k   k           *        $$$k       k   k   k  $$$$         k   k   kdedededededededededededeabababababab   k   k',
                'k   k      *          $$  $ kcccc       k   k $$$$$         k   k  ab$ $$                    dededededede   k   k',
                'k kkk           iiiii $$ $$$k   c       k   fffffff             k  de$$ $ *                              abab   k',
                'k cc                 i $$$$ k   c       k                       kabffffff                                dedecc k',
                'kc  cff               i$$  $k   ccccc   k                       kde                          $$$            c  ck',
                'k                     iiiiiik       c   k     *                               *       $$$$                      k',
                'k                                   cccck                ff                           ffff         $$           k',
                'k $$$                                   k                      $$                                               k',
                'kiiii     ccc       fffff               kjj                   jjj                                   ccc   iiiiiik',
                'k    i    ckc                           abk__               $$kab          cccccccccccc             k c     $$$ k',
                'k     i   c  c                          dekjj               jjkde         c            c           c  c     $ $$k',
                'k     i   c   c                                                          c  $ $$  $$$   ccc       c   c       $$k',
                'k    i    ckk kc              ffff                fff    *              c    $  $$               ck kkc       ffk',
                'kiiii     c   c    $$$                                                      *   $$$$              c   c         k',
                'k cc      c  c     ff                                                       ffffffff       ccc     c  c         k',
                'kc  c     ckc     f                     ___abababab   abababab                            c         k c fff     k',
                'k         ccc    f                     iiiidededede  fdedededeiiii      _________________c          ccc         k',
                'k                                      abab k   k       k   k abab      ccccccccccccccccc                       k',
                'kccccc           *                   iidede k   k$$$$$$$k   k dedeii                                       ccccck',
                'k   kc                               ab k   k   k$$$$$$$k   k   k ab__                                     ck   k',
                'k   kc     $$       fff           iiide k   k   kf$$$$$$k   k   k deiii             *                 $$$  ck   k',
                'kkk kcccccccc                   __abk   k   k   k $$$$$$k   k   k   kab       fff                   cccccccck   k',
                'k   kkk kkk k                   iidek   k   k   k     ffk   k   k   kdeii                           k   k   k   k',
                'k   k   k   k________________  iab  k   k   k   k       k   k   k   k  abi           _________ff    k   k   k   k',
                'k kkk   k   kcccccccccccccccciiide  k   k   k   k_______k   k   k   k  deiii_________ccccccccccccccck   k   k   k',
                'kccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccckccck',
//////////////////////////////////////////////////////////////////////|


            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    //////////////// PLATEFORM ORANGE ///////////////////////

                    "a": () => [sprite("map", {frame:93}),scale(1), area(),body({isStatic:true}), "block" ],
                    "b": () => [sprite("map", {frame:94}),scale(1), area(),body({isStatic:true}), "block" ],
                    "c": () => [sprite("map", {frame:112}),scale(1), area(),body({isStatic:true}), "block" ],
                    "d": () => [sprite("map", {frame:113}),scale(1), area(),body({isStatic:true}), "block" ],
                    "e": () => [sprite("map", {frame:114}),scale(1), area(),body({isStatic:true}), "block" ],
                    "f": () => [sprite("map", {frame:200}),scale(1), area(),body({isStatic:true}), "block" ],
                    "g": () => [sprite("map", {frame:201}),scale(1), area(),body({isStatic:true}), "block" ],
                    "h": () => [sprite("map", {frame:202}),scale(1), area(),body({isStatic:true}), "block" ],
                    "i": () => [sprite("map", {frame:203}),scale(1), area(),body({isStatic:true}), "block" ],
                    "j": () => [sprite("map", {frame:204}),scale(1), area(),body({isStatic:true}), "block" ],
                    "k": () => [sprite("map", {frame:205}),scale(1), area(),body({isStatic:true}), "block" ],
                    "l": () => [sprite("map", {frame:206}),scale(1), area(),body({isStatic:true}), "block" ],
                    "m": () => [sprite("map", {frame:207}),scale(1), area(),body({isStatic:true}), "block" ],
                    "n": () => [sprite("map", {frame:208}),scale(1), area(),body({isStatic:true}), "block" ],
                    "o": () => [sprite("map", {frame:209}),scale(1), area(),body({isStatic:true}), "block" ],
                    "p": () => [sprite("map", {frame:210}),scale(1), area(),body({isStatic:true}), "block" ],

                    "_": () => [sprite("spike"),scale(1),area(),  "dangerous"],
                    "$": () => [sprite("battery", {frame:1}),scale(2.5),area(), "battery"],
                    "*": () => [sprite("pod", {frame:3}),scale(2.5), anchor("bot"), patrol(), offscreen({ hide: true }),  area(), "dangerous"],
                },
            }),
        addLevel(
            [
                '                                                                                                                 ',
                ' hic hic hic                 hiooccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc     ',
                ' pqj pqj pqj                 pqhijjj jjj jjj jjr rrr rrr rjj jjj jjj rrr rrr rrr rrr rrr rrr jjj jjj jjj jjj     ',
                '   r   r   r                 hipqjjj jjj jjj jr           rj jjj jjj                         rrr rrr rrr jjj     ',
                ' chi                         pqoorrr jjj jjj r             r jjj jjr                                     jjj     ',
                ' jpq   c                         hioojjj jjr                 rjj jj                                      rrr     ',
                ' r     j                         pqhijjj jr                   rj rr                                              ',
                '       j                         hipqjjj r                     r                                                 ',
                '       j                             jjj                                                                 c       ',
                ' c  c  j                             rrr                                                                 j  c  c ',
                ' j  j  j                                                                                                 j  j  j ',
                ' r  r  j              c                                                                         c        j  r  r ',
                '       j        c     j                  jj                   jjj                               j        j       ',
                ' hioo  j        j     j                                                                         j    o   j  c  c ',
                ' pqhio j   hi   j     j                    jj               jj                                  j   hi   j  j  j ',
                ' hipqo j   pqc  j     j                                                                         j  cpq   j  j  j ',
                ' pqoo  j     j  j     j                                                                         j  j     j  j  j ',
                '       j   hir  j     j                                                                         j  rhi   j  j  j ',
                '       j   pq   j     j                                                                         j   pq   j  j  j ',
                '       j        j  c  j                                                                      c  j  c o   j  j  j ',
                ' c  c  j        j  j  j                                                                   c  j  j  j     j  j  j ',
                ' r  r  j        j  j  j                    c ccc         ccc c                            j  j  j  j  c  j  r  r ',
                '       j        j  j  j                    j jjj         jjj j                            j  j  j  j  j  j       ',
                ' hic   j        j  j  j                c ccj jjj         jjj jcc c                        j  j  j  j  j  j   chi ',
                ' pqj   r        j  j  j                j jjj jjj         jjj jjj j                        j  j  j  j  r  r   jpq ',
                '   r         c  j  j  j              ccj jjj jjj         jjj jjj jcc                      j  j  j  j         r   ',
                ' chi   c   c j  j  j  j              jjj jjj jjj         jjj jjj jjj                      j  j  j  j c   c   jic ',
                ' jpq hij hij r  r  r  r           cc jjj jjj jjj         jjj jjj jjj cc                   r  r  r  r jhi jhi pqj ',
                ' r   pqr pqr                      jj rrr rrr rrr         rrr rrr rrr jj                              rpq rpq   r ',
                '                                                                                                                 ',
/////////////////////////////////////////////////////////////////////|


            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    ///////////////  DECORATION ORANGE   ///////////////////////

                    "a": () => [sprite("map", {frame:73}),scale(1)],
                    "b": () => [sprite("map", {frame:74}),scale(1)],
                    "c": () => [sprite("map", {frame:75}),scale(1)],
                    "d": () => [sprite("map", {frame:76}),scale(1)],
                    "e": () => [sprite("map", {frame:77}),scale(1)],
                    "f": () => [sprite("map", {frame:78}),scale(1)],
                    "g": () => [sprite("map", {frame:79}),scale(1)],
                    "h": () => [sprite("map", {frame:93}),scale(1)],
                    "i": () => [sprite("map", {frame:94}),scale(1)],
                    "j": () => [sprite("map", {frame:95}),scale(1)],
                    "k": () => [sprite("map", {frame:96}),scale(1)],
                    "l": () => [sprite("map", {frame:97}),scale(1)],
                    "m": () => [sprite("map", {frame:98}),scale(1)],
                    "n": () => [sprite("map", {frame:99}),scale(1)],
                    "o": () => [sprite("map", {frame:112}),scale(1)],
                    "p": () => [sprite("map", {frame:113}),scale(1)],
                    "q": () => [sprite("map", {frame:114}),scale(1)],
                    "r": () => [sprite("map", {frame:115}),scale(1)],
                    "s": () => [sprite("map", {frame:116}),scale(1)],
                    "t": () => [sprite("map", {frame:117}),scale(1)],
                    "u": () => [sprite("map", {frame:118}),scale(1)],
                    "v": () => [sprite("map", {frame:119}),scale(1)],
                },
            })
    ]

    // ######################## PLAYER #########################

    const SPEED = 250
    let JUMP_FORCE = 350
    const ENEMY_SPEED = 60
    const BULLET_SPEED = 200
    let PLAYER_HEALTH = 100

    const player = add([
        sprite('astro'),
        scale(5),
        anchor("center"),
        pos(110,750),
        area(),
        body({jumpForce: JUMP_FORCE}),
        health(PLAYER_HEALTH),
        doubleJump(),
        z(49),
        "player"
    ])

    //######################### MOUVEMENT ###########################

    // Switch to "idle" or "run" animation when player hits ground
    player.onGround(() => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        } else {
            player.play("run")
        }
    })

    // ########################## DASH ##############################

    let isDashAvailable = true
    player.onGround(()=>{
        isDashAvailable = true
    })
    function Dash(dashX,dashY){
        isDashAvailable = false
        const t = tween(player.pos,vec2((player.pos.x)+dashX,(player.pos.y)+dashY),0.3,(p) => player.pos = p,easings.easeOutSine)
        onUpdate(()=>{
            player.onCollide("block",()=>{
                t.cancel()
            })
        })
    }

    // ########################## KEYBOARD CONTROL #############################
    let dirX = 0
    let dirY = 0
    if(!isGamepadConnected){

        onUpdate(()=> {
            onKeyDown("z", () => {
                gun.angle = -90
                dirX = 0
                dirY = 0
            })
            onKeyDown("s", () => {
                gun.angle = 90
                dirX = 0
                dirY = 0
            })

            onKeyDown("q", () => {
                gun.angle = 180
                dirX = -200
                dirY = 0
            })

            onKeyDown("d", () => {
                gun.angle = 0
                dirX = 200
                dirY = 0
            })

            if (isKeyDown("z") && isKeyDown("d")) {
                console.log("up right")
                gun.angle = -45
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("z") && isKeyDown("q")) {
                console.log("up left")
                gun.angle = -135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("q")) {
                console.log("down left")
                gun.angle = 135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("d")) {
                console.log("down right")
                gun.angle = 45
                dirX = 0
                dirY = 0
            }
        })

        onKeyDown("d",()=>{
            player.move(SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        onKeyDown("q",()=>{
            player.move(-SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        let canJump  = true
        onKeyPress("space", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onKeyPress("m",(position)=> {

            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }


        })

        onKeyPress("l",()=>{
            if(!player.isGrounded()){
                if(isDashAvailable){
                    isDashing = true
                    Dash(dirX,dirY)
                }
            }
        })
    }


    // ##################################################################

    // ########################## GAMEPAD CONTROL #######################

    if(isGamepadConnected){
        // setGravity(1500)
        onGamepadStick("left", (v) => {
            player.move(v.x * 250, 0)
            onUpdate(()=>{
                if (v.x > 0 && v.y === 0){
                    gun.angle= 0
                    dirX = 200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y > 0){
                    gun.angle= 90
                    dirX = 0
                    dirY = 0
                }
                if (v.x < 0 && v.y === 0){
                    gun.angle= 180
                    dirX = -200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y < 0){
                    gun.angle= -90
                    dirX = 0
                    dirY = 0
                }
            })
        })

        let canJump  = true
        onGamepadButtonPress("south", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onGamepadButtonPress("west",(position)=> {
            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }
        })

        onGamepadButtonPress("east",()=>{
            if(!player.isGrounded()){
                if(!player.isGrounded()){
                    if(isDashAvailable){
                        isDashing = true
                        Dash(dirX,dirY)
                    }
                }
            }
        })

    }


    // #########################################################

    //######################### CAMERA ##########################

    player.onUpdate(()=>{
        camPos(player.pos)
    })

    //###########################################################

    // ###################### GUN ##############################

    const gun = add([
        // rect(35, 8),
        sprite("gun"),
        scale(0.04),
        pos(player.pos.x,player.pos.y),
        // pos(500,500),
        anchor(vec2(0,0)),
        area(),
        rotate(0),
        color(204, 230, 244),
        z(50),
        // z(49),
        "gun",
    ])

    onUpdate(() => {
        gun.pos = player.pos
    })

    let isDashing = false

    function spawnBullet(bulletposX, bulletPosY, direction) {

        add([
            rect(12,10),
            outline(2,rgb(0,0,0)),
            pos(gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))),
            anchor("top"),
            color(255,255,0),
            area(),
            move(Vec2.fromAngle(gun.angle), 400),
            z(20),
            //layer("game"),
            rotate(gun.angle),
            "playerBullet",
            "danger"
        ]);
    }

    // ###############################################################


    // ######################## ENEMY #########################

    function patrol(speed = 100, dir = 1) {
        let changeDirectionTimeout;

        function changeDirection() {
            dir = -dir; // Change la direction
            // Réinitialise le délai pour le prochain changement de direction
            changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes
        }

        return {
            id: "patrol",
            require: ["pos", "area"],
            add() {
                // Lance le délai initial pour le premier changement de direction
                changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes

                this.on("collide", (obj, col) => {
                    if (col.isLeft() || col.isRight()) {
                        dir = -dir;
                    }
                });
            },
            update() {
                this.move(speed * dir, 0);
            },
        };
    }


    //#############################################################

    // ---------------- COLLIDE -----------------


    onCollide("player", "battery", (p, battery) => {
        destroy(battery)
        score.value += 10
        score.text = "score: " + score.value
    })


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })

    onCollide("playerBullet","block",(pb,b)=>{
        destroy(pb)
    })



    // ########################### SCORE #############################

    const score = add([
        fixed(),
        text("score: 0"),
        pos(width()-200,20),
        {
            value:0,
        }
    ])

    // ####################################################################

    // ############################# TIMER ###############################

    const timer = add([
        fixed(),
        text("0"),
        pos(width()-400,20),
        {
            value:0,
        },
    ])

    loop(1,()=>{
        timer.value ++
        timer.text = timer.value
    })

    // ###############################################################

    // ########################## Health ############################

    const healthBar = add([

        fixed(),
        text("❤️❤️❤️❤️❤️"),
        pos(width() / 15, 20),
        {
            value: 100,
        }
    ])

    player.onCollide("dangerous", () => {
        player.hurt(20);
        healthBar.value -= 20;
        updateHealthBar();
        if (healthBar.value <= 0) {
            go('lose');
            wait(2, () => {
                go('scene');
            });
        }
    });

    function updateHealthBar() {
        let remainingStars = Math.ceil(healthBar.value / 20);
        healthBar.text = "❤️".repeat(remainingStars);
        console.log(healthBar.value);
    }


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })


})

// ############################ SCENE LVL3 ################################"
scene('level3',()=> {

    loadSound('boss1', 'sounds/Arcade_Boss_1.wav')

    play('boss1',{
        volume: 0.3,
        loop: true
    })

    const level3 = [
        addLevel(
            [
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                 vvvvvvvvvv                 ',
                '                 vvvvvvvvvv                 ',
                '               vvvvvvvvvvvvvv               ',
                '               vvvvv    vvvvv               ',
                '             vvvvvvv    vvvvvvv             ',
                '             vvvvv  nopq  vvvvv             ',
                '             vvvvv        vvvvv             ',
                '             vvv  no    pq  vvv             ',
                '             vvv            vvv             ',
                '             vvv            vvv             ',
                '             vvv            vvv             ',
                '             vvv            vvv             ',
                '             vvv            vvv             ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv        vvv            vvv        vvv  ',
                '  vvv                                  vvv  ',
                '  vvv                                  vvv  ',
                '  vvv                                  vvv  ',
                '  vvv                                  vvv  ',
                '  vvv                                  vvv  ',
                '  vvv                                  vvv  ',
                '                                            ',
                '                                            ',
                '                                            ',


///////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    /////////////// /FOND VERT ///////////////////////

                    "a": () => [sprite("map", {frame:120}),scale(1)],
                    "b": () => [sprite("map", {frame:121}),scale(1)],
                    "c": () => [sprite("map", {frame:122}),scale(1)],
                    "d": () => [sprite("map", {frame:123}),scale(1)],
                    "e": () => [sprite("map", {frame:124}),scale(1)],
                    "f": () => [sprite("map", {frame:125}),scale(1)],
                    "g": () => [sprite("map", {frame:126}),scale(1)],
                    "h": () => [sprite("map", {frame:127}),scale(1)],
                    "i": () => [sprite("map", {frame:128}),scale(1)],
                    "j": () => [sprite("map", {frame:129}),scale(1)],
                    "k": () => [sprite("map", {frame:130}),scale(1)],
                    "l": () => [sprite("map", {frame:131}),scale(1)],
                    "m": () => [sprite("map", {frame:132}),scale(1)],
                    "n": () => [sprite("map", {frame:140}),scale(1)],
                    "o": () => [sprite("map", {frame:141}),scale(1)],
                    "p": () => [sprite("map", {frame:142}),scale(1)],
                    "q": () => [sprite("map", {frame:143}),scale(1)],
                    "r": () => [sprite("map", {frame:144}),scale(1)],
                    "s": () => [sprite("map", {frame:145}),scale(1)],
                    "t": () => [sprite("map", {frame:146}),scale(1)],
                    "u": () => [sprite("map", {frame:147}),scale(1)],
                    "v": () => [sprite("map", {frame:148}),scale(1)],
                    "w": () => [sprite("map", {frame:149}),scale(1)],
                    "x": () => [sprite("map", {frame:150}),scale(1)],
                    "y": () => [sprite("map", {frame:151}),scale(1)],
                },
            }),
        addLevel(
            [
                'ffffffffffffffffffffffffffffffffffffffffffff',
                'fabjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjabf',
                'fde   $$$ $  $$  ababababab              def',
                'fj   *  $  $$$   dedededede       *       jf',
                'fj  $$$$  $$   ab $$$ $$ $ ab             jf',
                'fj   iiiii     de  $$ $$$ $de             jf',
                'fj           ab     $*$$ $$$ ab           jf',
                'fj           de $$$ abab   $ de           jf',
                'fj         ab  $  $ dede  $$$$ ab         jf',
                'fj         de$$ $$ab    ab     de         jf',
                'fj      iii  $ $ $de    de  $$            jf',
                'fj              ab        ab        *     jf',
                'fj              de        de              jf',
                'fj                                  iiiii jf',
                'fj                                        jf',
                'fjbab                                  abajf',
                'fjede         iiiii                    dedjf',
                'fj   ab                              ab   jf',
                'fj   de                              de   jf',
                'fj                                        jf',
                'fj    *                      iiii         jf',
                'fj                                        jf',
                'fj                                        jf',
                'fj          iiiiiii                       jf',
                'fj                                        jf',
                'fj                                        jf',
                'fj                              *         jf',
                'fj                                        jf',
                'fjiiii              ii                 iiijf',
                'fj                                   iiiiijf',
                'fj                                  iiiiiijf',
                'fj                                   iiiiijf',
                'fj      *                              iiijf',
                'fj       iiiii               iiiiii       jf',
                'fj                                        jf',
                'fj                                        jf',
                'fj                                      * jf',
                'fj         abkabkabkababkabkabkab         jf',
                'fj        kdekdekdekdedekdekdekdek     iiijf',
                'fj      abk  k  k  k    k  k  k  kab      jf',
                'fj     kdek  k  k  k    k  k  k  kdek     jf',
                'fj     k  k  k  k  k    k  k  k  k  k     jf',
                'fj   abk  k  k  k  k    k  k  k  k  kab   jf',
                'fab  dek  k  k  k  k    k  k  k  k  kde  abf',
                'fdejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdef',
                'ffffffffffffffffffffffffffffffffffffffffffff',
//////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    //////////////// PLATEFORM VERT ///////////////////////

                    "a": () => [sprite("map", {frame:153}),scale(1), area(),body({isStatic:true}),"block" ],
                    "b": () => [sprite("map", {frame:154}),scale(1), area(),body({isStatic:true}),"block" ],
                    "c": () => [sprite("map", {frame:172}),scale(1), area(),body({isStatic:true}),"block" ],
                    "d": () => [sprite("map", {frame:173}),scale(1), area(),body({isStatic:true}),"block" ],
                    "e": () => [sprite("map", {frame:174}),scale(1), area(),body({isStatic:true}),"block" ],
                    "f": () => [sprite("map", {frame:220}),scale(1), area(),body({isStatic:true}),"block" ],
                    "g": () => [sprite("map", {frame:221}),scale(1), area(),body({isStatic:true}),"block" ],
                    "h": () => [sprite("map", {frame:222}),scale(1), area(),body({isStatic:true}),"block" ],
                    "i": () => [sprite("map", {frame:223}),scale(1), area(),body({isStatic:true}),"block" ],
                    "j": () => [sprite("map", {frame:224}),scale(1), area(),body({isStatic:true}),"block" ],
                    "k": () => [sprite("map", {frame:225}),scale(1), area(),body({isStatic:true}),"block" ],
                    "l": () => [sprite("map", {frame:226}),scale(1), area(),body({isStatic:true}),"block" ],
                    "m": () => [sprite("map", {frame:227}),scale(1), area(),body({isStatic:true}),"block" ],
                    "n": () => [sprite("map", {frame:228}),scale(1), area(),body({isStatic:true}),"block" ],
                    "o": () => [sprite("map", {frame:229}),scale(1), area(),body({isStatic:true}),"block" ],
                    "p": () => [sprite("map", {frame:230}),scale(1), area(),body({isStatic:true}),"block" ],
                    "$": () => [sprite("battery", {frame:1}),scale(2.5),area(), "battery"],
                    "*": () => [sprite("pod", {frame:3}),scale(2.5), anchor("bot"), patrol(), offscreen({ hide: true }),  area(), "dangerous"],
                },
            }),
        addLevel(
            [

                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '                                            ',
                '           cc                  cc           ',
                '           jj                  jj           ',
                '           jj                  jj           ',
                '           jj   cc        cc   jj           ',
                '           jj   jj        jj   jj           ',
                '           jj   jj        jj   jj           ',
                '           jj   jj        jj   jj           ',
                '           jj   jj        jj   jj           ',
                '           jj   jj        jj   jj           ',
                '     cc    jj   jj        jj   jj    cc     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    jj   jj        jj   jj    jj     ',
                '     jj    rr   rr        rr   rr    jj     ',
                '     jj                              jj     ',
                '     jj                              jj     ',
                '     jj    cc cc cc cccc cc cc cc    jj     ',
                '     jj    jj jj jj jjjj jj jj jj    jj     ',
                '     jj cc jj jj jj jjjj jj jj jj cc jj     ',
                '        jj jj jj jj jjjj jj jj jj jj        ',
                '        rr rr rr rr rrrr rr rr rr rr        ',
                '                                            ',
                '                                            ',
/////////////////////////////////////////////////////////////////////|

            ],{
                tileWidth: 36,
                tileHeight: 36,
                tiles: {

                    ///////////////  DECORATION VERT   ///////////////////////

                    "a": () => [sprite("map", {frame:133}),scale(1)],
                    "b": () => [sprite("map", {frame:134}),scale(1)],
                    "c": () => [sprite("map", {frame:135}),scale(1)],
                    "d": () => [sprite("map", {frame:136}),scale(1)],
                    "e": () => [sprite("map", {frame:137}),scale(1)],
                    "f": () => [sprite("map", {frame:138}),scale(1)],
                    "g": () => [sprite("map", {frame:139}),scale(1)],
                    "h": () => [sprite("map", {frame:153}),scale(1)],
                    "i": () => [sprite("map", {frame:154}),scale(1)],
                    "j": () => [sprite("map", {frame:155}),scale(1)],
                    "k": () => [sprite("map", {frame:156}),scale(1)],
                    "l": () => [sprite("map", {frame:157}),scale(1)],
                    "m": () => [sprite("map", {frame:158}),scale(1)],
                    "n": () => [sprite("map", {frame:159}),scale(1)],
                    "o": () => [sprite("map", {frame:172}),scale(1)],
                    "p": () => [sprite("map", {frame:173}),scale(1)],
                    "q": () => [sprite("map", {frame:174}),scale(1)],
                    "r": () => [sprite("map", {frame:175}),scale(1)],
                    "s": () => [sprite("map", {frame:176}),scale(1)],
                    "t": () => [sprite("map", {frame:177}),scale(1)],
                    "u": () => [sprite("map", {frame:178}),scale(1)],
                    "v": () => [sprite("map", {frame:179}),scale(1)],
                },
            })
    ]

    // ######################## PLAYER #########################

    const SPEED = 250
    const JUMP_FORCE = 350
    const ENEMY_SPEED = 100
    const BULLET_SPEED = 500
    let PLAYER_HEALTH = 100
    let gunDestroyed = false

    const player = add([
        sprite('astro'),
        scale(5),
        anchor("center"),
        pos(100,1500),
        area(),
        body({jumpForce: JUMP_FORCE}),
        health(PLAYER_HEALTH),
        doubleJump(),
        z(49),
        "player"
    ])

    //######################### MOUVEMENT ###########################

    // Switch to "idle" or "run" animation when player hits ground
    player.onGround(() => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        } else {
            player.play("run")
        }
    })

    // ########################## DASH ##############################

    let isDashAvailable = true
    player.onGround(()=>{
        isDashAvailable = true
    })
    function Dash(dashX,dashY){
        isDashAvailable = false
        const t = tween(player.pos,vec2((player.pos.x)+dashX,(player.pos.y)+dashY),0.3,(p) => player.pos = p,easings.easeOutSine)
        onUpdate(()=>{
            player.onCollide("block",()=>{
                t.cancel()
            })
        })
    }

    // ########################## KEYBOARD CONTROL #############################
    let dirX = 0
    let dirY = 0
    if(!isGamepadConnected){

        onUpdate(()=> {
            onKeyDown("z", () => {
                gun.angle = -90
                dirX = 0
                dirY = 0
            })
            onKeyDown("s", () => {
                gun.angle = 90
                dirX = 0
                dirY = 0
            })

            onKeyDown("q", () => {
                gun.angle = 180
                dirX = -200
                dirY = 0
            })

            onKeyDown("d", () => {
                gun.angle = 0
                dirX = 200
                dirY = 0
            })

            if (isKeyDown("z") && isKeyDown("d")) {
                console.log("up right")
                gun.angle = -45
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("z") && isKeyDown("q")) {
                console.log("up left")
                gun.angle = -135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("q")) {
                console.log("down left")
                gun.angle = 135
                dirX = 0
                dirY = 0
            }
            if (isKeyDown("s") && isKeyDown("d")) {
                console.log("down right")
                gun.angle = 45
                dirX = 0
                dirY = 0
            }
        })

        onKeyDown("d",()=>{
            player.move(SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        onKeyDown("q",()=>{
            player.move(-SPEED, 0)
            if (player.isGrounded() && player.curAnim() !== "run") {
                player.play("run")
            }
        })

        let canJump  = true
        onKeyPress("space", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onKeyPress("m",(position)=> {

            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }


        })

        onKeyPress("l",()=>{
            if(!player.isGrounded()){
                if(isDashAvailable){
                    isDashing = true
                    Dash(dirX,dirY)
                }
            }
        })
    }


    // ##################################################################

    // ########################## GAMEPAD CONTROL #######################

    if(isGamepadConnected){
        // setGravity(1500)
        onGamepadStick("left", (v) => {
            player.move(v.x * 250, 0)
            onUpdate(()=>{
                if (v.x > 0 && v.y === 0){
                    gun.angle= 0
                    dirX = 200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y > 0){
                    gun.angle= 90
                    dirX = 0
                    dirY = 0
                }
                if (v.x < 0 && v.y === 0){
                    gun.angle= 180
                    dirX = -200
                    dirY = 0
                    if (player.isGrounded() && player.curAnim() !== "run") {
                        player.play("run")
                    }
                }
                if (v.x === 0 && v.y < 0){
                    gun.angle= -90
                    dirX = 0
                    dirY = 0
                }
            })
        })

        let canJump  = true
        onGamepadButtonPress("south", () => {
            if (player.isGrounded()) {
                canJump = true
                player.jump(JUMP_FORCE)
                player.play("jump")
            } else {
                if(canJump){
                    player.jump()
                    canJump = false
                }
            }
        })

        let playerCanShoot = true
        onGamepadButtonPress("west",(position)=> {
            const muzzlePos = gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))
            if(playerCanShoot){
                spawnBullet(muzzlePos.x, muzzlePos.y, Vec2.fromAngle(gun.angle).scale(1, -1))
                playerCanShoot = false
                wait(1,()=>{
                    playerCanShoot = true
                })
            }
        })

        onGamepadButtonPress("east",()=>{
            if(!player.isGrounded()){
                if(!player.isGrounded()){
                    if(isDashAvailable){
                        isDashing = true
                        Dash(dirX,dirY)
                    }
                }
            }
        })

    }


    // #########################################################

    //######################### CAMERA ##########################

    player.onUpdate(()=>{
        camPos(player.pos)
    })

    //###########################################################

    // ###################### GUN ##############################

    const gun = add([
        // rect(35, 8),
        sprite("gun"),
        scale(0.04),
        pos(player.pos.x,player.pos.y),
        // pos(500,500),
        anchor(vec2(0,0)),
        area(),
        rotate(0),
        color(204, 230, 244),
        z(50),
        // z(49),
        "gun",
    ])

    onUpdate(() => {
        gun.pos = player.pos
    })

    let isDashing = false

    function spawnBullet(bulletposX, bulletPosY, direction) {

        add([
            rect(12,10),
            outline(2,rgb(0,0,0)),
            pos(gun.pos.add(Vec2.fromAngle(gun.angle).scale(50))),
            anchor("top"),
            color(255,255,0),
            area(),
            move(Vec2.fromAngle(gun.angle), 400),
            z(20),
            //layer("game"),
            rotate(gun.angle),
            "playerBullet",
            "danger"
        ]);
    }

    // ###############################################################


    // ######################## ENEMY #########################

    function patrol(speed = 100, dir = 1) {
        let changeDirectionTimeout;

        function changeDirection() {
            dir = -dir; // Change la direction
            // Réinitialise le délai pour le prochain changement de direction
            changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes
        }

        return {
            id: "patrol",
            require: ["pos", "area"],
            add() {
                // Lance le délai initial pour le premier changement de direction
                changeDirectionTimeout = setTimeout(changeDirection, 3000); // 3000 ms = 3 secondes

                this.on("collide", (obj, col) => {
                    if (col.isLeft() || col.isRight()) {
                        dir = -dir;
                    }
                });
            },
            update() {
                this.move(speed * dir, 0);
            },
        };
    }

    // ############################### BOSS ##################################

    const boss = add([
        sprite("boss"),
        scale(2),
        pos(600,700),
        area(),
        body(),
        anchor("center"),
        state("move", [ "idle", "attack", "move" ]),
    ])


    boss.onStateEnter("idle", async () => {
        await wait(0.5)
        boss.enterState("attack")
    })

    boss.onStateEnter("attack", async () => {

        // Don't do anything if player doesn't exist anymore
        if (player.exists() && boss.exists()) {

            const dir = player.pos.sub(boss.pos).unit()

            add([
                pos(boss.pos),
                move(dir, BULLET_SPEED),
                rect(12, 12),
                area(),
                offscreen({ destroy: true }),
                anchor("center"),
                color(BLUE),
                "bossBullet",
            ])

        }

        await wait(2)
        boss.enterState("move")

    })

    boss.onStateEnter("move", async () => {
        await wait(2)
        boss.enterState("idle")
    })


    boss.onStateUpdate("move", () => {
        if (!player.exists()) return
        const dir = player.pos.sub(boss.pos).unit()
        boss.move(dir.scale(ENEMY_SPEED))
    })

    //#############################################################

    // ---------------- COLLIDE -----------------


    onCollide("player", "battery", (p, battery) => {
        destroy(battery)
        score.value += 10
        score.text = "score: " + score.value
    })


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })

    onCollide("playerBullet","block",(pb,b)=>{
        destroy(pb)
    })



    // ########################### SCORE #############################

    const score = add([
        fixed(),
        text("score: 0"),
        pos(width()-200,20),
        {
            value:0,
        }
    ])

    // ####################################################################

    // ############################# TIMER ###############################

    const timer = add([
        fixed(),
        text("0"),
        pos(width()-400,20),
        {
            value:0,
        },
    ])

    loop(1,()=>{
        timer.value ++
        timer.text = timer.value
    })

    // ###############################################################

    // ########################## Health ############################

    const healthBar = add([

        fixed(),
        text("❤️❤️❤️❤️❤️"),
        pos(width() / 15, 20),
        {
            value: 100,
        }
    ])

    player.onCollide("dangerous", () => {
        player.hurt(20);
        healthBar.value -= 20;
        updateHealthBar();
        if (healthBar.value <= 0) {
            go('lose');
            wait(2, () => {
                go('scene');
            });
        }
    });

    function updateHealthBar() {
        let remainingStars = Math.ceil(healthBar.value / 20);
        healthBar.text = "❤️".repeat(remainingStars);
        console.log(healthBar.value);
    }


    onCollide("playerBullet", "dangerous", (p, d) => {
        destroy(d)
        score.value += 20
        score.text = "score: " + score.value;
    })

    //################################################################


})

// ############################ SCENE LOSE ################################"
scene('lose',()=>{

    function addButton(txt, p, f) {


        const btn = add([
            rect(240, 80, { radius: 8 }),
            pos(p),
            area(),
            scale(1),
            anchor("center"),
            outline(4),
        ])


        btn.add([
            text(txt),
            anchor("center"),
            color(0, 0, 0),
        ])

        btn.onHoverUpdate(() => {
            const t = time() * 10
            btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
            btn.scale = vec2(1.2)
            setCursor("pointer")
        })

        btn.onHoverEnd(() => {
            btn.scale = vec2(1)
            btn.color = rgb()
        })

        btn.onClick(f)

        return btn

    }

    addButton("Chose Level",vec2(300,400),()=> go("chooseLevel"))
    addButton("Menu",vec2(600,400),()=> go("menu"))

    add([
        sprite("bg-death"),
        scale(1)
    ])

    function addButton(txt, p, f) {


        const btn = add([
            rect(240, 80, { radius: 8 }),
            pos(p),
            area(),
            scale(1),
            anchor("center"),
            outline(4),
        ])


        btn.add([
            text(txt),
            anchor("center"),
            color(0, 0, 0),
        ])

        btn.onHoverUpdate(() => {
            const t = time() * 10
            btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
            btn.scale = vec2(1.2)
            setCursor("pointer")
        })

        btn.onHoverEnd(() => {
            btn.scale = vec2(1)
            btn.color = rgb()
        })

        btn.onClick(f)

        return btn

    }

    addButton("Chose Level",vec2(center().x-150,400),()=> go("chooseLevel"))
    addButton("Menu",vec2(center().x+150,400),()=> go("menu"))

    add([
        text('you lose'),
        anchor('center'),
        scale(3),
        pos(width()/2, height()/2)
    ])
})

// #################### START ###############################


go("menu")