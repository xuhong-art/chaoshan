"use strict";

var _ref = [window.innerWidth, window.innerHeight],
    w = _ref[0],
    h = _ref[1];
var isActive = false;
var SceneActive = false;
var tar = 1;
var cloudTimer;

window.onload = function () {
  function cloudMove(where) {
    document.querySelectorAll('.cloud').forEach(function (cloud) {
      cloud.style.transform = "scale(6) ";
      clearTimeout(cloudTimer);
      cloudTimer = setTimeout(function () {
        document.querySelectorAll('.cloud').forEach(function (cloud2) {
          cloud2.style.transform = "scale(1) ";
        });

        switch (where) {
          case 'toScene':
            document.querySelectorAll('.sceneBox').forEach(function (scene) {
              scene.style.display = 'none';
            });
            document.querySelector('#intro1').style.display = 'block';
            document.querySelector('.sceneBtn').style.transform = 'translateY(-100px)';
            break;

          default:
            document.querySelector('.sceneBtn').style.transform = '';
            break;
        }
      }, 3000);
    });
  }

  document.querySelector('.container').addEventListener("click", function (e) {
    console.log('e');
    isActive = !isActive;

    if (isActive) {
      // document.querySelector('.container').style.transform = `scale(1.2) translateX(${moveToCenter(e, 'w')}px)  translateY(${moveToCenter(e, 'h')}px)`
      document.querySelector('.container').style.transform = "scale(1.2)";
    } else {
      document.querySelector('.container').style.transform = '';
    }

    if (isActive) {
      document.querySelector('#intro1').style.transform = "translateX(300px) ";
    } else {
      document.querySelector('#intro1').style.transform = "";
    }

    switch (e.target.id) {
      case 'scene1':
        tar = 1;
        break;

      case 'scene2':
        tar = 2;
        break;

      case 'scene3':
        tar = 3;
        break;
    }

    if (e.target.id.includes('scene')) {
      SceneActive = true;
      cloudMove();
    }

    setTimeout(function () {
      isActive = false;
      document.querySelector('#intro1').style.transform = "";

      if (SceneActive) {
        document.querySelector('.container').style.transform = '';
        document.querySelector("#scene".concat(tar, "Box")).style.display = 'block';
        document.querySelector('#intro1').style.display = 'none';
      } else {
        document.querySelector("#scene".concat(tar, "Box")).style.display = 'none';
        document.querySelector('#intro1').style.display = 'block';
      }

      tar = 1;
    }, 2000);
  });
  document.querySelectorAll('.sceneBtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      SceneActive = false;
      cloudMove('toScene'); // document.querySelectorAll('.cloud').forEach((cloud) => {
      //     cloud.style.transform = `scale(1) `
      // })
    });
  });
};

function moveToCenter(e, axis) {
  var dir = 1;

  if (axis == 'w') {
    if (e.clientX > w / 2) dir = -1;
    return Math.abs(e.clientX - w / 2) * dir;
  } else {
    if (e.clientY > h / 2) dir = -1;
    return Math.abs(e.clientY - h / 2) * dir;
  }
}