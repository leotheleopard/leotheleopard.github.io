function shuffle(a){a=a.slice();for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function parseBank(s){return s.trim().split('\n').map(l=>{const[w,k,t]=l.split('|');return{w:(w||'').trim().toUpperCase(),k:(k||'').trim(),t:(t||'o').trim()}}).filter(e=>/^[A-Z]{3,}$/.test(e.w)&&e.k)}
function fit(g,u,W,H,w,r,c,d){
 const dr=d,dc=1-d,n=w.length,er=r+dr*n,ec=c+dc*n;
 if(r<0||c<0||r+dr*(n-1)>=H||c+dc*(n-1)>=W)return 0;
 if(r-dr>=0&&c-dc>=0&&g[r-dr][c-dc])return 0;
 if(er<H&&ec<W&&g[er][ec])return 0;
 let x=0;
 for(let i=0;i<n;i++){const y=r+dr*i,z=c+dc*i,v=g[y][z];
  if(v){if(v!==w[i]||(u[y][z]&(1<<d)))return 0;x++}
  else if(d?((z>0&&g[y][z-1])||(z<W-1&&g[y][z+1])):((y>0&&g[y-1][z])||(y<H-1&&g[y+1][z])))return 0}
 return x<n?x:0;
}
function attempt(W,H,pool){
 const mk=v=>[...Array(H)].map(()=>Array(W).fill(v));
 const g=mk(''),u=mk(0),L={},P=[],used=new Set();
 const put=(e,r,c,d)=>{for(let i=0;i<e.w.length;i++){const y=r+(d?i:0),x=c+(d?0:i),ch=e.w[i];if(!g[y][x]){g[y][x]=ch;(L[ch]=L[ch]||[]).push([y,x])}u[y][x]|=1<<d}P.push({w:e.w,k:e.k,r,c,d});used.add(e.w)};
 const seed=pool.slice(0,6).reduce((a,b)=>b.w.length>a.w.length?b:a);
 put(seed,H>>1,(W-seed.w.length)>>1,0);
 for(let pass=0;pass<3;pass++)for(const e of pool){
  if(used.has(e.w))continue;
  let bs=0,br,bc,bd;
  for(let i=0;i<e.w.length;i++)for(const[y,x]of L[e.w[i]]||[])for(let d=0;d<2;d++){
   const r=d?y-i:y,c=d?x:x-i,s=fit(g,u,W,H,e.w,r,c,d);
   if(s>bs){bs=s;br=r;bc=c;bd=d}}
  if(bs)put(e,br,bc,bd)}
 return P;
}
function generate(W,H,bank,theme,ms){
 const m=Math.min(W,H),pool=bank.filter(e=>e.w.length<=m);
 let best=null;const t0=Date.now();
 do{const p=attempt(W,H,shuffle(pool.filter(e=>e.t===theme)).concat(shuffle(pool.filter(e=>e.t!==theme))));
  if(!best||p.length>best.length)best=p}while(Date.now()-t0<ms);
 return best;
}
function build(P){
 let r0=1e9,c0=1e9,r1=-1,c1=-1;
 for(const p of P){r0=Math.min(r0,p.r);c0=Math.min(c0,p.c);r1=Math.max(r1,p.r+(p.d?p.w.length-1:0));c1=Math.max(c1,p.c+(p.d?0:p.w.length-1))}
 const H=r1-r0+1,W=c1-c0+1,S=[...Array(H)].map(()=>Array(W).fill(''));
 const E=P.map(p=>({...p,r:p.r-r0,c:p.c-c0}));
 for(const p of E)for(let i=0;i<p.w.length;i++)S[p.r+(p.d?i:0)][p.c+(p.d?0:i)]=p.w[i];
 let n=0;const N={};
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(S[y][x]){
  const a=!(x&&S[y][x-1])&&x+1<W&&S[y][x+1],dn=!(y&&S[y-1][x])&&y+1<H&&S[y+1][x];
  if(a||dn)N[y+','+x]=++n}
 for(const p of E)p.n=N[p.r+','+p.c];
 E.sort((a,b)=>a.n-b.n);
 return{W,H,S,E,N};
}
