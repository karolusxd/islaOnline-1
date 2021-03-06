'use strict';

// dom element variables
var gameclient = document.getElementById("aberoyale-window");
var lobbyclient = document.getElementById("lobby-port");
var acccclient = document.getElementById("login-port");

var consumes = {
    allList: [],
    positionx: [],
    positiony: [],
    float: [],
    pickup: []
}

// open new realm every 20-30 players
// add and control mobs
var realms = {
    id: [],
    mob: [],
    mobType: [],
    object: [],
    objectType: [],
    playerNumber: []
}

var moveCoolDown = 500;
var punchCoolDown = 100;

//dom element events
document.getElementById("crrAccBtn").addEventListener("click", async () => {
    accreq(0);
});

document.getElementById("home-tab").onclick = function () {
    lobbyTabsS(0);
}

document.getElementById("gear-tab").onclick = function () {
    lobbyTabsS(1);
}

document.getElementById("stats-tab").onclick = function () {
    lobbyTabsS(2);
}

document.getElementById("shop-tab").onclick = function () {
    lobbyTabsS(3);
}

function lobbyTabsS(mode) {
    if (mode == 0) {
        // home tab
        document.getElementById("hometabport").style.display = "block";
        document.getElementById("geartabport").style.display = "none";
        document.getElementById("statstabport").style.display = "none";
        document.getElementById("shoptabport").style.display = "none";

        //button disables
        document.getElementById("home-tab").disabled = true;
        document.getElementById("gear-tab").disabled = false;
        document.getElementById("stats-tab").disabled = false;
        document.getElementById("shop-tab").disabled = false;
    } else if (mode == 1) {
        // gear tab
        document.getElementById("hometabport").style.display = "none";
        document.getElementById("geartabport").style.display = "block";
        document.getElementById("statstabport").style.display = "none";
        document.getElementById("shoptabport").style.display = "none";

        //button disables
        document.getElementById("home-tab").disabled = false;
        document.getElementById("gear-tab").disabled = true;
        document.getElementById("stats-tab").disabled = false;
        document.getElementById("shop-tab").disabled = false;
    } else if (mode == 2) {
        // stats tab
        document.getElementById("hometabport").style.display = "none";
        document.getElementById("geartabport").style.display = "none";
        document.getElementById("statstabport").style.display = "block";
        document.getElementById("shoptabport").style.display = "none";

        //button disables
        document.getElementById("home-tab").disabled = false;
        document.getElementById("gear-tab").disabled = false;
        document.getElementById("stats-tab").disabled = true;
        document.getElementById("shop-tab").disabled = false;
    } else if (mode == 3) {
        // shop-tab
        document.getElementById("hometabport").style.display = "none";
        document.getElementById("geartabport").style.display = "none";
        document.getElementById("statstabport").style.display = "none";
        document.getElementById("shoptabport").style.display = "block";

        //button disables
        document.getElementById("home-tab").disabled = false;
        document.getElementById("gear-tab").disabled = false;
        document.getElementById("stats-tab").disabled = false;
        document.getElementById("shop-tab").disabled = true;
    }
}

var leaveMode = false;
var leavevalid = 0;
document.getElementById("leave-arena-btn").onclick = function () {
    if (leaveMode == false) {
        leaveMode = true;
        logoutCounter = 1000;
        document.getElementById("leave-arena-btn").innerHTML = "cancel";
    } else if (leaveMode == true) {
        leaveMode = false;
        document.getElementById("leave-arena-btn").innerHTML = "escape";
    }
}

document.getElementById("ready-trig-btn").addEventListener("click", async () => {
    //change UI display...
    document.getElementById("lobby-idle-btns").style.display = "none";
    document.getElementById("lobby-active-btns").style.display = "block";

    joinGame();
});

var cancelMode = false;
document.getElementById("cancel-trig-btn").addEventListener("click", async () => {
    cancelMode = true;
    document.getElementById("cancel-trig-btn").innerHTML = "Cancelling...";
    document.getElementById("cancel-trig-btn").disabled = true;
})

// game global variables
var clientmobiletype = false;
var gamestate = 0; // 0 = welcome menu

var checkClientType = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

window.onload = function () {
    // check if browser is mobile or pc
    var clientmobiletype = checkClientType();
    if (clientmobiletype == false) {
        gameclient.style.width = "377.5px";
        gameclient.style.height = "600px";

        acccclient.style.width = "377.5px";
        acccclient.style.height = "600px";

        lobbyclient.style.width = "377.5px";
        lobbyclient.style.height = "600px";
    } else {
        gameclient.style.width = "100%";
        gameclient.style.height = "100vh";
        acccclient.style.width = "100%";
        acccclient.style.height = "100vh";
        lobbyclient.style.width = "100%";
        lobbyclient.style.height = "100vh";
    }

    // game start function for test / test purpose script
    // lgusr = "a!v";
    // lgusrIndex = 0;
    // startGame();
}

function accreq(mode) {
    var namereq = document.getElementById("usernamepre").value;
    var passreq = document.getElementById("passwordpre").value;
    if (namereq != "" && passreq != "") {
        if (mode == 0) {
            if (accountinfo.name.indexOf(namereq) == -1 && namereq != "null") {
                db.push({ type: "acc", name: namereq, pass: passreq });
                login(namereq);
            } else {
                alert("username already used");
            }
        } else if (mode == 1) {
            if (accountinfo.name.indexOf(namereq) != -1 && accountinfo.pass[accountinfo.name.indexOf(namereq)] == passreq) {
                login(namereq);
            } else {
                alert("incorrect username or password");
            }
        }
    } else {
        alert("please enter everything");
    }
}

function goToWindow(mode) {
    if (mode == 0) {
        document.getElementById("login-port").style.display = "block";
        document.getElementById("lobby-port").style.display = "none";
        document.getElementById("game-port").style.display = "none";
    } else if (mode == 1) {
        document.getElementById("login-port").style.display = "none";
        document.getElementById("lobby-port").style.display = "block";
        document.getElementById("game-port").style.display = "none";
        accountinfo.health[lgusrIndex] = accountinfo.level[lgusrIndex] * 50;

        //lobby port ui display reset
        document.getElementById("lobby-idle-btns").style.display = "block";
        document.getElementById("lobby-active-btns").style.display = "none";
    } else if (mode == 2) {
        document.getElementById("login-port").style.display = "none";
        document.getElementById("lobby-port").style.display = "none";
        document.getElementById("game-port").style.display = "block";
    }
}

// server scripts
var db = new Firebase("https://aberoyale-94ca3-default-rtdb.firebaseio.com/");
var accountinfo = {
    name: [],
    pass: [],
    hair: [],
    skin: [],
    shirt: [],
    shirtB: [],
    positionx: [],
    positiony: [],
    destx: [],
    desty: [],
    place: [], // 0 : lobby, 1 : arena, 2 : waiting server join
    status: [],
    health: [],
    level: [],
    attack: [],
    focus: [],
    tgid: []
}

var accgear = {
    head: [],
    cape: [],
    chest: [],
    legs: [],
    rArm: [],
    lArm: []
}

var lgusr;
var lgusrIndex;
var tgusr;
var tgusrIndex = -1;

var opusr;

var logoutCounter = 1000;

function login(usrname) {
    lgusr = usrname;
    lgusrIndex = accountinfo.name.indexOf(lgusr);

    // make new realm if there arent any
    if (realms.id.length == 0) {
        db.push({ type: "new-realm" });
    }

    //switch screen based on character place
    if (accountinfo.place[lgusrIndex] == 0) {
        goToWindow(1);
    } else if (accountinfo.place[lgusrIndex] == 1 && accountinfo.status[lgusrIndex] == 1) {
        // in arena and is alive
        goToWindow(2);
        startGame();
    } else if (accountinfo.place[lgusrIndex] == 1 && accountinfo.status[lgusrIndex] == 0) {
        // in arena and is dead
        goToWindow(2);
        startGame();
        deadScreen();
    }
}

