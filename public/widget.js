// Private Rengøring Widget
(function() {
  'use strict';

  const PrivateRengoring = {
    config: {
      apiUrl: 'https://your-app.netlify.app/api',
      containerId: null,
      userId: null,
      theme: 'light',
      language: 'da',
      showJobs: true,
      showNetwork: false
    },

    init: function(options) {
      this.config = { ...this.config, ...options };
      this.render();
      this.loadData();
    },

    render: function() {
      const container = document.getElementById(this.config.containerId);
      if (!container) {
        console.error('Container not found:', this.config.containerId);
        return;
      }

      container.innerHTML = `
        <div class="privat-rengoring-widget" data-theme="${this.config.theme}">
          <div class="widget-header">
            <h3>Privat Rengøring</h3>
            <div class="widget-tabs">
              ${this.config.showJobs ? '<button class="tab active" data-tab="jobs">Jobs</button>' : ''}
              ${this.config.showNetwork ? '<button class="tab" data-tab="network">Netværk</button>' : ''}
            </div>
          </div>
          <div class="widget-content">
            <div id="jobs-content" class="tab-content active">
              <div class="loading">Indlæser jobs...</div>
            </div>
            ${this.config.showNetwork ? '<div id="network-content" class="tab-content"><div class="loading">Indlæser netværk...</div></div>' : ''}
          </div>
        </div>
      `;

      this.addStyles();
      this.bindEvents();
    },

    addStyles: function() {
      if (document.getElementById('privat-rengoring-styles')) return;

      const styles = `
        <style id="privat-rengoring-styles">
          .privat-rengoring-widget {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .privat-rengoring-widget[data-theme="dark"] {
            background: #1f2937;
            border-color: #374151;
            color: white;
          }
          
          .widget-header {
            padding: 16px;
            border-bottom: 1px solid #e5e7eb;
            background: #f9fafb;
          }
          
          .privat-rengoring-widget[data-theme="dark"] .widget-header {
            background: #111827;
            border-color: #374151;
          }
          
          .widget-header h3 {
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: 600;
            color: #111827;
          }
          
          .privat-rengoring-widget[data-theme="dark"] .widget-header h3 {
            color: white;
          }
          
          .widget-tabs {
            display: flex;
            gap: 8px;
          }
          
          .tab {
            padding: 8px 16px;
            border: none;
            background: #e5e7eb;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }
          
          .tab.active {
            background: #3b82f6;
            color: white;
          }
          
          .widget-content {
            padding: 16px;
            max-height: 400px;
            overflow-y: auto;
          }
          
          .tab-content {
            display: none;
          }
          
          .tab-content.active {
            display: block;
          }
          
          .job-item {
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 12px;
            transition: all 0.2s;
          }
          
          .job-item:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          .job-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: #111827;
          }
          
          .job-location {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          
          .job-budget {
            font-size: 14px;
            color: #059669;
            font-weight: 500;
          }
          
          .loading {
            text-align: center;
            padding: 20px;
            color: #6b7280;
          }
        </style>
      `;
      
      document.head.insertAdjacentHTML('beforeend', styles);
    },

    bindEvents: function() {
      const tabs = document.querySelectorAll('.privat-rengoring-widget .tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          const tabName = e.target.dataset.tab;
          this.switchTab(tabName);
        });
      });
    },

    switchTab: function(tabName) {
      // Update active tab
      document.querySelectorAll('.privat-rengoring-widget .tab').forEach(tab => {
        tab.classList.remove('active');
      });
      document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

      // Update active content
      document.querySelectorAll('.privat-rengoring-widget .tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabName}-content`).classList.add('active');
    },

    loadData: function() {
      if (this.config.showJobs) {
        this.loadJobs();
      }
      if (this.config.showNetwork) {
        this.loadNetwork();
      }
    },

    loadJobs: function() {
      // Simulate API call - replace with actual API
      setTimeout(() => {
        const jobsContent = document.getElementById('jobs-content');
        jobsContent.innerHTML = `
          <div class="job-item">
            <div class="job-title">Hjemmerengøring søges</div>
            <div class="job-location">📍 København</div>
            <div class="job-budget">💰 300-400 kr</div>
          </div>
          <div class="job-item">
            <div class="job-title">Kontorrengøring</div>
            <div class="job-location">📍 Aarhus</div>
            <div class="job-budget">💰 500-600 kr</div>
          </div>
          <div class="job-item">
            <div class="job-title">Hovedrengøring</div>
            <div class="job-location">📍 Odense</div>
            <div class="job-budget">💰 800-1000 kr</div>
          </div>
        `;
      }, 1000);
    },

    loadNetwork: function() {
      setTimeout(() => {
        const networkContent = document.getElementById('network-content');
        networkContent.innerHTML = `
          <div class="job-item">
            <div class="job-title">Maria Hansen</div>
            <div class="job-location">📍 København • Privat kunde</div>
          </div>
          <div class="job-item">
            <div class="job-title">Lars Nielsen</div>
            <div class="job-location">📍 Aarhus • Rengøringsekspert</div>
          </div>
        `;
      }, 1000);
    }
  };

  // Make it globally available
  window.PrivateRengoring = PrivateRengoring;
})();