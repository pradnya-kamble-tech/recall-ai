import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as V}from"./index-CaMInrNI.js";import{c as H,a as O,B as T}from"./Button-hWE7rJ1T.js";import{c as m}from"./createLucideIcon-Cw_zLy5h.js";import{S as D}from"./search-dVJr-dbf.js";/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=m("Brain",[["path",{d:"M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",key:"1mhkh5"}],["path",{d:"M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z",key:"1d6s00"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=m("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=m("LayoutTemplate",[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=m("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),$=O("flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500",{variants:{size:{sm:"min-h-[200px]",default:"min-h-[300px]",lg:"min-h-[400px]",full:"h-full min-h-[500px]"}},defaultVariants:{size:"default"}}),r=V.forwardRef(({className:t,size:A,icon:d,title:P,description:p,action:l,...C},z)=>e.jsxs("div",{ref:z,className:H($({size:A,className:t})),...C,children:[d&&e.jsx("div",{className:"mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/80",children:d}),e.jsx("h3",{className:"mb-2 text-lg font-semibold tracking-tight text-foreground",children:P}),p&&e.jsx("p",{className:"mb-6 max-w-[400px] text-sm text-muted-foreground",children:p}),l&&e.jsx("div",{className:"mt-2",children:l})]}));r.displayName="EmptyState";r.__docgenInfo={description:"",methods:[],displayName:"EmptyState",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},action:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["VariantProps"]};const B=t=>e.jsx(r,{icon:e.jsx(D,{className:"h-8 w-8"}),title:"No results found",description:"We couldn't find any memories matching your search. Try adjusting your filters or search terms.",...t}),I=t=>e.jsx(r,{icon:e.jsx(G,{className:"h-8 w-8"}),title:"Library is empty",description:"You haven't added any memories to your library yet. Capture your first memory to get started.",...t}),W=t=>e.jsx(r,{icon:e.jsx(Z,{className:"h-8 w-8"}),title:"No workspace selected",description:"Select a workspace from the sidebar or create a new one to organize your memories.",...t}),q=t=>e.jsx(r,{icon:e.jsx(F,{className:"h-8 w-8"}),title:"No memory selected",description:"Select a memory to view its details, extracted knowledge, and connections.",...t});B.__docgenInfo={description:"",methods:[],displayName:"EmptySearch"};I.__docgenInfo={description:"",methods:[],displayName:"EmptyLibrary"};W.__docgenInfo={description:"",methods:[],displayName:"EmptyWorkspace"};q.__docgenInfo={description:"",methods:[],displayName:"EmptyMemory"};const ee={title:"States/EmptyState",component:r,parameters:{layout:"padded"}},a={args:{title:"Nothing to see here",description:"This is a base empty state component that you can use to build custom empty states."}},s={args:{title:"No projects found",description:"Get started by creating a new project.",action:e.jsx(T,{leftIcon:e.jsx(Y,{className:"h-4 w-4"}),children:"Create Project"})}},o={args:{title:""},render:()=>e.jsx(B,{})},n={args:{title:""},render:()=>e.jsx(I,{action:e.jsx(T,{children:"Capture Memory"})})},c={args:{title:""},render:()=>e.jsx(W,{})},i={args:{title:""},render:()=>e.jsx(q,{})};var u,y,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: "Nothing to see here",
    description: "This is a base empty state component that you can use to build custom empty states."
  }
}`,...(h=(y=a.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var x,g,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    title: "No projects found",
    description: "Get started by creating a new project.",
    action: <Button leftIcon={<Plus className="h-4 w-4" />}>Create Project</Button>
  }
}`,...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var j,N,b;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: ""
  },
  // required by the component props, but overridden in variant
  render: () => <EmptySearch />
}`,...(b=(N=o.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var w,S,k;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: ""
  },
  render: () => <EmptyLibrary action={<Button>Capture Memory</Button>} />
}`,...(k=(S=n.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var E,v,_;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    title: ""
  },
  render: () => <EmptyWorkspace />
}`,...(_=(v=c.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var M,R,L;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: ""
  },
  render: () => <EmptyMemory />
}`,...(L=(R=i.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};const te=["Default","WithAction","Search","Library","Workspace","Memory"];export{a as Default,n as Library,i as Memory,o as Search,s as WithAction,c as Workspace,te as __namedExportsOrder,ee as default};