function updateFrame() {

}

//debuff interval vars
var bindInterval = 0;
var fatigueInterval = 0;

var startListening = function () {
    db.on('child_added', function (snapshot) {
        var snap = snapshot.val();
        if (snap.type == "acc") {
            accountinfo.name.push(snap.name);
            accountinfo.pass.push(snap.pass);
            accountinfo.shirt.push(snap.shirt);
            accountinfo.skin.push(snap.skin);
            accountinfo.hair.push(snap.hair);
            accountinfo.shirtB.push(snap.shirtBrightness);
            accountinfo.positionx.push(0);
            accountinfo.positiony.push(0);
            accountinfo.place.push(0);
            accountinfo.status.push(1); // 1 is alive, 0 is dead
            accountinfo.level.push(1);
            accountinfo.health.push(50);
            accountinfo.attack.push(5);
            accountinfo.focus.push(-1);
            accountinfo.tgid.push(-1);

            //register empty handed gear, all male for now : gender code 0:female, 1:male
            accgear.head.push(0);
            accgear.cape.push(0);
            accgear.chest.push(0);
            accgear.lArm.push(0);
            accgear.rArm.push(0);
            accgear.legs.push(0);
        } else if (snap.type == "join-game-request") {
            var aaindex = accountinfo.name.indexOf(snap.name);
            accountinfo.place[aaindex] = 2;
            if (snap.name == lgusr) {
                setTimeout(function () {
                    if (cancelMode == false) {
                        db.push({ type: "join-server", name: lgusr });
                        goToWindow(2);
                        gamemode = true;
                        //create new random spawn position
                        var newX = Math.floor(Math.random() * 500);
                        var newY = Math.floor(Math.random() * 400);
                        db.push({ type: "player-new-position", name: lgusr, positionx: newX, positiony: newY });
                        startGame();
                    } else {
                        cancelMode = false;
                        db.push({ type: "return-lobby", name: lgusr });
                        document.getElementById("cancel-trig-btn").innerHTML = "Cancel";
                        document.getElementById("cancel-trig-btn").disabled = false;
                        goToWindow(1);
                    }
                }, 2000)
            }
        } else if (snap.type == "return-lobby") {
            accountinfo.place[accountinfo.name.indexOf(snap.name)] = 0;
        } else if (snap.type == "join-server") {
            accountinfo.place[accountinfo.name.indexOf(snap.name)] = 1;
            accountinfo.health[accountinfo.name.indexOf(snap.name)] = 50 + ((accountinfo.level[accountinfo.name.indexOf(snap.name)] - 1) * 10);
        } else if (snap.type == "player-new-position") {
            // new position
            accountinfo.positionx[accountinfo.name.indexOf(snap.name)] = snap.positionx;
            accountinfo.positiony[accountinfo.name.indexOf(snap.name)] = snap.positiony;
            if (gamemode) {
                //avoid existing embers
                if (snap.name == lgusr) {
                    for (i = 0; i < emberVar.life.length; i++) {
                        var emberBoolean = emberVar.target[i] == lgusrIndex && emberVar.hit[i] == 1;
                        var physicalBoolean = physicalVar.target[i] == lgusrIndex && physicalVar.hit[i] == 1;
                        var bindBoolean = bindVar.target[i] == lgusrIndex && bindVar.hit[i] == 1;
                        if (emberBoolean && physicalBoolean && bindBoolean) {
                            emberVar.hit[i] = 0;
                            physicalVar.hit[i] = 0;
                            bindVar.hit[i] = 0;
                            fatigueVar.hit[i] = 0;
                        }
                    }
                }
            }
        }


        //game server stuff
        if (snap.type == "new-consume-drop") {
            if (snap.ctype == "scroll") {
                //scrolls
                consumes.allList.push("s!" + snap.tier);
                consumes.positionx.push(snap.positionx);
                consumes.positiony.push(snap.positiony);
                consumes.float.push(200);
                consumes.pickup.push(1);
            }
        } else if (snap.type == "item-pickup") {
            var scrollId = parseInt(snap.consumePoint);
            consumes.allList.splice(scrollId, 1);
            consumes.positionx.splice(scrollId, 1);
            consumes.positiony.splice(scrollId, 1);
            consumes.float.splice(scrollId, 1);
            consumes.pickup.splice(scrollId, 1);
        } else if (snap.type == "punch-player") {
            //player attacked snap
            var attackPowaa = Math.floor(Math.random() * accountinfo.attack[snap.recieve]) + 1;
            newDamageText(1, snap.recieve, "(" + attackPowaa + ")");
            if (attackPowaa >= accountinfo.health[accountinfo.name.indexOf(snap.recieve)]) {
                accountinfo.health[snap.recieve] = 0;
            } else {
                accountinfo.health[snap.recieve] -= attackPowaa;
            }

            if (snap.recieve == lgusr && gamemode) {
                newDamageText(3, lgusrIndex, "(" + attackPowaa + ")");
                // punchPref.play();
            }

            if (snap.attacker == lgusrIndex && accountinfo.health[snap.recieve] <= 0) {
                db.push({ type: "return-lobby", name: accountinfo.name[snap.recieve] });
                newDamageText(1, snap.recieve, "AAAAAAAARRRRRRRRGGGGGGHHH");
                db.push({ type: "thisdudedied", name: snap.recieve });
                db.push({ type: "levelup", name: snap.attacker });
                if (tgusrIndex == snap.recieve) {
                    tgusrIndex = -1;
                    tgusr = "";
                }
            }
        } else if (snap.type == "bind-player") {
            if (gamemode && snap.recieve == lgusrIndex) {
                //it hit you
                bindInterval += 150;
            }
        } else if (snap.type == "fatigue-player") {
            if (gamemode && snap.recieve == lgusrIndex) {
                //
                fatigueInterval += 150;
            }
        } else if (snap.type == "ember-hit") {
            var attackPowaa = parseInt(snap.att);
            newDamageText(2, snap.target, "(" + attackPowaa + ")");
            if (attackPowaa >= accountinfo.health[snap.target]) {
                accountinfo.health[snap.target] = 0;
            } else {
                accountinfo.health[snap.target] -= attackPowaa;
            }

            if (snap.target == lgusr && gamemode) {
                newDamageText(3, lgusrIndex, "(" + attackPowaa + ")");
            }

            if (snap.who == lgusrIndex && accountinfo.health[snap.target] <= 0) {
                db.push({ type: "return-lobby", name: accountinfo.name[snap.target] });
                newDamageText(1, snap.target, "AAAAAAAARRRRRRRRGGGGGGHHH");
                db.push({ type: "thisdudedied", name: snap.target });
                db.push({ type: "levelup", name: snap.who });
                if (tgusrIndex == snap.target) {
                    tgusrIndex = -1;
                    tgusr = "";
                }
            }
        } else if (snap.type == "ember-shoot") {
            if (gamemode) {
                emberVar.life.push(20);
                emberVar.hit.push(1);
                emberVar.posx.push(0);
                emberVar.posy.push(0);
                emberVar.spdx.push(parseInt(snap.xspd));
                emberVar.spdy.push(parseInt(snap.yspd));
                emberVar.target.push(parseInt(snap.target));
                emberVar.who.push(parseInt(snap.who));
                emberVar.att.push(parseInt(snap.att));
            }
        } else if (snap.type == "bind-shoot") {
            if (gamemode) {
                bindVar.life.push(40);
                bindVar.hit.push(1);
                bindVar.posx.push(0);
                bindVar.posy.push(0);
                bindVar.spdx.push(parseInt(snap.xspd));
                bindVar.spdy.push(parseInt(snap.yspd));
                bindVar.target.push(parseInt(snap.target));
                bindVar.who.push(parseInt(snap.who));
            }
        } else if (snap.type == "fatigue-shoot") {
            if (gamemode) {
                fatigueVar.life.push(40);
                fatigueVar.hit.push(1);
                fatigueVar.posx.push(0);
                fatigueVar.posy.push(0);
                fatigueVar.spdx.push(parseInt(snap.xspd));
                fatigueVar.spdy.push(parseInt(snap.yspd));
                fatigueVar.target.push(parseInt(snap.target));
                fatigueVar.who.push(parseInt(snap.who));
            }
        } else if (snap.type == "punch-shoot") {
            if (gamemode) {
                physicalVar.life.push(20);
                physicalVar.hit.push(1);
                physicalVar.posx.push(0);
                physicalVar.posy.push(0);
                physicalVar.spdx.push(parseInt(snap.xspd));
                physicalVar.spdy.push(parseInt(snap.yspd));
                physicalVar.target.push(parseInt(snap.target));
                physicalVar.who.push(parseInt(snap.who));
                physicalVar.att.push(parseInt(snap.att));
            }
        } else if (snap.type == "heal") {
            var healMount = randInt(5, 30);
            var maxHP = 50 + ((accountinfo.level[snap.who] - 1) * 10);
            if ((maxHP - accountinfo.health[snap.who]) >= healMount) {
                accountinfo.health[snap.who] += healMount;
            } else {
                accountinfo.health[snap.who] = maxHP;
            }

            if (gamemode) {
                newDamageText(5, snap.who, "(whoosh)");
            }
        } else if (snap.type == "levelup") {
            accountinfo.level[snap.name] += 1;
            // accountinfo.health[snap.name] = 50 + ((accountinfo.level[snap.name]-1)*10) ;
        } else if (snap.type == "thisdudedied") {
            accountinfo.level[snap.name] = 1;
        } else if (snap.type == "newTg") {
            accountinfo.tgid[snap.own] = snap.ask;
        } else if (snap.type == "chat") {
            if (gamemode) {
                newDamageText(4, snap.who, snap.text);
            }
        } else if (snap.type == "new-realm") {
            realms.id.push(1); // 1 open, 0 closed
            realms.mob.push(new Array);
            realms.mobType.push(new Array);
            realms.object.push(new Array);
            realms.objectType.push(new Array);
            realms.playerNumber.push(0);
        }
    });
}
startListening();

