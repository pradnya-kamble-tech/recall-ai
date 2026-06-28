import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as j}from"./index-CaMInrNI.js";import{c as b,a as de}from"./Button-hWE7rJ1T.js";import{c as m}from"./createLucideIcon-Cw_zLy5h.js";import{S as v}from"./search-dVJr-dbf.js";/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=m("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=m("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=m("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=m("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]),ge=de("relative flex items-center w-full rounded-md transition-colors",{variants:{variant:{default:"bg-muted border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",ghost:"bg-transparent border border-transparent focus-within:border-input",search:"bg-muted border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"},size:{sm:"h-9 text-sm",default:"h-10 text-sm",lg:"h-12 text-base"},hasError:{true:"border-destructive focus-within:border-destructive focus-within:ring-destructive/20",false:""},isDisabled:{true:"opacity-50 pointer-events-none",false:""}},defaultVariants:{variant:"default",size:"default",hasError:!1,isDisabled:!1}}),I=j.forwardRef(({className:h,label:N,helperText:g,error:a,leftIcon:f,rightIcon:x,isLoading:w=!1,variant:se="default",size:te="default",disabled:S,id:le,...oe},ne)=>{const y=le??j.useId(),k=`${y}-desc`,r=!!a,ie=f?"pl-10":"pl-3",ce=w||x?"pr-10":"pr-3";return e.jsxs("div",{className:"flex flex-col gap-1.5 w-full",children:[N&&e.jsx("label",{htmlFor:y,className:"text-sm font-medium leading-none text-foreground",children:N}),e.jsxs("div",{className:b(ge({variant:se,size:te,hasError:r,isDisabled:S})),children:[f&&e.jsx("span",{className:"pointer-events-none absolute left-3 text-muted-foreground","aria-hidden":"true",children:f}),e.jsx("input",{ref:ne,id:y,disabled:S,"aria-invalid":r,"aria-describedby":g||a?k:void 0,"aria-busy":w,className:b("flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed",ie,ce,"py-2 h-full",h),...oe}),w?e.jsx("span",{className:"absolute right-3 text-muted-foreground","aria-hidden":"true",children:e.jsxs("svg",{className:"h-4 w-4 animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"})]})}):x?e.jsx("span",{className:"absolute right-3 text-muted-foreground","aria-hidden":"true",children:x}):null]}),(g||a)&&e.jsx("p",{id:k,className:b("text-xs leading-tight",r?"text-destructive":"text-muted-foreground"),role:r?"alert":void 0,children:a??g})]})});I.displayName="Input";I.__docgenInfo={description:"",methods:[],displayName:"Input",props:{label:{required:!1,tsType:{name:"string"},description:"Label shown above the input"},helperText:{required:!1,tsType:{name:"string"},description:"Helper text shown below the input"},error:{required:!1,tsType:{name:"string"},description:"Error message — shown instead of helperText when truthy; also sets aria-invalid"},leftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icon rendered on the left inside the input"},rightIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icon or element rendered on the right inside the input"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Shows a spinner on the right (replaces rightIcon)",defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "ghost" | "search"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"search"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "default" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"default"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"default"',computed:!1}}},composes:["Omit"]};const ve={title:"Primitives/Input",component:I,parameters:{layout:"centered"},decorators:[h=>e.jsx("div",{className:"w-[360px]",children:e.jsx(h,{})})],argTypes:{variant:{control:"select",options:["default","ghost","search"]},size:{control:"select",options:["sm","default","lg"]},disabled:{control:"boolean"},isLoading:{control:"boolean"}}},s={args:{label:"Email",placeholder:"you@recall.ai"}},t={args:{label:"Workspace name",placeholder:"acme-corp",helperText:"This will be your unique workspace identifier."}},l={args:{label:"Email",placeholder:"you@recall.ai",error:"Please enter a valid email address.",defaultValue:"not-an-email"}},o={args:{label:"Search",placeholder:"Search memories…",leftIcon:e.jsx(v,{className:"h-4 w-4"})}},n={args:{label:"Password",type:"password",placeholder:"••••••••",leftIcon:e.jsx(me,{className:"h-4 w-4"}),rightIcon:e.jsx(pe,{className:"h-4 w-4"})}},i={args:{label:"Searching…",placeholder:"Search memories…",leftIcon:e.jsx(v,{className:"h-4 w-4"}),isLoading:!0,defaultValue:"transcription ai"}},c={args:{label:"API Key",placeholder:"sk-••••••••••••••",disabled:!0,defaultValue:"sk-recall-1234",helperText:"Contact your admin to rotate the API key."}},d={args:{variant:"search",placeholder:"Ask RecallAI anything…",leftIcon:e.jsx(v,{className:"h-4 w-4"})}},u={args:{size:"sm",label:"Tag",placeholder:"Add tag…",leftIcon:e.jsx(ue,{className:"h-3.5 w-3.5"})}},p={args:{size:"lg",label:"Email Address",placeholder:"you@recall.ai",leftIcon:e.jsx(he,{className:"h-5 w-5"})}};var T,E,A;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: "Email",
    placeholder: "you@recall.ai"
  }
}`,...(A=(E=s.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var L,R,V;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: "Workspace name",
    placeholder: "acme-corp",
    helperText: "This will be your unique workspace identifier."
  }
}`,...(V=(R=t.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var z,W,q;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: "Email",
    placeholder: "you@recall.ai",
    error: "Please enter a valid email address.",
    defaultValue: "not-an-email"
  }
}`,...(q=(W=l.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var P,D,M;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: "Search",
    placeholder: "Search memories…",
    leftIcon: <Search className="h-4 w-4" />
  }
}`,...(M=(D=o.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var C,_,H;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    leftIcon: <Lock className="h-4 w-4" />,
    rightIcon: <Eye className="h-4 w-4" />
  }
}`,...(H=(_=n.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var B,K,O;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: "Searching…",
    placeholder: "Search memories…",
    leftIcon: <Search className="h-4 w-4" />,
    isLoading: true,
    defaultValue: "transcription ai"
  }
}`,...(O=(K=i.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var F,Z,$;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: "API Key",
    placeholder: "sk-••••••••••••••",
    disabled: true,
    defaultValue: "sk-recall-1234",
    helperText: "Contact your admin to rotate the API key."
  }
}`,...($=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var G,J,Q;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: "search",
    placeholder: "Ask RecallAI anything…",
    leftIcon: <Search className="h-4 w-4" />
  }
}`,...(Q=(J=d.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var U,X,Y;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    size: "sm",
    label: "Tag",
    placeholder: "Add tag…",
    leftIcon: <AtSign className="h-3.5 w-3.5" />
  }
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var ee,ae,re;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    size: "lg",
    label: "Email Address",
    placeholder: "you@recall.ai",
    leftIcon: <Mail className="h-5 w-5" />
  }
}`,...(re=(ae=p.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const Ie=["Default","WithHelperText","WithError","WithLeftIcon","WithRightIcon","Loading","Disabled","SearchVariant","Small","Large"];export{s as Default,c as Disabled,p as Large,i as Loading,d as SearchVariant,u as Small,l as WithError,t as WithHelperText,o as WithLeftIcon,n as WithRightIcon,Ie as __namedExportsOrder,ve as default};
