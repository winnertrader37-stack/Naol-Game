const TITLE="Naol Game"; // maqaa game asitti jijjiiri
document.title=TITLE;t.textContent=TITLE;ttl.textContent=TITLE;
const R=new THREE.WebGLRenderer({antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(innerWidth,innerHeight);R.outputEncoding=THREE.sRGBEncoding;
document.body.prepend(R.domElement);
const S=new THREE.Scene();S.background=new THREE.Color(0x8ecae6);S.fog=new THREE.Fog(0x8ecae6,150,900);
const cam=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.1,1400);
S.add(new THREE.HemisphereLight(0xffffff,0x6b7a3a,.95));
const sun=new THREE.DirectionalLight(0xffffff,.8);sun.position.set(60,120,40);S.add(sun);
const M=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
const box=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(p||S).add(o);return o};
const rnd=(a,b)=>a+Math.random()*(b-a);

/* ---------- Finfinnee (Addis Ababa) low-poly ---------- */
const ground=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),M(0x7a8f3a));ground.rotation.x=-Math.PI/2;S.add(ground);
const road=M(0x2b2b2e),pal=[0xe9d8a6,0xd4a373,0xcfd8dc,0xb08968,0xf1faee,0xa8dadc];
for(let i=-5;i<=5;i++){box(12,.05,720,road,i*60,.03,0);box(720,.05,12,road,0,.03,i*60)}
const BL=[];
for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){
 if(!i&&!j)continue;
 const cx=i*60+30,cz=j*60+30,n=3+Math.floor(Math.random()*3);
 for(let k=0;k<n;k++){const w=rnd(8,16),d=rnd(8,16),h=Math.random()<.2?rnd(30,60):rnd(6,22);
  const bx=cx+rnd(-16,16),bz=cz+rnd(-16,16);BL.push([bx,bz,w/2,d/2]);box(w,h,d,M(pal[Math.floor(Math.random()*pal.length)]),bx,h/2,bz)}}
// Meskel Square landmark: flag-colour tower on the plaza
[[0x2f9e44,0],[0xfcc419,8],[0xe03131,16]].forEach(([c,y])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,8,16),M(c));m.position.set(30,y+4,30);S.add(m)});
// eucalyptus trees + hills outside the city
for(let i=0;i<260;i++){const a=rnd(0,6.28),r=rnd(340,800),x=Math.cos(a)*r,z=Math.sin(a)*r;
 const tr=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,10,6),M(0x6d4c41));tr.position.set(x,5,z);S.add(tr);
 const lf=new THREE.Mesh(new THREE.ConeGeometry(3,12,7),M(0x2d6a4f));lf.position.set(x,15,z);S.add(lf)}
for(let i=0;i<18;i++){const a=i/18*6.28+rnd(-.1,.1),r=rnd(900,1150),h=rnd(90,200);
 const m=new THREE.Mesh(new THREE.ConeGeometry(rnd(120,200),h,7),M(0x6a994e));m.position.set(Math.cos(a)*r,h/2,Math.sin(a)*r);S.add(m)}
