import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-CaMInrNI.js";import{m as u,c as l,a as B}from"./Button-hWE7rJ1T.js";import{R as M}from"./RecallOrb-CtfEsVMC.js";const P=B("inline-flex items-center gap-2 rounded-full border px-3 py-1 shadow-sm backdrop-blur-md",{variants:{status:{idle:"bg-muted/50 border-border text-foreground",thinking:"bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300",active:"bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",error:"bg-destructive/10 border-destructive/20 text-destructive"}},defaultVariants:{status:"idle"}}),D={idle:"Ready",thinking:"Thinking...",active:"Active",error:"Error"},d=C.forwardRef(({className:E,status:r="idle",text:R,showOrb:V=!0,..._},q)=>{const z=R||D[r];return e.jsxs("div",{ref:q,className:l(P({status:r,className:E})),..._,children:[V&&e.jsx(M,{size:"sm",status:r,className:"shadow-none border border-black/10 dark:border-white/10"}),e.jsx("span",{className:"text-sm font-medium tracking-tight",children:z}),r==="thinking"&&e.jsx(u.div,{className:"flex gap-0.5 ml-1",children:[0,1,2].map(c=>e.jsx(u.span,{className:l("h-1 w-1 rounded-full","bg-purple-700 dark:bg-purple-300"),animate:{opacity:[0,1,0]},transition:{duration:1.5,repeat:1/0,delay:c*.2,ease:"easeInOut"}},c))})]})});d.displayName="AIStatusIndicator";d.__docgenInfo={description:"",methods:[],displayName:"AIStatusIndicator",props:{text:{required:!1,tsType:{name:"string"},description:""},showOrb:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},status:{defaultValue:{value:'"idle"',computed:!1},required:!1}},composes:["VariantProps"]};const K={title:"Branding/AIStatusIndicator",component:d,parameters:{layout:"padded"},argTypes:{status:{control:"select",options:["idle","thinking","active","error"]}}},a={args:{status:"idle"}},s={args:{status:"thinking"}},t={args:{status:"active"}},o={args:{status:"error"}},n={args:{status:"thinking",text:"Analyzing 12 memories..."}},i={args:{status:"active",showOrb:!1}};var p,m,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    status: "idle"
  }
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var x,f,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    status: "thinking"
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,v,k;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    status: "active"
  }
}`,...(k=(v=t.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var y,I,T;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    status: "error"
  }
}`,...(T=(I=o.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var S,A,w;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    status: "thinking",
    text: "Analyzing 12 memories..."
  }
}`,...(w=(A=n.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var O,j,N;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    status: "active",
    showOrb: false
  }
}`,...(N=(j=i.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const L=["Idle","Thinking","Active","Error","CustomText","TextOnly"];export{t as Active,n as CustomText,o as Error,a as Idle,i as TextOnly,s as Thinking,L as __namedExportsOrder,K as default};
