// Quick test script for xAI Grok integration
const OpenAI = require('openai');
require('dotenv').config();

async function testXAI() {
  console.log('🧪 Testing xAI Grok 4 Fast integration...');
  
  if (!process.env.OPENROUTER_API_KEY) {
    console.log('❌ OPENROUTER_API_KEY not found in .env file');
    return;
  }

  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  });

  try {
    const completion = await client.chat.completions.create({
      model: 'x-ai/grok-4-fast:free',
      messages: [
        {
          role: 'system',
          content: 'You are a legal expert. Analyze documents and provide insights.'
        },
        {
          role: 'user',
          content: 'Analyze this rental agreement: "Monthly rent is $1200. Security deposit is $1800. Early termination requires 3 months rent penalty." Provide a brief JSON analysis with risk score.'
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    console.log('✅ xAI Grok 4 Fast response:');
    console.log(completion.choices[0].message.content);
    console.log('\n🎉 Integration successful! xAI Grok is working.');
    
  } catch (error) {
    console.error('❌ Error testing xAI:', error.message);
  }
}

testXAI();