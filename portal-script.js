// --- 1. FIREBASE CONFIGURATION ---
// Paste your keys from Firebase Console here
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "12345",
    appId: "1:12345:web:abcde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 2. AUTHENTICATION LOGIC ---
function checkLogin() {
    const key = document.getElementById('passKey').value;
    if (key === "staff123") {
        showDashboard('staffDash');
        loadStaffData();
    } else if (key === "dr999") {
        showDashboard('doctorDash');
        loadDoctorData();
    } else {
        alert("Incorrect Access Key");
    }
}

function showDashboard(id) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function logout() {
    window.location.reload();
}

// --- 3. STAFF ACTIONS ---
document.getElementById('patientForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Saving...";
    btn.disabled = true;

    db.collection("patients").add({
        name: document.getElementById('pName').value,
        age: document.getElementById('pAge').value,
        phone: document.getElementById('pPhone').value,
        complaint: document.getElementById('pComplaint').value,
        history: document.getElementById('pHistory').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: "Waiting"
    }).then(() => {
        alert("Patient successfully registered in Doctor's queue.");
        e.target.reset();
        btn.innerText = "Send to Doctor's Queue";
        btn.disabled = false;
    });
});

function loadStaffData() {
    db.collection("patients").orderBy("timestamp", "desc").limit(5).onSnapshot((snapshot) => {
        const tbody = document.querySelector('#staffTable tbody');
        tbody.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const time = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : "...";
            tbody.innerHTML += `<tr><td>${time}</td><td><strong>${data.name}</strong></td><td><span class="badge ${data.status === 'Waiting' ? 'badge-waiting' : 'badge-done'}">${data.status}</span></td></tr>`;
        });
    });
}

// --- 4. DOCTOR ACTIONS ---
function loadDoctorData() {
    db.collection("patients").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        const queue = document.getElementById('doctorQueue');
        queue.innerHTML = "<h4 style='color:var(--primary); margin-bottom:15px;'>Live Queue</h4>";
        snapshot.forEach((doc) => renderPatientCard(doc));
    });
}

function searchPatient() {
    const phone = document.getElementById('searchPhone').value.trim();
    if (!phone) return alert("Enter phone number");

    const queue = document.getElementById('doctorQueue');
    queue.innerHTML = "Searching records...";

    db.collection("patients").where("phone", "==", phone).orderBy("timestamp", "desc").get().then((snap) => {
        queue.innerHTML = `<h4 style="color:var(--gold); margin-bottom:15px;">Search Results for ${phone}</h4>`;
        if (snap.empty) queue.innerHTML += "<p>No history found.</p>";
        snap.forEach(doc => renderPatientCard(doc, true));
    });
}

function renderPatientCard(doc, isHistory = false) {
    const data = doc.data();
    const queue = document.getElementById('doctorQueue');
    const time = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : "New Patient";

    queue.innerHTML += `
        <div class="admin-card" style="${isHistory ? 'border-left: 5px solid var(--gold);' : ''}">
            <div style="display:flex; justify-content:space-between;">
                <strong>${data.name} (${data.age})</strong>
                <span class="badge ${data.status === 'Waiting' ? 'badge-waiting' : 'badge-done'}">${data.status}</span>
            </div>
            <p style="font-size:0.8rem; color:#888;">${time} | Contact: ${data.phone}</p>
            <p><strong>Complaint:</strong> ${data.complaint}</p>
            <p style="background:#f9f9f9; padding:10px; border-radius:5px; font-size:0.85rem;">${data.history}</p>
            ${data.status === 'Waiting' ? `<button onclick="markDone('${doc.id}')" class="btn-search" style="margin-top:10px;">Mark as Consulted</button>` : ''}
        </div>
    `;
}

function markDone(id) {
    db.collection("patients").doc(id).update({ status: "Consulted" });
}

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAeOjG-wXJE2q0GTUqe77P-IhBut17gsrY",
    authDomain: "ashtangayurvedaclinic.firebaseapp.com",
    projectId: "ashtangayurvedaclinic",
    storageBucket: "ashtangayurvedaclinic.firebasestorage.app",
    messagingSenderId: "88025281504",
    appId: "1:88025281504:web:a3999614ad52b6f5ccf185",
    measurementId: "G-6G67W403RZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