var punchNumber = 0;
function playPunchAudio() {
    // punchAudio[punchNumber].play(Math.floor(Math.random()));
}

// game scripts
var mylife = 50;
var itemslot = [];
var theirlife = 50;

function joinGame() {
    db.push({ type: "join-game-request", name: lgusr });
}

window.addEventListener("beforeunload", function (e) {
    db.push({ type: "client-leave", name: lgusr });
}, false);

function startGame() {
    gamemode = true;
    document.getElementById("leave-arena-btn").style.display = "block";
    document.getElementById("game-dom-elements").style.display = "block";
    animate();
}

var gamemode = false;
var testmode = false;
var camera = [0, -50];
var floorDimension = [1500, 1500];

var health = 300;
//image holders
var terrainWall = new Image();
terrainWall.src = "./assets/terrain/castle_wall.png";

var playerb = new Image();
playerb.src = "./assets/player_skin/pbase_up.png";
var players = new Image();
players.src = "./assets/player_skin/pclothes_right.png";

var safeZoneIMG = new Image();
safeZoneIMG.style.imageRendering = "pixelated";
safeZoneIMG.src = "./assets/terrain/safezone.png";

var focusRing = new Image();
focusRing.src = "./assets/consume/focusRing.png";

//stack render holder (player)
var playerLeg = new Image();
playerLeg.src = "./assets/stackRender/plLegs.png";
var playerBody = new Image();
playerBody.src = "./assets/stackRender/plBody.png";
var playerRArm = new Image();
playerRArm.src = "./assets/stackRender/plArmRight.png";
var playerLArm = new Image();
playerLArm.src = "./assets/stackRender/plArmLeft.png";
var playerHeadF = new Image();
playerHeadF.src = "./assets/stackRender/plHeadFemale.png";
var playerHeadM = new Image();
playerHeadM.src = "./assets/stackRender/plHeadMale.png";

//projectiles var and image holders
var emberRenderFrame = 0;
var bindRenderFrame = 0;
var fatigueRenderFrame = 0;
var teleRenderFrame = 0;
var physicalRenderFrame = 0;

var emberSpriteS = new Image();
emberSpriteS.src = "./assets/projectile/emberSprite.png";
var bindSpriteS = new Image();
bindSpriteS.src = "./assets/projectile/bindSprite.png";
var fatigueSprites = new Image;
fatigueSprites.src = "./assets/projectile/fatigueSprite.png";
var teleSprites = new Image();
teleSprites.src = "./assets/projectile/teleSprite.png";
var physicalSprites = new Image();
physicalSprites.src = "./assets/projectile/physicalSprite.png";;

var scrolls = [];
var i;
for (i = 0; i < 8; i++) {
    scrolls[i] = new Image();
    scrolls[i].src = "./assets/consume/scroll_t" + i + ".png";
}

var scrollDropAudio = new Audio("./assets/audio/scrollDrop.mp3");
var scrollPickupAudio = new Audio("./assets/audio/scrollPickup.mp3");

//punch sound
var punchAudio = [];
var punchPref = new Audio("./assets/audio/punch.mp3");
punchAudio.push(punchPref);
punchPref = new Audio("./assets/audio/punch2.mp3");
punchAudio.push(punchPref);

var audioPlayer = [];
function spawn(mode) {
    if (mode == 0) {
        // scroll
        var scrollTier = Math.floor(Math.random() * 4);
        // var scrollTier = 1;
        var dropPositionX = Math.floor(Math.random() * floorDimension[0] - 30) + 70;
        var dropPositionY = Math.floor(Math.random() * floorDimension[0] - 90) + 105;
        // if (consumes.positionx.indexOf(dropPositionX) != consumes.positiony.indexOf(dropPositionY)) {
        db.push({ type: "new-consume-drop", ctype: "scroll", tier: scrollTier, positionx: dropPositionX, positiony: dropPositionY });
        // }
    } else if (mode == 1) {
        // potion
    } else if (mode == 2) {
        // gear
    }
}

function testSpawn(xp, yp) {
    var scrollTier = Math.floor(Math.random() * 7);
    // if (consumes.positionx.indexOf(dropPositionX) != consumes.positiony.indexOf(dropPositionY)) {
    db.push({ type: "new-consume-drop", ctype: "scroll", tier: scrollTier, positionx: xp, positiony: yp });
}

var spawnTick = 100;
var deadParam = false;

var testAnimate = 0;
// stackRender player base
var plLeg = new Image("./assets/plLegs.png");
var plBody = new Image("./assets/plLegs.png");
var plArmRight = new Image("./assets/plArmRight.png");
var plArmLeft = new Image("./assets/plArmLeft.png");
var plHeadMale = new Image("./assets/plHeadMale.png");
var plHeadFemale = new Image("./assets/plHeadFemale.png");
// stackRender, items


//animation variable
var animationFrame = 0;

var scale = 1.8;

