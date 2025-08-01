          ```javascript
          job_category: jobCategory || null,
          target_audience: targetAudience || null,
          urgency: urgency || null,
          posts: [], // Return empty array instead of mock posts
          created_at: new Date().toISOString()
        };

        res.status(201).json({
            total: 0,
          postId: mockPost.id
        });

      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Server fejl ved oprettelse af opslag' });
      }
    });

  } else if (req.method === 'GET') {
    // Get posts
    try {
      // Mock posts data for demo
      const mockPosts = [
        {
          id: '1',
          user: {
            id: '1',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            userType: 'private'
          },
          content: 'Søger pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen.',
          location: 'København NV',
          budget: '300-400 kr',
          createdAt: '2 timer siden',
          likes: 12,
          comments: [
            {
              id: '1',
              content: 'Jeg kan hjælpe dig! Har erfaring med hjemmerengøring.',
              createdAt: '1 time siden',
              user: {
                id: '2',
                name: 'Lars Nielsen',
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              }
            }
          ],
          isJobPost: true,
          jobType: 'home_cleaning',
          urgency: 'flexible'
        },
        {
          id: '2',
          user: {
            id: '2',
            name: 'Lars Nielsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            userType: 'cleaner'
          },
          content: 'Tilbyder professionel kontorrengøring i Aarhus området. 10+ års erfaring og miljøvenlige produkter.',
          location: 'Aarhus C',
          budget: '500-600 kr',
          createdAt: '4 timer siden',
          likes: 8,
          comments: [],
          isJobPost: false,
          jobType: 'office_cleaning',
          urgency: 'flexible'
        }
      ];

      res.status(200).json({
        posts: mockPosts,
        hasMore: false,
        pagination: {
          page: 1,
          limit: 10,
          total: mockPosts.length
        }
      });

    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Server fejl ved hentning af opslag' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```