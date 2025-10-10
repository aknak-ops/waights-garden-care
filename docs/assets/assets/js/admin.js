(function(){
  const $ = s=>document.querySelector(s);
  const $proj\admin.html = s=>[...document.querySelectorAll(s)];
  const LS_KEY = 'wgc_jobs_v1';

  const form = #jobForm;
  const tableBody = #jobsTable tbody;
  const search = #search;
  const filterPaid = #filterPaid;
  const filterBundle = #filterBundle;
  const resetBtn = #resetBtn;

  const summaryCount = #summaryCount;
  const summaryPaid = #summaryPaid;
  const summaryUnpaid = #summaryUnpaid;

  const exportBtn = #exportCsv;
  const wipeAll = #wipeAll;

  function priceFor(bundle){
    if(bundle==='Quick Refresh') return 25;
    if(bundle==='Garden Tidy') return 45;
    if(bundle==='Seasonal Reset') return 65;
    return 0;
  }

  function load(){ try{ return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }catch(e){ return []; } }
  function save(list){ localStorage.setItem(LS_KEY, JSON.stringify(list)); }
  function uid(){ return Math.random().toString(36).slice(2,10); }

  function readForm(){
    return {
      id: #jobId.value || uid(),
      name: #name.value.trim(),
      address: #address.value.trim(),
      date: #date.value,
      bundle: #bundle.value,
      amount: priceFor(#bundle.value),
      payMethod: #payMethod.value,
      paid: #paid.value,
      notes: #notes.value.trim(),
    };
  }

  function fillForm(j){
    #jobId.value = j.id;
    #name.value = j.name;
    #address.value = j.address;
    #date.value = j.date;
    #bundle.value = j.bundle;
    #payMethod.value = j.payMethod;
    #paid.value = j.paid;
    #notes.value = j.notes || '';
  }

  function clearForm(){ form.reset(); #jobId.value=''; }

  function render(){
    const q = search.value.toLowerCase();
    const p = filterPaid.value;
    const b = filterBundle.value;

    const list = load();
    let filtered = list.filter(j=>{
      const hit = (j.name+' '+j.address).toLowerCase().includes(q);
      const paidOk = !p || j.paid===p;
      const bundleOk = !b || j.bundle===b;
      return hit && paidOk && bundleOk;
    }).sort((a,b)=> (a.date||'').localeCompare(b.date));

    tableBody.innerHTML = filtered.map(j=>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>£</td>
        <td></td>
        <td class="\">\</td>
        <td class="actions">
          <button class="btn" data-edit="\">Edit</button>
          <button class="btn outline" data-toggle="\">\</button>
          <button class="btn danger" data-del="\">Delete</button>
        </td>
      </tr>
    ).join('');

    // summaries
    const total = filtered.length;
    const paidSum = filtered.filter(j=>j.paid==='Yes').reduce((s,j)=>s+(j.amount||0),0);
    const unpaidSum = filtered.filter(j=>j.paid!=='Yes').reduce((s,j)=>s+(j.amount||0),0);
    summaryCount.textContent = ${total} job;
    summaryPaid.textContent = £ paid;
    summaryUnpaid.textContent = £ unpaid;
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const j = readForm();
    if(!j.name || !j.address || !j.date){ alert('Name, address, date required'); return; }
    const list = load();
    const idx = list.findIndex(x=>x.id===j.id);
    if(idx>=0) list[idx]=j; else list.push(j);
    save(list);
    clearForm();
    render();
  });

  resetBtn.addEventListener('click', ()=> clearForm());

  tableBody.addEventListener('click', e=>{
    const id = e.target.dataset.edit || e.target.dataset.del || e.target.dataset.toggle;
    if(!id) return;
    const list = load();
    const idx = list.findIndex(j=>j.id===id);
    if(idx<0) return;

    if(e.target.dataset.edit){
      fillForm(list[idx]);
      window.scrollTo({top:0, behavior:'smooth'});
    } else if(e.target.dataset.del){
      if(confirm('Delete this job?')){
        list.splice(idx,1); save(list); render();
      }
    } else if(e.target.dataset.toggle){
      list[idx].paid = list[idx].paid==='Yes'?'No':'Yes';
      save(list); render();
    }
  });

  [search, filterPaid, filterBundle].forEach(el=> el.addEventListener('input', render));

  exportBtn.addEventListener('click', ()=>{
    const list = load();
    const rows = [
      ['Date','Name','Address','Bundle','Amount','PayMethod','Paid','Notes'],
      ...list.map(j=>[j.date,j.name,j.address,j.bundle,j.amount,j.payMethod,j.paid,j.notes?.replace(/\\n/g,' ')||''])
    ];
    const csv = rows.map(r=>r.map(x=>{
      const s = (x==null?'':String(x));
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    }).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'wgc-jobs.csv'; a.click();
    URL.revokeObjectURL(url);
  });

  wipeAll.addEventListener('click', ()=>{
    if(confirm('Wipe ALL jobs from this browser?')){
      localStorage.removeItem(LS_KEY);
      render();
    }
  });

  // seed example if empty
  if(load().length===0){
    save([
      {id:uid(), name:'Jane Doe', address:'St Dunstan’s, CT2', date:new Date().toISOString().slice(0,10), bundle:'Quick Refresh', amount:25, payMethod:'Bank', paid:'No', notes:'Front garden only'},
    ]);
  }
  render();
})();

