import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  const app = express();
  app.set('port', 8080);


  // Create Vite server in middleware mode
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' });

  app.use(vite.middlewares);

  app.use(/\/.*/, async (req, res) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8'); // Read index.html

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);

      // Load server entry
      const { render } = await vite.ssrLoadModule('./src/EntryServer.tsx');

      // Render the app
      const appHtml = render(url);

      // Inject the app HTML into the template
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      res.status(500).end(err.message);
    }
  });

  app.listen(app.get('port'), () => {
    console.log(`🔥 Server running at http://localhost:${app.get('port')}`);
  });
};

startServer();
