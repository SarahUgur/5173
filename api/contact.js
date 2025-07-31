module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message, priority } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Alle felter er påkrævet' });
      }

      // Mock successful contact form submission
      console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        priority,
        timestamp: new Date().toISOString()
      });

      res.status(200).json({ message: 'Besked sendt succesfuldt' });

    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: 'Server fejl ved afsendelse af besked' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}