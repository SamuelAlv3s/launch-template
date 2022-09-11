import { Handler, HandlerEvent } from '@netlify/functions';

import Airtable from 'airtable';
const { AIRTABLE_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('app2pxeTS6X17CyOH');

const handler: Handler = async (event: HandlerEvent, context: any) => {
  try {
    const data = JSON.parse(event.body || '');

    if (!data.email) {
      return {
        statusCode: 400,
        body: 'Please, include email.',
      };
    }

    await base('tblCtDDM16Yl9d81n').create({
      email: data.email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Thanks for signup' }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

export { handler };
