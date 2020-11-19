let [w, h] = [window.innerWidth, window.innerHeight]
let isActive = false
let SceneActive = false
let tar = 1

let cloudTimer
window.onload = () => {

    function cloudMove(where) {
        document.querySelectorAll('.cloud').forEach((cloud) => {

            cloud.style.transform = `scale(6) `
            clearTimeout(cloudTimer)
            cloudTimer = setTimeout(() => {
                document.querySelectorAll('.cloud').forEach((cloud2) => {
                    cloud2.style.transform = `scale(1) `
                })

                switch(where){
                    case 'toScene':
                        document.querySelectorAll('.sceneBox').forEach((scene)=>{
                            scene.style.display = 'none'
                        })
                        document.querySelector('#intro1').style.display = 'block'
                        document.querySelector('.sceneBtn').style.transform = 'translateY(-100px)'
                        break;
                    default:
                        document.querySelector('.sceneBtn').style.transform = ''
                        break;
                }
            }, 3000);
        })
    }

    document.querySelector('.container').addEventListener("click", (e) => {
        console.log('e');
        isActive = !isActive



        if (isActive) {
            // document.querySelector('.container').style.transform = `scale(1.2) translateX(${moveToCenter(e, 'w')}px)  translateY(${moveToCenter(e, 'h')}px)`
            document.querySelector('.container').style.transform = `scale(1.2)`
        } else {
            document.querySelector('.container').style.transform = ''
        }



        if (isActive) {
            document.querySelector('#intro1').style.transform = `translateX(300px) `
        } else {
            document.querySelector('#intro1').style.transform = ``
        }


        switch (e.target.id) {
            case 'scene1':
                tar = 1
                break;
            case 'scene2':
                tar = 2
                break;
            case 'scene3':
                tar = 3
                break;
        }

        if (e.target.id.includes('scene')) {
            SceneActive = true
            cloudMove()
            
        }

        setTimeout(()=>{

            isActive = false
            document.querySelector('#intro1').style.transform = ``


            if(SceneActive){
                document.querySelector('.container').style.transform = ''
                document.querySelector(`#scene${tar}Box`).style.display = 'block'
                document.querySelector('#intro1').style.display = 'none'
            }else{
                document.querySelector(`#scene${tar}Box`).style.display = 'none'
                document.querySelector('#intro1').style.display = 'block'    
            }
            tar = 1
        },2000)


    })

    document.querySelectorAll('.sceneBtn').forEach((btn) => {
       
        btn.addEventListener('click', (e) => {
            
            SceneActive = false
            cloudMove('toScene')
           
            // document.querySelectorAll('.cloud').forEach((cloud) => {

            //     cloud.style.transform = `scale(1) `
                
            // })
        })
    })



}



function moveToCenter(e, axis) {

    let dir = 1
    if (axis == 'w') {
        if (e.clientX > w / 2) dir = -1
        return Math.abs(e.clientX - w / 2) * dir

    } else {
        if (e.clientY > h / 2) dir = -1
        return Math.abs(e.clientY - h / 2) * dir
    }


}