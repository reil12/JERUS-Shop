import { Link } from 'react-router-dom';
import CustomerPageBackground from '../components/CustomerPageBackground';
import CustomerPageHeading from '../components/CustomerPageHeading';

export function HowToOrder() {
  return (
    <section className="info customer-page info-page page-theme-order">
      <CustomerPageBackground word="ORDER" angle={6} />
      <CustomerPageHeading
        word="ORDER"
        kicker="Shopping guide"
        description="Your next JERUS favorite is just a few simple steps away."
        theme="order"
      />
      <ol className="order-steps">
        <li><strong>Create an account</strong> or log in from the <Link to="/register">Sign up</Link> page.</li>
        <li><strong>Browse the <Link to="/shop">Shop</Link></strong> and open a shirt you like.</li>
        <li><strong>Choose your size</strong> (see the <Link to="/size-chart">Size Chart</Link>) and click Add to Cart.</li>
        <li><strong>Open your cart</strong>, adjust quantities, then press Proceed to Checkout.</li>
        <li><strong>Enter your shipping address</strong> and place the order. Payment is Cash on Delivery.</li>
        <li><strong>Track it</strong> any time under <Link to="/orders">Track My Order</Link>.</li>
      </ol>
    </section>
  );
}

// Sample measurements only. Edit these numbers to match your real shirts.
const sizes = [
  { size: 'S', chest: 51, length: 69 },
  { size: 'M', chest: 54, length: 71 },
  { size: 'L', chest: 57, length: 73 },
  { size: 'XL', chest: 60, length: 75 },
];

export function SizeChart() {
  return (
    <section className="info customer-page info-page page-theme-size">
      <CustomerPageBackground word="SIZE" angle={-14} />
      <CustomerPageHeading
        word="SIZE"
        kicker="Find your fit"
        description="Check the measurements before you choose your next everyday essential."
        theme="size"
      />
      <div className="size-chart-card">
        <p className="muted">Flat measurements in centimeters. Sample values: edit them in <code>client/src/pages/InfoPages.jsx</code>.</p>
        <table>
          <thead>
            <tr><th>Size</th><th>Chest width (cm)</th><th>Length (cm)</th></tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.size}><td><strong>{s.size}</strong></td><td>{s.chest}</td><td>{s.length}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="fit-note"><strong>Fit tip</strong> Compare these flat measurements with a shirt you already love.</p>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="info customer-page info-page page-theme-contact">
      <CustomerPageBackground word="CONTACT" angle={10} />
      <CustomerPageHeading
        word="CONTACT"
        kicker="We're here to help"
        description="Questions about an order or a shirt? Reach out and we will reply as soon as we can."
        theme="contact"
      />
      <div className="contact-details">
        <p><strong>Email</strong><a href="mailto:hello@jerus.example">hello@jerus.example</a></p>
        <p><strong>Hours</strong><span>Monday to Saturday, 10:00 AM to 6:00 PM</span></p>
      </div>
      <p className="muted contact-note">Replace these placeholder details with your real contact info.</p>
    </section>
  );
}
