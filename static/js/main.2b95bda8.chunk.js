(this["webpackJsonpfinal-project-starter"]=this["webpackJsonpfinal-project-starter"]||[]).push([[0],{36:function(e,s,r){},45:function(e,s,r){},51:function(e,s,r){"use strict";r.r(s);var t=r(0),c=r.n(t),n=r(12),a=r.n(n),i=(r(45),r(54)),o=r(38),j=(r(36),r(6)),l=r(58),d=r(32),u=r(55),b=r(57),h=r(53),O=r(1);function x(e){var s=e.ogClass,r=e.currClasses,t=e.visible,n=e.setVisible,a=e.setCurrCourse;console.log("in EditCourseModal with course: ",s.id),console.log("Curr Classes length: ",r.length);var i=c.a.useState(s.id),o=Object(j.a)(i,2),l=o[0],x=o[1],C=c.a.useState(s.name),g=Object(j.a)(C,2),p=g[0],v=g[1],m=c.a.useState(s.description),f=Object(j.a)(m,2),S=f[0],w=f[1],F=c.a.useState(s.credits),N=Object(j.a)(F,2),I=N[0],Y=N[1],D=c.a.useState(s.prereqs),k=Object(j.a)(D,2),y=k[0],E=k[1];var L=function(){return n(!1)};return Object(O.jsxs)(u.a,{show:t,onHide:L,children:[Object(O.jsx)(u.a.Header,{closeButton:!0,children:Object(O.jsx)(u.a.Title,{children:"Edit Course"})}),Object(O.jsx)(u.a.Body,{children:Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(b.a.Group,{children:[Object(O.jsx)(b.a.Label,{"data-testid":"CourseId",children:"Course ID"}),Object(O.jsx)(b.a.Control,{as:"textarea",rows:1,value:l,onChange:function(e){return x(e.target.value)}})]}),Object(O.jsxs)(b.a.Group,{children:[Object(O.jsx)(b.a.Label,{"data-testid":"CourseName",children:"Course Name"}),Object(O.jsx)(b.a.Control,{as:"textarea",rows:1,value:p,onChange:function(e){return v(e.target.value)},children:" "})]}),Object(O.jsxs)(b.a.Group,{children:[Object(O.jsx)(b.a.Label,{"data-testid":"CourseDesc",children:"Course Description"}),Object(O.jsx)(b.a.Control,{as:"textarea",rows:1,value:S,onChange:function(e){return w(e.target.value)},children:" "})]}),Object(O.jsxs)(b.a.Group,{children:[Object(O.jsx)(b.a.Label,{"data-testid":"CourseCred",children:"Course Credits"}),Object(O.jsx)(b.a.Control,{as:"textarea",rows:1,value:I,onChange:function(e){return Y(Number(e.target.value))},children:" "})]}),Object(O.jsxs)(b.a.Group,{children:[Object(O.jsx)(b.a.Label,{"data-testid":"CoursePreR",children:"Course Pre Requisits"}),Object(O.jsx)(b.a.Control,{as:"textarea",rows:1,value:y,onChange:function(e){return E(e.target.value)},children:" "})]})]})}),Object(O.jsxs)(u.a.Footer,{children:[Object(O.jsx)(h.a,{variant:"secondary",onClick:L,children:"Close"}),Object(O.jsx)(h.a,{variant:"primary",onClick:function(){for(var e={name:p,id:l,description:S,credits:I,prereqs:y},t=-1,c=0;c<r.length;c++)if(r[c].id===s.id){console.log("Found the matching course at idx=",c),t=c;break}var i=Object(d.a)(r);i[t]=e,console.log("Length of newClasses:",i.length);for(var o=0;o<i.length;o++)console.log("ID: ",i[o].id),console.log("Type: ",typeof i[o]);a(i),n(!1)},children:"Edit Course"})]})]})}var C=function(e){var s=e.course,r=e.currCourses,t=e.setCurrCourses,n=c.a.useState(!1),a=Object(j.a)(n,2),l=a[0],d=a[1];return console.log("in Course"),console.log(s.id),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:s.id}),Object(O.jsx)(o.a,{children:s.name}),Object(O.jsx)(o.a,{children:s.description}),Object(O.jsx)(o.a,{children:s.credits}),Object(O.jsx)(o.a,{children:Object(O.jsx)("button",{onClick:function(){console.log("set visible ",s),d(!0)},children:"Edit"})}),Object(O.jsx)(x,{ogClass:s,currClasses:r,setCurrCourse:t,visible:l,setVisible:d})]})};var g=function(e){var s=e.season,r=e.classYear;console.log("in Semester");var t=c.a.useState([{id:"CISC275",name:"Intro to Software Engineering",description:"Course1",credits:3,prereqs:"None"},{id:"CISC106",name:"Intro to Computer Engineering",description:"Course2",credits:3,prereqs:"None"},{id:"PHYS207",name:"Fundamentals of Physics 1",description:"Probably the best course at UD",credits:4,prereqs:"None"},{id:"MATH241",name:"Calculus 1",description:"What's a derivative?",credits:4,prereqs:"None"}]),n=Object(j.a)(t,2),a=n[0],d=n[1];return Object(O.jsx)(l.a,{className:"border-dark",children:Object(O.jsxs)(o.a,{children:[Object(O.jsx)("div",{className:"semester-title",children:Object(O.jsxs)("strong",{children:[r," Year: ",s," Semester"]})}),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:Object(O.jsx)("strong",{children:"Course ID"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)("strong",{children:"Course Name"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)("strong",{children:"Description"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)("strong",{children:"Credits"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)("strong",{children:"Click Here to Edit Course"})})]}),a.map((function(e){return Object(O.jsx)(i.a,{children:Object(O.jsx)(C,{course:e,currCourses:a,setCurrCourses:d})},e.id)})),Object(O.jsx)("p",{})]})})},p=r(56);var v=function(){var e=Object(t.useState)(!0),s=Object(j.a)(e,2),r=s[0],c=s[1];return Object(O.jsxs)(p.a,{show:r,className:"Welcome container pt-5",children:[Object(O.jsx)("p",{children:Object(O.jsx)("b",{children:"Hi, welcome to the UD Computer Science degree planner!"})}),Object(O.jsx)("p",{children:"Add desired courses and semesters"}),Object(O.jsx)("hr",{}),Object(O.jsx)(h.a,{onClick:function(){return c(!1)},children:"Close and start scheduling"})]})};var m=function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(v,{}),Object(O.jsx)("div",{children:"UD CIS Scheduler"}),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Freshman",season:"Fall"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Freshman",season:"Spring"})})]}),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Sophomore",season:"Fall"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Sophomore",season:"Spring"})})]}),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Junior",season:"Fall"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Junior",season:"Spring"})})]}),Object(O.jsxs)(i.a,{children:[Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Senior",season:"Fall"})}),Object(O.jsx)(o.a,{children:Object(O.jsx)(g,{classYear:"Senior",season:"Spring"})})]})]})},f=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,59)).then((function(s){var r=s.getCLS,t=s.getFID,c=s.getFCP,n=s.getLCP,a=s.getTTFB;r(e),t(e),c(e),n(e),a(e)}))};r(50);a.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(m,{})}),document.getElementById("root")),f()}},[[51,1,2]]]);
//# sourceMappingURL=main.2b95bda8.chunk.js.map