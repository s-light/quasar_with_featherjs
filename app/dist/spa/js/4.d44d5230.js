(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"9b92":function(e,t,n){"use strict";n.r(t);var s=n("ded3"),a=n.n(s),c=n("bd4c"),i=n("9e62"),r=(n("fb6a"),n("ddb0"),n("2f62"));var o={data:()=>({messageText:""}),mixins:[Object(i.b)({service:"messages"}),Object(i.b)({service:"my-object-list"})],computed:a()(a()({connected:function(){return console.log("computed: connected this",this),!0}},function(e,t){const n=Object(r.b)(e,t),s={};for(const[t,a]of Object.entries(n))s[t]={get:a},s[t].set=function(n){const s="set"+((a=t).charAt(0).toUpperCase()+a.slice(1));var a;this.$store.commit(e+"/"+s,n)};return s}("appconfig",["globalMessage","package_selected","package_options"])),{},{messagesParams:()=>({query:{}}),myObjectListParams:()=>({query:{}})}),methods:{messageSend:function(){const{Message:e}=this.$FeathersVuex.api;new e({text:this.messageText}).save()}},filters:{pretty:function(e){let t=e;try{t=JSON.parse(e)}catch(e){}return JSON.stringify(t,null,4)},prettyDateTime:function(e){return c.a.formatDate(e,"HH:mm DD.MM.YYYY")}},name:"PageExtended"},l=n("2877"),u=n("9989"),p=n("8169"),d=n("27f9"),m=n("0016"),f=n("9c40"),g=n("714f"),b=n("eebe"),y=n.n(b),_=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{staticClass:"fit column no-wrap justify-center items-center content-center"},[n("section",[e._v("\n        '"+e._s(e.globalMessage)+"'"),n("br"),e._v("\n        '"+e._s(e.package_selected)+"'"),n("br"),e._v("\n        '"+e._s(e.package_options)+"'"),n("br")]),n("section",[n("ul",e._l(e.myObjectList,(function(t){return n("li",{key:t._id},[e._v("\n                "+e._s(t.name)+": "+e._s(t.value)+" "),n("br"),e._v("\n                "+e._s(t.description)+"\n            ")])})),0)]),n("section",{staticClass:"q-pa-md row justify-center"},[n("div",{staticStyle:{width:"100%","max-width":"400px"}},e._l(e.messages,(function(t){return n("q-chat-message",{key:t.id,attrs:{text:[t.text],stamp:e._f("prettyDateTime")(t.createdAt)}})})),1)]),n("section",[n("q-input",{attrs:{filled:"",label:"Send Message"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.messageSend()}},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",style:{opacity:""!==e.messageText?"inherit":"0.1"},attrs:{name:"close"},on:{click:function(t){e.messageText=""}}})]},proxy:!0},{key:"after",fn:function(){return[n("q-btn",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{round:"",dense:"",flat:"",icon:"send",disable:!e.connected},on:{click:function(t){return e.messageSend()}}})]},proxy:!0}]),model:{value:e.messageText,callback:function(t){e.messageText=t},expression:"messageText"}})],1)])}),[],!1,null,null,null);t.default=_.exports;y()(_,"components",{QPage:u.a,QChatMessage:p.a,QInput:d.a,QIcon:m.a,QBtn:f.a}),y()(_,"directives",{Ripple:g.a})}}]);
//# sourceMappingURL=4.d44d5230.js.map