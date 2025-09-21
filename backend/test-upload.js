// Test file upload to debug the PDF issue
const fs = require('fs');
const FormData = require('form-data');
const http = require('http');

async function testFileUpload() {
  try {
    console.log('🧪 Testing file upload to backend...');
    
    // Test with the simple text file first
    const textPath = '../test-rental-agreement.txt';
    if (!fs.existsSync(textPath)) {
      console.log('❌ Test file not found:', textPath);
      return;
    }

    const form = new FormData();
    form.append('document', fs.createReadStream(textPath), {
      filename: 'test-rental-agreement.txt',
      contentType: 'text/plain'
    });

    // Make the request
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/analyze-document',
      method: 'POST',
      headers: form.getHeaders()
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Upload successful!');
          const result = JSON.parse(data);
          console.log('📊 AI Provider:', result.aiProvider || 'unknown');
          console.log('📊 Summary:', result.summary?.substring(0, 100) + '...');
        } else {
          console.log('❌ Upload failed:', res.statusCode, data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
    });

    form.pipe(req);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFileUpload();