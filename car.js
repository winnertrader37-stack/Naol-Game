/* ---------- Leopard 8 ---------- */
const car=new THREE.Group();S.add(car);
const body=new THREE.MeshPhongMaterial({color:0x0b0b0d,shininess:90}),
 silver=new THREE.MeshPhongMaterial({color:0xb8bcc4,shininess:80}),
 glass=M(0x1b2a36,{transparent:true,opacity:.35}),dark=M(0x111111);
box(2.1,.9,4.7,body,0,.9,0,car);                 // lower body
box(1.95,.85,3.0,glass,0,1.75,-.4,car);          // glass cabin
box(2.0,.1,3.1,body,0,2.2,-.4,car);              // roof
box(2.1,.08,.3,silver,0,2.3,-.4,car);            // roof rail
box(1.2,.12,.12,M(0x4dabf7,{emissive:0x1971c2}),0,2.33,1.0,car); // blue roof light
box(1.95,.18,.7,body,0,1.38,1.75,car).rotation.x=0; // hood
box(1.5,.5,.06,dark,0,.95,2.37,car);             // grille
box(1.4,.06,.07,silver,0,1.12,2.38,car);
[-1,1].forEach(s=>{
 box(.4,.18,.06,new THREE.MeshBasicMaterial({color:0xfff6c8}),s*.8,1.1,2.37,car);   // headlights
 box(.18,.4,.06,new THREE.MeshBasicMaterial({color:0xff2a2a}),s*.95,1.1,-2.37,car); // tail lights
 box(.06,.14,2.3,silver,s*1.06,.52,0,car);                                           // side sills
});
box(1.7,.14,.35,silver,0,.5,2.25,car);box(1.7,.14,.35,silver,0,.5,-2.25,car);        // skid plates
// spare tyre on tailgate
const spare=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.3,20).rotateX(Math.PI/2),M(0x151515));spare.position.set(0,1.35,-2.55);car.add(spare);
const hub=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.32,12).rotateX(Math.PI/2),silver);hub.position.copy(spare.position);car.add(hub);
// wheels
const wheels=[];
[[-1,1.5],[1,1.5],[-1,-1.5],[1,-1.5]].forEach(([sx,z],i)=>{
 const piv=new THREE.Group();piv.position.set(sx*1.05,.47,z);car.add(piv);
 const spin=new THREE.Group();piv.add(spin);
 spin.add(new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.36,20).rotateZ(Math.PI/2),M(0x151515)));
 spin.add(new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.38,16).rotateZ(Math.PI/2),silver));
 [0,1.05,2.1].forEach(a=>{const sp=box(.4,.07,.58,dark,0,0,0,spin);sp.rotation.x=a});
 wheels.push({piv,spin,front:z>0});});
// driver (left-hand drive) with face texture
const drv=new THREE.Group();drv.position.set(.5,0,-.15);car.add(drv);
box(.55,.12,.55,dark,0,.98,0,drv);box(.55,.75,.12,dark,0,1.35,-.32,drv);
box(.5,.6,.3,M(0xf1f1f1),0,1.35,-.08,drv);
const skin=M(0x6b3f2a),faceMat=M(0x8a5a3c);
const head=new THREE.Mesh(new THREE.SphereGeometry(.17,20,16),skin);head.scale.set(1,1.2,1);head.position.set(0,1.82,-.08);drv.add(head);
const hair=new THREE.Mesh(new THREE.SphereGeometry(.19,20,12,0,6.3,0,1.75),M(0x0c0c0c));hair.position.set(0,1.85,-.09);drv.add(hair);
const fp=new THREE.Mesh(new THREE.PlaneGeometry(.31,.35),faceMat);fp.position.set(0,1.8,.12);drv.add(fp);
function setFace(src){new THREE.TextureLoader().load(src,tx=>{tx.encoding=THREE.sRGBEncoding;faceMat.map=tx;faceMat.color.set(0xffffff);faceMat.needsUpdate=true})}
setFace('face.jpg');
const wheelSt=new THREE.Mesh(new THREE.TorusGeometry(.17,.025,8,20),dark);wheelSt.position.set(.5,1.5,.55);wheelSt.rotation.x=-1.1;car.add(wheelSt);
box(1.8,.3,.45,dark,0,1.35,.85,car);              // dashboard
file.onchange=e=>{const f=e.target.files[0];if(f)setFace(URL.createObjectURL(f))};
up.onclick=()=>file.click();
