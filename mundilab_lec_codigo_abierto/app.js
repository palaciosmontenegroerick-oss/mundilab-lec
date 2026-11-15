// MUNDILAB LEC — aplicación de biblioteca digital
// IMPORTANTE: contraseña de demostración en el navegador, no apta para producción.
const ADMIN_PASSWORD = "61827575";
const starterBooks = [
{id:"story-1",title:"El último árbol de la colina",author:"MUNDILAB LEC",category:"Cuentos",color:"#315f52",symbol:"🌳",description:"Un relato sobre cuidar los árboles y nuestro entorno.",content:"En la colina que estaba detrás del pueblo quedaba un solo árbol. Era viejo y sus ramas daban sombra a quienes subían por el camino. Durante años, las personas habían talado los demás árboles para ampliar sus terrenos.\n\nUna tarde, una niña llamada Elena se sentó junto al tronco. Notó que el suelo estaba seco y que ya casi no se escuchaban aves. Decidió hablar con sus compañeros y organizar una jornada para sembrar árboles nativos.\n\nAl principio, algunos vecinos pensaron que una pequeña campaña no cambiaría nada. Sin embargo, los estudiantes regresaron cada semana para regar los plantones y protegerlos. Con el tiempo, aparecieron nuevos brotes y volvieron algunas aves.\n\nEl árbol antiguo siguió allí, pero dejó de estar solo. Elena comprendió que cuidar la naturaleza no consiste en hacer una sola actividad, sino en mantener el compromiso todos los días.",questions:[["¿Qué problema tenía la colina?","Habían talado casi todos los árboles y el suelo estaba seco."],["¿Qué hizo Elena?","Organizó una jornada para sembrar y cuidar árboles."],["¿Cuál es el mensaje?","La naturaleza necesita compromiso y cuidado constante."]],vocabulary:[["Plantón","Árbol joven que se prepara para ser sembrado."],["Compromiso","Responsabilidad de cumplir una tarea."]]},
{id:"info-1",title:"Los manglares, guardianes de la costa peruana",author:"MUNDILAB LEC",category:"Informativos",color:"#477c83",symbol:"🌊",description:"Conoce cómo los manglares protegen la costa y sirven de refugio para numerosas especies.",content:"Los manglares son ecosistemas costeros donde se mezclan el agua dulce de los ríos y el agua salada del mar. En el Perú, uno de los lugares más conocidos donde se desarrollan es Tumbes. Allí, las raíces de los mangles forman espacios que sirven de refugio y alimentación para peces, cangrejos, moluscos y aves.\n\nEstos ecosistemas cumplen funciones importantes. Sus raíces ayudan a retener sedimentos, reducen la fuerza del oleaje y contribuyen a proteger las zonas costeras. También almacenan carbono y sostienen actividades de las comunidades que aprovechan sus recursos de manera responsable.\n\nSin embargo, los manglares pueden verse afectados por la contaminación, la tala, la expansión desordenada de actividades humanas y la extracción excesiva de recursos. Protegerlos requiere vigilancia, educación ambiental y cumplimiento de las normas.\n\nCuidar los manglares significa proteger la biodiversidad y también el bienestar de las personas que dependen de estos ecosistemas.",questions:[["¿Qué es un manglar?","Es un ecosistema costero donde se mezclan agua dulce y salada."],["Menciona dos funciones.","Sirven de refugio para especies y ayudan a proteger la costa."],["¿Qué amenazas enfrentan?","La contaminación, la tala y la extracción excesiva."]],vocabulary:[["Ecosistema","Seres vivos y ambiente donde interactúan."],["Biodiversidad","Variedad de seres vivos de un lugar."]]},
{id:"science-1",title:"¿Cómo producen luz algunos seres vivos?",author:"MUNDILAB LEC",category:"Ciencia",color:"#385c83",symbol:"✨",description:"Descubre la bioluminiscencia y los organismos que pueden emitir luz.",content:"En la naturaleza existen seres vivos capaces de producir luz. Este fenómeno se llama bioluminiscencia y ocurre gracias a una reacción química dentro del organismo. En muchos casos participan una sustancia llamada luciferina y una enzima conocida como luciferasa; al reaccionar con oxígeno, se libera energía en forma de luz.\n\nLa bioluminiscencia aparece en ciertos hongos, bacterias, insectos y animales marinos. Las luciérnagas, por ejemplo, utilizan destellos para comunicarse y encontrar pareja. En el océano, algunos organismos producen luz para atraer presas, confundir depredadores o enviar señales.\n\nLa luz biológica suele generar poco calor, por eso se considera muy eficiente. Los científicos estudian este fenómeno y aprovechan moléculas relacionadas con él en investigaciones de laboratorio, por ejemplo, para observar procesos dentro de células.\n\nLa bioluminiscencia demuestra que la naturaleza posee mecanismos sorprendentes que todavía pueden inspirar nuevas investigaciones y tecnologías.",questions:[["¿Qué es la bioluminiscencia?","Es la capacidad de algunos seres vivos de producir luz mediante una reacción química."],["¿Para qué usan la luz?","Para comunicarse, atraer presas o confundir depredadores."],["¿Cómo se aprovecha en la ciencia?","En investigaciones de laboratorio para observar procesos celulares."]],vocabulary:[["Luciferina","Sustancia que participa en algunas reacciones que producen luz."],["Enzima","Molécula que facilita una reacción química."]]}
];
const $=id=>document.getElementById(id);
const load=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
let books=load("ml_books",starterBooks),favorites=load("ml_favorites",[]);
let settings=load("ml_settings",{name:"MUNDILAB LEC",title:"Un mundo de ideas comienza con una lectura.",text:"Explora cuentos, textos informativos y lecturas de ciencia. Encuentra una historia, aprende algo nuevo y deja que la curiosidad te guíe.",color:"#173f35"});
let currentFilter="Todos";
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderBooks(){
 const term=$("search").value.toLowerCase().trim();
 const visible=books.filter(b=>(b.title+" "+b.author+" "+b.category+" "+b.description).toLowerCase().includes(term)&&(currentFilter==="Todos"||(currentFilter==="Favoritos"&&favorites.includes(b.id))||b.category===currentFilter));
 $("resultCount").textContent=visible.length+" lectura(s)";
 $("bookGrid").innerHTML=visible.map(b=>`<article class="book-card"><div class="cover" style="background:${safe(b.color)}"><small>${safe(b.category)}</small><span class="symbol">${safe(b.symbol||"📘")}</span><h3>${safe(b.title)}</h3></div><div class="card-info"><b>${safe(b.title)}</b><p>${safe(b.author||"Autor no indicado")}</p><p>${safe(b.description||"Una lectura para descubrir.")}</p><div class="card-actions"><button class="read-btn" data-read="${safe(b.id)}">Leer</button><button class="fav-btn" data-fav="${safe(b.id)}">${favorites.includes(b.id)?"♥ Guardado":"♡ Favorito"}</button></div></div></article>`).join("");
 $("empty").classList.toggle("hidden",visible.length>0);
 document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===currentFilter));
}
function openReader(id){
 const b=books.find(x=>x.id===id);if(!b)return;
 $("readerContent").innerHTML=`<p class="eyebrow dark">${safe(b.category)}</p><h2>${safe(b.title)}</h2><p class="muted">Por ${safe(b.author||"Autor no indicado")}</p><div class="reader-text">${safe(b.content)}</div>${(b.questions||[]).length?`<h3>Comprueba lo que aprendiste</h3>${b.questions.map((q,i)=>`<details class="qa"><summary>${i+1}. ${safe(q[0])}</summary><p>${safe(q[1])}</p></details>`).join("")}`:""}${(b.vocabulary||[]).length?`<h3>Vocabulario</h3><div class="vocab">${b.vocabulary.map(v=>`<span><b>${safe(v[0])}:</b> ${safe(v[1])}</span>`).join("")}</div>`:""}`;
 $("readerModal").classList.add("show");
}
function closeModal(id){$(id).classList.remove("show")}
function askAdmin(){const entered=prompt("Contraseña de administrador:");if(entered===null)return;if(entered!==ADMIN_PASSWORD){alert("Contraseña incorrecta.");return} $("adminModal").classList.add("show");renderAdminList();fillDesignForm()}
function renderAdminList(){
 $("adminBookList").innerHTML=books.map(b=>`<div class="admin-item"><div><b>${safe(b.title)}</b><small>${safe(b.category)} · ${safe(b.author||"Sin autor")}</small></div><div class="button-row"><button data-edit="${safe(b.id)}">Editar</button><button class="delete" data-delete="${safe(b.id)}">Eliminar</button></div></div>`).join("")||"<p>No hay libros publicados.</p>";
}
function parseLines(text,separator){return text.split("\n").map(s=>s.trim()).filter(Boolean).map(s=>{const i=s.indexOf(separator);return i<0?[s,""]:[s.slice(0,i).trim(),s.slice(i+separator.length).trim()]})}
function resetBookForm(){$("bookForm").reset();$("bookId").value="";$("formTitle").textContent="Publicar una lectura"}
function editBook(id){
 const b=books.find(x=>x.id===id);if(!b)return;
 $("bookId").value=b.id;$("title").value=b.title;$("author").value=b.author||"";$("category").value=b.category;$("coverColor").value=b.color||"#315f52";$("description").value=b.description||"";$("content").value=b.content;$("questions").value=(b.questions||[]).map(x=>x.join(" | ")).join("\n");$("vocabulary").value=(b.vocabulary||[]).map(x=>x.join(": ")).join("\n");$("formTitle").textContent="Editar lectura";showTab("books");
}
function showTab(name){document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));document.querySelectorAll(".tab-panel").forEach(x=>x.classList.toggle("active",x.id==="panel-"+name))}
$("adminOpen").addEventListener("click",askAdmin);
$("adminClose").addEventListener("click",()=>closeModal("adminModal"));
$("readerClose").addEventListener("click",()=>closeModal("readerModal"));
$("readerModal").addEventListener("click",e=>{if(e.target.id==="readerModal")closeModal("readerModal")});
$("adminModal").addEventListener("click",e=>{if(e.target.id==="adminModal")closeModal("adminModal")});
document.querySelectorAll(".tab").forEach(x=>x.addEventListener("click",()=>showTab(x.dataset.tab)));
document.querySelectorAll(".chip").forEach(x=>x.addEventListener("click",()=>{currentFilter=x.dataset.filter;renderBooks()}));
$("search").addEventListener("input",renderBooks);
$("clearSearch").addEventListener("click",()=>{$("search").value="";renderBooks()});
$("bookGrid").addEventListener("click",e=>{
 const read=e.target.closest("[data-read]"),fav=e.target.closest("[data-fav]");
 if(read)openReader(read.dataset.read);
 if(fav){const id=fav.dataset.fav;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save("ml_favorites",favorites);renderBooks()}
});
$("bookForm").addEventListener("submit",e=>{
 e.preventDefault();
 const id=$("bookId").value||"book-"+Date.now();
 const b={id,title:$("title").value.trim(),author:$("author").value.trim(),category:$("category").value,color:$("coverColor").value,symbol:"📘",description:$("description").value.trim(),content:$("content").value.trim(),questions:parseLines($("questions").value,"|"),vocabulary:parseLines($("vocabulary").value,":")};
 books=$("bookId").value?books.map(x=>x.id===id?b:x):[b,...books];save("ml_books",books);renderBooks();renderAdminList();resetBookForm();$("formMessage").textContent="Lectura guardada en este navegador.";
});
$("resetForm").addEventListener("click",resetBookForm);
$("adminBookList").addEventListener("click",e=>{
 const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");
 if(edit)editBook(edit.dataset.edit);
 if(del){const b=books.find(x=>x.id===del.dataset.delete);if(b&&confirm("¿Eliminar «"+b.title+"»?")){books=books.filter(x=>x.id!==b.id);save("ml_books",books);renderBooks();renderAdminList()}}
});
function fillDesignForm(){$("siteName").value=settings.name;$("siteTitle").value=settings.title;$("siteText").value=settings.text;$("primaryColor").value=settings.color}
function applyDesign(){
 $("brandName").textContent=settings.name;$("footerName").textContent=settings.name;$("heroTitle").textContent=settings.title;$("heroText").textContent=settings.text;
 document.documentElement.style.setProperty("--primary",settings.color);
}
$("saveDesign").addEventListener("click",()=>{
 settings={name:$("siteName").value.trim()||"MUNDILAB LEC",title:$("siteTitle").value.trim(),text:$("siteText").value.trim(),color:$("primaryColor").value};
 save("ml_settings",settings);applyDesign();$("designMessage").textContent="Diseño guardado en este navegador.";
});
$("restoreDesign").addEventListener("click",()=>{
 settings={name:"MUNDILAB LEC",title:"Un mundo de ideas comienza con una lectura.",text:"Explora cuentos, textos informativos y lecturas de ciencia. Encuentra una historia, aprende algo nuevo y deja que la curiosidad te guíe.",color:"#173f35"};
 save("ml_settings",settings);applyDesign();fillDesignForm();$("designMessage").textContent="Diseño original restaurado.";
});
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$("exportData").addEventListener("click",()=>{downloadBlob(new Blob([JSON.stringify({books,favorites,settings},null,2)],{type:"application/json"}),"mundilab-respaldo.json");$("backupMessage").textContent="Respaldo descargado."});
$("importData").addEventListener("change",async e=>{
 const file=e.target.files[0];if(!file)return;
 try{const d=JSON.parse(await file.text());if(!Array.isArray(d.books))throw Error("Formato incorrecto");books=d.books;favorites=d.favorites||[];settings=d.settings||settings;save("ml_books",books);save("ml_favorites",favorites);save("ml_settings",settings);applyDesign();fillDesignForm();renderBooks();renderAdminList();$("backupMessage").textContent="Biblioteca importada correctamente."}
 catch{$("backupMessage").textContent="No se pudo importar: el archivo no parece un respaldo válido."}e.target.value="";
});
applyDesign();renderBooks();
