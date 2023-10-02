// Private API buscar todos
// Performance Test
// 100vu por 10s
// Falha < 1% | p95 < 250ms

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01 '],
        http_req_duration: ['p(95) < 250']
    }
}

const BASE_URL = 'https://test-api.k6.io';

export function setup(){
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.6122520152465517@email.com',
        password: 'user123'
    });

    const token = loginRes.json('acess');
    return token;
}

export default  function(token){
    const params = {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const res = http.get(`${BASE_URL}/my/crocodiles`, params);

    check(res, {
        'status 200': (r) => r.status === 200
    });
}