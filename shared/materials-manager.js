/* ============================================================
   Materials Manager — add lectures / exams (PDF, PPTX, etc.)
   directly from the hub, no code editing.

   Uses the browser File System Access API to (1) copy the chosen
   file into this course's materials/<kind>/ folder and (2) update
   materials.js (the manifest the course page reads).

   Requirements: Chrome or Edge, and the hub served over http(s)
   or localhost (the API is disabled on file://). If unavailable,
   it falls back to clear copy-paste instructions.
   ============================================================ */
(function(){
  // --- tiny IndexedDB store for the saved folder handle (per course) ---
  function idb(){ return new Promise((res,rej)=>{ const r=indexedDB.open('hub-fs',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('h'); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); }); }
  async function idbGet(k){ const db=await idb(); return new Promise((res)=>{ const t=db.transaction('h').objectStore('h').get(k); t.onsuccess=()=>res(t.result); t.onerror=()=>res(null); }); }
  async function idbSet(k,v){ const db=await idb(); return new Promise((res)=>{ const t=db.transaction('h','readwrite').objectStore('h').put(v,k); t.onsuccess=()=>res(); t.onerror=()=>res(); }); }

  async function courseDir(){
    const key = 'dir:' + (window.COURSE && window.COURSE.code || 'course');
    let h = await idbGet(key);
    if (h) {
      const p = await h.queryPermission({mode:'readwrite'});
      if (p === 'granted' || (await h.requestPermission({mode:'readwrite'})) === 'granted') return h;
    }
    alert('Select THIS course\'s folder (the one containing config.js — e.g. courses/' + (window.COURSE.code||'').replace(/\s/g,'') + '). You only have to do this once per browser.');
    h = await window.showDirectoryPicker({mode:'readwrite'});
    await idbSet(key, h);
    return h;
  }

  async function readManifest(dir){
    let data = {lectures:[], exams:[]};
    try {
      const fh = await dir.getFileHandle('materials.js');
      const txt = await (await fh.getFile()).text();
      const m = txt.match(/window\.MATERIALS\s*=\s*(\{[\s\S]*?\})\s*;/);
      if (m) data = JSON.parse(m[1]);
    } catch(e) {}
    if (!data.lectures) data.lectures = [];
    if (!data.exams) data.exams = [];
    return data;
  }
  async function writeManifest(dir, data){
    const fh = await dir.getFileHandle('materials.js', {create:true});
    const w = await fh.createWritable();
    await w.write('window.MATERIALS = ' + JSON.stringify(data, null, 2) + ';\n');
    await w.close();
  }

  window.MaterialsManager = {
    async add(kind){
      if (!window.showDirectoryPicker || !window.showOpenFilePicker){ this.fallback(kind); return; }
      try {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [{ description:'Documents', accept:{
            'application/pdf':['.pdf'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation':['.pptx'],
            'application/vnd.ms-powerpoint':['.ppt'],
            'application/msword':['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document':['.docx'],
            'image/*':['.png','.jpg','.jpeg'],
            'text/*':['.md','.txt']
          }}],
          multiple:false
        });
        const file = await fileHandle.getFile();
        const label = kind === 'exams' ? 'exam' : 'lecture';
        const title = prompt('Title for this ' + label + ':', file.name.replace(/\.[^.]+$/,''));
        if (title === null) return;
        const date = prompt('Date or note (optional):', '') || '';

        const dir = await courseDir();
        const matDir = await dir.getDirectoryHandle('materials', {create:true});
        const subDir = await matDir.getDirectoryHandle(kind, {create:true});
        const dest = await subDir.getFileHandle(file.name, {create:true});
        const w = await dest.createWritable(); await w.write(file); await w.close();

        const data = await readManifest(dir);
        data[kind].push({ title, file: 'materials/' + kind + '/' + file.name, date });
        await writeManifest(dir, data);

        alert('✓ Added "' + title + '". Reloading…');
        location.reload();
      } catch(e){
        if (e && e.name === 'AbortError') return;   // user cancelled
        console.error(e);
        this.fallback(kind, e);
      }
    },

    fallback(kind, err){
      const label = kind === 'exams' ? 'exam' : 'lecture';
      const folder = 'materials/' + kind + '/';
      const line = kind === 'exams'
        ? '{ title: "My Exam", file: "' + folder + 'yourfile.pdf", date: "" }'
        : '{ title: "My Lecture", file: "' + folder + 'yourfile.pdf", date: "" }';
      const reason = (!window.showDirectoryPicker)
        ? 'Direct in-hub adding needs Chrome or Edge with the hub served over http(s)/localhost (it is disabled when opening the file directly from disk).'
        : 'Could not complete the file write.';
      alert(
        reason + '\n\nTo add a ' + label + ' manually:\n' +
        '1) Put the file in this course\'s ' + folder + ' folder\n' +
        '2) Add this line to the course\'s config.js under "' + kind + '":\n\n   ' + line + '\n\n' +
        'Or upload it to your GitHub repo in that folder (drag-and-drop on github.com) if the hub is hosted.'
      );
    }
  };
})();