function animate() {
    var canvas = document.getElementById("aberoyale-window");
    canvas.width = (377.5) * scale;
    canvas.height = (600) * scale;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    // ctx.fillStyle = "#67802d";
    // ctx.fillRect(0, 0, 1000, 1000);

    // check and show vitals
    //life bar
    var healthPerc = ((accountinfo.health[lgusrIndex] / (50 + ((accountinfo.level[lgusrIndex] - 1) * 10))) * 100);
    document.getElementById("client-life-bar").style.width = healthPerc + "%";

    if (accountinfo.health[lgusrIndex] == 0) {
        deadParam = true;
        gamemode = false;
    }

    //draw outer wilderness
    ctx.fillStyle = "#715b00";
    var wildernessSize = [floorDimension[0] + 2000, floorDimension[1] + 2000];
    for (i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.2 * (i + 1);
        ctx.fillRect((-1 * camera[0]) + (10 * i) - 1000, (-1 * camera[1]) + 10 + (10 * i) - 1000, wildernessSize[0] + (100 - (20 * i)), wildernessSize[1] + (100 - (20 * i)));
    }
    ctx.globalAlpha = 1;

    ///draw glassy area
    ctx.fillStyle = "#67802d";
    for (i = 3; i < 5; i++) {
        ctx.globalAlpha = 0.2 * (i + 1);
        ctx.fillRect((-1 * camera[0]) + (10 * i), (-1 * camera[1]) + 10 + (10 * i), floorDimension[0] + (100 - (20 * i)), floorDimension[1] + (100 - (20 * i)));
    }
    ctx.globalAlpha = 1;
    // ctx.fillRect(50 - camera[0], 20 - camera[1], floorDimension[0], floorDimension[1]);
    // ctx.fillRect(50 - camera[0], 20 - camera[1], floorDimension[0], floorDimension[1]);

    //render safe zone
    ctx.drawImage(safeZoneIMG, (floorDimension[0] / 2) - (camera[0] + 250), (floorDimension[1] / 2) - (camera[1] + 150), 500, 300);

    //shadow test
    // ctx.fillStyle = "#0000006b";
    // ctx.fillRect(100, 150, 17, 5);
    //render the consumes, update position
    for (i = 0; i < consumes.allList.length; i++) {
        if (consumes.pickup[i] == 1) {
            //not picked up
            //render shadow
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(consumes.positionx[i] - 9 - camera[0], consumes.positiony[i] - 3 - camera[1], 17, 5);
            ctx.globalAlpha = 1;
            //render consume
            if (consumes.allList[i].split("!")[0] == "s") {
                if (consumes.float[i] != 0) {
                    ctx.globalAlpha = 0.5;
                }
                ctx.drawImage(scrolls[parseInt(consumes.allList[i].split("!")[1])], consumes.positionx[i] - 9 - camera[0], consumes.positiony[i] - consumes.float[i] - 3 - camera[1], 17, 5);
                // ctx.drawImage();
                ctx.globalAlpha = 1;
                if (consumes.float[i] == 200) {
                    audioPlayer.push(scrollDropAudio);
                    // audioPlayer[audioPlayer.length - 1].play();

                }
            }
            if (consumes.float[i] > 0) {
                consumes.float[i] -= 5;
            }

        }
    }


    //draw arround right left and up
    // for (i = 0; i < floorDimension[0]; i++) {
    //     ctx.drawImage(terrainWall, (50 - camera[0]) + i, 20 - camera[1], 1, 80);
    // }
    // for (i = 0; i < floorDimension[1] - 80; i++) {
    //     ctx.drawImage(terrainWall, (50 - camera[0]), (20 - camera[1]) + i, 10, 80);
    // }
    // for (i = 0; i < floorDimension[1] - 80; i++) {
    //     ctx.drawImage(terrainWall, (50 - camera[0]) + floorDimension[0], (20 - camera[1]) + i, 10, 80);
    // }

    // ctx.drawImage(terrainWall, (50 - camera[0]), 0);

    // check render player and render whos in arena
    for (i = 0; i < accountinfo.place.length; i++) {
        if (accountinfo.place[i] == 1) {
            //render player shadow
            // ctx.globalAlpha = 0.2;
            // ctx.fillStyle = "#000000";
            // ctx.fillRect(accountinfo.positionx[i] - camera[0] + 71, accountinfo.positiony[i] - camera[1] + 100, 17, 5);
            // ctx.globalAlpha = 1;
            //player is in arena render player
            // ctx.globalAlpha = 0.5;
            // ctx.drawImage(playerb, accountinfo.positionx[i] - camera[0] + 60, accountinfo.positiony[i] - camera[1] + 25, 40, 80);
            // ctx.globalAlpha = 1;

            //player direction
            if (accountinfo.tgid[i] != -1) {
                var plusMinusX = accountinfo.positionx[i] - accountinfo.positionx[accountinfo.tgid[i]];
                var plusMinusY = accountinfo.positiony[i] - accountinfo.positiony[accountinfo.tgid[i]];
                var distX = Math.abs(plusMinusX);
                var distY = Math.abs(plusMinusY);

                if (plusMinusY < 0 && distY > 10 && distX < 10) {
                    // down
                    animationFrame = 4;
                } else if (plusMinusY > 10 && distY > 10 && distX < 10) {
                    // up
                    animationFrame = 0;
                } else if (plusMinusX < 10 && distX > 10 && distY < 10) {
                    //right
                    animationFrame = 2;
                } else if (plusMinusX > 10 && distX > 10 && distY < 10) {
                    //left
                    animationFrame = 6;
                } else if (plusMinusY > 10 && distX > 10 && plusMinusY < 10 && distY > 10) {
                    // up right
                    animationFrame = 1;
                } else if (plusMinusY > 10 && distX > 10 && plusMinusY > 10 && distY > 10) {
                    //up left
                    animationFrame = 7;
                } else if (plusMinusY < 10 && distX > 10 && plusMinusY < 10 && distY > 10) {
                    // down right
                    animationFrame = 3;
                } else if (plusMinusY < 10 && distX > 10 && plusMinusY > 10 && distY > 10) {
                    //down left
                    animationFrame = 5;
                } else {
                    animationFrame = 0;
                }
            } else {
                animationFrame = 4;
            }
            //render parts
            ctx.globalAlpha = 0.8;
            ctx.drawImage(playerBody, 0 + (animationFrame * 52), 0, 52, 50, accountinfo.positionx[i] - camera[0] + 28, accountinfo.positiony[i] - camera[1] + 48, 114, 110);
            ctx.drawImage(playerHeadM, 0 + (animationFrame * 62), 0, 62, 62, accountinfo.positionx[i] - camera[0] + 18, accountinfo.positiony[i] - camera[1] + 35, 134, 134)
            ctx.drawImage(playerLeg, 0 + (animationFrame * 30), 0, 30, 26, accountinfo.positionx[i] - camera[0] + 50, accountinfo.positiony[i] - camera[1] + 75, 70, 62);
            ctx.drawImage(playerRArm, 0 + (animationFrame * 54), 0, 54, 52, accountinfo.positionx[i] - camera[0] + 26, accountinfo.positiony[i] - camera[1] + 48, 118, 114)
            ctx.drawImage(playerLArm, 0 + (animationFrame * 54), 0, 54, 52, accountinfo.positionx[i] - camera[0] + 26, accountinfo.positiony[i] - camera[1] + 48, 118, 114)
            ctx.globalAlpha = 1;

            // ctx.drawImage(players, accountinfo.positionx[i] - camera[0] + 60, accountinfo.positiony[i] - camera[1] + 45, 17, 55);

            //draw the ring of justice
            if (tgusrIndex != -1 && i == tgusrIndex) {
                ctx.drawImage(focusRing, accountinfo.positionx[i] - camera[0] + 65, accountinfo.positiony[i] - camera[1] + 95, 30, 10);
            }
        }
    }

    //render name afterwards
    for (i = 0; i < accountinfo.place.length; i++) {
        if (accountinfo.place[i] == 1) {
            if (i == lgusrIndex) {
                ctx.fillStyle = "#ffffff";
            } else {
                ctx.fillStyle = "#ff6462";
            }
            ctx.font = '20px sans-serif';
            ctx.strokeStyle = 'black';
            ctx.strokeText(accountinfo.name[i] + " [lvl." + accountinfo.level[i] + "]", accountinfo.positionx[i] - camera[0] + 58 - (accountinfo.name[i].length * 5), accountinfo.positiony[i] - camera[1] + 0);
            ctx.fillText(accountinfo.name[i] + " [lvl." + accountinfo.level[i] + "]", accountinfo.positionx[i] - camera[0] + 58 - (accountinfo.name[i].length * 5), accountinfo.positiony[i] - camera[1] + 0);

        }
    }

    //render the hp bar
    for (i = 0; i < accountinfo.health.length; i++) {
        //dont render self
        if (i != lgusrIndex && accountinfo.place[i] == 1) {

            var maxx = 50 + ((accountinfo.level[i] - 1) * 10);
            var hitpoint = accountinfo.health[i];
            ctx.fillStyle = "#404040";
            ctx.fillRect(accountinfo.positionx[i] - camera[0] + 63, accountinfo.positiony[i] - camera[1] + 10, 40, 3);
            ctx.fillStyle = "#ff3d38";
            ctx.fillRect(accountinfo.positionx[i] - camera[0] + 63, accountinfo.positiony[i] - camera[1] + 10, 40 * (hitpoint / maxx), 3);
        }
    }

    // draw wall thats below
    // for (i = 0; i < floorDimension[0]; i++) {
    //     ctx.drawImage(terrainWall, (50 - camera[0]) + i, 20 - camera[1] + floorDimension[1] - 80, 1, 80);
    // }

    // draw client player
    if (inspectKey == true) {
        //console logs
    }

    // move the camera automatically, depending on character position
    if (testmode == false) {
        var howfarraw = accountinfo.positionx[lgusrIndex] - (camera[0] + (130 * scale));
        if (accountinfo.positionx[lgusrIndex] < (camera[0] + (130 * scale))) {
            if (Math.abs(howfarraw) >= 10) {
                camera[0] -= 10;
            } else {
                camera[0] -= Math.abs(howfarraw);
            }
        } else if (accountinfo.positionx[lgusrIndex] > (camera[0] + (130 * scale))) {
            if (Math.abs(howfarraw) >= 10) {
                camera[0] += 10;
            } else {
                camera[0] += Math.abs(howfarraw);
            }
        }
    }

    //auto camera
    if (testmode == false) {
        howfarraw = accountinfo.positiony[lgusrIndex] - (camera[1] + (250 * scale));
        if (accountinfo.positiony[lgusrIndex] < (camera[1] + (250 * scale))) {
            if (Math.abs(howfarraw) >= 10) {
                camera[1] -= 10;
            } else {
                camera[1] -= Math.abs(howfarraw);
            }
        } else if (accountinfo.positiony[lgusrIndex] > (camera[1] + (250 * scale))) {
            if (Math.abs(howfarraw) >= 10) {
                camera[1] += 10;
            } else {
                camera[1] += Math.abs(howfarraw);
            }
        }
    }


    // move camera manual
    //write text
    if (testmode) {
        ctx.fillStyle = "#ffffff";
        ctx.font = '20px serif';
        ctx.fillText('Arrow / WASD to move camera', 20, 30);
        if (moveForward) {
            camera[1] -= 10;
        }

        if (moveBackward) {
            camera[1] += 10;
        }
        if (moveRight) {
            camera[0] += 10;
        }
        if (moveLeft) {
            camera[0] -= 10;
        }
    }

    // spawn consumes
    spawnTick -= 1;
    if (spawnTick == 0) {
        spawnTick = 10;
        //set consume type
        if (consumes.allList.length < 30) {
            var spawnType = Math.floor(Math.random() * 2);
            spawn(spawnType);
        }
    }

    if (moveCoolDown != 0) {
        moveCoolDown -= 10;
        document.getElementById("runCoolDownBar").style.height = (26 - (26 * (moveCoolDown / 500))) + "px";
    }

    if (punchCoolDown != 0) {
        if (fatigueInterval == 0) {
            if (punchCoolDown >= 6) {
                punchCoolDown -= 6;
            } else {
                punchCoolDown = 0;
            }
        } else {
            punchCoolDown -= 2;
        }
        document.getElementById("punchCoolDownBar").style.height = (26 - (26 * (punchCoolDown / 100))) + "px";
    }

    if (deadParam) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.globalAlpha = 1;
        ctx.font = '20px sans-serif';
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.strokeText("You died. Reload page", 10, 30);
        ctx.fillText("You died. Reload page", 10, 30);
        deadParam = false;
        document.getElementById("leave-arena-btn").style.display = "none";
        document.getElementById("game-dom-elements").style.display = "none";
    }



    // render embers
    for (i = 0; i < emberVar.life.length; i++) {
        var emberRL = Math.abs(emberVar.spdy[i]) < Math.abs(emberVar.spdx[i]);
        var emberRatio = Math.abs(emberVar.spdy[i] / emberVar.spdx[i]);
        if (emberRatio >= 0.5 && emberRatio <= 1.5) {
            if (emberVar.spdx[i] > 0 && emberVar.spdy[i] > 0) {
                // right down
                emberRenderFrame = 3;
            } else if (emberVar.spdx[i] < 0 && emberVar.spdy[i] > 0) {
                // left down
                emberRenderFrame = 5;
            } else if (emberVar.spdx[i] > 0 && emberVar.spdy[i] < 0) {
                // right up
                emberRenderFrame = 1;
            } else if (emberVar.spdx[i] < 0 && emberVar.spdy[i] < 0) {
                // left up
                emberRenderFrame = 7;
            }
        } else {
            if (emberRL) {
                //right or left
                if (emberVar.spdx[i] > 0) {
                    //right
                    emberRenderFrame = 2;
                } else {
                    //left
                    emberRenderFrame = 6;
                }
            } else {
                // up or down
                if (emberVar.spdy[i] > 0) {
                    //down
                    emberRenderFrame = 4;
                } else {
                    //up
                    emberRenderFrame = 0;
                }
            }
        }
        ctx.globalAlpha = 0.6;
        ctx.drawImage(emberSpriteS, 0 + (36 * emberRenderFrame), 0, 36, 30, accountinfo.positionx[emberVar.who[i]] + emberVar.posx[i] - camera[0] + 40, accountinfo.positiony[emberVar.who[i]] + emberVar.posy[i] - camera[1] + 55, 82, 70);
        ctx.globalAlpha = 1;
        emberVar.posx[i] += emberVar.spdx[i];
        emberVar.posy[i] += emberVar.spdy[i];
        emberVar.life[i] -= 1;
    }

    // render physical
    for (i = 0; i < physicalVar.life.length; i++) {
        var physRL = Math.abs(physicalVar.spdy[i]) < Math.abs(physicalVar.spdx[i]);
        var physRatio = Math.abs(physicalVar.spdy[i] / physicalVar.spdx[i]);
        if (physRatio >= 0.5 && physRatio <= 1.5) {
            if (physicalVar.spdx[i] > 0 && physicalVar.spdy[i] > 0) {
                // right down
                physicalRenderFrame = 3;
            } else if (physicalVar.spdx[i] < 0 && physicalVar.spdy[i] > 0) {
                // left down
                physicalRenderFrame = 5;
            } else if (physicalVar.spdx[i] > 0 && physicalVar.spdy[i] < 0) {
                // right up
                physicalRenderFrame = 1;
            } else if (physicalVar.spdx[i] < 0 && physicalVar.spdy[i] < 0) {
                // left up
                physicalRenderFrame = 7;
            }
        } else {
            if (physRL) {
                //right or left
                if (physicalVar.spdx[i] > 0) {
                    //right
                    physicalRenderFrame = 2;
                } else {
                    //left
                    physicalRenderFrame = 6;
                }
            } else {
                // up or down
                if (physicalVar.spdy[i] > 0) {
                    //down
                    physicalRenderFrame = 4;
                } else {
                    //up
                    physicalRenderFrame = 0;
                }
            }
        }
        ctx.globalAlpha = 0.6;
        ctx.drawImage(physicalSprites, 0 + (36 * physicalRenderFrame), 0, 36, 30, accountinfo.positionx[physicalVar.who[i]] + physicalVar.posx[i] - camera[0] + 40, accountinfo.positiony[physicalVar.who[i]] + physicalVar.posy[i] - camera[1] + 55, 82, 70);
        ctx.globalAlpha = 1;
        physicalVar.posx[i] += physicalVar.spdx[i];
        physicalVar.posy[i] += physicalVar.spdy[i];
        physicalVar.life[i] -= 1;
    }

    // render bind
    for (i = 0; i < bindVar.life.length; i++) {
        var bindRL = Math.abs(bindVar.spdy[i]) < Math.abs(bindVar.spdx[i]);
        var bindRatio = Math.abs(bindVar.spdy[i] / bindVar.spdx[i]);
        if (bindRatio >= 0.5 && bindRatio <= 1.5) {
            if (bindVar.spdx[i] > 0 && bindVar.spdy[i] > 0) {
                // right down
                bindRenderFrame = 3;
            } else if (bindVar.spdx[i] < 0 && bindVar.spdy[i] > 0) {
                // left down
                bindRenderFrame = 5;
            } else if (bindVar.spdx[i] > 0 && bindVar.spdy[i] < 0) {
                // right up
                bindRenderFrame = 1;
            } else if (bindVar.spdx[i] < 0 && bindVar.spdy[i] < 0) {
                // left up
                bindRenderFrame = 7;
            }
        } else {
            if (bindRL) {
                //right or left
                if (bindVar.spdx[i] > 0) {
                    //right
                    bindRenderFrame = 2;
                } else {
                    //left
                    bindRenderFrame = 6;
                }
            } else {
                // up or down
                if (bindVar.spdy[i] > 0) {
                    //down
                    bindRenderFrame = 4;
                } else {
                    //up
                    bindRenderFrame = 0;
                }
            }
        }
        ctx.globalAlpha = 0.6;
        ctx.drawImage(bindSpriteS, 0 + (36 * bindRenderFrame), 0, 36, 30, accountinfo.positionx[bindVar.who[i]] + bindVar.posx[i] - camera[0] + 40, accountinfo.positiony[bindVar.who[i]] + bindVar.posy[i] - camera[1] + 55, 82, 70);
        ctx.globalAlpha = 1;
        bindVar.posx[i] += bindVar.spdx[i];
        bindVar.posy[i] += bindVar.spdy[i];
        bindVar.life[i] -= 1;
    }

    // render fatigue
    for (i = 0; i < fatigueVar.life.length; i++) {
        var fatigueRL = Math.abs(fatigueVar.spdy[i]) < Math.abs(fatigueVar.spdx[i]);
        var fatigueRatio = Math.abs(fatigueVar.spdy[i] / fatigueVar.spdx[i]);
        if (fatigueRatio >= 0.5 && fatigueRatio <= 1.5) {
            if (fatigueVar.spdx[i] > 0 && fatigueVar.spdy[i] > 0) {
                // right down
                fatigueRenderFrame = 3;
            } else if (fatigueVar.spdx[i] < 0 && fatigueVar.spdy[i] > 0) {
                // left down
                fatigueRenderFrame = 5;
            } else if (fatigueVar.spdx[i] > 0 && fatigueVar.spdy[i] < 0) {
                // right up
                fatigueRenderFrame = 1;
            } else if (fatigueVar.spdx[i] < 0 && fatigueVar.spdy[i] < 0) {
                // left up
                fatigueRenderFrame = 7;
            }
        } else {
            if (fatigueRL) {
                //right or left
                if (fatigueVar.spdx[i] > 0) {
                    //right
                    fatigueRenderFrame = 2;
                } else {
                    //left
                    fatigueRenderFrame = 6;
                }
            } else {
                // up or down
                if (fatigueVar.spdy[i] > 0) {
                    //down
                    fatigueRenderFrame = 4;
                } else {
                    //up
                    fatigueRenderFrame = 0;
                }
            }
        }
        ctx.globalAlpha = 0.6;
        ctx.drawImage(fatigueSprites, 0 + (36 * fatigueRenderFrame), 0, 36, 30, accountinfo.positionx[fatigueVar.who[i]] + fatigueVar.posx[i] - camera[0] + 40, accountinfo.positiony[fatigueVar.who[i]] + fatigueVar.posy[i] - camera[1] + 55, 82, 70);
        ctx.globalAlpha = 1;
        fatigueVar.posx[i] += fatigueVar.spdx[i];
        fatigueVar.posy[i] += fatigueVar.spdy[i];
        fatigueVar.life[i] -= 1;
    }

    // remove any, or hit (physical)
    var spliceCount = 0;
    for (i = 0; i < physicalVar.life.length; i++) {
        if (physicalVar.life[i] == 0) {
            if (physicalVar.who[i] == lgusrIndex && physicalVar.hit[i] == 1 && accountinfo.place[physicalVar.target[i]] == 1) {
                //its your ember, and it hit a person
                db.push({ type: "punch-player", attacker: physicalVar.who[i], recieve: physicalVar.target[i] });
            }

            //delete it
            physicalVar.who.splice(i - spliceCount, 1);
            physicalVar.target.splice(i - spliceCount, 1);
            physicalVar.posx.splice(i - spliceCount, 1);
            physicalVar.posy.splice(i - spliceCount, 1);
            physicalVar.spdx.splice(i - spliceCount, 1);
            physicalVar.spdy.splice(i - spliceCount, 1);
            physicalVar.hit.splice(i - spliceCount, 1);
            physicalVar.life.splice(i - spliceCount, 1);
            spliceCount += 1;
        }
    }

    // remove any, or hit (fatigue)
    var spliceCount = 0;
    for (i = 0; i < fatigueVar.life.length; i++) {
        if (fatigueVar.life[i] == 0) {
            if (fatigueVar.who[i] == lgusrIndex && fatigueVar.hit[i] == 1 && accountinfo.place[fatigueVar.target[i]] == 1) {
                //its your ember, and it hit a person
                db.push({ type: "fatigue-player", attacker: fatigueVar.who[i], recieve: fatigueVar.target[i] });
            }

            //delete it
            fatigueVar.who.splice(i - spliceCount, 1);
            fatigueVar.target.splice(i - spliceCount, 1);
            fatigueVar.posx.splice(i - spliceCount, 1);
            fatigueVar.posy.splice(i - spliceCount, 1);
            fatigueVar.spdx.splice(i - spliceCount, 1);
            fatigueVar.spdy.splice(i - spliceCount, 1);
            fatigueVar.hit.splice(i - spliceCount, 1);
            fatigueVar.life.splice(i - spliceCount, 1);
            spliceCount += 1;
        }
    }

    // remove any, or hit (bind)
    var spliceCount = 0;
    for (i = 0; i < bindVar.life.length; i++) {
        if (bindVar.life[i] == 0) {
            if (bindVar.who[i] == lgusrIndex && bindVar.hit[i] == 1 && accountinfo.place[bindVar.target[i]] == 1) {
                //its your ember, and it hit a person
                db.push({ type: "bind-player", attacker: bindVar.who[i], recieve: bindVar.target[i] });
            }

            //delete it
            bindVar.who.splice(i - spliceCount, 1);
            bindVar.target.splice(i - spliceCount, 1);
            bindVar.posx.splice(i - spliceCount, 1);
            bindVar.posy.splice(i - spliceCount, 1);
            bindVar.spdx.splice(i - spliceCount, 1);
            bindVar.spdy.splice(i - spliceCount, 1);
            bindVar.hit.splice(i - spliceCount, 1);
            bindVar.life.splice(i - spliceCount, 1);
            spliceCount += 1;
        }
    }

    // remove any, or hit (ember)
    var spliceCount = 0;
    for (i = 0; i < emberVar.life.length; i++) {
        if (emberVar.life[i] == 0) {
            if (emberVar.who[i] == lgusrIndex && emberVar.hit[i] == 1 && accountinfo.place[emberVar.target[i]] == 1) {
                //its your ember, and it hit a person
                db.push({ type: "ember-hit", who: emberVar.who[i], target: emberVar.target[i], att: emberVar.att[i] });
            }

            //delete it
            emberVar.who.splice(i - spliceCount, 1);
            emberVar.target.splice(i - spliceCount, 1);
            emberVar.posx.splice(i - spliceCount, 1);
            emberVar.posy.splice(i - spliceCount, 1);
            emberVar.spdx.splice(i - spliceCount, 1);
            emberVar.spdy.splice(i - spliceCount, 1);
            emberVar.hit.splice(i - spliceCount, 1);
            emberVar.life.splice(i - spliceCount, 1);
            spliceCount += 1;
        }
    }

    //damage text render
    for (i = 0; i < dmgTexts.life.length; i++) {
        ctx.font = '15px serif';
        if (dmgTexts.mode[i] == 1) {
            //physical attack
            // ctx.globalAlpha = dmgTexts.life[i];
            ctx.fillStyle = "#eaec00";
            ctx.strokeStyle = 'black';
        } else if (dmgTexts.mode[i] == 2) {
            //ember attack
            // ctx.globalAlpha = dmgTexts.life[i];
            ctx.fillStyle = "#f7c200";
            ctx.strokeStyle = 'black';
        } else if (dmgTexts.mode[i] == 3) {
            //me attacked
            // ctx.globalAlpha = dmgTexts.life[i];
            ctx.fillStyle = "#ed7573";
            ctx.strokeStyle = 'black';
        } else if (dmgTexts.mode[i] == 4) {
            //plain text
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = 'black';
        } else if (dmgTexts.mode[i] == 5) {
            //heal text
            ctx.fillStyle = "#8bc34a";
            ctx.strokeStyle = 'black';
        }
        var textPosX = accountinfo.positionx[dmgTexts.who[i]] - camera[0] + 78 - (dmgTexts.amount[i].length * 4);
        ctx.strokeText(dmgTexts.amount[i], textPosX, accountinfo.positiony[dmgTexts.who[i]] + dmgTexts.posy[i] - camera[1] + 60);
        ctx.fillText(dmgTexts.amount[i], textPosX, accountinfo.positiony[dmgTexts.who[i]] + dmgTexts.posy[i] - camera[1] + 60);
        ctx.globalAlpha = 1;

        //update info
        dmgTexts.posy[i] -= 1;
        dmgTexts.life[i] -= 0.1;
    }

    var spliceCount = 0;
    //damage text clean
    for (i = 0; i < dmgTexts.life.length; i++) {
        if (dmgTexts.life[i] <= 0) {
            dmgTexts.amount.splice(i - spliceCount, 1);
            dmgTexts.who.splice(i - spliceCount, 1);
            dmgTexts.life.splice(i - spliceCount, 1);
            dmgTexts.mode.splice(i - spliceCount, 1);
            dmgTexts.posy.splice(i - spliceCount, 1);
            spliceCount += 1;
        }
    }

    if (bindInterval != 0) {
        bindInterval -= 1;
        gameclient.style.filter = "invert(1)"
    } else {
        gameclient.style.filter = "invert(0)";
    }

    if (fatigueInterval != 0) {
        fatigueInterval -= 1;
    }

    //check if you're actually in arena
    if (accountinfo.place[lgusrIndex] == 0) {
        gamemode = false;
        goToWindow(1);
    }

    // if player (you) leaving, show message on head
    if (leaveMode == true) {
        if (logoutCounter != 0) {
            if (logoutCounter % 100 == 0) {
                // show logout text
                db.push({ type: "chat", who: lgusrIndex, text: "Leaving - " + (logoutCounter / 100) });
                logoutCounter -= 1;
            } else {
                logoutCounter -= 1;
            }
        } else {
            if (accountinfo.place[lgusrIndex] == 1) {
                db.push({ type: "return-lobby", name: lgusr });
                document.getElementById("leave-arena-btn").innerHTML = "escape";
                goToWindow(1);
                leaveMode == false;
                logoutCounter = 1000;
            }
        }

    }



    setTimeout(function () {
        if (gamemode) {
            animate();
        }
    }, 10)
}

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var inspectKey = false;

