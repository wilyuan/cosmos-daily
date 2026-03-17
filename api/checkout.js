const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount } = req.body;
    const cents = Math.round(Number(amount) * 100);

    if (!cents || cents < 100) {
      return res.status(400).json({ error: 'Minimum donation is $1' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Support Cosmos Daily',
            description: 'Keep the celestial archive free and open.',
          },
          unit_amount: cents,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin || 'https://cosmosdaily.co'}?donated=true`,
      cancel_url: `${req.headers.origin || 'https://cosmosdaily.co'}`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
