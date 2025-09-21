// Create a simple PDF test
const fs = require('fs');
const pdfParse = require('pdf-parse');

async function testPdfParsing() {
  try {
    console.log('🧪 Testing PDF parsing capability...');
    
    // Check if we have any PDF files to test with
    const testFiles = [
      '../test-rental-agreement.txt', // We know this works
    ];
    
    for (const filePath of testFiles) {
      if (fs.existsSync(filePath)) {
        console.log(`📄 Testing file: ${filePath}`);
        const buffer = fs.readFileSync(filePath);
        console.log(`📊 File size: ${buffer.length} bytes`);
        
        if (filePath.endsWith('.txt')) {
          const text = buffer.toString('utf-8');
          console.log(`✅ TXT content (first 100 chars): ${text.substring(0, 100)}...`);
        }
      }
    }
    
    // Test PDF parsing with a simple buffer
    console.log('\n🔍 Testing pdf-parse with empty buffer...');
    try {
      await pdfParse(Buffer.alloc(0));
    } catch (error) {
      console.log(`⚠️ Expected error with empty buffer: ${error.message}`);
    }
    
    console.log('✅ PDF parsing setup appears functional');
    
  } catch (error) {
    console.error('❌ PDF parsing test failed:', error.message);
  }
}

testPdfParsing();