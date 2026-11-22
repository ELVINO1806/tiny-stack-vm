import {readFileSync,writeFileSync,mkdirSync} from "node:fs";
const B=process.env.MAKEFUN_INPUT_DIR||"/input",D=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let k=1;k<=40;k++){
const id="i"+String(k).padStart(3,"0");
let pr:Buffer;try{pr=readFileSync(B+"/"+id+"/program.bin")}catch{continue}
let ib:Buffer;try{ib=readFileSync(B+"/"+id+"/input.bin")}catch{ib=Buffer.alloc(0)}
const m=new Int32Array(256),s=new Int32Array(257);let sp=0,pc=0,st=0,ip=0,ex=0;const cs:number[]=[],out:number[]=[];
const need=(a:number,b:number)=>{if(sp<a||sp-a+b>256){ex=sp<a?2:3;return 1}return 0};
run:while(true){
if(st>=1000000){ex=10;break}
if(pc<0||pc>=pr.length){ex=9;break}
const op=pr[pc];
if(!(op<8||(op>15&&op<31)||op==32||op==33||op==34||(op>47&&op<53)||op==64||op==65||(op>79&&op<84))){ex=5;break}
const il=op==1?1:op==2?4:op>=48&&op<=51?2:0;
if(pc+1+il>pr.length){ex=9;break}
st++;let j=0;
switch(op){
case 0:break run;
case 1:if(need(0,1))break run;{const v=pr[pc+1];s[sp++]=v>127?v-256:v}break;
case 2:if(need(0,1))break run;s[sp++]=pr[pc+1]|pr[pc+2]<<8|pr[pc+3]<<16|pr[pc+4]<<24;break;
case 3:if(need(1,0))break run;sp--;break;
case 4:if(need(1,2))break run;s[sp]=s[sp-1];sp++;break;
case 5:if(need(2,2))break run;{const t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t}break;
case 6:if(need(2,3))break run;s[sp]=s[sp-2];sp++;break;
case 7:if(need(3,3))break run;{const t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t}break;
case 16:case 17:case 18:case 24:case 25:case 26:case 32:case 33:case 34:if(need(2,1))break run;{const b=s[--sp],a=s[sp-1];s[sp-1]=op==16?a+b:op==17?a-b:op==18?Math.imul(a,b):op==24?a&b:op==25?a|b:op==26?a^b:op==32?(a==b?1:0):op==33?(a<b?1:0):(a>>>0)<(b>>>0)?1:0}break;
case 19:if(need(2,1))break run;{const b=s[--sp],a=s[sp-1];if(!b){ex=4;break run}s[sp-1]=a==-2147483648&&b==-1?a:Math.trunc(a/b)}break;
case 20:if(need(2,1))break run;{const b=s[--sp],a=s[sp-1];if(!b){ex=4;break run}s[sp-1]=a%b}break;
case 21:if(need(2,1))break run;{const b=s[--sp]>>>0,a=s[sp-1]>>>0;if(!b){ex=4;break run}s[sp-1]=Math.trunc(a/b)}break;
case 22:if(need(2,1))break run;{const b=s[--sp]>>>0,a=s[sp-1]>>>0;if(!b){ex=4;break run}s[sp-1]=a%b}break;
case 23:case 27:if(need(1,1))break run;s[sp-1]=op==23?-s[sp-1]:~s[sp-1];break;
case 28:case 29:case 30:if(need(2,1))break run;{const b=s[--sp]&31,a=s[sp-1];s[sp-1]=op==28?a<<b:op==29?a>>b:a>>>b}break;
case 48:{const f=pr[pc+1]|pr[pc+2]<<8;pc=pc+3+(f>32767?f-65536:f);j=1}break;
case 49:if(need(1,0))break run;{const v=s[--sp];if(!v){const f=pr[pc+1]|pr[pc+2]<<8;pc=pc+3+(f>32767?f-65536:f);j=1}}break;
case 50:if(need(1,0))break run;{const v=s[--sp];if(v){const f=pr[pc+1]|pr[pc+2]<<8;pc=pc+3+(f>32767?f-65536:f);j=1}}break;
case 51:if(cs.length>63){ex=7;break run}cs.push(pc+3);pc=pr[pc+1]|pr[pc+2]<<8;j=1;break;
case 52:if(!cs.length){ex=8;break run}pc=cs.pop()!;j=1;break;
case 64:if(need(1,1))break run;{const a=s[sp-1];if(a<0||a>255){ex=6;break run}s[sp-1]=m[a]}break;
case 65:if(need(2,0))break run;{const a=s[sp-1],v=s[sp-2];if(a<0||a>255){ex=6;break run}m[a]=v;sp-=2}break;
case 80:if(need(1,0))break run;{const v=s[--sp],t=String(v);if(out.length+t.length>65536){ex=11;break run}for(let i=0;i<t.length;i++)out.push(t.charCodeAt(i))}break;
case 81:if(need(1,0))break run;{if(out.length>65535){ex=11;break run}out.push(s[--sp]&255)}break;
case 82:if(need(0,1))break run;s[sp++]=ip<ib.length?ib[ip++]:-1;break;
case 83:if(need(1,0))break run;ex=s[--sp]&255;break run;
}
if(!j)pc+=1+il;
}
mkdirSync(D+"/"+id,{recursive:true});
writeFileSync(D+"/"+id+"/stdout.bin",Buffer.from(out));
writeFileSync(D+"/"+id+"/exit.txt",String(ex));
}
