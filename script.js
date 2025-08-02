let bookings = [];
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(s => s.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}
function calculateBill() {
  const g = parseFloat(document.getElementById('goodsCharge').value)||0;
  const v = parseFloat(document.getElementById('vehicleCharge').value)||0;
  const total = g+v;
  document.getElementById('billSummary').innerHTML = `
    <p>Goods Charge: $${g}</p>
    <p>Vehicle Charge: $${v}</p>
    <p><strong>Total: $${total}</strong></p>
    <button onclick="downloadBill(${g},${v})">Download Bill</button>
  `;
  goToPage('bookingBillPage');
}
function downloadBill(g,v) {
  const name = document.getElementById('goodsName').value;
  const veh = document.getElementById('vehicleNumber').value;
  const total = g+v;
  const txt = `RASIPS Booking Bill\nGoods: ${name}\nVehicle: ${veh}\nGoods Charge: $${g}\nVehicle Charge: $${v}\nTotal: $${total}`;
  const blob = new Blob([txt],{type:'text/plain'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='RASIPS_Bill.txt'; a.click();
}
function completeBooking() {
  const name = document.getElementById('goodsName').value;
  const veh = document.getElementById('vehicleNumber').value;
  const g = parseFloat(document.getElementById('goodsCharge').value)||0;
  const v = parseFloat(document.getElementById('vehicleCharge').value)||0;
  const total = g+v;
  const rfid = 'RFID-'+Math.random().toString(36).substr(2,8).toUpperCase();
  bookings.push({name,veh,total,rfid});
  document.getElementById('rfidCode').innerText = rfid;
  renderBookings();
  goToPage('dashboardPage');
}
function renderBookings() {
  const container = document.getElementById('bookingList');
  container.innerHTML = bookings.map(b => `
    <div class="card">
      <div><strong>Goods:</strong> ${b.name}</div>
      <div><strong>Vehicle:</strong> ${b.veh}</div>
      <div><strong>Total:</strong> $${b.total}</div>
      <div><strong>RFID:</strong> ${b.rfid}</div>
    </div>
  `).join('');
}
document.getElementById('loginLink').onclick = () => goToPage('loginPage');
goToPage('loginPage');
