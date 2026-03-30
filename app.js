/* =========================
   FIREBASE CONFIG
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyAEFRbjcq276sl2DrupUAfyX1z98NoA4RI",
  authDomain: "donate-islam.firebaseapp.com",
  projectId: "donate-islam"
};

/* INIT FIREBASE */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* =========================
   VARIABLES
========================= */
let selectedCause = "";

/* =========================
   POPUP FUNCTIONS
========================= */
function openPopup(cause) {
  selectedCause = cause;

  document.getElementById("popupTitle").innerText =
    "Donate for " + cause;

  document.getElementById("popup").style.display = "flex";

  document.getElementById("amount").value = "";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* =========================
   SUCCESS POPUP
========================= */
function showSuccess(amount, cause) {
  document.getElementById("successText").innerText =
    `₹${amount} donated for ${cause}`;

  document.getElementById("successPopup").style.display = "flex";
}

function closeSuccess() {
  document.getElementById("successPopup").style.display = "none";
}

/* =========================
   REAL-TIME TOTAL
========================= */
db.collection("donations").onSnapshot(snapshot => {
  let total = 0;

  snapshot.forEach(doc => {
    total += doc.data().amount;
  });

  document.getElementById("total").innerText = "₹" + total;
});

/* =========================
   PAYMENT FUNCTION
========================= */
function payNow() {
  let amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  var options = {
    key: "YOUR_RAZORPAY_KEY", // 🔑 apni Razorpay key daalo
    amount: amount * 100,
    currency: "INR",
    name: "Faizane Madina",
    description: selectedCause + " Donation",

    theme: {
      color: "#0d3b2e"
    },

    handler: function (response) {

      /* SAVE TO FIREBASE */
      db.collection("donations").add({
        cause: selectedCause,
        amount: Number(amount),
        date: new Date(),
        paymentId: response.razorpay_payment_id
      });

      /* SHOW SUCCESS */
      showSuccess(amount, selectedCause);

      /* CLOSE POPUP */
      closePopup();
    }
  };

  /* OPEN RAZORPAY */
  let rzp = new Razorpay(options);
  rzp.open();
}