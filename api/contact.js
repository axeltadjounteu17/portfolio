export default async function handler(req, res) {
  // Autoriser seulement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { user_name, user_email, subject, message, honeypot } = req.body;

  // Protection anti-bot Honeypot
  if (honeypot) {
    return res.status(200).json({ message: 'Message ignoré (robot détecté)' });
  }

  // Validation basique
  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  try {
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY, // Cette clé doit rester secrète (pas de préfixe VITE_)
      template_params: {
        user_name,
        user_email,
        subject,
        message
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('EmailJS Error:', errorText);
      return res.status(500).json({ error: `EmailJS: ${errorText}` });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
