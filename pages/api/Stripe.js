import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
      console.log(reg.body)
    try {
        const params = 
            {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shippinh_options: [ {shipping_rate:'shr_1Ksd7OJGyd6gZDhvSzi8uDlN'}],
                line_items: reg.body.map((item) => {
                     const img = item.image[0].asset.ref;
                     const newImage = img.replace('image-','https//cdn.sanity.io/6e9ujp6i/production/').replace('-webp','.webp');
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.name,
                                    images: [newImage],
                                },
                                unit_amount: item.price * 100,
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum:1,
                            },
                            quantity: item.quantity
                        }
                }),
                //   {
                //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                //     price: '{{PRICE_ID}}',
                //     quantity: 1,
                //   },
                
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
              }
        
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}