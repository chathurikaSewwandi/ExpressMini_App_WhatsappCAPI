# Coffee Shop AI Agent Backend

This project is a Node.js/TypeScript backend for a coffee shop, integrating an AI agent (Google Gemini) and WhatsApp messaging support. Customers can interact with the shop via WhatsApp, and the AI agent can respond to queries, manage message history, and support user management.

## Features

- WhatsApp messaging integration for customer communication
- AI-powered replies using Google Gemini
- User and message management with MongoDB
- REST API endpoints for users and messages
- Webhook support for WhatsApp events

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB (Mongoose)
- Google Gemini AI (`@google/genai`)
- Axios
- dotenv

## Project Structure

```
src/
  app.ts
  config/
    app.config.ts
  controller/
    message.controller.ts
    user.controller.ts
    webhook.controller.ts
  dao/
    message.dao.ts
    user.dao.ts
  dto/
    messageHistory.dto.ts
    webhookVerification.dto.ts
  model/
    message.model.ts
    user.model.ts
  routes/
    message.router.ts
    user.roue.ts
    webhook.router.ts
  service/
    gemini.service.ts
    message.service.ts
    user.service.ts
    webhook.service.ts
.env
package.json
tsconfig.json
```

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**  
   Edit `.env` with your WhatsApp, Gemini, and MongoDB credentials.

4. **Build and run**
   ```sh
   npm run build
   npm start
   ```
   For development with hot-reload:
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /user/` — Create a new user
- `POST /user/hello` — Test endpoint
- `POST /message/` — Send a WhatsApp message
- `GET /webhook/` — Webhook verification
- `POST /webhook/` — Receive WhatsApp webhook events

## Environment Variables

See `.env` for required variables:
- `PHONE_NUMBER_ID`
- `VERSION`
- `WHATSAPP_USER_ACCESS_TOKEN`
- `WEBHOOK_VERIFICATION_PASSWORD`
- `PORT`
- `GEMINI_API_KEY`
- `MONGO_URI`

## License

ISC

---

For more details, see `src/app.ts` and `package.json`.