var onKeyDown = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true; break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 73: //i
            inspectKey = true;
            break;
    }
};
var onKeyUp = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 73: //i
            inspectKey = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;

    }
};
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

gameclient.addEventListener("click", function (e) {
    var actionConf = true;
    var mouseX = e.clientX * scale;
    var mouseY = e.clientY * scale;
    leaveMode = false;
    document.getElementById("leave-arena-btn").innerHTML = "escape";
    // check if click axis has consumes
    for (i = 0; i < consumes.allList.length; i++) {
        var minRangeX = consumes.positionx[i] - 10;
        var maxRangeX = consumes.positionx[i] + 10;
        var minRangeY = consumes.positiony[i] - 10;
        var maxRangeY = consumes.positiony[i] + 10;
        var scrollOffsetX = mouseX + camera[0] + 9;
        var scrollOffsetY = mouseY + camera[1] + 3;

        if (consumes.allList[i].split("!")[0] == "s") {
            //scrolls
            if (minRangeX < scrollOffsetX && scrollOffsetX < maxRangeX && minRangeY < scrollOffsetY && scrollOffsetY < maxRangeY) {
                actionConf = false;

                //pick up the consume if inventory not full
                if (itemslot.length < 4) {
                    audioPlayer.push(scrollPickupAudio);
                    // audioPlayer[audioPlayer.length - 1].play();
                    //add the scroll to inventory
                    itemslot.push(consumes.allList[i]);
                    document.getElementById("itemS-" + itemslot.length).style.backgroundImage = "url('./assets/consume/scroll_t" + consumes.allList[i].split("!")[1] + "_inventory.png')";

                    // tell server to remove the item from the ground
                    db.push({ type: "item-pickup", consumePoint: i, name: lgusr });
                }
            }
        }
    }

    //check if any players
    for (i = 0; i < accountinfo.positionx.length; i++) {
        var pxmin = accountinfo.positionx[i] - camera[0] + 71;
        var pxmax = accountinfo.positionx[i] - camera[0] + 87;
        var pymin = accountinfo.positiony[i] - camera[1] + 25;
        var pymax = accountinfo.positiony[i] - camera[1] + 100;
        var ishere = accountinfo.place[i];
        if (pxmin <= mouseX && mouseX <= pxmax && pymin <= mouseY && mouseY <= pymax && i != lgusrIndex && accountinfo.place[i] != 0) {
            //playr is clicked
            actionConf = false;
            //change focused player
            tgusr = accountinfo.name[i];
            tgusrIndex = i;

            if (punchCoolDown == 0) {
                //send punches
                var att = randInt(1, accountinfo.attack[lgusrIndex]);
                var flyRatioY = (accountinfo.positiony[tgusrIndex] - accountinfo.positiony[lgusrIndex]);
                var flyRatioX = (accountinfo.positionx[tgusrIndex] - accountinfo.positionx[lgusrIndex]);
                var yspd = flyRatioY / 20;
                var xspd = flyRatioX / 20;
                punchCoolDown = 100;

                db.push({ type: "newTg", own: lgusrIndex, ask: tgusrIndex });
                // save this for later
                db.push({ type: "punch-shoot", who: lgusrIndex, target: tgusrIndex, xspd: xspd, yspd: yspd, att: att });
            }
        }
    }

    // if nothing is at click destination, move
    if (actionConf) {
        var areaBool = mouseX >= 0 && mouseY >= 0 && (mouseX + camera[0] - 70) <= (floorDimension[0] - 30) && (mouseY + camera[1] - 100) <= (floorDimension[1] - 100);
        if (gamemode) {
            // if cooldown is over move
            if (moveCoolDown == 0 && bindInterval == 0) {
                moveCoolDown = 500;
                db.push({ type: "player-new-position", name: lgusr, positionx: mouseX + camera[0] - 70, positiony: mouseY + camera[1] - 100 });
            }
        }
    }

});

