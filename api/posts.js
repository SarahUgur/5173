total: 0

  } else if (req.method === 'PUT') {
    // Handle share tracking
    const urlParts = req.url.split('/');
    const postId = urlParts[3]; // /api/posts/{postId}/share
    const action = urlParts[4]; // share
    
    if (action === 'share') {
      try {
        const { platform } = req.body;
        
        // Log the share for analytics
        console.log(`Post ${postId} shared on ${platform}`);
        
        res.status(200).json({ message: 'Share tracked successfully' });
      } catch (error) {
        console.error('Error tracking share:', error);
        res.status(500).json({ error: 'Server fejl ved tracking af deling' });
      }
    } else {
      res.status(404).json({ error: 'Endpoint ikke fundet' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }