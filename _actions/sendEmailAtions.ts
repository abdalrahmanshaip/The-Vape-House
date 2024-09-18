'use server'
import nodemailer from 'nodemailer'

export async function sendEmail(
  state: { status: number; message: string },
  formData: FormData
) {
  const dataEmail = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    address: formData.get('address'),
    city: formData.get('city'),
    phoneNumber: formData.get('phoneNumber'),
    email: formData.get('email'),
    cart: [formData.get('cart')],
    subtotal: Number(formData.get('subtotal')),
    delivery: Number(formData.get('delivery')),
    total: Number(formData.get('total')),
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 3000,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: true },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'abdalrahmanshaip@gmail.com',
    subject: `New Order from ${dataEmail.firstName} ${dataEmail.lastName}`,
    html: `
      <h1>New Order Details</h1>
      <p><strong>Customer:</strong> ${dataEmail.firstName} ${
      dataEmail.lastName
    }</p>
      <p><strong>Email:</strong> ${dataEmail.email}</p>
      <p><strong>Phone:</strong> ${dataEmail.phoneNumber}</p>
      <p><strong>Address:</strong> ${dataEmail.address}, ${dataEmail.city}</p>

      <p><strong>Cart Items:</strong></p>
      <ul>
        ${dataEmail.cart
          .map(
            (item: any) =>
              `<li>
                <strong>${item.name}</strong> (x${item.quantity}) - EGP ${
                item.price
              }<br />
                ${item.flavor ? `Flavor: ${item.flavor}` : ''}
                ${item.resistance ? `Resistance: ${item.resistance}` : ''}
                ${item.variations ? `Variations: ${item.variations}` : ''}
                ${item.color ? `Color: ${item.color}` : ''}
              </li>`
          )
          .join('')}
      </ul>
      
      <p><strong>Subtotal:</strong> EGP ${dataEmail.subtotal.toFixed(2)}</p>
      <p><strong>Delivery:</strong> EGP ${dataEmail.delivery.toFixed(2)}</p>
      <p><strong>Total:</strong> EGP ${dataEmail.total.toFixed(2)}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { status: 200, message: 'Order placed and email sent' }
  } catch (error: any) {
    console.error('Error sending email:', error)
    return { status: 500, message: `Error sending email: ${error.message}` }
  }
}