// gameclient.addEventListener('onmousemove', function (e) {
//     if (gamemode) {
//         // change where character is pointing at depending on mouse position
//         // 188 is X center, 300 is Y center. therefore, we give 20 pixels of center range
//         if( e.clientX >= 198 && e.clientX >= 178 && e.clientY <= 310 && e.clientY >= 290 ) {
//             // if completely center, face down
//         }
//     }
// });

var dmgTexts = {
    amount: [],
    who: [],
    life: [],
    mode: [],
    posy: []
}

function newDamageText(mode, who, amount) {
    if (gamemode) {
        //physical
        dmgTexts.amount.push(amount);
        dmgTexts.who.push(who);
        dmgTexts.mode.push(mode);
        dmgTexts.life.push(10);
        dmgTexts.posy.push(0);
    }
}

function randInt(min, max) {
    return Math.random() * (max - min) + min;
}

// ember variable
var emberVar = {
    who: [],
    target: [],
    posx: [],
    posy: [],
    spdx: [],
    spdy: [],
    hit: [],
    life: [],
    att: []
}

//bind
var bindVar = {
    who: [],
    target: [],
    posx: [],
    posy: [],
    spdx: [],
    spdy: [],
    hit: [],
    life: []
}

//fatigue
var fatigueVar = {
    who: [],
    target: [],
    posx: [],
    posy: [],
    spdx: [],
    spdy: [],
    hit: [],
    life: []
}

