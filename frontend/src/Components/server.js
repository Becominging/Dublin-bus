// This is your test secret API key.
const stripe = require('stripe')('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');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/donate';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 3000'));