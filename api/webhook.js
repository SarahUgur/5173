const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;
      console.log('Subscription created:', subscriptionCreated.id);
      // Update user's subscription status in your database
      break;

    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object;
      console.log('Subscription updated:', subscriptionUpdated.id);
      // Update user's subscription status in your database
      break;

    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      console.log('Subscription cancelled:', subscriptionDeleted.id);
      // Update user's subscription status in your database
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Payment succeeded:', invoice.id);
      // Handle successful payment
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Payment failed:', failedInvoice.id);
      // Handle failed payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}