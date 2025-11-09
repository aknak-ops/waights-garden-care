(function() {
  const termsContent = `
    <h3>Payment</h3>
    <p>I accept Monzo Mastercard, PayPal, or cash in hand.</p>

    <h3>Access & Safety</h3>
    <p>You must ensure safe access to the garden (gates unlocked, pets secured, fragile items moved). If I arrive and cannot work safely or access is blocked, a call-out fee may apply as described in the Refund & Cancellation Policy.</p>

    <h3>Liability</h3>
    <p>I take care in all work I do but I am not responsible for pre-existing damage, hidden underground services, or items left in the work area. My total liability is limited to the value of the specific service provided.</p>

    <h3>Insurance</h3>
    <p>I hold active public liability insurance covering accidental damage or injury during my work. Proof of insurance is available upon request.</p>

    <h3>Governing Law</h3>
    <p>These terms are governed by the laws of England & Wales. Disputes will be handled by the courts of England & Wales.</p>
  `;

  const privacyContent = `
    <p>This page explains what personal data we collect and how we use it.</p>
    <p>Website contact forms are processed securely through <strong>FormSubmit</strong> (formsubmit.co) to deliver enquiries directly to my email address. No data is stored by FormSubmit beyond the delivery of the message.</p>
  `;

  window.openModal = function(type, event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (type === 'terms') {
      title.textContent = 'Terms of Service';
      body.innerHTML = termsContent;
    } else if (type === 'privacy') {
      title.textContent = 'Privacy Policy';
      body.innerHTML = privacyContent;
    }

    modal.classList.add('open');
  };

  window.closeModal = function() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
  };

  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        window.closeModal();
      }
    });

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', window.closeModal);
    }
  });
})();
