# Installation and Configuration of Auth0

## Step 1. Clone the Repository

```bash
git clone https://github.com/hasura/ddn-auth-examples
```

## Step 2. Install the Dependencies

```bash
npm install
```

## Step 3. Create a .env File

```bash
cp .env.example .env
```

## Step 4. Update the .env File

```bash
AUTH0_DOMAIN=<YOUR_AUTH0_DOMAIN>
AUTH0_CLIENT_ID=<YOUR_AUTH0_CLIENT_ID>
AUTH0_CLIENT_SECRET=<YOUR_AUTH_CLIENT_SECRET>
SESSION_SECRET=super-secure-session-secret # can be any string
```

☝️ Replace these values with your Auth0 credentials. You can find these values in your Auth0 application settings.

## Step 5. Update the Allowed Callback URLs

Go to your Auth0 application settings and update the Allowed Callback URLs to `http://localhost:4000/callback`.

## Step 6. Run the Application

```bash
npm run dev
```

## Step 7. Log into the Application

Open `http://localhost:4000` in your browser and log in with your Auth0 credentials.

You'll see a JWT token printed on the screen if you're successfully authenticated. You can verify this using
[jwt.io](https://jwt.io/). When ready, pass this value as a header in your Hasura console.
