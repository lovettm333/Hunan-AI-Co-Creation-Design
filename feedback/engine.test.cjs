const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('./engine.js');
const workspace=()=>({version:1,step:'capture',demo:false,project:'Test',intent:'Keep it playful',audience:'',feedback:'',comments:[],notes:{},focus:'clarify',selection:null,draft:{title:'',action:'',rationale:'',test:''},decisions:[],analyzed:null});
test('keeps original evidence and treats duplicates as comments, not participants',()=>{
 const result=E.analyze(' Busy layout.\r\n\r\nBusy layout.\nMake it easier.');
 assert.equal(result.length,3);assert.equal(result[0].quote,'Busy layout.');assert.equal(result[1].quote,result[0].quote);assert.notEqual(result[0].id,result[1].id);assert.equal(result[2].theme,'clarify');
});
test('specific accessibility concerns take precedence over generic content',()=>{assert.equal(E.classify('The text contrast is too low.').theme,'access');});
test('negated praise is not treated as a strength and ambiguous wording is flagged',()=>{assert.equal(E.classify('I do not like it.').theme,'clarify');assert.equal(E.classify('The layout is not busy.').review,true);assert.equal(E.classify('I love the colors.').theme,'preserve');});
test('unknown and empty feedback are handled without invented findings',()=>{assert.equal(E.classify('Make it pop').theme,'clarify');assert.throws(()=>E.analyze(' \n '));assert.throws(()=>E.analyze(Array(101).fill('comment').join('\n')));assert.throws(()=>E.analyze('x'.repeat(20001)));});
test('every theme has three complete revision directions',()=>{for(const t of Object.values(E.themes)){assert.equal(t.options.length,3);for(const o of t.options){assert.equal(o.length,5);assert.ok(o.every(s=>s.length>0));}}});
test('workspace import round trips and rejects malformed, oversized, or orphaned data',()=>{
 const w=workspace();assert.equal(E.validWorkspace(JSON.parse(JSON.stringify(w))),true);
 for(const bad of [null,{}, {...w,version:2},{...w,project:'x'.repeat(121)},{...w,notes:{hierarchy:null}},{...w,comments:[null]},{...w,selection:{theme:'flow',index:0}},{...w,draft:{}}]){
   assert.equal(E.validWorkspace(bad),false);
 }
});
