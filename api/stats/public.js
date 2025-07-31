module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mock public stats for demo
      const mockStats = {
        totalUsers: 1247,
        completedJobs: 3456,
        postsToday: 89,
        activeUsers: 234
      };

      res.status(200).json(mockStats);

    } catch (error) {
      console.error('Error fetching public stats:', error);
      res.status(500).json({ error: 'Server fejl ved hentning af statistikker' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}