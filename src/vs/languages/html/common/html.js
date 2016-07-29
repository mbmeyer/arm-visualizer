/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.5.3(793ede49d53dba79d39e52205f16321278f5183c)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
(function(){var t=["exports","require","vs/languages/html/common/htmlEmptyTagsShared","vs/languages/html/common/htmlTokenTypes","vs/editor/common/services/compatWorkerService","vs/base/common/strings","vs/languages/html/common/html","vs/editor/common/modes","vs/base/common/arrays","vs/editor/common/modes/abstractState","vs/editor/common/services/modeService","vs/platform/instantiation/common/instantiation","vs/editor/common/modes/languageConfigurationRegistry","vs/editor/common/modes/supports/tokenizationSupport","vs/base/common/async","vs/editor/common/modes/abstractMode"],e=function(e){for(var i=[],n=0,r=e.length;r>n;n++)i[n]=t[e[n]];return i};define(t[2],e([1,0,8]),function(t,e,i){"use strict";function n(t){return i.binarySearch(e.EMPTY_ELEMENTS,t,function(t,e){return t.localeCompare(e)})>=0}e.EMPTY_ELEMENTS=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],e.isEmptyElement=n}),define(t[3],e([1,0,5]),function(t,e,i){"use strict";function n(t){return i.startsWith(t,o)}function r(t){return o+t}e.DELIM_END="punctuation.definition.meta.tag.end.html",e.DELIM_START="punctuation.definition.meta.tag.begin.html",e.DELIM_ASSIGN="meta.tag.assign.html",e.ATTRIB_NAME="entity.other.attribute-name.html",e.ATTRIB_VALUE="string.html",e.COMMENT="comment.html.content",e.DELIM_COMMENT="comment.html",e.DOCTYPE="entity.other.attribute-name.html",e.DELIM_DOCTYPE="entity.name.tag.html";var o="entity.name.tag.tag-";e.isTag=n,e.getTag=r});var i=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},n=this&&this.__decorate||function(t,e,i,n){var r,o=arguments.length,a=3>o?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(3>o?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a},r=this&&this.__param||function(t,e){return function(i,n){e(i,n,t)}};define(t[6],e([1,0,7,15,9,10,11,3,2,12,13,14,4]),function(t,e,o,a,s,u,d,h,c,p,m,g,l){"use strict";e.htmlTokenTypes=h,e.EMPTY_ELEMENTS=c.EMPTY_ELEMENTS,function(t){t[t.Content=0]="Content",t[t.OpeningStartTag=1]="OpeningStartTag",t[t.OpeningEndTag=2]="OpeningEndTag",t[t.WithinDoctype=3]="WithinDoctype",t[t.WithinTag=4]="WithinTag",t[t.WithinComment=5]="WithinComment",t[t.WithinEmbeddedContent=6]="WithinEmbeddedContent",t[t.AttributeName=7]="AttributeName",t[t.AttributeValue=8]="AttributeValue"}(e.States||(e.States={}));var f=e.States,T=["script","style"],v=function(t){function e(e,i,n,r,o,a,s){t.call(this,e),this.kind=i,this.lastTagName=n,this.lastAttributeName=r,this.embeddedContentType=o,this.attributeValueQuote=a,this.attributeValue=s}return i(e,t),e.escapeTagName=function(t){return h.getTag(t.replace(/[:_.]/g,"-"))},e.prototype.makeClone=function(){return new e(this.getMode(),this.kind,this.lastTagName,this.lastAttributeName,this.embeddedContentType,this.attributeValueQuote,this.attributeValue)},e.prototype.equals=function(i){return i instanceof e?t.prototype.equals.call(this,i)&&this.kind===i.kind&&this.lastTagName===i.lastTagName&&this.lastAttributeName===i.lastAttributeName&&this.embeddedContentType===i.embeddedContentType&&this.attributeValueQuote===i.attributeValueQuote&&this.attributeValue===i.attributeValue:!1},e.prototype.nextElementName=function(t){return t.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase()},e.prototype.nextAttributeName=function(t){return t.advanceIfRegExp(/^[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase()},e.prototype.tokenize=function(t){switch(this.kind){case f.WithinComment:if(t.advanceUntilString2("-->",!1))return{type:h.COMMENT};if(t.advanceIfString2("-->"))return this.kind=f.Content,{type:h.DELIM_COMMENT,dontMergeWithPrev:!0};break;case f.WithinDoctype:if(t.advanceUntilString2(">",!1))return{type:h.DOCTYPE};if(t.advanceIfString2(">"))return this.kind=f.Content,{type:h.DELIM_DOCTYPE,dontMergeWithPrev:!0};break;case f.Content:if(t.advanceIfCharCode2("<".charCodeAt(0))){if(!t.eos()&&"!"===t.peek()){if(t.advanceIfString2("!--"))return this.kind=f.WithinComment,{type:h.DELIM_COMMENT,dontMergeWithPrev:!0};if(t.advanceIfStringCaseInsensitive2("!DOCTYPE"))return this.kind=f.WithinDoctype,{type:h.DELIM_DOCTYPE,dontMergeWithPrev:!0}}return t.advanceIfCharCode2("/".charCodeAt(0))?(this.kind=f.OpeningEndTag,{type:h.DELIM_END,dontMergeWithPrev:!0}):(this.kind=f.OpeningStartTag,{type:h.DELIM_START,dontMergeWithPrev:!0})}break;case f.OpeningEndTag:var i=this.nextElementName(t);return i.length>0?{type:e.escapeTagName(i)}:t.advanceIfString2(">")?(this.kind=f.Content,{type:h.DELIM_END,dontMergeWithPrev:!0}):(t.advanceUntilString2(">",!1),{type:""});case f.OpeningStartTag:if(this.lastTagName=this.nextElementName(t),this.lastTagName.length>0)return this.lastAttributeName=null,"script"!==this.lastTagName&&"style"!==this.lastTagName||(this.lastAttributeName=null,this.embeddedContentType=null),this.kind=f.WithinTag,{type:e.escapeTagName(this.lastTagName)};break;case f.WithinTag:if(t.skipWhitespace2()||t.eos())return this.lastAttributeName="",{type:""};if(""===this.lastAttributeName){var n=this.nextAttributeName(t);if(n.length>0)return this.lastAttributeName=n,this.kind=f.AttributeName,{type:h.ATTRIB_NAME}}return t.advanceIfString2("/>")?(this.kind=f.Content,{type:h.DELIM_START,dontMergeWithPrev:!0}):t.advanceIfCharCode2(">".charCodeAt(0))?-1!==T.indexOf(this.lastTagName)?(this.kind=f.WithinEmbeddedContent,{type:h.DELIM_START,dontMergeWithPrev:!0}):(this.kind=f.Content,{type:h.DELIM_START,dontMergeWithPrev:!0}):(t.next2(),{type:""});case f.AttributeName:return t.skipWhitespace2()||t.eos()?{type:""}:t.advanceIfCharCode2("=".charCodeAt(0))?(this.kind=f.AttributeValue,{type:h.DELIM_ASSIGN}):(this.kind=f.WithinTag,this.lastAttributeName="",this.tokenize(t));case f.AttributeValue:if(t.eos())return{type:""};if(t.skipWhitespace2())return'"'===this.attributeValueQuote||"'"===this.attributeValueQuote?{type:h.ATTRIB_VALUE}:{type:""};if('"'!==this.attributeValueQuote&&"'"!==this.attributeValueQuote){var r=t.advanceIfRegExp(/^[^\s"'`=<>]+/);if(r.length>0)return this.kind=f.WithinTag,this.lastAttributeName=null,{type:h.ATTRIB_VALUE};var o=t.peek();return"'"===o||'"'===o?(this.attributeValueQuote=o,this.attributeValue=o,t.next2(),{type:h.ATTRIB_VALUE}):(this.kind=f.WithinTag,this.lastAttributeName=null,this.tokenize(t))}if(this.attributeValue!==this.attributeValueQuote||"script"!==this.lastTagName&&"style"!==this.lastTagName||"type"!==this.lastAttributeName){if(t.advanceIfCharCode2(this.attributeValueQuote.charCodeAt(0)))this.kind=f.WithinTag,this.attributeValue="",this.attributeValueQuote="",this.lastAttributeName=null;else{var a=t.next();this.attributeValue+=a}return{type:h.ATTRIB_VALUE}}if(this.attributeValue=t.advanceUntilString(this.attributeValueQuote,!0),this.attributeValue.length>0)return this.embeddedContentType=this.unquote(this.attributeValue),this.kind=f.WithinTag,this.attributeValue="",this.attributeValueQuote="",{type:h.ATTRIB_VALUE}}return t.next2(),this.kind=f.Content,{type:""}},e.prototype.unquote=function(t){var e=0,i=t.length;return'"'===t[0]&&e++,'"'===t[i-1]&&i--,t.substring(e,i)},e}(s.AbstractState);e.State=v;var y=function(t){function e(e,i,n,r){t.call(this,e.id,r),this._modeWorkerManager=this._createModeWorkerManager(e,i),this.modeService=n,this.tokenizationSupport=new m.TokenizationSupport(this,this,!0),this.configSupport=this,this._registerSupports()}return i(e,t),e.prototype._registerSupports=function(){var t=this;if("html"!==this.getId())throw new Error("This method must be overwritten!");o.SuggestRegistry.register(this.getId(),{triggerCharacters:[".",":","<",'"',"=","/"],shouldAutotriggerSuggest:!0,provideCompletionItems:function(e,i,n){return g.wireCancellationToken(n,t._provideCompletionItems(e.uri,i))}},!0),o.DocumentHighlightProviderRegistry.register(this.getId(),{provideDocumentHighlights:function(e,i,n){return g.wireCancellationToken(n,t._provideDocumentHighlights(e.uri,i))}},!0),o.DocumentRangeFormattingEditProviderRegistry.register(this.getId(),{provideDocumentRangeFormattingEdits:function(e,i,n,r){return g.wireCancellationToken(r,t._provideDocumentRangeFormattingEdits(e.uri,i,n))}},!0),o.LinkProviderRegistry.register(this.getId(),{provideLinks:function(e,i){return g.wireCancellationToken(i,t._provideLinks(e.uri))}},!0),p.LanguageConfigurationRegistry.register(this.getId(),e.LANG_CONFIG)},e.prototype._createModeWorkerManager=function(t,e){return new a.ModeWorkerManager(t,"vs/languages/html/common/htmlWorker","HTMLWorker",null,e)},e.prototype._worker=function(t){return this._modeWorkerManager.worker(t)},e.prototype.getInitialState=function(){return new v(this,f.Content,"","","","","")},e.prototype.enterNestedMode=function(t){return t instanceof v&&t.kind===f.WithinEmbeddedContent},e.prototype.getNestedMode=function(t){var e=null,i=t,n=null;if(null!==i.embeddedContentType)this.modeService.isRegisteredMode(i.embeddedContentType)&&(e=this.modeService.getMode(i.embeddedContentType),e||(n=this.modeService.getOrCreateMode(i.embeddedContentType)));else{var r=null;r="script"===i.lastTagName?"text/javascript":"style"===i.lastTagName?"text/css":"text/plain",e=this.modeService.getMode(r)}return null===e&&(e=this.modeService.getMode("text/plain")),{mode:e,missingModePromise:n}},e.prototype.getLeavingNestedModeData=function(t,e){var i=e.lastTagName,n=new RegExp("<\\/"+i+"\\s*>","i"),r=n.exec(t);return null!==r?{nestedModeBuffer:t.substring(0,r.index),bufferAfterNestedMode:t.substring(r.index),stateAfterNestedMode:new v(this,f.Content,"","","","","")}:null},e.prototype.configure=function(t){return this.compatWorkerService?this.compatWorkerService.isInMainThread?this._configureWorker(t):this._worker(function(e){return e._doConfigure(t)}):void 0},e.prototype._configureWorker=function(t){return this._worker(function(e){return e._doConfigure(t)})},e.prototype._provideLinks=function(t){return this._worker(function(e){return e.provideLinks(t)})},e.prototype._provideDocumentRangeFormattingEdits=function(t,e,i){return this._worker(function(n){return n.provideDocumentRangeFormattingEdits(t,e,i)})},e.prototype._provideDocumentHighlights=function(t,e,i){return void 0===i&&(i=!1),this._worker(function(n){return n.provideDocumentHighlights(t,e,i)})},e.prototype._provideCompletionItems=function(t,e){return this._worker(function(i){return i.provideCompletionItems(t,e)})},e.LANG_CONFIG={wordPattern:a.createWordRegExp("#-?%"),comments:{blockComment:["<!--","-->"]},brackets:[["<!--","-->"],["<",">"]],__electricCharacterSupport:{embeddedElectricCharacters:["*","}","]",")"]},autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:'"',close:'"'},{open:"'",close:"'"}],onEnterRules:[{beforeText:new RegExp("<(?!(?:"+c.EMPTY_ELEMENTS.join("|")+"))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$","i"),afterText:/^<\/([_:\w][_:\w-.\d]*)\s*>$/i,action:{indentAction:o.IndentAction.IndentOutdent}},{beforeText:new RegExp("<(?!(?:"+c.EMPTY_ELEMENTS.join("|")+"))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),action:{indentAction:o.IndentAction.Indent}}]},e.$_configureWorker=l.CompatWorkerAttr(e,e.prototype._configureWorker),e.$_provideLinks=l.CompatWorkerAttr(e,e.prototype._provideLinks),e.$_provideDocumentRangeFormattingEdits=l.CompatWorkerAttr(e,e.prototype._provideDocumentRangeFormattingEdits),e.$_provideDocumentHighlights=l.CompatWorkerAttr(e,e.prototype._provideDocumentHighlights),e.$_provideCompletionItems=l.CompatWorkerAttr(e,e.prototype._provideCompletionItems),e=n([r(1,d.IInstantiationService),r(2,u.IModeService),r(3,l.ICompatWorkerService)],e)}(a.CompatMode);e.HTMLMode=y})}).call(this);
//# sourceMappingURL=../../../../../min-maps/vs/languages/html/common/html.js.map