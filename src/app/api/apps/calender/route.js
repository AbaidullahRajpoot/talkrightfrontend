import { NextResponse } from 'next/server'

import { google } from 'googleapis';

export async function POST(request) {

  const clientkey = {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
  };

  const reqBody = await request.json()

  const { startTime, endTime } = reqBody

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: clientkey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
      clientOptions: {
        subject: "admin@talkright.net"
      }
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // const calendarIds = [
    //   "c_cd539e69860b1f582531404d1c85b480b35a7506cca164d7b66e00cf71ae126e@group.calendar.google.com"
    // ];

    const calendarIds = [
      "c_7186b72ddfa0edb9c4c6d3817695134fb0aede724e6d6f6f7639bb7ef9f5455e@group.calendar.google.com",
      "c_3970a8df0e0bcd27ec2886ba794261ba6bdef3c8ae1587da42abc686f4e314b1@group.calendar.google.com",
      "c_391f173ee395d355b977482d7fad81ff7215f531073977ae531fe6bd951300e9@group.calendar.google.com",
      "c_cd539e69860b1f582531404d1c85b480b35a7506cca164d7b66e00cf71ae126e@group.calendar.google.com",
      "c_89a7a25a975f12e70b35e123e1995ad49ad03a3f82327e85ad3a468a3dbb382e@group.calendar.google.com",
      "c_9b8a2194e86d8329c75cf36a71f666f88b2b8d2d007ada9e6e0c126183ac287c@group.calendar.google.com",
      "c_ddfcafc584d26184d1f05d74dccfb3a00859a70188c5da3cc48dcc21312bfb84@group.calendar.google.com",
      "c_266a9100cad4b8e19a42ddbb4c4962ae11caaa1aa0fb5cbe5878adb811f64a12@group.calendar.google.com",
      "c_402b6c946f92619d3e243869a989196168e238c393ef695606236398128f7622@group.calendar.google.com",
      "c_9e4cc045c1e32ed0610efdd9a21daa9bdfc4b498d49f786466c7100599c6adc2@group.calendar.google.com",
      "c_a08217c89d0d2291ed36ff4e6d3a36f289a2df0f31d82294d2ca6937086f2db8@group.calendar.google.com",
      "c_56ca6a5cc2d1de0241b3ca82b00466b23de51a414e6ba67295c351a14e467388@group.calendar.google.com",
      "c_22c2630d16f9fd60e11a4dd7f863d2b396e126cd8186ffe241308464c9daf200@group.calendar.google.com",
      "c_31cf585701bf96ebf9a77d179d43d8edf4602af3ea5d9dd9d8927e8f687dc683@group.calendar.google.com",
      "c_688336bec673488f35f28627722f1287e37a7c48683f8085552930226d5c7ecf@group.calendar.google.com",
      "c_d34f8117f7e6c8b202a247e5835758012e7d475b36cf5f034c49a70e436bcebe@group.calendar.google.com",
      "c_7d49d152b4c93457488b265e8e538252aa201b9e9eba1aa333b142a84b29df34@group.calendar.google.com",
      "c_e29ad66db91b515f25d553ca3e795d09aff39616bab62f027b2e7b6174efdfa7@group.calendar.google.com",
      "c_f1a15195bb768e668c766c5287475c0fcb85cd95259c4b0c490abbce573eeedd@group.calendar.google.com",
      "c_4eaa9e8f4530cadbc39083db5d39d4a199735ce5cc927b2be5f4cba8eb443422@group.calendar.google.com",
      "c_690b781c32aad1fd7fe10645b4784ac760a8f0aa9ba7d30243382cd4de78a5a8@group.calendar.google.com",
      "c_3180bdc89ef1cdb0cb51bdb6c083a81e2a68d7ce35ef3f1da06bc546d4b14ec4@group.calendar.google.com",
      "c_16bc0489a92f59c9685c7def1a7c2e10022209209eb0cd484eb1c1a7d9f8da32@group.calendar.google.com"
    ];

    // Specify the calendar ID and parameters to fetch events

    const eventsList = await Promise.all(
      calendarIds.map(calendarId =>
        calendar.events.list({
          calendarId,
          singleEvents: true,
          orderBy: 'startTime',

          // timeMin: startTime,
          // timeMax: endTime,
          // timeZone: 'Asia/Dubai'
        })
      )
    );

    // Combine all events from different calendars

    const allEvents = eventsList.flatMap(response => response.data.items);

    const events = allEvents;

    if (events.length) {
      return NextResponse.json(events);
    } else {
      console.log('No upcoming events found.');

      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
