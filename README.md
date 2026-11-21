# kgs-media-house
Website for my Business

## Contact form email

The contact form posts URL-encoded fields to a Google Apps Script web app using
a hidden iframe, so it works from Live Server and GitHub Pages without
cross-origin `fetch`. The Apps Script sends inquiries to
`satiesh.kg@gmail.com` and returns a visible success or failure message in the
page.

To enable or update email delivery:

The current configured deployment responds with `Script function not found:
doPost`, which means its deployed source has no web-app handler. The `Anyone`
access setting does not add that function. Use a standalone Apps Script project
(not the library URL shown in deployment details):

1. Open the [Apps Script dashboard](https://script.google.com/home) and create
   a **New project**.
2. In its main editor, replace the contents of `Code.gs` with this repository's
   [`Code.gs`](./Code.gs). Ensure `doGet` and `doPost` appear as top-level
   functions, then save.
3. Choose **Deploy → New deployment → Web app**. Set **Execute as** to your
   account and **Who has access** to **Anyone**. Deploy and authorize email
   access when prompted.
4. Open the new deployment's `/exec` URL in a private/incognito window. It must
   show `KGS Media House contact endpoint is active`. This GET check does not
   send email.
5. Replace the `endpoint` value in the contact form script in `index.html` with
   the new deployment's `/exec` URL, then test the form from Live Server.

Do not use the deployment's **Library URL** or the old `/exec` URL. If you
continue using the old project, its actual deployed version must be edited and
redeployed with **New version**; saving `Code.gs` in this repository alone
cannot change a Google deployment.

You do not need to publish the website to test it: run Live Server from the
repository root. The Apps Script web app must be deployed separately; updating
`Code.gs` in this repository does not update the deployed script. Check the
Apps Script execution log for server-side errors and the recipient inbox
(including spam) when diagnosing delivery failures.
