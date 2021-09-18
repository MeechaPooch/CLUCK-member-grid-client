// import { signin_secret, token, bruh } from './secrets.js'
const importit = (module) => { return new Promise(ret => { require([module], ret) }) }

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

async function run() {
    const { token } = await importit('./secrets.js')
    // const fs = await importit('./node_modules/slack-api/index.js')


    // const http = new XMLHttpRequest();
    // const url='https://slack.com/api/users.profile.get?pretty=1';
    // http.open("POST", url);
    // // http.setRequestHeader('Authorization','Bearer '+token)
    // http.setRequestHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
    // http.setRequestHeader('Access-Control-Allow-Origin','*')
    // http.setRequestHeader('Content-type', 'application/json')
    // http.send({
    //     token:token});

    // http.onreadystatechange = (e) => {
    //     console.log(http.responseText)
    // }   

    // http.open("GET", url);
    // http.send()
    // http.


    // Get members list
    // function loadJSON(callback) {
    //     var xObj = new XMLHttpRequest();
    //     xObj.overrideMimeType("application/json");
    //     xObj.open('GET', './members.json', true);
    //     // 1. replace './data.json' with the local path of your file
    //     xObj.onreadystatechange = function() {
    //         if (xObj.readyState === 4 && xObj.status === 200) {
    //             // 2. call your callback function
    //             callback(xObj.responseText);
    //         }
    //     };
    //     xObj.send(null);
    //   }


    let { members } = await importit('./members.js')
    // members = shuffle(members)
    console.log(members)
    // var names = ['Charlotte', 'Cynthia', 'Chloe', 'Caleb', 'Nathan', 'Nate', 'Micah']
    // names = names.concat(names)
    // names = names.concat(names)
    // names = names.concat(names)

    // Set grid size
    root = Math.sqrt(members.length)
    wid = Math.ceil(root)
    hei = Math.round(root)
    document.documentElement.style.setProperty('--width', wid)
    document.documentElement.style.setProperty('--height', hei)

/*


    border-top-left-radius: 0%;
    border-bottom-right-radius: 0%;
*/


    // Button Styles
    const horizPos =
    {
        left: [{ styleName: 'right', val: 'auto' },{styleName:'border-top-left-radius', val:0},{styleName:'border-bottom-left-radius', val:0},],
        right: [{ styleName: 'left', val: 'auto' },{styleName:'border-top-right-radius', val:0},{styleName:'border-bottom-right-radius', val:0},],
        center: []
    }
    const verticalPos =
    {
        top: [{styleName:'border-top-right-radus', val:0},{styleName:'border-top-left-radus', val:0},],
        bottom: [{ styleName: 'bottom', 'val': 0 }, {styleName:'border-bottom-right-radius', val:0},{styleName:'border-bottom-left-radius', val:0},]
    }
    const font =
    {
        gilroy:[{styleName:'font-family',val:'gilroy'}],
        cocogoose: [{ styleName: 'font-family', val: 'cocogoose' }],
        tcm: [{ styleName: 'font-family', val: 'tcm' }],
        basics: [{ styleName: 'font-family', val: 'basics-serif' }],
    }
    const styleCatagories = [horizPos, verticalPos, font]

    const buttonStates = {
        false: [
            { styleName: 'filter', val: 'grayscale(100%)' },
            { styleName: 'box-shadow', val: 'inset 0 0 0 1000px rgba(255, 255, 255, 0.4), 0px 0px 10px rgba(255, 0, 0,.5)' },
            // { styleName: "outline-width", val: '0'},
            // { styleName: 'outline-style', val: 'hidden' },
            // { styleName: 'outline-color', val: 'rgba(251, 255, 0,0)' },
        ],
        true: [
            { styleName: 'filter', val: 'grayscale(0%)' },
            { styleName: 'box-shadow', val: 'inset 0 0 0 1000px rgba(255, 255, 255, 0.0), 0px 0px 20px rgb(0, 255, 136)' },
            // { styleName: 'box-shadow', val: '' },
            // { styleName: "outline-width", val: '8px'},
            // { styleName: 'outline-style', val: 'solid' },
            // { styleName: 'outline-color', val: 'rgba(70, 255, 169, 0.76)' },
        ]
    }

    // Add member buttons
    members.forEach(member => {
        // Init button
        memberButton = document.createElement(null);
        memberButton.onclick = (click) => {
            click.path.forEach(button => {
                if (button.className != 'button-in') { return }
                // const button = click.target

                button.loggedIn = !button.loggedIn
                buttonStates[button.loggedIn].forEach(styleSpec => {
                    button.style.setProperty(styleSpec.styleName, styleSpec.val)
                })
            })
        }
        text = document.createElement(null)
        text.className = 'button-text'
        text.innerHTML = member.firstname
        styleCatagories.forEach(styleCatagory => {
            console.log(styleCatagory)
            let styleOptions = Object.values(styleCatagory)
            if (styleOptions.length == 0) { return }
            let toSet = styleOptions[Math.floor(Math.random() * styleOptions.length)]
            toSet.forEach(attribute => {
                console.log(`${attribute.styleName}=${attribute.val}`)
                text.style.setProperty(attribute.styleName, attribute.val)
            })
        })
        memberButton.appendChild(text)
        memberButton.style.setProperty('background-image', `url(${member.img})`)

        // Set properties
        memberButton.className = 'button-in'
        // text.onclick=null;

        // memberButton.innerHTML = name
        // memberButton.style.setProperty()

        // Add button
        document.getElementById('button-grid').appendChild(memberButton)
    })

}
run()