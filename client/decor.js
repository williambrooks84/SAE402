let scene = document.querySelector('a-scene');

/*
<a-entity id="lamppost" gltf-model="#light" position="-17 -1 3" scale="7 7 7" rotation="0 90 0"  auto-center></a-entity>
<a-entity id="lamppost" gltf-model="#light" position="17 -1 3" scale="7 7 7" rotation="0 90 0"  auto-center></a-entity>
<a-entity id="lamppost" gltf-model="#light" position="11 -1 17" scale="7 7 7" rotation="0 90 0"  auto-center></a-entity>
<a-entity id="lamppost" gltf-model="#light" position="10 4 -17" scale="7 7 7" rotation="0 90 0"  auto-center></a-entity>
*/

let createLamppost = (position) => {
    let lamppost = document.createElement('a-entity');
    lamppost.setAttribute('id', 'lamppost');
    lamppost.setAttribute('gltf-model', '#light');
    lamppost.setAttribute('position', position);
    lamppost.setAttribute('scale', '7 7 7');
    lamppost.setAttribute('rotation', '0 90 0');
    lamppost.setAttribute('auto-center', '');
    scene.appendChild(lamppost);
}

let createLights = function(lampArray){
    
    for (let position of lampArray){
        createLamppost(position);
    }

    // <a-light type="spot" color="yellow" position="-17 8 3" intensity="1" angle="30" rotation="-90 0 0" penumbra="0.5" ><a-light>

    for (let position of lampArray) {
        console.log(position);
        let posArray = position.split(' ');
        posArray[1] = (parseFloat(posArray[1]) + 6).toString();
        position = posArray.join(' ');
        console.log(position);

        let spotLight = document.createElement('a-light');
        spotLight.setAttribute('type', 'spot');
        spotLight.setAttribute('color', 'yellow');
        spotLight.setAttribute('position', position);
        spotLight.setAttribute('intensity', '1');
        spotLight.setAttribute('angle', '30');
        spotLight.setAttribute('rotation', '-90 0 0');
        spotLight.setAttribute('penumbra', '0.5');
        console.log(spotLight);

        scene.appendChild(spotLight);
    }
}

scene.addEventListener('loaded', () => {

    createLights([
        '-17 -1 3', 
        '17 -1 3', 
        '11 -1 17', 
        '10 4 -17'
    ]);

});
let createLampPostLights = function(lampArray) {
    for (let position of lampArray) {
        let posArray = position.split(' ');
        let x = parseFloat(posArray[0]);
        let y = parseFloat(posArray[1]) + 6;
        let z = parseFloat(posArray[2]);

        let lightPositions = [
            { position: `${x - 1.6} ${y} ${z}`, rotation: '0 0 -25', scale: '1.7 0.1 0.3' },
            { position: `${x + 1.6} ${y} ${z}`, rotation: '0 0 25', scale: '1.7 0.1 0.3' },
            { position: `${x - 0.05} ${y} ${z + 1.7}`, rotation: '0 90 -25', scale: '1.7 0.1 0.3' },
            { position: `${x - 0.05} ${y} ${z - 1.5}`, rotation: '0 90 25', scale: '1.7 0.1 0.3' }
        ];

        for (let light of lightPositions) {
            let boxElement = document.createElement('a-box');
            boxElement.setAttribute('position', light.position);
            boxElement.setAttribute('rotation', light.rotation);
            boxElement.setAttribute('scale', light.scale);
            boxElement.setAttribute('color', 'yellow');
            boxElement.setAttribute('material', 'emissive: #ffee55');
            boxElement.setAttribute('light', 'type: point; intensity: 1; distance: 2');
            scene.appendChild(boxElement);
        }
    }
}

scene.addEventListener('loaded', () => {
    createLampPostLights([
        '-17 -1 3', 
        '17 -1 3', 
        '11 -1 17', 
        '10 4 -17'
    ]);
});







let createBoxes = function(boxArray) {
    for (let box of boxArray) {
        let boxElement = document.createElement('a-box');
        boxElement.setAttribute('position', box.position);
        boxElement.setAttribute('rotation', box.rotation);
        boxElement.setAttribute('scale', box.scale);
        boxElement.setAttribute('color', 'yellow');
        boxElement.setAttribute('material', 'emissive: #ffee55');
        boxElement.setAttribute('light', 'type: point; intensity: 1; distance: 2');
        scene.appendChild(boxElement);
    }
}

