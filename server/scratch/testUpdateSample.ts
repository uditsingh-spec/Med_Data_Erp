async function runTest() {
  try {
    const baseURL = 'http://localhost:5000/api';

    console.log('Logging in...');
    const loginRes = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: 'ADMIN-0001', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    const cookies = loginRes.headers.get('set-cookie');
    const token = cookies?.split(';')[0]?.split('=')[1];
    if (!token) throw new Error('No token found');

    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `jwt=${token}`
    };

    console.log('Creating baby...');
    const babyRes = await fetch(`${baseURL}/babies`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        motherName: 'Test Mother',
        motherAge: 25,
        gender: 'Male',
        weight: 3000,
        gestationalAge: 40,
        termStatus: 'Term',
        dob: new Date().toISOString(),
        isTwin: false,
        skinForehead: 10,
        skinSternum: 10
      })
    });
    const babyData = await babyRes.json();
    const babyId = babyData._id;

    console.log('Creating sample...');
    const sampleRes = await fetch(`${baseURL}/babies/${babyId}/samples`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        weight: 3050,
        jm103_s: 10,
        tsb: 15,
        mbj20_f: null,
        mbj20_s: null,
        remarks: 'Initial sample'
      })
    });
    const sampleData = await sampleRes.json();
    const sampleId = sampleData._id;
    console.log('Created sample:', sampleData);

    console.log('Updating sample...');
    const updateRes = await fetch(`${baseURL}/samples/${sampleId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        weight: 3100,
        jm103_s: 12,
        tsb: 16,
        mbj20_f: null,
        mbj20_s: null,
        remarks: 'Updated sample'
      })
    });
    const updateData = await updateRes.json();
    if (!updateRes.ok) {
      console.error('Update failed:', updateData);
    } else {
      console.log('Update success:', updateData);
    }

  } catch (error: any) {
    console.error('Test failed:', error.message);
  }
}

runTest();