//physical variable
var physicalVar = {
    who: [],
    target: [],
    posx: [],
    posy: [],
    spdx: [],
    spdy: [],
    hit: [],
    life: [],
    att: []
}



function csmTrg(ord) {
    // use the consume
    if (itemslot[ord].split("!")[0] == "s") {
        // scrolls used
        if (itemslot[ord].split("!")[1] == "1") {
            //ember
            // accounti
            if (tgusrIndex != -1) {
                //make ember fly
                var att = randInt(5, 15);
                var flyRatioY = (accountinfo.positiony[tgusrIndex] - accountinfo.positiony[lgusrIndex]);
                var flyRatioX = (accountinfo.positionx[tgusrIndex] - accountinfo.positionx[lgusrIndex]);
                var yspd = flyRatioY / 20;
                var xspd = flyRatioX / 20;

                db.push({ type: "ember-shoot", who: lgusrIndex, target: tgusrIndex, xspd: xspd, yspd: yspd, att: att });
                // remove element from the slot
                if (itemslot.length != 1) {
                    itemslot.splice(ord, 1);
                } else {
                    itemslot = [];
                }
                updateSlots();
            }
        } else if (itemslot[ord].split("!")[1] == "3") {
            db.push({ type: "heal", who: lgusrIndex });
            // remove element from the slot
            if (itemslot.length != 1) {
                itemslot.splice(ord, 1);
            } else {
                itemslot = [];
            }
            updateSlots();
        } else if (itemslot[ord].split("!")[1] == "0") {
            //bind
            if (tgusrIndex != -1) {
                var rangeX = Math.abs(accountinfo.positionx[lgusrIndex] - accountinfo.positionx[tgusrIndex]) <= 200;
                var rangeY = Math.abs(accountinfo.positiony[lgusrIndex] - accountinfo.positiony[tgusrIndex]) <= 200;
                if (rangeX && rangeY) {
                    //make bind fly
                    var flyRatioY = (accountinfo.positiony[tgusrIndex] - accountinfo.positiony[lgusrIndex]);
                    var flyRatioX = (accountinfo.positionx[tgusrIndex] - accountinfo.positionx[lgusrIndex]);
                    var yspd = flyRatioY / 40;
                    var xspd = flyRatioX / 40;

                    db.push({ type: "bind-shoot", who: lgusrIndex, target: tgusrIndex, xspd: xspd, yspd: yspd });
                    // remove element from the slot
                    if (itemslot.length != 1) {
                        itemslot.splice(ord, 1);
                    } else {
                        itemslot = [];
                    }
                    updateSlots();
                } else {
                    newDamageText(4, lgusrIndex, "Target is too far away")
                }
            }
        } else if (itemslot[ord].split("!")[1] == "2") {
            //bind
            if (tgusrIndex != -1) {
                var rangeX = Math.abs(accountinfo.positionx[lgusrIndex] - accountinfo.positionx[tgusrIndex]) <= 200;
                var rangeY = Math.abs(accountinfo.positiony[lgusrIndex] - accountinfo.positiony[tgusrIndex]) <= 200;
                if (rangeX && rangeY) {
                    //make bind fly
                    var flyRatioY = (accountinfo.positiony[tgusrIndex] - accountinfo.positiony[lgusrIndex]);
                    var flyRatioX = (accountinfo.positionx[tgusrIndex] - accountinfo.positionx[lgusrIndex]);
                    var yspd = flyRatioY / 40;
                    var xspd = flyRatioX / 40;

                    db.push({ type: "fatigue-shoot", who: lgusrIndex, target: tgusrIndex, xspd: xspd, yspd: yspd });
                    // remove element from the slot
                    if (itemslot.length != 1) {
                        itemslot.splice(ord, 1);
                    } else {
                        itemslot = [];
                    }
                    updateSlots();
                } else {
                    newDamageText(4, lgusrIndex, "Target is too far away")
                }
            }
        } else {
            // remove element from the slot
            if (itemslot.length != 1) {
                itemslot.splice(ord, 1);
            } else {
                itemslot = [];
            }
            updateSlots();
        }
    }
}

function updateSlots() {
    //clear all inventory
    for (i = 0; i < 4; i++) {
        document.getElementById("itemS-" + (i + 1)).style.backgroundImage = 'url("./assets/consume/noConsume.png")';
    }

    if (itemslot.length != 0) {
        for (i = 0; i < itemslot.length; i++) {
            if (itemslot[i].split("!")[0] == "s") {
                //scrolls
                document.getElementById("itemS-" + (i + 1)).style.backgroundImage = 'url("./assets/consume/scroll_t' + itemslot[i].split("!")[1] + '_inventory.png")';
            }
        }
    }
}

//talk
function talk() {
    var chatContent = document.getElementById("chatboxxx").value;
    document.getElementById("chatboxxx").value = "";
    db.push({ type: "chat", who: lgusrIndex, text: chatContent });
}

// lobby tabs