scene.addEventListener('loaded', () => {
    createBoxes([
        //house 1
        { position: '-17.5 3.4 0.5', rotation: '0 45 0', scale:'0.7 0.5 0.5'},
        { position: '-17.5 3.4 -4.5', rotation: '0 -45 0', scale:'0.7 0.5 0.5'},
        { position: '-16.2 2.2 -2', rotation: '0 0 0', scale:'0.2 0.65 0.8'},
        //house 2
        { position: '17.5 3.4 0.45', rotation: '0 45 0', scale:'0.5 0.4 0.7'},
        { position: '17.5 3.4 -4.45', rotation: '0 -45 0', scale:'0.5 0.4 0.7'},
        { position: '16.2 2.2 -2', rotation: '0 0 0', scale:'0.2 0.65 0.8'},

        //house 3
        { position: '-18 1.7 10', rotation: '0 0 0', scale:'0.2 0.8 2'},
        { position: '-17.7 8.7 10', rotation: '0 0 0', scale:'0.2 0.8 0.8'},
        { position: '-20.5 1.7 4.9', rotation: '0 -45 0', scale:'0.9 0.6 0.5'},
        { position: '-20.75 4.4 4.99', rotation: '0 -45 0', scale:'0.75 0.4 0.5'},
        { position: '-15.4 4.4 15', rotation: '0 -45 0', scale:'0.75 0.4 0.5'},

        //house 4
        { position: '15.5 1.7 15.2', rotation: '0 -45 0', scale:'0.2 0.7 0.8'},
        { position: '20.6 4.4 13.15', rotation: '0 0 0', scale:'0.8 0.4 0.2'},
        { position: '13.4 4.4 20.4', rotation: '0 90 0', scale:'0.8 0.4 0.2'},
        { position: '12.5 8.2 17.9', rotation: '0 75 0', scale:'0.8 0.8 0.2'},
        { position: '16 11.15 13.6', rotation: '0 30 0', scale:'0.8 0.4 0.2'},

        //house 5
        { position: '16.5 7.2 -12.7', rotation: '0 0 0', scale:'0.8 0.8 0.2'},
        { position: '12.7 7.2 -16.5', rotation: '0 0 0', scale:'0.2 0.8 0.8'},

        //house 6
        { position: '-10 6.2 -17.9', rotation: '0 0 0', scale:'1.8 0.7 0.2'},
        { position: '-4.8 6.2 -20.5', rotation: '0 -45 0', scale:'0.2 0.8 0.8'},
        { position: '-15.2 6.2 -20.5', rotation: '0 45 0', scale:'0.2 0.8 0.8'},
        { position: '-4.9 8.9 -20.6', rotation: '0 -45 0', scale:'0.2 0.4 0.8'},
        { position: '-15.05 8.9 -20.6', rotation: '0 45 0', scale:'0.2 0.4 0.8'},
        
        //house 7
        { position: '-16 18 -21.3', rotation: '0 45 0', scale:'0.2 0.8 0.8'},
        { position: '-10.6 20.9 -19.1', rotation: '0 0 0', scale:'0.8 0.4 0.2'},

        //house 8
        { position: '22.5 16.6 9', rotation: '0 0 0', scale:'0.2 0.4 0.8'},
        
       

        //tunnel 1
        { position: '0 2.1 16.9', rotation: '0 0 0', scale:'1.9 0.9 0.2'},
        { position: '-8 2.1 16.9', rotation: '0 0 0', scale:'1.9 0.9 0.2'},
        { position: '8 2.1 16.9', rotation: '0 0 0', scale:'1.9 0.9 0.2'},

        //tunnel 2
        { position: '20.5 16.8 2.82', rotation: '0 -40 0', scale:'2.2 0.9 0.2'},
        { position: '14.5 16.8 -2.2', rotation: '0 -40 0', scale:'2.2 0.9 0.2'},
        { position: '8.5 16.8 -7.2', rotation: '0 -40 0', scale:'2.2 0.9 0.2'},
        { position: '3.7 16.8 -11', rotation: '0 -35 0', scale:'2.2 0.9 0.2'},
        { position: '-2.9 16.8 -15.6', rotation: '0 -35 0', scale:'2.2 0.9 0.2'},
        
        
        
        

       
    ]);
});


AFRAME.registerComponent('filter-part', {
    schema: {
      targetPart: { type: 'string', default: '' },
      autoCenter: { type: 'boolean', default: false }
    },
  
    init: function () {
      this.el.addEventListener('model-loaded', () => this.filterModel());
    },
  
    filterModel: function () {
      let model = this.el.getObject3D('mesh');
      if (!model) return;
  
      let bbox = new THREE.Box3();
      let targetMesh = null;
  
      model.traverse((node) => {
      if (node.isMesh) {
        if (node.name === this.data.targetPart) {
        targetMesh = node;
        } else {
        node.visible = false;
        }
      }
      });
  
      if (targetMesh && this.data.autoCenter) {
      bbox.setFromObject(targetMesh);
      let center = new THREE.Vector3();
      bbox.getCenter(center);
      targetMesh.position.sub(center); // Recentrer l'objet
      }
    }
    });
  
    document.querySelectorAll("[gltf-model='#decor']").forEach(el => {
    let part = el.getAttribute("target-part");
    let autoCenter = el.hasAttribute("auto-center");
    el.setAttribute("filter-part", `targetPart: ${part}; autoCenter: ${autoCenter}`);
    });

    document.querySelectorAll("[gltf-model='#spacebase']").forEach(el => {
    let part = el.getAttribute("target-part");
    let autoCenter = el.hasAttribute("auto-center");
    el.setAttribute("filter-part", `targetPart: ${part}; autoCenter: ${autoCenter}`);
    });

    document.querySelectorAll("[gltf-model='#tunnel']").forEach(el => {
    let part = el.getAttribute("target-part");
    let autoCenter = el.hasAttribute("auto-center");
    el.setAttribute("filter-part", `targetPart: ${part}; autoCenter: ${autoCenter}`);
    });

    document.querySelectorAll("[gltf-model='#cargotoit']").forEach(el => {
    let part = el.getAttribute("target-part");
    let autoCenter = el.hasAttribute("auto-center");
    el.setAttribute("filter-part", `targetPart: ${part}; autoCenter: ${autoCenter}`);
    });