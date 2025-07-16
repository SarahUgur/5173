import React, { useState } from 'react';
import { ExternalLink, Globe, Code, Settings, Copy, Check } from 'lucide-react';

interface WebsiteIntegrationProps {
  currentUser: any;
}

export default function WebsiteIntegration({ currentUser }: WebsiteIntegrationProps) {
  const [activeTab, setActiveTab] = useState<'embed' | 'api' | 'widget'>('embed');
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- Privat Rengøring Widget -->
<div id="privat-rengoring-widget"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://your-app.netlify.app/widget.js';
    script.async = true;
    script.onload = function() {
      PrivatRengoring.init({
        containerId: 'privat-rengoring-widget',
        userId: '${currentUser?.id}',
        theme: 'light',
        language: 'da',
        showJobs: true,
        showNetwork: true
      });
    };
    document.head.appendChild(script);
  })();
</script>`;

  const iframeCode = `<iframe 
  src="https://your-app.netlify.app/embed" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
</iframe>`;

  const apiExample = `// Hent jobs fra din hjemmeside
fetch('https://your-app.netlify.app/api/jobs', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Jobs:', data);
});

// Opret nyt job fra din hjemmeside
fetch('https://your-app.netlify.app/api/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Hjemmerengøring søges',
    description: 'Har brug for hjælp til rengøring...',
    location: 'København',
    budget: '300-400 kr',
    jobType: 'home_cleaning'
  })
});`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Website Integration</h1>
        <p className="text-gray-600">Integrer Privat Rengøring med din egen hjemmeside</p>
      </div>

      {/* Integration Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('embed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'embed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Embed Widget
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              API Integration
            </button>
            <button
              onClick={() => setActiveTab('widget')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'widget'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Custom Widget
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'embed' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript Widget</h3>
                <p className="text-gray-600 mb-4">
                  Tilføj denne kode til din hjemmeside for at vise Privat Rengøring funktioner direkte på din side.
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{embedCode}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(embedCode)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors duration-200"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">iFrame Integration</h3>
                <p className="text-gray-600 mb-4">
                  Alternativt kan du bruge en iframe til at indlejre appen direkte.
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{iframeCode}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(iframeCode)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors duration-200"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">REST API</h3>
                <p className="text-gray-600 mb-4">
                  Brug vores API til at integrere Privat Rengøring data direkte i din hjemmeside eller app.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">API Endpoints:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li><code>GET /api/jobs</code> - Hent alle jobs</li>
                    <li><code>POST /api/jobs</code> - Opret nyt job</li>
                    <li><code>GET /api/users</code> - Hent brugere</li>
                    <li><code>POST /api/applications</code> - Send ansøgning</li>
                  </ul>
                </div>

                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{apiExample}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(apiExample)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors duration-200"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'widget' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tilpasset Widget</h3>
                <p className="text-gray-600 mb-4">
                  Konfigurer dit widget til at passe perfekt til din hjemmesides design.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="light">Lyst</option>
                        <option value="dark">Mørkt</option>
                        <option value="auto">Automatisk</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primær farve</label>
                      <input 
                        type="color" 
                        value="#3b82f6" 
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sprog</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="da">Dansk</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                        <option value="pl">Polski</option>
                        <option value="tr">Türkçe</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Funktioner</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Vis jobs</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Vis netværk</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Vis beskeder</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Vis profil</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Widget størrelse</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="small">Lille (300x400)</option>
                        <option value="medium">Medium (400x600)</option>
                        <option value="large">Stor (600x800)</option>
                        <option value="full">Fuld bredde</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Generer Widget Kode
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Integration Examples */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Eksempler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">WordPress</h4>
            <p className="text-sm text-gray-600 mb-3">Plugin til WordPress sites</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              Download Plugin
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Shopify</h4>
            <p className="text-sm text-gray-600 mb-3">App til Shopify stores</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              Installer App
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">React/Vue</h4>
            <p className="text-sm text-gray-600 mb-3">NPM pakke til moderne frameworks</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              Se Dokumentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}